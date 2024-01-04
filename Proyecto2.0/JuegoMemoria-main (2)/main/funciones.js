//variables globales
const d = document;
const sonidoP = document.getElementById('sonidoP');
let imagenes = [
    {
        "nombre": "gato02",
        "url": "imagenes/gatos02.jpg"
    },
    {
        "nombre": "gato01",
        "url": "imagenes/gato01.jpg"
    },
    {
        "nombre": "gato03",
        "url": "imagenes/gato03.jpg"
    },
    {
        "nombre": "gato04",
        "url": "imagenes/gatoR.jpg"
    },
    {
        "nombre": "gato05",
        "url": "imagenes/gatos05.jpg"
    },
    {
        "nombre": "gato06",
        "url": "imagenes/gato06.jpg"
    },
    {
        "nombre": "gato02",
        "url": "imagenes/gatos02.jpg"
    },
    {
        "nombre": "gato01",
        "url": "imagenes/gato01.jpg"
    },
    {
        "nombre": "gato03",
        "url": "imagenes/gato03.jpg"
    },
    {
        "nombre": "gato04",
        "url": "imagenes/gatoR.jpg"
    },
    {
        "nombre": "gato05",
        "url": "imagenes/gatos05.jpg"
    },
    {
        "nombre": "gato06",
        "url": "imagenes/gato06.jpg"
    }
];
let tablero = d.querySelector(".tablero");
let nombreImg = [];
let posImg = [];
let aciertos = 0;
let intentos = 0;
let tiempo = 60;


let mostrarAciertos = d.querySelector(".aciertos");
let mostrarIntentos = d.querySelector(".intentos");
let mostrarTiempo = d.querySelector(".tiempo");
let mostrarNiveles = d.querySelector(".nivel");
mostrarTiempo.textContent = tiempo;
let btnIniciar = d.querySelector(".boton-iniciar");
let juegoActivo = false;
let nivel = 1;
let tiempoTrancurrido;
let soundLoser = new Audio("sonido/loser.mp3");

//desorganizar imagenes
imagenes.sort(() => Math.random() - 0.5);

//iniciar juego
const sonidoF = document.getElementById('sonidoF');
btnIniciar.addEventListener("click", function () {
    sonidoF.play()
    const nombreJugador = d.getElementById("nombreJugador").value;
    if (juegoActivo == false && nivel == 1 && nombreJugador.trim() !== "") {
        juegoActivo = true;
        agregarImagenes();
        tiempoDeJuego();
    } else if (juegoActivo == false && nivel == 2 && nombreJugador.trim() !== "") {
        juegoActivo = true;
        agregarImagenes();
        tiempoDeJuego();
    } else if (juegoActivo == false && nivel == 3 && nombreJugador.trim() !== "") {
        juegoActivo = true;
        agregarImagenes();
        tiempoDeJuego();
    } else {
        sonidoE.play();
        alert("Ingresa un nombre de jugador válido.");
    }
});

//tiempo del juego
function tiempoDeJuego() {
    tiempoTrancurrido = setInterval(function () {
        tiempo--;
        mostrarNiveles.textContent = nivel;
        mostrarTiempo.textContent = tiempo;
        if (tiempo == 10) {
            //clearInterval(tiempoTrancurrido);
            mostrarTiempo.setAttribute(
                "style",
                "color:red; font-size:20px"
            );
        } else if (tiempo == 0) {
            sonidoP.play();
            clearInterval(tiempoTrancurrido);
            alert("Perdiste :( No adivinaste todas las imágenes");
            location.reload();
        }
    }, 1000);
}

//agregar imágenes al tablero
function agregarImagenes() {
    for (let x = 0; x < imagenes.length; x++) {
        let div = d.createElement("div");
        let img = d.createElement("img");
        div.setAttribute("class", "col-3");
        img.setAttribute("src", "imagenes/fondo00.gif");
        img.setAttribute("class", "img-fluid altoimg");
        img.setAttribute("id", x);
        img.addEventListener("click", mostrarImagenes);
        div.appendChild(img);
        tablero.appendChild(div);
    }
}

//función para mostrar las imágenes
function mostrarImagenes() {
    //guardar ID de la imagen
    let imgID = this.getAttribute("id");
    //alert("posImagen :"+imgID)
    this.setAttribute("src", imagenes[imgID].url);
    //guardando el nombre y id de la imagen
    nombreImg.push(imagenes[imgID].nombre);
    posImg.push(imgID);
    //alert(nombreImg[0]+" "+posImg[0]);
    //ejecutar la función comparar imágenes
    if (nombreImg.length == 2) {
        setTimeout(comparaImg, 300);
    };
};

