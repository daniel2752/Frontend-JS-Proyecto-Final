export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
};

export const mostrarMensaje = (texto, tipo = "success") => {
  Swal.fire({
    icon: tipo,
    title: texto,
    showConfirmButton: false,
    timer: 2000,
    position: "top",
    toast: false,
    background: "#fff",
  });
};

export const actualizarTotal = (carrito) => {
  const totalCarrito = document.getElementById("total-carrito");
  if (!totalCarrito) return; // si no existe el elemento, no hace nada

  // Calcular el total sumando los precios utilizando el método reduce()
  const total = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0
  );

  // Mostrar el total solo si es distinto de 0
  if (total > 0) {
    totalCarrito.textContent = `Total a pagar: $${total}`;
    totalCarrito.style.display = "inline"; // lo mostramos por si estaba oculto
  } else {
    totalCarrito.style.display = "none"; // lo ocultamos si el carrito está vacío
  }
};
