let tombolKirim = document.getElementById('btnKirim');
let isiTabel = document.getElementById('isi');

// Data volume per rute per minggu (index 0..3 untuk Minggu 1..4)
const routeVolumeByWeek = {
    A: [0, 0, 0, 0],
    B: [0, 0, 0, 0],
    C: [0, 0, 0, 0]
};

function getWeekIndex(dateStr) {
    if (!dateStr) return 0;
    const d = new Date(dateStr);
    const day = d.getDate();
    if (day <= 7) return 0;
    if (day <= 14) return 1;
    if (day <= 21) return 2;
    return 3;
}

function updateGrafik() {
    grafikPengangkutan.data.datasets[0].data = routeVolumeByWeek.A;
    grafikPengangkutan.data.datasets[1].data = routeVolumeByWeek.B;
    grafikPengangkutan.data.datasets[2].data = routeVolumeByWeek.C;
    grafikPengangkutan.update();
}

tombolKirim.addEventListener('click', function(event) {
    event.preventDefault();

    let idLaporan = "ID-" + (Math.floor(Math.random() * 9000) + 1000);
    let Nama = document.getElementById('NamaInput').value.toUpperCase();
    let noRumah = document.getElementById('noRumahInput').value;
    let pesan = document.getElementById('pesanInput').value;
    let waktu = new Date().toLocaleDateString('id-ID');

    if (noRumah === "" || pesan === "") {
        alert('Mohon isi data No Rumah dan Pesan dengan benar!');
        return;
    }

    let rute;
    if (noRumah > 0 && noRumah < 20) {
        rute = "A";
    } else if (noRumah >= 20 && noRumah < 40) {
        rute = "B";
    } else if (noRumah >= 40 && noRumah <= 60) {
        rute = "C";
    } else {
        alert('Nomor rumah tidak valid!');
        return;
    }

    let weekIndex = getWeekIndex(new Date().toISOString().split('T')[0]); // pakai tanggal hari ini

    let barisBaru = document.createElement('tr');

    barisBaru.innerHTML = `
        <td><small style="color: gray;">#${idLaporan}</small><br><b>${Nama}</b></td>
        <td>${Nama}</td>
        <td>${rute}</td>
        <td>${noRumah}</td>
        <td>${pesan}</td>
        <td>${waktu}</td>
        <td class="actions-cell">
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
        </td>
    `;

    let tombolHapus = barisBaru.querySelector('.btn-hapus');
    tombolHapus.addEventListener('click', function() {
        if(confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
            barisBaru.remove();
        }
    });

    let tombolEdit = barisBaru.querySelector('.btn-edit');
    tombolEdit.addEventListener('click', function() {
        document.getElementById('NamaInput').value = Nama;
        document.getElementById('noRumahInput').value = noRumah;
        document.getElementById('pesanInput').value = pesan;

        barisBaru.remove();

        document.getElementById('btnKirim').value = 'Perbarui';
    });

    isiTabel.appendChild(barisBaru);

    const laporanCard = document.getElementById('laporan');
    laporanCard.classList.add('show');

    alert('Pesan anda sudah terkirim');

    document.getElementById('NamaInput').value = "";
    document.getElementById('noRumahInput').value = "";
    document.getElementById('pesanInput').value = "";
});

// Sembunyikan card laporan
const observer = new MutationObserver(() => {
    const laporanCard = document.getElementById('laporan');
    if (isiTabel.children.length === 0) {
        laporanCard.classList.remove('show');
    }
});
observer.observe(isiTabel, { childList: true });

//from form angkut
let formAngkut = document.getElementById('formAngkut');
formAngkut.addEventListener('submit', function(event) {
    event.preventDefault();

    let nama = document.getElementById('namaAngkutInput').value;
    let noRumah = document.getElementById('noRumahAngkutInput').value;
    let volume = parseFloat(document.getElementById('volumeAngkutInput').value);

    if (nama === "" || noRumah === "" || isNaN(volume) || volume <= 0) {
        alert('Mohon isi semua data dengan benar!');
        return;
    }

    let rute;
    if (noRumah > 0 && noRumah < 20) {
        rute = "A";
    } else if (noRumah >= 20 && noRumah < 40) {
        rute = "B";
    } else if (noRumah >= 40 && noRumah <= 60) {
        rute = "C";
    } else {
        alert('Nomor rumah tidak valid!');
        return;
    }

    // Update grafik untuk minggu saat ini (index 0)
    routeVolumeByWeek[rute][0] += volume;
    updateGrafik();

    alert('Angkutan berhasil dikonfirmasi! Grafik telah diperbarui.');

    //reset form
    document.getElementById('namaAngkutInput').value = "";
    document.getElementById('noRumahAngkutInput').value = "";
    document.getElementById('volumeAngkutInput').value = "";
});

// grafikkk. copy dari gugel, karena masih bingung
const ctx = document.getElementById('grafikPengangkutan').getContext('2d');
const grafikPengangkutan = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
        datasets: [
            {
                label: 'Rute A (kg)',
                data: routeVolumeByWeek.A,
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
            },
            {
                label: 'Rute B (kg)',
                data: routeVolumeByWeek.B,
                backgroundColor: 'rgba(75, 192, 192, 0.7)'
            },
            {
                label: 'Rute C (kg)',
                data: routeVolumeByWeek.C,
                backgroundColor: 'rgba(255, 159, 64, 0.7)'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Volume Sampah per Minggu per Rute'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Kg'
                }
            }
        }
    }
});