//función para comparar las imágenes
const sonidoB = document.getElementById('sonidoB');
function comparaImg() {
    let todasImg = d.querySelectorAll(".tablero .col-3 img");
    //comparar imágenes
    if (nombreImg[0] == nombreImg[1]) {
        if (posImg[0] != posImg[1]) {
            sonidoB.play()
            todasImg[posImg[0]].setAttribute("src", "imagenes/gatook.jpg");
            todasImg[posImg[1]].setAttribute("src", "imagenes/gatook.jpg");
            todasImg[posImg[0]].removeEventListener("click", mostrarImagenes);
            todasImg[posImg[1]].removeEventListener("click", mostrarImagenes);
            aciertos++;
            mostrarAciertos.textContent = aciertos;
            const nombreJugador = document.getElementById("nombreJugador").value;
            guardarDatosEnLocalStorage(nombreJugador, tiempo, intentos);
        } else {
            const sonidoE = document.getElementById('sonidoE');
            sonidoE.play();
            //alert("Debes escoger otra imagen");
            todasImg[posImg[0]].setAttribute(
                "src",
                "imagenes/fondo00.gif"
            );
            intentos++;
            mostrarIntentos.textContent = intentos;
        }
    } else {
        todasImg[posImg[0]].setAttribute("src", "imagenes/fondo00.gif");
        todasImg[posImg[1]].setAttribute("src", "imagenes/fondo00.gif");
        intentos++;
        mostrarIntentos.textContent = intentos;
    }
    nombreImg = [];
    posImg = [];

    //Lógica para pasar de niveles
    const sonidoG = document.getElementById('sonidoG');
    if (aciertos == 6) {
        sonidoG.play();
        alert("🌟Felicidades, has ganado el juego🌟");
        aciertos = 0;
        intentos = 0;
        clearInterval(tiempoTrancurrido);
        tiempo = 45; // Puedes ajustar el tiempo según tus preferencias
        nivel = 1;
        mostrarNiveles.textContent = nivel;
        mostrarIntentos.textContent = intentos;
        mostrarAciertos.textContent = aciertos;
        mostrarTiempo.textContent = tiempo;
        quitarImagenes();
        juegoActivo = false;
    }
    
}

//quitar imágenes del tablero
function quitarImagenes() {
    let todasLasImg = d.querySelectorAll(".tablero div");
    for (let i = 0; i < todasLasImg.length; i++) {
        todasLasImg[i].remove();
    }
}

// función para guardar datos del jugador en el localStorage
function guardarDatosEnLocalStorage(nombre, tiempo, intentos) {
    // Obtener los datos existentes del localStorage
    let datosGuardados = JSON.parse(localStorage.getItem("datosJugadores")) || [];

    // Buscar si ya existe un registro para el jugador
    const jugadorExistente = datosGuardados.find((jugador) => jugador.nombre === nombre);

    if (jugadorExistente) {
        // Si el jugador ya existe, actualizar sus datos
        jugadorExistente.tiempo = tiempo;
        jugadorExistente.intentos = intentos;
    } else {
        // Si el jugador no existe, agregar un nuevo registro
        const jugador = {
            nombre: nombre,
            tiempo: tiempo,
            intentos: intentos,
        };
        datosGuardados.push(jugador);
    }

    // Guardar la lista actualizada en el localStorage después de convertirla en una cadena JSON
    localStorage.setItem("datosJugadores", JSON.stringify(datosGuardados));
}

d.addEventListener("DOMContentLoaded", function () {
    mostrarTablaEstadisticas();
});

// función para mostrar la tabla de estadísticas desde el localStorage
function mostrarTablaEstadisticas() {
    const datosJugadores = JSON.parse(localStorage.getItem("datosJugadores")) || [];
    const tablaEstadisticas = d.getElementById("tablaEstadisticas");
    tablaEstadisticas.innerHTML = ""; // Limpiar la tabla

    // Crear un objeto para mantener un registro de los jugadores únicos
    const jugadoresUnicos = {};

    // Filtrar y mostrar los datos únicos de los jugadores
    datosJugadores.forEach((jugador, index) => {
        if (!jugadoresUnicos[jugador.nombre]) {
            jugadoresUnicos[jugador.nombre] = true;
            const fila = d.createElement("tr");
            fila.innerHTML = `<td>${index + 1}</td><td>${jugador.nombre}</td><td>${jugador.tiempo}</td><td>${jugador.intentos}</td>`;
            tablaEstadisticas.appendChild(fila);
        };
    });
    datosJugadores.forEach((jugador) => {
        agregarBotonEliminar(jugador);
    });
};
/*
// Función para crear botón de eliminación por cada participante
function agregarBotonEliminar(jugador) {
    const tablaEstadisticas = d.getElementById("tablaEstadisticas");
    const fila = d.createElement("tr");

    // Celdas para los datos del jugador
    const celdaNombre = d.createElement("td");
    const celdaTiempo = d.createElement("td");
    const celdaIntentos = d.createElement("td");

    // Añadir los datos del jugador a las celdas correspondientes
    celdaNombre.textContent = jugador.nombre;
    celdaTiempo.textContent = jugador.tiempo;
    celdaIntentos.textContent = jugador.intentos;

    // Crear la celda para el botón de eliminación
    const celdaBoton = d.createElement("td");

    // Crear el botón de eliminación
    const botonEliminar = d.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", function() {
        eliminarDatosJugador(jugador.nombre);
        tablaEstadisticas.removeChild(fila);
    });

    // Insertar el botón en su celda correspondiente
    celdaBoton.appendChild(botonEliminar);

    // Agregar las celdas a la fila de la tabla en el orden deseado
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaTiempo);
    fila.appendChild(celdaIntentos);
    fila.appendChild(celdaBoton); // Aquí se añade la celda con el botón

    tablaEstadisticas.appendChild(fila);
}


// Función para eliminar los datos de un jugador del localStorage
function eliminarDatosJugador(nombre) {
    let datosGuardados = JSON.parse(localStorage.getItem("datosJugadores")) || [];
    datosGuardados = datosGuardados.filter((jugador) => jugador.nombre !== nombre);
    localStorage.setItem("datosJugadores", JSON.stringify(datosGuardados));
};

d.addEventListener("DOMContentLoaded", function () {
    mostrarTablaEstadisticas(); // Llama a la función para mostrar la tabla al cargar la página
});*/


