const btnEntrar = document.getElementById("btnEntrar");

btnEntrar.addEventListener("click", () => {
    const user = document.getElementById("usernameInput").value;
    if( user != "" ){
        document.cookie = `username=${user}`;
        document.location.href = "/";
    }else{
        alert("El username es OBLIGATORIO.")
    }
})