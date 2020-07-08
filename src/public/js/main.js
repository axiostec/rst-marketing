const player = document.getElementById("reproductor");
const contPautas = document.getElementById("contPautas");
const renderizadorTiempo = document.getElementById("mostrarTiempo");
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

let IntervaloTiempo;
let minutos = 1;
let contadorPautas = 0;
let tiempoPautas = minutos * 1000;
let pautasAleatoria = [];
let volumen = 0.7;

document.querySelectorAll(".controlSonido")[0].disabled = true;
document.querySelectorAll(".controlSonido")[1].disabled = true;

const Pautas = {
  getPautas: async () => {
    const listPautas = await fetch("/get/pautas");
    const infoPautas = await listPautas.json();
    if (infoPautas) {
      return infoPautas;
    } else {
      return false;
    }
  },
  renderPautas: async () => {
    const pautas = await Pautas.getPautas();
    let listaPautas = "";
    if (pautas) {
      contPautas.innerHTML = "";
      pautas.forEach((pauta) => {
        listaPautas += `
                    <div class="w-100 d-flex justify-content-around align-items-center border p-2 shadow-sm mb-2" style="border-radius: 10px;">
                        <div class="btn btnAzulClaro d-flex justify-content-center align-items-center" style="width:50px; height: 50px; border-radius: 10px;">
                            <img src="./img/megaphone.png" class="img-fluid">
                        </div>
                        <div style="width: 200px; font-size: .7em;" class="text-center">
                            <p class="m-0">${pauta.nombre}</p>
                            <p class="m-0">${new Date(
                              pauta.fecha
                            ).toLocaleDateString("es-CO", options)}</p>
                            <p class="m-0">${
                              pauta.fecha.split("T")[1].split(".")[0]
                            }</p>
                        </div>
                        <div class="d-flex">
                            <a href="/delete/${
                              pauta.id
                            }" class="btn mr-2 d-flex align-items-center"><i style="color: var(--AZUL);" class="fas fa-trash fa-1x"></i></a>
                            <button class="btn" onclick="detenerMusica()"><i style="color: var(--AZUL);" class="fas fa-pause fa-2x"></i></button>
                            <button class="btn" onclick="solicitarPauta('${
                              pauta.id
                            }')"><i style="color: var(--AZUL);" class="fas fa-play fa-2x"></i></button>
                        </div>
                    </div>
                `;
      });
      contPautas.innerHTML = listaPautas;
    } else {
      contPautas.innerHTML = "";
      contPautas.innerHTML = `<p>No hay pautas publicitarias en el servidor</p>`;
    }
  },
};

player.addEventListener('ended', () => {
  volumen = 1;
});

async function solicitarPauta(id) {
  volumen = 0.5;
  const cancion = await fetch(`/play/pauta/${id}`);
  player.src = cancion.url;
  player.play();
}

function detenerMusica() {
  player.pause();
}

async function listaAleatoriaPautas() {
  // traer todas las pautas publicitarias;
  const pautas = await fetch("/get/pautas");
  const lista = await pautas.json();

  // array para guardar lista aleatoria aleatoria
  let sonidosPautas = [];

  // guardar id de pautas
  lista.forEach((pauta) => {
    sonidosPautas.push(pauta.id);
  });

  // generar lista aleatoria
  sonidosPautas = sonidosPautas.sort(function () {
    return Math.random() - 0.5;
  });

  pautasAleatoria = sonidosPautas;

  return pautasAleatoria;
}

async function reproductorAll() {
  document.querySelectorAll(".controlSonido")[0].disabled = false;
  document.querySelectorAll(".controlSonido")[1].disabled = false;
  renderTiempo();
  console.log(pautasAleatoria.length);
  if (pautasAleatoria.length) {
    console.log(pautasAleatoria);
    solicitarPauta(pautasAleatoria[0]);
  } else {
    console.log("se acabaron las pautas traiga mas");
    await listaAleatoriaPautas();
  }
  console.log("Pautas Aleatorias Orden");
  console.log(pautasAleatoria);
  pautasAleatoria.shift();
}

async function modTiempo(control) {
  switch (control) {
    case "mas":
      document.querySelectorAll(".controlSonido")[0].disabled = true;
      document.querySelectorAll(".controlSonido")[1].disabled = true;
      const modificarMas = await fetch(`/config/tiempo/${control}`);
      await renderTiempo();
      document.querySelectorAll(".controlSonido")[0].disabled = false;
      document.querySelectorAll(".controlSonido")[1].disabled = false;
      break;
    case "menos":
      document.querySelectorAll(".controlSonido")[0].disabled = true;
      document.querySelectorAll(".controlSonido")[1].disabled = true;
      const modificarMenos = await fetch(`/config/tiempo/${control}`);
      await renderTiempo();
      document.querySelectorAll(".controlSonido")[0].disabled = false;
      document.querySelectorAll(".controlSonido")[1].disabled = false;
      break;
    default:
      break;
  }
}

async function renderTiempo() {
  clearInterval(IntervaloTiempo);
  const tiempo = await fetch("/obtener/tiempo");
  const config = await tiempo.json();
  minutos = config;
  renderizadorTiempo.innerText = minutos + " min";
  // modificar tiempo de intervalo entre sonidos
  IntervaloTiempo = setInterval(executeInterval, minutos * 60000);
}

async function executeInterval() {
  reproductorAll();
}

listaAleatoriaPautas();
Pautas.renderPautas();

/* spotify */

window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQBFVIpfopuCdavsIxmMhX4qAyKycdmyUo37i753MVCei0xOAf--QHg_r5MMbUp5zqPwPzVIy4Y9it3A_AelTOMJGVAQxMNo8Axxteu5QKRaHddrWe2eSp2t8fmlGWyBtUbIfWP1yDXCbJUgOShg3EaTlmmNwWOps9E_yYJMkTUQmm_Ad_8';
  const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
  });

  player.setVolume(volumen).then(() => {
      console.log('Volume updated!');
  });

  // Connect to the player!
  player.connect();

};

