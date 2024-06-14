const btnEnviar = document.querySelector("#enviar-login");
btnEnviar.addEventListener("click", (evento) => {
    evento.preventDefault();
    loginUsuario();
})

const loginUsuario = () => {
    const correoIngresado = document.querySelector("[data-form-usuario]").value;
    const contraseñaIngresada = document.querySelector("[data-form-contraseña]").value;
    console.log(correoIngresado);
    console.log(contraseñaIngresada);
    var user = "admin";
    var pass = "12345"

    if(correoIngresado === user && contraseñaIngresada === pass){
        alert({
            position: 'top-end',
            icon: 'success',
            title: 'Login Exitoso',
            showConfirmButton: false,
            timer: 1500
        })

        setTimeout(function(){
            window.location.href = "../screens/admin-products.html";
        }, 2000);
    }else{
        alert({
            icon:'error',
            title: 'Oops...',
            text: 'Datos incorrectos',
        })
    }
}