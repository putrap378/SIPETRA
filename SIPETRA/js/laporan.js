const bantuan =
JSON.parse(localStorage.getItem("dataBantuan")) || [];

const pengaduan =
JSON.parse(localStorage.getItem("dataPengaduan")) || [];

const total = bantuan.length;

const diproses =
bantuan.filter(x=>x.status=="Diproses").length;

const selesai =
bantuan.filter(x=>x.status=="Selesai").length;

const totalPengaduan =
pengaduan.length;

document.getElementById("lapTotal").innerHTML=total;
document.getElementById("lapDiproses").innerHTML=diproses;
document.getElementById("lapSelesai").innerHTML=selesai;
document.getElementById("lapPengaduan").innerHTML=totalPengaduan;

document.getElementById("tb1").innerHTML=total;
document.getElementById("tb2").innerHTML=diproses;
document.getElementById("tb3").innerHTML=selesai;
document.getElementById("tb4").innerHTML=totalPengaduan;