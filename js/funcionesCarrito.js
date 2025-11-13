import {
  guardarCarrito,
  obtenerCarrito,
  vaciarCarritoStorage,
} from "./storage.js";
import { actualizarContador, actualizarTotal, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto agregado al carrito", "success");
};

export const eliminarProducto = (indice) => {
  const carrito = obtenerCarrito();
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado", "success");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  actualizarTotal([]);
  mostrarMensaje("Carrito vaciado", "success");
};
