// Variables globales
let pizzas = [];
let carrito = [];

// Función para mostrar mensajes UX
function mostrarMensajeUX(mensaje, esError = false) {
    const mensajeElemento = document.getElementById("mensaje-ux");
    mensajeElemento.textContent = mensaje;
    mensajeElemento.style.color = esError ? 'red' : 'green';
    mensajeElemento.style.display = 'block';
}

// Cargar las pizzas desde el archivo JSON
async function cargarPizzas() {
    try {
        const response = await fetch('pizzas.json');
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo de pizzas.");
        }
        pizzas = await response.json();
        mostrarPizzas();
    } catch (error) {
        mostrarMensajeUX(error.message, true);
    }
}

// Mostrar las pizzas en el menú
function mostrarPizzas() {
    const contenedorPizzas = document.getElementById("tarjetas-pizza");
    pizzas.forEach((pizza) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.innerHTML = `
            <h3>${pizza.nombre}</h3>
            <p>Precio: $${pizza.precio}</p>
            <button onclick="agregarAlCarrito(${pizza.id})">Agregar al Carrito</button>
        `;
        contenedorPizzas.appendChild(tarjeta);
    });
}

// Agregar pizza al carrito
function agregarAlCarrito(id) {
    try {
        const pizza = pizzas.find((pizza) => pizza.id === id);
        if (!pizza) {
            throw new Error("Pizza no encontrada.");
        }
        carrito.push(pizza);
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
        mostrarMensajeUX("Pizza agregada al carrito correctamente.");
    } catch (error) {
        mostrarMensajeUX(error.message, true);
    }
}

// Eliminar pizza del carrito
function eliminarDelCarrito(index) {
    try {
        if (index < 0 || index >= carrito.length) {
            throw new Error("Índice de carrito inválido.");
        }
        carrito.splice(index, 1);
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
        mostrarMensajeUX("Pizza eliminada del carrito.");
    } catch (error) {
        mostrarMensajeUX(error.message, true);
    }
}

// Actualizar el carrito de compras
function actualizarCarrito() {
    const itemsCarrito = document.getElementById("items-carrito");
    const precioTotal = document.getElementById("precio-total");
    itemsCarrito.innerHTML = "";

    let total = 0;
    carrito.forEach((pizza, index) => {
        total += pizza.precio;  // Sumamos el precio de las pizzas directamente
        const item = document.createElement("div");
        item.innerHTML = `
            <p>${pizza.nombre} - $${pizza.precio} <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>
        `;
        itemsCarrito.appendChild(item);
    });

    // Mostramos el total sin impuestos adicionales
    precioTotal.textContent = total.toFixed(2); // Total directamente como la suma de los precios
}

// Guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Finalizar compra
document.getElementById("boton-finalizar").addEventListener("click", () => {
    try {
        if (carrito.length === 0) {
            throw new Error("El carrito está vacío.");
        }
        const precioTotal = document.getElementById("precio-total").textContent;
        mostrarMensajeUX(`Compra finalizada. Total a pagar: $${precioTotal}`, false);
        carrito = [];  // Vaciar carrito
        actualizarCarrito();  // Actualizar la interfaz
        guardarCarritoEnLocalStorage();  // Guardar carrito vacío
    } catch (error) {
        mostrarMensajeUX(error.message, true);
    }
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    cargarPizzas();
    cargarCarritoDesdeLocalStorage();
});

