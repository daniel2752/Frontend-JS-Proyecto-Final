// Voy a crear todo lo que tenía en el index.html de la clase 6 desde el index.js

import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// Agrego el DOMContentLoaded para que espere a cargar todo antes de ejecutar cualquier comando
document.addEventListener("DOMContentLoaded", () => {
  // Creo el header principal
  let headerPagina = document.createElement("header"); // creo un contenedor donde van a aparecer todas mis tarjetas
  headerPagina.classList.add("header");

  // Logo
  let tituloPagina = document.createElement("p");
  tituloPagina.classList.add("header__logo");

  let tituloHeader = document.createElement("a");
  tituloHeader.href = "./index.html";
  tituloHeader.textContent = "Biblioteca Mía";

  // uno el <a> dentro del <p>
  tituloPagina.appendChild(tituloHeader);

  // Nav
  let nav = document.createElement("nav");
  nav.classList.add("header__nav");

  // Lista principal
  let lista = document.createElement("ul");

  // item Home
  let liHome = document.createElement("li");
  let linkHome = document.createElement("a");
  linkHome.href = "./index.html";
  linkHome.textContent = "HOME";
  liHome.appendChild(linkHome);

  // item Contacto
  let liContacto = document.createElement("li");
  let linkContacto = document.createElement("a");
  linkContacto.href = "./pages/contacto.html";
  linkContacto.textContent = "CONTACTO";
  liContacto.appendChild(linkContacto);

  // item Carrito
  let liCarrito = document.createElement("li");
  let linkCarrito = document.createElement("a");
  linkCarrito.classList.add("carrito-icono");
  linkCarrito.href = "./pages/carrito.html";
  // Agrego el emoji del carrito
  linkCarrito.textContent = "🛒 ";
  // Creo el contador utilizando span para que quede independiente del texto
  let spanContador = document.createElement("span");
  spanContador.id = "contador-carrito";
  spanContador.textContent = "0";

  // Inserto el contador dentro del enlace
  linkCarrito.appendChild(spanContador);
  // Inserto el enlace dentro del <li>
  liCarrito.appendChild(linkCarrito);

  // Agrego los li a la lista
  lista.appendChild(liHome);
  lista.appendChild(liContacto);
  lista.appendChild(liCarrito);

  //Agrego la lista al nav
  nav.appendChild(lista);

  //Agrego logo y nav al header
  headerPagina.appendChild(tituloPagina);
  headerPagina.appendChild(nav);

  // finalmente lo agrego al <body>
  document.body.appendChild(headerPagina);

  /* ---------------------------------------------- */
  /*                  HOME                          */
  /* ---------------------------------------------- */

  let mainContainer = document.createElement("main");
  let h1 = document.createElement("h1");
  h1.textContent = "Bienvenidos a Biblioteca Mía";
  mainContainer.appendChild(h1);

  // Parrafo
  let parrafo = document.createElement("p");
  parrafo.classList.add("parrafo-home");
  parrafo.textContent = "El lugar donde podes encontrar el libro que necesites";
  mainContainer.appendChild(parrafo);

  let section = document.createElement("section");
  section.classList.add("productos-home");

  let h2 = document.createElement("h2");
  h2.textContent = "Algunos de nuestros libros destacados";

  section.appendChild(h2);
  mainContainer.appendChild(section);

  let divTarjetas = document.createElement("div"); // creo un contenedor donde van a aparecer todas mis tarjetas
  divTarjetas.classList.add("contenedor-tarjetas"); // creo una clase que definiré en el CSS

  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  // Traigo los productos desde el archivo json
  fetch("./data/productos.json")
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(`Error HTTP status: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then((data) => {
      // Recorro el array de productos
      data.forEach((producto) => {
        // Creo el article
        let tarjetaProducto = document.createElement("article");
        tarjetaProducto.classList.add("tarjeta-producto");

        // Le agrego la imagen
        let img = document.createElement("img");
        img.src = `./${producto.img}`;

        // Creo el Titulo
        let tituloProducto = document.createElement("h3");
        tituloProducto.textContent = producto.nombre;

        // Creo el precio
        let precioProducto = document.createElement("p");
        precioProducto.textContent = `Precio: $${producto.precio}`;

        // Agrego el botón
        let boton = document.createElement("button");
        boton.classList.add("btn");
        boton.textContent = "Agregar";
        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        tarjetaProducto.appendChild(img);
        tarjetaProducto.appendChild(tituloProducto);
        tarjetaProducto.appendChild(precioProducto);
        tarjetaProducto.appendChild(boton);

        divTarjetas.appendChild(tarjetaProducto);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  mainContainer.appendChild(divTarjetas);
  document.body.appendChild(mainContainer);
  /* ---------------------------------------------- */
  /*                  Footer                        */
  /* ---------------------------------------------- */
  let footer = document.createElement("footer");
  footer.classList.add("footer");

  // Párrafo con texto + ícono + año
  let p = document.createElement("p");
  p.textContent = "Página diseñada por DK diseños ";

  let iconoCopy = document.createElement("i");
  iconoCopy.classList.add("fa-regular", "fa-copyright");

  p.appendChild(iconoCopy);
  p.append(" 2025");
  footer.appendChild(p);

  // NAV con redes sociales
  let navFooter = document.createElement("nav");
  let ulFooter = document.createElement("ul");

  // Lista de íconos
  const redes = ["instagram", "tiktok", "twitter"];

  redes.forEach((red) => {
    let li = document.createElement("li");
    let icon = document.createElement("i");
    icon.classList.add("fa-brands", `fa-${red}`);
    li.appendChild(icon);
    ulFooter.appendChild(li);
  });

  navFooter.appendChild(ulFooter);
  footer.appendChild(navFooter);
  document.body.appendChild(footer);
});
