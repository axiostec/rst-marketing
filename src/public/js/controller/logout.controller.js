// variables

// eventos

// funciones
function cerrarSesion(){
    const cerrar = confirm('¿Estas seguro de cerrar tu sesión?');
    if(cerrar){
        window.location  = '/logout';
    } 
}