// ==========================================
// DATA BANTUAN (LOCAL STORAGE)
// ==========================================

// Ambil data dari Local Storage
let dataBantuan = JSON.parse(localStorage.getItem("dataBantuan")) || [];

// Menyimpan indeks data yang sedang diedit
let editIndex = -1;

// ==========================================
// MENAMPILKAN DATA KE TABEL
// ==========================================
function tampilkanData(keyword = "") {

    const tbody = document.getElementById("tbodyBantuan");
    tbody.innerHTML = "";

    dataBantuan
.filter(item =>
    item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
    item.nik.includes(keyword)
)
.forEach((item, index) => {

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.nik}</td>
                <td>${item.jenis}</td>
                <td>${item.status}</td>
                <td>

    <button
        class="btn btn-warning btn-sm me-1"
        onclick="editData(${index})">

        <i class="bi bi-pencil"></i>

    </button>

    <button
        class="btn btn-danger btn-sm"
        onclick="hapusData(${index})">

        <i class="bi bi-trash"></i>

    </button>

</td>
            </tr>
        `;

    });

}

// ==========================================
// EDIT DATA
// ==========================================
function editData(index) {

    editIndex = index;

    document.getElementById("nama").value = dataBantuan[index].nama;
    document.getElementById("nik").value = dataBantuan[index].nik;
    document.getElementById("jenis").value = dataBantuan[index].jenis;
    document.getElementById("status").value = dataBantuan[index].status;

    const modal = new bootstrap.Modal(document.getElementById("modalTambah"));
    modal.show();

}

// ==========================================
// HAPUS DATA
// ==========================================
function hapusData(index){

    if(confirm("Yakin ingin menghapus data ini?")){

        dataBantuan.splice(index,1);

        localStorage.setItem(
            "dataBantuan",
            JSON.stringify(dataBantuan)
        );

        tampilkanData();

    }

}

// ==========================================
// SIMPAN DATA
// ==========================================
function simpanData() {

    const nama = document.getElementById("nama").value.trim();
    const nik = document.getElementById("nik").value.trim();
    const jenis = document.getElementById("jenis").value;
    const status = document.getElementById("status").value;

    // Validasi
    if (nama === "" || nik === "") {

        alert("Nama dan NIK wajib diisi!");

        return;

    }

    // Jika tambah data
    if (editIndex === -1) {

        dataBantuan.push({
            nama,
            nik,
            jenis,
            status
        });

    } else {

        // Jika edit data
        dataBantuan[editIndex] = {
            nama,
            nik,
            jenis,
            status
        };

        editIndex = -1;

    }

    // Simpan ke Local Storage
    localStorage.setItem("dataBantuan", JSON.stringify(dataBantuan));

    // Refresh tabel
    tampilkanData();

    // Reset form
    document.getElementById("nama").value = "";
    document.getElementById("nik").value = "";
    document.getElementById("jenis").selectedIndex = 0;
    document.getElementById("status").selectedIndex = 0;

    // Tutup modal
    const modalElement = document.getElementById("modalTambah");
    const modal = bootstrap.Modal.getInstance(modalElement);

    if (modal) {
        modal.hide();
    }

}

// ==========================================
// TAMPILKAN DATA SAAT HALAMAN DIBUKA
// ==========================================

// ===============================
// PENCARIAN
// ===============================
document.getElementById("searchInput").addEventListener("keyup", function () {

    tampilkanData(this.value);

});

tampilkanData();