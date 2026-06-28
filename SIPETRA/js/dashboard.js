// ===============================
// Dashboard Dinamis SIPETRA
// ===============================

// Ambil data bantuan
const dataBantuan = JSON.parse(localStorage.getItem("dataBantuan")) || [];

// Ambil data pengaduan
const dataPengaduan = JSON.parse(localStorage.getItem("dataPengaduan")) || [];

// Hitung data
const totalBantuan = dataBantuan.length;

const totalDiproses = dataBantuan.filter(item => item.status === "Diproses").length;

const totalSelesai = dataBantuan.filter(item => item.status === "Selesai").length;

const totalPengaduan = dataPengaduan.length;

// Tampilkan ke Card
document.getElementById("totalBantuan").textContent = totalBantuan;
document.getElementById("totalDiproses").textContent = totalDiproses;
document.getElementById("totalSelesai").textContent = totalSelesai;
document.getElementById("totalPengaduan").textContent = totalPengaduan;

// ===============================
// Grafik
// ===============================

const ctx = document.getElementById("chartBantuan");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Diproses", "Selesai"],
        datasets: [{
            label: "Jumlah Bantuan",
            data: [totalDiproses, totalSelesai],
            backgroundColor: [
                "#ffc107",
                "#198754"
            ],
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    }
});

// ===============================
// Tanggal Otomatis
// ===============================

const hariIni = new Date();

document.getElementById("tanggal").textContent =
hariIni.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
});