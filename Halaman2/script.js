let tombolKirim = document.getElementById('btnKirim');
let isiTabel = document.getElementById('isi');

tombolKirim.addEventListener('click', function(event) {
    event.preventDefault(); 

    let Nama = document.getElementById('NamaInput').value;
    let noRumah = document.getElementById('noRumahInput').value;
    let pesan = document.getElementById('pesanInput').value;
    let tanggalInput = document.getElementById('tanggalInput').value;
    let waktu;

    if (tanggalInput) {
        waktu = new Date(tanggalInput).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        } else {
        waktu = new Date().toLocaleDateString('id-ID');
    }
    
    if (noRumah === "" || pesan === "") {
        alert('Mohon isi semua data!');
        return;
    }

    if (noRumah < 20 && noRumah > 0) {
        rute = "A";
    } else if (noRumah < 40 && noRumah >= 20) {
        rute = "B";
    } else if (noRumah <= 60 && noRumah >= 40) {
        rute = "C";
    } else {
        alert('Nomor rumah tidak valid!');
        return;
    }

    let barisBaru = document.createElement('tr');

    barisBaru.innerHTML = `
        <td>${Nama}</td>
        <td>${rute}</td>
        <td>${noRumah}</td>
        <td>${pesan}</td>
        <td>${waktu}</td>
        <td>
            <button class="btn-hapus">Hapus</button>
            <button class="btn-edit">Edit</button>
        </td>
    `;

    let tombolHapus = barisBaru.querySelector('.btn-hapus');
    tombolHapus.addEventListener('click', function() {
        if(confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
            barisBaru.remove();
        }
    });

    isiTabel.appendChild(barisBaru);

    alert('Pesan anda sudah terkirim');
    
    document.getElementsByName('NamaInput').value = "";
    document.getElementById('ruteInput').value = "";
    document.getElementById('noRumahInput').value = "";
    document.getElementById('pesanInput').value = "";
});