document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    if(username==="admin" && password==="admin123"){

        alert("Login Berhasil");

        window.location.href="dashboard.html";

    }

    else{

        alert("Username atau Password salah");

    }

});