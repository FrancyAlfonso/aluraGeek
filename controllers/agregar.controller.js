import { clientServices } from "../services/client-service.js";

const formulario = document.querySelector("[data-form-registro]");
formulario.addEventListener("submit", (eventoSubmit) => {
    eventoSubmit.preventDefault();
    const nombre = document.querySelector("[data-form-producto-nombre]").value;
    const precio = document.querySelector("[data-form-producto-precio]").value;
    const categoria = document.querySelector("[data-form-producto-categoria]").value;
    const descripción = document.querySelector("[data-form-producto-descripción").value;

    const nombreVaciar = document.querySelector("[data-form-producto-nombre]");
    const precioVaciar = document.querySelector("[data-form-producto-precio");
    const categoriaVaciar = document.querySelector("[data-form-producto-descripcion]");
    const descripciónVaciar = document.querySelector("[data-form-producto-descripción]");
    const areaDrag = document.querySelector("[data-drag-area]")
    const contenidoDrag = `
    <img class="imagen_drop_img" src="../assets/imagenes/imagen_logo.jpg" alt="agregar imagen">
    <img class="imagen_drop_img_mobile" src="../assets/imagenes/imagen_logo_mobile.jpg" alt="agregar imagen">
     <p class="imagen_drop_texto">Agrega una imagen</p>
    `

    //Crear el producto
    clientServices
    .crearProducto(nombre, precio, fileURL, categoria, descripción)
    .then(() => {
        console.log("envío exitoso");
        nombreVaciar.value = "";
        precioVaciar.value = "";
        categoriaVaciar.value = "";
        descripciónVaciar.value = "";
        areaDrag.classList.remove("active");
        areaDrag.innerHTML = contenidoDrag;
        alert('Producto creado')

    }).catch((err) => console.log(err));
})