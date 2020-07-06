const btnUplaod = document.getElementById('btnUplaod');
const inputFilePauta = document.getElementById('inputFilePauta');

inputFilePauta.addEventListener('input', () => {
    btnUplaod.disabled = false;
});

btnUplaod.disabled = true;