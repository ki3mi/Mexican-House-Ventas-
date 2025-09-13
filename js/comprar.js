const btnCompletar = document.getElementById("btnCompletar");
const modal = document.getElementById("modalBoleta");
const cerrarModal = modal.querySelector(".cerrar-modal");
const btnCerrar = modal.querySelector(".btn-cerrar");
const detalleBoleta = document.getElementById("detalleBoleta");

btnCompletar.addEventListener("click", () => {
    // Obtener datos del cliente
    const clienteInputs = document.querySelectorAll(".cliente .input-text");
    const nombre = clienteInputs[0].value;
    const telefono = clienteInputs[1].value;
    const dni = clienteInputs[2].value;

    // Obtener productos seleccionados
    const productosSeleccionados = document.querySelectorAll("#productosSeleccionados li");
    let productos = [];
    productosSeleccionados.forEach(item => {
        productos.push(item.innerText.replace("X","").trim());
    });

    // Tipo de venta
    const tipoVenta = document.querySelector("#tipo-venta .venta-option input.option:checked")?.previousElementSibling.innerText;

    // Método de pago
    const metodoPago = document.querySelectorAll("#tipo-venta .venta-option input.option:checked")[1]?.previousElementSibling.innerText || "Efectivo";

    // Crear contenido de la boleta
    let html = `
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>DNI:</strong> ${dni}</p>
        <p><strong>Tipo de Venta:</strong> ${tipoVenta}</p>
        <p><strong>Método de Pago:</strong> ${metodoPago}</p>
        <h3>Productos</h3>
        <ul style="text-align:left;">
    `;
    productos.forEach(p => {
        html += `<li>${p}</li>`;
    });
    html += `</ul>`;

    // Si es delivery, agregamos el botón extra
    if (tipoVenta === "Delívery") {
        html += `
            <button id="btnDelivery" class="btn-delivery">Ir a página de envío</button>
        `;
    }

    detalleBoleta.innerHTML = html;
    modal.style.display = "flex";

    // Agregamos el evento del botón solo si existe
    const btnDelivery = document.getElementById("btnDelivery");
    if (btnDelivery) {
        btnDelivery.addEventListener("click", () => {
            // Aquí colocas la URL donde quieres redirigir
            window.location.href = "delivery.html"; 
        });
    }
});

// Cerrar modal
cerrarModal.addEventListener("click", () => modal.style.display = "none");
btnCerrar.addEventListener("click", () => modal.style.display = "none");

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});
