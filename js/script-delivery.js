document.addEventListener('DOMContentLoaded', () => {
    const estados = document.querySelectorAll('.estado');

    estados.forEach(estado => {
        estado.addEventListener('click', () => {
            // Remueve la clase 'completado' de todos los estados
            estados.forEach(est => est.classList.remove('completado'));
            
            // Añade la clase 'completado' al estado que fue clicado y a los anteriores
            const estadoClicado = estado.dataset.estado;
            
            estados.forEach(est => {
                if (parseInt(est.dataset.estado) <= parseInt(estadoClicado)) {
                    est.classList.add('completado');
                }
            });
        });
    });
});