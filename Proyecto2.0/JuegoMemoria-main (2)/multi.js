let movimientosJugador1 = 0;
let movimientosJugador2 = 0;
const elementoTimer = document.getElementById('timer');
let timerCorriendo = true;
let juegoTerminado = false;
const totalCartas = 12;
let clicsHabilitados = true;
let segundosTimer = 90; // Agregar esta línea para definir la variable segundosTimer
let jugadorActual = 1;

const imagenesJugador1 = [
    'valo/1.jpg',
    'valo/2.jpg',
    'valo/3.jpg',
    'valo/4.jpg',
    'valo/5.jpg',
    'valo/6.jpg',
    'valo/7.jpg',
    'valo/8.jpg',
    'valo/1.jpg',
    'valo/2.jpg',
    'valo/3.jpg',
    'valo/4.jpg'
];
const imagenesJugador2 = [
    'valo/1.jpg',
    'valo/2.jpg',
    'valo/3.jpg',
    'valo/4.jpg',
    'valo/5.jpg',
    'valo/6.jpg',
    'valo/7.jpg',
    'valo/8.jpg',
    'valo/1.jpg',
    'valo/2.jpg',
    'valo/3.jpg',
    'valo/4.jpg'
];
function generarCartasAleatorias(jugador) {
    const gameBoard = document.getElementById(jugador === 1 ? 'game-board1' : 'game-board2');
    gameBoard.innerHTML = ''; // Limpiar el tablero antes de generar nuevas cartas

    const totalCards = 12;
    const imagenes = (jugador === 1) ? imagenesJugador1 : imagenesJugador2;

    if (imagenes.length < totalCards / 2) {
        console.error('No hay suficientes imágenes para mostrar un tablero de 12 cartas');
        return;
    }

    const selectedImages = imagenes.slice(0, totalCards / 2);
    const cardValues = selectedImages.concat(selectedImages);
    cardValues.sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValues[i];
    
        const img = new Image();
        img.src = cardValues[i];
        img.classList.add('card-image');
        img.style.maxWidth = '100%'; // Establecer el tamaño máximo para las imágenes
        img.style.maxHeight = '100%'; // Establecer el tamaño máximo para las imágenes
        card.appendChild(img);
    
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card); // Agregar la carta al tablero
    }
}
   setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.textContent = '';
            card.classList.remove('flipped');
            card.addEventListener('click', () => flipCard(card));
        });
    }, 3000);

let selectedCards = [];
let clicksEnabled = true;
let flippedCards = [];

function flipCard(card) {
    if (clicksEnabled && !card.classList.contains('flipped') && flippedCards.length < 2) {
        card.classList.add('flipped');
        const img = document.createElement('img');
        img.src = card.dataset.value;
        img.classList.add('card-image');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        card.innerHTML = '';
        card.appendChild(img);
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            clicksEnabled = false;
            setTimeout(() => checkMatch(), 100);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
    } else {
        setTimeout(() => {
            hideCards([firstCard, secondCard]);
        }, 10);
    }

    // Incrementar movimientos del jugador correspondiente
    if (jugadorActual === 1) {
        movimientosJugador1++;
        document.getElementById('moves1').textContent = `Movimientos Jugador 1: ${movimientosJugador1}`;
    } else if (jugadorActual === 2) {
        movimientosJugador2++;
        document.getElementById('moves2').textContent = `Movimientos Jugador 2: ${movimientosJugador2}`;
    }

    flippedCards = [];
    clicksEnabled = true;

    checkEndGame();
}


function resetSelectedCards() {
    selectedCards = []; // Reinicia el arreglo de cartas seleccionadas
}
function hideCards(cards) {
    cards.forEach(card => {
        setTimeout(() => {
            card.classList.remove('flipped');
            card.innerHTML = '';
        }, 1000);
    });
}
function checkEndGame() {
    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === totalCartas) {
        finalizarJuego(jugadorActual);
    } else {
        // Cambiar al siguiente jugador
        jugadorActual = (jugadorActual === 1) ? 2 : 1;
    }
}
function finalizarJuego(jugadorGanador) {
    juegoTerminado = true;
    timerCorriendo = false; // Detener el temporizador si es necesario

    // Obtener los movimientos del jugador ganador
    let movimientosGanador;
    if (jugadorGanador === 1) {
        movimientosGanador = movimientosJugador1;
        alert(`¡Jugador 1 ha ganado!\nMovimientos realizados: ${movimientosGanador}`);
    } else if (jugadorGanador === 2) {
        movimientosGanador = movimientosJugador2;
        alert(`¡Jugador 2 ha ganado!\nMovimientos realizados: ${movimientosGanador}`);
    } else {
    
        alert("¡Juego terminado!");
    }
}

generarCartasAleatorias(1);
generarCartasAleatorias(2);