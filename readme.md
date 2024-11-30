# Pizzería Web

## Descripción
Esta aplicación web simula un sistema de pedidos de pizzas. Los usuarios pueden agregar pizzas al carrito, ver el total de su compra y finalizarla. La aplicación utiliza un archivo JSON como backend para cargar las opciones de pizza disponibles.

## Funcionalidades
- Mostrar un menú con opciones de pizzas.
- Agregar y eliminar pizzas del carrito de compras.
- Calcular el total de la compra con impuestos.
- Mostrar mensajes UX amigables para el usuario (sin mensajes de consola o alertas).
- Usar almacenamiento local (`localStorage`) para mantener el carrito entre recargas de página.

## Requisitos
- Una librería externa (usamos Lodash para manipular datos).
- Control de errores mediante `try-catch-finally`.
- Utilización de un archivo JSON como base de datos para las pizzas.

## Cómo usar
1. Visita la página principal.
2. Agrega las pizzas al carrito usando los botones "Agregar al Carrito".
3. Revisa tu carrito y el total de la compra.
4. Haz clic en "Finalizar Compra" para ver el resumen.

## Tecnologías utilizadas
- HTML, CSS, JavaScript.
- JSON como backend.
- Lodash (librería externa).
