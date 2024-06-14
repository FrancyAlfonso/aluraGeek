import { clientServices } from "../js/client.service.js";
import { mostrarProductos } from "./mostrar.productos.controller.js;"

//Capturando la seccion de albumes
const albumes = document.querySelector("[data-albumes]");
//Capturando la sección de lightsticks
const lightsticks = document.querySelector("[data-lightsticks]");
//Capturando la sección de photocards
const photocards = document.querySelector("[data-photocards]");

//JASON
clientServices.listaProductos().then(data => {
    data.forEach(({ nombre, precio, descripcion, imagen, id, categoria }) => {
        //Imprimir datos en el Index
        if (categoria === "albumes") {
            const nuevoProducto = mostrarProductos(nombre, precio, descripcion, imagen, id, categoria);
            albumes.appendChild(nuevoProducto);
        } else if (categoria === "lightsticks") {
            const nuevoProducto = mostrarProductos(nombre, precio, descripcion, imagen, id, categoria);
            lightsticks.appendChild(nuevoProducto);
        } else if (categoria === "photocards") {
            const nuevoProducto = mostrarProductos(nombre, precio, descripcion, imagen, id, categoria);
            lightsticks.appendChild(nuevoProducto);
        }
    });
})