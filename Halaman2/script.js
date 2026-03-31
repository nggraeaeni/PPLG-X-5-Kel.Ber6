let tombolKirim = document.getElementById('btnKirim');
let isiTabel = document.getElementById('isi');

tombolKirim.addEventListener('click', function(event) {
    event.preventDefault(); 

    let noRumah = document.getElementById('noRumahInput').value;
    let pesan = document.getElementById('pesanInput').value;
    const waktu = new Date().toLocaleString('id-ID');

    if (noRumah === "" || pesan === "") {
        alert('Mohon isi semua data!');
        return;
    }

    let barisBaru = document.createElement('tr');

    barisBaru.innerHTML = `
        <td>${noRumah}</td>
        <td>${pesan}</td>
        <td>${waktu}</td>
        <td>
            <button class="btn-hapus">Hapus</button>
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
    
    document.getElementById('noRumahInput').value = "";
    document.getElementById('pesanInput').value = "";
});