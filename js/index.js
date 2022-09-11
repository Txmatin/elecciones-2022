/**
 * Efecto del scroll
 */
function revelar() {
    // Efecto para que los items de la página se revelen con un efecto al scrollear
    var revelables = document.querySelectorAll(".revelar");
    revelables.forEach((revelar) => {
        var alturaVentana = window.innerHeight;
        var parteSuperiorElemento = revelar.getBoundingClientRect().top;
        var visibilidadElemento = 100;

        if (parteSuperiorElemento < alturaVentana - visibilidadElemento)
            revelar.classList.add("active");
    });

    // Efecto para modificar el 'nav' al scrollear
    var scrollY = window.scrollY;
    var contenedorHeader = document.getElementById("contenedor_header");
    var barraNavegacion = document.querySelector("header");
    if (scrollY != 0)
    {
        contenedorHeader.classList.add("contenedor_header-scrollY");
        barraNavegacion.classList.add("header_scrollY");
    }
    else
    {
        contenedorHeader.classList.remove("contenedor_header-scrollY");
        barraNavegacion.classList.remove("header_scrollY");
    }
}
window.addEventListener("scroll", revelar);



/**
 * Cuenta regresiva
 */
simplyCountdown('#cuenta', {
    // Fecha y hora en la que finalizará el contador
    year: 2022, // Año
    month: 9, // Mes 
    day: 6, // Día
    hours: 10, // Horas (de 0-23)
    minutes: 1, // Minutos (de 0-59)
    seconds: 50, // Segundos (de 0-59)

    // Palabras en el contador
    words: {
        days: { singular: 'Día', plural: 'Días' },
        hours: { singular: 'Hora', plural: 'Horas' },
        minutes: { singular: 'Minuto', plural: 'Minutos' },
        seconds: { singular: 'Segundo', plural: 'Segundos' }
    },
    plural: true,
    inline: false,
    inlineClass: 'simply-countdown-inline',

    // Otras configuraciones
    enableUtc: true, // Usar UTC para el tiempo universal coordinado
    onEnd: function () { 
        let textoVotacion = document.getElementById('texto-votacion');
        let btnVotar = document.getElementById('btn-votar');
        let textoFinVotacion = document.getElementById('texto-fin-votacion');
        let textoTitulo = document.getElementById('texto-titulo');
        textoVotacion.textContent = "¡Las votaciones han finalizado!";
        btnVotar.classList.add("inactivo");
        textoFinVotacion.classList.remove("inactivo");
        textoTitulo.textContent = "Votaciones finalizadas"

        let confetti = document.getElementById('confetti');
        confetti.classList.add('active');
     }, // Función a ejecutar cuando el contador llegue a la fecha límite programada
    refresh: 1000, // Tiempo de refresh del contador
    sectionClass: 'contador-seccion', // Clase en css para la sección del contador
    amountClass: 'contador-numero', // Clase en css para los números en el contador
    wordClass: 'contador-palabra', // Clase en css para las palabras del contador
    zeroPad: false,
    countUp: false // Activar para seguir contando luego de que haya pasado la fecha límite
});



/**
 * Mensajes emergentes
 */
function mostrarToast(id) {
    const ventana = document.getElementById(id);
    const toast = new bootstrap.Toast(ventana);
    toast.show();
}

var objetosToastSubscribir = document.getElementsByClassName("toast-votar");
for (var obj of objetosToastSubscribir) {
    obj.addEventListener('click', () => { mostrarToast('toast-subscribir') });
}



/**
 * Contacto rápido
 */
const campoEmail = document.getElementById('email');
const campoMensaje = document.getElementById('mensaje');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        let spinner = document.getElementById('spinner-mensaje');
            spinner.classList.add('mostrar');

        const serviceID = 'default_service';
        const templateID = 'template_5342z79';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                campoEmail.value = "";
                campoMensaje.value = "";
                spinner.classList.remove('mostrar');
                mostrarToast('toast-mensaje-enviado');
            }, (err) => {
                btnSubscribir.value = 'Subscribirme';
                alert("Error al realizar la operación: "+JSON.stringify(err));
            });
});

// Subscripción
const campoEmailSubscripcion = document.getElementById('email-subscripcion');
const btnSubscribir = document.getElementById('subscribir');
const btnCerrarModal = document.getElementById('cerrar-modal-subscripcion');

document.getElementById('form-subscripcion')
    .addEventListener('submit', function(event) {
        event.preventDefault();
 
        btnSubscribir.value = 'Subscribiendo...';
 
        const serviceID = 'default_service';
        const templateID = 'template_pbmurmt';
 
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                campoEmailSubscripcion.value = "";
                btnSubscribir.value = 'Subscribirme';
                btnCerrarModal.click();
                mostrarToast('toast-subscripcion-registrada');
        }, (err) => {
            btnSubscribir.value = 'Subscribirme';
            alert("Error al realizar la operación: "+JSON.stringify(err));
        });
});



/**
 * Hablitando ToolTips de bootstrap
 */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));



/**
 * Confetti
 */
var confettiSettings = { target: 'confetti' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.size = 10;
confetti.render();



/**
 * Descarga de propuestas
 */
function descargarPropuestas(lista) {
    const btnDescarga = document.createElement('a');

    if (lista === 'roja')
    {
        btnDescarga.href = '../assets/Propuestas-Lista-Roja_2022.pdf';
        btnDescarga.download = 'Propuestas-Lista-Roja_2022';
    }
    else if (lista === 'rosa')
    {
        btnDescarga.href = '../assets/Propuestas-Lista-Rosa_2022.pdf';
        btnDescarga.download = 'Propuestas-Lista-Rosa_2022';
    }
    else if (lista === 'verde')
    {
        btnDescarga.href = '../assets/Propuestas-Lista-Verde_2022.pdf';
        btnDescarga.download = 'Propuestas-Lista-Verde_2022';
    }

    btnDescarga.target = '_blank';
    document.body.appendChild(btnDescarga);
    btnDescarga.click();
    document.body.removeChild(btnDescarga);
}