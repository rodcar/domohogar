document.addEventListener("DOMContentLoaded", function () {
    //document.getElementById("formulario").addEventListener('submit', validarFormulario);
});

function validarFormulario() {
    //evento.preventDefault();
    var nombre = document.getElementById("nombre").value;
    if (nombre.length == 0) {
        alert('Por favor ingrese su nombre');
        return false;
    }

    var apellido = document.getElementById("apellido").value;
    if (apellido.length == 0) {
        alert('Por favor ingrese su apellido');
        return false;
    }

    var telefono = document.getElementById("telefono").value;
    if (telefono.length == 0) {
        alert('Por favor ingrese su teléfono');
        return false;
    }

    var correo = document.getElementById("correo").value;
    if (correo.length == 0) {
        alert('Por favor ingrese su correo');
        return false;
    }

    var comentario = document.getElementById("comentario").value;
    if (comentario.length == 0) {
        alert('Por favor ingrese un comentario');
        return false;
    }

    return true;
}