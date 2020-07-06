const player = document.getElementById('reproductor');
const contPautas = document.getElementById('contPautas');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Pautas = {
    getPautas: async () => {
        const listPautas = await fetch('/get/pautas');
        const infoPautas = await listPautas.json();
        if(infoPautas){
            return infoPautas;
        } else {
            return false;
        }
    },
    renderPautas: async () => {
        const pautas = await Pautas.getPautas();
        let listaPautas = '';
        if(pautas){
            contPautas.innerHTML = '';
            pautas.forEach( pauta => {
                listaPautas += `
                    <div class="w-100 d-flex justify-content-around align-items-center border p-2 shadow-sm mb-2" style="border-radius: 10px;">
                        <div class="btn btnAzulClaro d-flex justify-content-center align-items-center" style="width:50px; height: 50px; border-radius: 10px;">
                            <img src="./img/megaphone.png" class="img-fluid">
                        </div>
                        <div style="width: 200px; font-size: .7em;" class="text-center">
                            <p class="m-0">${pauta.nombre}</p>
                            <p class="m-0">${new Date(pauta.fecha).toLocaleDateString('es-CO',options)}</p>
                            <p class="m-0">${pauta.fecha.split('T')[1].split('.')[0]}</p>
                        </div>
                        <div class="d-flex">
                            <a href="/delete/${pauta.id}" class="btn mr-2"><i style="color: var(--AZUL);" class="fas fa-trash fa-2x"></i></a>
                            <button class="btn"><i style="color: var(--AZUL);" class="fas fa-play fa-2x"></i></button>
                        </div>
                    </div>
                `;
            });
            contPautas.innerHTML = listaPautas;
        } else {
            contPautas.innerHTML = '';
            contPautas.innerHTML = `<p>No hay pautas publicitarias en el servidor</p>`;
            console.log('No hay pautas que renderizar');
        }
    }
}

const Reproductor = {
    addSource: (srcPlay) => {
        console.log(srcPlay);
        if(srcPlay){
            player.src = `/play/pauta/${srcPlay[0].id}`;
            player.play();
        }
    }
}

async function addSourceMusic(){
    const src = await Pautas.getPautas();
    Reproductor.addSource(src);
}

Pautas.renderPautas();
addSourceMusic();