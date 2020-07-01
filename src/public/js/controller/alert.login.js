// variables

// eventos
window.addEventListener('load', () => {
    obtenerUrl();
})
// funciones 

function obtenerUrl(){
    if(window.location.search  === '?err=err'){
        history.pushState(null, "", "/");
        alert('Contraseña Incorrecta');
    }
    if(window.location.search  === '?err=500'){
        history.pushState(null, "", "/");
        alert('Error Desconocido');
    }
}