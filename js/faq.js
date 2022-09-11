/**
 * Toast's
 */
 function mostrarToast(id) {
    const ventana = document.getElementById(id);
    const toast = new bootstrap.Toast(ventana);
    toast.show();
}


/**
 * Subscripcion
 */
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