const productosData = [
    { id: 1, nombre: "Tacos", precio: 18 },
    { id: 2, nombre: "Quesadillas", precio: 14 },
    { id: 3, nombre: "Pajitas", precio: 25 },
    { id: 4, nombre: "Enchiladas", precio: 20 },
    { id: 5, nombre: "Pollo a la diabla", precio: 30 },
    { id: 6, nombre: "Birrea", precio: 30 },
    { id: 7, nombre: "Huevos rancheros", precio: 15 },
    { id: 8, nombre: "Burritos", precio: 17 }
];

const buscador = document.getElementById("productosBuscador");
const listaResultados = document.getElementById("productosResultados");
const listaSeleccionados = document.getElementById("productosSeleccionados");

// Buscar productos en tiempo real
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    listaResultados.innerHTML = "";

    const filtrados = productosData.filter(p => p.nombre.toLowerCase().includes(texto));

    filtrados.forEach(p => {
        const li = document.createElement("li");
        li.classList.add("productos-item");
        li.innerHTML = `
            <span>${p.nombre} <span class="productos-precio">S/ ${p.precio}</span></span>
        `;
        li.dataset.id = p.id;
        li.addEventListener("click", () => agregarASeleccionados(p));
        listaResultados.appendChild(li);
    });
});

// Agregar productos a la lista seleccionada con botón eliminar
function agregarASeleccionados(producto) {
    // Evita duplicados
    if (document.querySelector(`#productosSeleccionados li[data-id="${producto.id}"]`)) return;

    const li = document.createElement("li");
    li.classList.add("productos-item");
    li.dataset.id = producto.id;
    li.innerHTML = `
        <span>${producto.nombre} <span class="productos-precio">S/ ${producto.precio}</span></span>
        <button class="productos-btn-eliminar">X</button>
    `;

    // Evento para eliminar el producto
    li.querySelector(".productos-btn-eliminar").addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
    });

    listaSeleccionados.appendChild(li);
}


// Seleccionamos el contenedor principal
const contenedorVenta = document.getElementById("tipo-venta");

// Función para manejar los checkboxes en cada grupo
function manejarGrupo(opciones) {
    opciones.forEach(opcion => {
        opcion.addEventListener("change", () => {
            if (opcion.checked) {
                // Desmarcar todos excepto el que se seleccionó
                opciones.forEach(o => {
                    if (o !== opcion) o.checked = false;
                });
            }
        });
    });
}

// Obtener checkboxes de cada grupo usando el orden en tu HTML
const opcionesVenta = contenedorVenta.querySelectorAll(
    ".venta-option:nth-of-type(-n+3) .option"
); // Primeros 3: Tipo de venta
const opcionesPago = contenedorVenta.querySelectorAll(
    ".venta-option:nth-of-type(n+4) .option"
); // Siguientes 3: Método de pago

// Aplicamos la función a cada grupo
manejarGrupo(opcionesVenta);
manejarGrupo(opcionesPago);