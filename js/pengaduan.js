// ======================================
// Data Pengaduan
// ======================================

let dataPengaduan = JSON.parse(localStorage.getItem("dataPengaduan")) || [];
let editIndex = -1;

// ======================================
// Menampilkan Data
// ======================================

function tampilkanPengaduan() {

    const tbody = document.getElementById("tbodyPengaduan");
    tbody.innerHTML = "";

    dataPengaduan.forEach((item, index) => {

        let warnaStatus = "bg-secondary";

        if (item.status === "Menunggu") {
            warnaStatus = "bg-warning";
        } else if (item.status === "Diproses") {
            warnaStatus = "bg-primary";
        } else if (item.status === "Selesai") {
            warnaStatus = "bg-success";
        }

        tbody.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${item.nama}</td>

            <td>${item.nik}</td>

            <td>${item.kategori}</td>

            <td>${item.judul}</td>

            <td>
                <span class="badge ${warnaStatus}">
                    ${item.status}
                </span>
            </td>

            <td>
                ${
                    item.foto
                        ? `<img src="${item.foto}" width="70" class="rounded">`
                        : "-"
                }
            </td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editPengaduan(${index})">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="hapusPengaduan(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>
        `;
    });

}

// ======================================
// Edit
// ======================================

function editPengaduan(index) {

    editIndex = index;

    document.getElementById("nama").value = dataPengaduan[index].nama;
    document.getElementById("nik").value = dataPengaduan[index].nik;
    document.getElementById("kategori").value = dataPengaduan[index].kategori;
    document.getElementById("judul").value = dataPengaduan[index].judul;
    document.getElementById("deskripsi").value = dataPengaduan[index].deskripsi;
    document.getElementById("status").value = dataPengaduan[index].status;

    const modal = new bootstrap.Modal(
        document.getElementById("modalPengaduan")
    );

    modal.show();

}

// ======================================
// Simpan
// ======================================

function simpanPengaduan() {

    const nama = document.getElementById("nama").value.trim();
    const nik = document.getElementById("nik").value.trim();
    const kategori = document.getElementById("kategori").value;
    const judul = document.getElementById("judul").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const status = document.getElementById("status").value;
    const file = document.getElementById("foto").files[0];

    if (nama === "" || nik === "" || judul === "") {

        alert("Semua data wajib diisi!");

        return;

    }

    function simpan(foto) {

        const data = {
            nama,
            nik,
            kategori,
            judul,
            deskripsi,
            status,
            foto
        };

        if (editIndex === -1) {

            dataPengaduan.push(data);

        } else {

            if (foto === "") {
                data.foto = dataPengaduan[editIndex].foto;
            }

            dataPengaduan[editIndex] = data;

            editIndex = -1;

        }

        localStorage.setItem(
            "dataPengaduan",
            JSON.stringify(dataPengaduan)
        );

        tampilkanPengaduan();

        document.getElementById("nama").value = "";
        document.getElementById("nik").value = "";
        document.getElementById("judul").value = "";
        document.getElementById("deskripsi").value = "";
        document.getElementById("foto").value = "";
        document.getElementById("kategori").selectedIndex = 0;
        document.getElementById("status").selectedIndex = 0;

        const modal = bootstrap.Modal.getInstance(
            document.getElementById("modalPengaduan")
        );

        modal.hide();

    }

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            simpan(e.target.result);

        };

        reader.readAsDataURL(file);

    } else {

        simpan("");

    }

}

// ======================================
// Hapus
// ======================================

function hapusPengaduan(index) {

    if (confirm("Yakin ingin menghapus data ini?")) {

        dataPengaduan.splice(index, 1);

        localStorage.setItem(
            "dataPengaduan",
            JSON.stringify(dataPengaduan)
        );

        tampilkanPengaduan();

    }

}

// ======================================
// Pencarian
// ======================================

document.getElementById("searchPengaduan").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = document.querySelectorAll("#tbodyPengaduan tr");

    rows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(keyword)
            ? ""
            : "none";

    });

});

// ======================================
// Jalankan Saat Halaman Dibuka
// ======================================

tampilkanPengaduan();