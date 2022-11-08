const main = document.querySelector('main');
let contador = [];

const obtenerImagenes = () => [
    {imgSrc: './css/img/camera.jpg', name:'camera'},
    {imgSrc: './css/img/case.jpg', name:'case'},
    {imgSrc: './css/img/cd.jpg', name:'cd'},
    {imgSrc: './css/img/cpu.jpg', name:'cpu'},
    {imgSrc: './css/img/keyboard.jpg', name:'keyboard'},
    {imgSrc: './css/img/mouse.jpg', name:'mouse'},
    {imgSrc: './css/img/printer.jpg', name:'printer'},
    {imgSrc: './css/img/usb.jpg', name:'usb'},
    {imgSrc: './css/img/camera.jpg', name:'camera'},
    {imgSrc: './css/img/case.jpg', name:'case'},
    {imgSrc: './css/img/cd.jpg', name:'cd'},
    {imgSrc: './css/img/cpu.jpg', name:'cpu'},
    {imgSrc: './css/img/keyboard.jpg', name:'keyboard'},
    {imgSrc: './css/img/mouse.jpg', name:'mouse'},
    {imgSrc: './css/img/printer.jpg', name:'printer'},
    {imgSrc: './css/img/usb.jpg', name:'usb'}
];

const aleatorio = () => {
    const datosTarjeta = obtenerImagenes();
    datosTarjeta.sort(() => Math.random() - 0.5);

    return datosTarjeta;
};

const crearTarjeta = () => {
    const datosTarjeta = aleatorio();

    datosTarjeta.forEach(tarjeta => {

        const tarjetaHTML = document.createElement('div');
        const frente = document.createElement('img');
        const trasero = document.createElement('div');

        tarjetaHTML.classList = 'tarjetaHTML';
        frente.classList = 'frente';
        trasero.classList = 'trasero';

        frente.setAttribute('src', tarjeta.imgSrc);
        tarjetaHTML.setAttribute('name', tarjeta.name);

        tarjetaHTML.appendChild(frente);
        tarjetaHTML.appendChild(trasero);
        main.append(tarjetaHTML);

        tarjetaHTML.addEventListener('click', (e) => {

                tarjetaHTML.classList.toggle('switchTarjeta');
                checkearTarjeta(e);

        });
    });
}

const checkearTarjeta = (e) => {
    
    const tarjetaSelec = e.target;
    tarjetaSelec.classList.add('volteada');

    const tarjetasVolt = document.querySelectorAll('.volteada');
    
    if(tarjetasVolt.length === 2) {
        if(
            tarjetasVolt[0].getAttribute('name') ===
            tarjetasVolt[1].getAttribute('name')
            ) {
            tarjetasVolt.forEach(tarjetaVolt => {
                tarjetaVolt.classList.remove('volteada');
                tarjetaVolt.style.pointerEvents = 'none';
                contador.push(tarjetaVolt.getAttribute('name'));
            });
        } else {
            tarjetasVolt.forEach(tarjetaVolt => {
                tarjetaVolt.classList.remove('volteada');
                setTimeout(() => {
                    tarjetaVolt.classList.remove('switchTarjeta');
                }, 1000);
            });
        }
        if(contador.length === 16) {
            reiniciarJuego();
        }
    }
}

const reiniciarJuego = () => {
    setTimeout(() => {
        alert('Ganaste!... El juego se reiniciará...');        
        let datosTarjeta = aleatorio();
        let tarjetas = document.querySelectorAll('.tarjetaHTML');
        datosTarjeta.forEach((tarjeta, index) => {
            tarjetas[index].classList.remove('switchTarjeta');
            tarjetas[index].style.removeProperty('pointer-events');
        });
        contador = [];
    },500)
}

crearTarjeta();
