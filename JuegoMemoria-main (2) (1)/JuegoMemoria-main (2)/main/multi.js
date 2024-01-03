let movimientosJugador1 = 0; // Inicializa una variable para contar los movimientos del jugador 1
let movimientosJugador2 = 0; // Inicializa una variable para contar los movimientos del jugador 2
 // 90 segundos en total (1 minuto y 30 segundos)
const elementoTimer = document.getElementById('timer');
let timerCorriendo = true;
let juegoTerminado = false; // Variable para verificar si el juego ha terminado
const totalCartas = 12; // Define la cantidad total de cartas en cada juego
let clicsHabilitados = true; // Variable para controlar si los clics están habilitados o no

function iniciarTimer() {
    const timer = setInterval(() => {
        if (timerCorriendo) {
            const minutos = Math.floor(segundosTimer / 60);
            let segundos = segundosTimer % 60;

            // Formatear los segundos para mostrarlos con dos dígitos
            segundos = segundos < 10 ? `0${segundos}` : segundos;

            elementoTimer.textContent = `${minutos}:${segundos}`;

            if (segundosTimer <= 0) {
                clearInterval(timer);
                timerCorriendo = false;
                elementoTimer.textContent = 'Tiempo agotado';
                alert('¡Tiempo agotado! El juego ha terminado.');
            } else {
                segundosTimer--;
            }
        }
    }, 1000); // Actualizar cada segundo (1000 ms)
}

function generarCartasAleatorias(jugador) {
    iniciarTimer();
    const carasCarta = ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑"];
    const tableroJuego = document.getElementById(`game-board${jugador}`);
    const valoresCarta = carasCarta.slice(0, totalCartas / 2).concat(carasCarta.slice(0, totalCartas / 2));
    valoresCarta.sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalCartas; i++) {
        const carta = document.createElement('div');
        carta.classList.add('card');
        carta.dataset.value = valoresCarta[i];
        carta.textContent = ''; // Oculta el valor de las cartas al inicio
        carta.textContent = valoresCarta[i]; // Muestra el valor de la carta en el contenido del elemento div
        tableroJuego.appendChild(carta);
        tableroJuego.appendChild(carta);
        carta.addEventListener('click', () => voltearCarta(carta, jugador));
    }

    setTimeout(() => {
        const cartas = document.querySelectorAll(`#game-board${jugador} .card`);
        cartas.forEach(carta => {
            carta.textContent = ''; // Oculta el valor de las cartas después de un tiempo
        });
    }, 3000);
}

function voltearCarta(carta, jugador) {
    if (clicsHabilitados && !carta.classList.contains('flipped')) {
        carta.classList.add('flipped');
        carta.textContent = carta.dataset.value;
        document.getElementById('flipSound').play(); // Reproduce el sonido de volteo de carta

        setTimeout(() => comprobarEmparejamiento(jugador), 500);
    }

    const cartasVolteadas = document.querySelectorAll(`#game-board${jugador} .card.flipped:not(.matched)`);
    if (cartasVolteadas.length === 2) {
        clicsHabilitados = false;
    } else {
        clicsHabilitados = true;
    }
}

function comprobarEmparejamiento(jugador) {
    const cartasVolteadas = document.querySelectorAll(`#game-board${jugador} .card.flipped:not(.matched)`);

    if (cartasVolteadas.length === 2) {
        const [primeraCarta, segundaCarta] = cartasVolteadas;

        if (primeraCarta.dataset.value === segundaCarta.dataset.value) {
            primeraCarta.classList.add('matched');
            segundaCarta.classList.add('matched');
            const sonidoEmparejamiento = document.getElementById('matchSound');
            sonidoEmparejamiento.play();
        } else {
            setTimeout(() => {
                primeraCarta.classList.remove('flipped');
                segundaCarta.classList.remove('flipped');
                primeraCarta.textContent = '';
                segundaCarta.textContent = '';
            }, 1000);
            const sonidoNoEmparejamiento = document.getElementById('noMatchSound');
            sonidoNoEmparejamiento.play();
        }

        if (jugador === 1) {
            movimientosJugador1++;
            document.getElementById('moves1').textContent = `Movimientos Jugador 1: ${movimientosJugador1}`;
        } else {
            movimientosJugador2++;
            document.getElementById('moves2').textContent = `Movimientos Jugador 2: ${movimientosJugador2}`;
        }

        const cartasEmparejadas = document.querySelectorAll(`#game-board${jugador} .card.matched`);
        if (cartasEmparejadas.length === totalCartas) {
            finalizarJuego(jugador);
        }
    }
}

function finalizarJuego(jugador) {
    if (jugador === 0) {
        // Detiene el temporizador
        alert('¡Tiempo agotado! El juego ha terminado.');
    } else {
        // Muestra un mensaje de felicitaciones al jugador diferente de 0
        alert(`¡Felicidades Jugador ${jugador}! Has completado el juego en ${jugador === 1 ? movimientosJugador1 : movimientosJugador2} movimientos.`);
    }

    movimientosJugador1 = 0; // Reinicia los movimientos del jugador 1
    movimientosJugador2 = 0;
    const tableroJuego = document.getElementById(`game-board${jugador}`);
    tableroJuego.innerHTML = '';
    generarCartasAleatorias(jugador);
}

// Obtener el botón de cambio de turno después de que se haya creado en el DOM
const botonCambiarTurno = document.getElementById('change-turn');
// Variable para seguir el turno actual
let jugadorActual = 1;
generarCartasAleatorias(1);
generarCartasAleatorias(2);

