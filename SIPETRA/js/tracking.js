function trackingData(){

    const nik =
    document.getElementById("cariNik").value.trim();

    const data =
    JSON.parse(localStorage.getItem("dataBantuan")) || [];

    const hasil =
    data.find(item => item.nik === nik);

    if(!hasil){

        alert("Data tidak ditemukan!");

        return;

    }

    document.getElementById("hasilNama").innerHTML =
    hasil.nama;

    document.getElementById("hasilNik").innerHTML =
    hasil.nik;

    document.getElementById("hasilJenis").innerHTML =
    hasil.jenis;

    const badge =
    document.getElementById("hasilStatus");

    badge.innerHTML = hasil.status;

    if(hasil.status=="Diproses"){

        badge.className="badge bg-warning";

    }else{

        badge.className="badge bg-success";

    }

    let isi="";

    isi += `
    <li class="list-group-item">
    ✔ Pengajuan diterima
    </li>

    <li class="list-group-item">
    ✔ Verifikasi data
    </li>
    `;

    if(hasil.status=="Diproses"){

        isi += `
        <li class="list-group-item text-warning">
        ⏳ Sedang diproses
        </li>

        <li class="list-group-item text-muted">
        ○ Menunggu selesai
        </li>
        `;

    }else{

        isi += `
        <li class="list-group-item">
        ✔ Sedang diproses
        </li>

        <li class="list-group-item text-success">
        ✔ Bantuan selesai disalurkan
        </li>
        `;

    }

    document.getElementById("riwayat").innerHTML =
    isi;

}