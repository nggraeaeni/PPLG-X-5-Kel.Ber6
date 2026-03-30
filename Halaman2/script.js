let Kirim = document.getElementById('krm');

// Menambahkan aksi ketika tombol diklik
Kirim.addEventListener('click', function(event) {
    // Mencegah halaman me-refresh karena sifat bawaan type="submit"
    event.preventDefault(); 

    let noRumah = document.getElementById('npRumah').value;
    let pesan = document.getElementById('pesan').value;
    const waktu = new Date().toLocaleString('id-ID');

    if (noRumah === "" || pesan === "") {
        alert('Mohon isi semua data!');
        return;
    }

    let barisBaru = document.createElement('tr');

    barisBaru.innerHTML = `
        <td>${noRumah}</td>
        <td>${pesan}</td>
        <td>${waktuSekarang}</td>
        <td>
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
        </td>
    `;

    // 6. Masukkan baris ke dalam tbody tabel
    isi.appendChild(barisBaru);

    // 7. Reset form setelah kirim
    document.getElementById('noRumah').value="";
    document.getElementById('pesan').value="";
    document.getElementById('waktu').value="";



    
    alert('Pesan anda sudah terkirim');
});
