import { clientServices } from "../services/client-service.js";
import { mostrarProductos } from "./mostrar.productos.controller.js";

const resultados = document.querySelector("[data-productos-busqueda]");
const tituloBusqueda = document.querySelector("[data-titulo-busqueda]");

const mostrarResultado = async () => {
    const url = new URL(Window.location);
    const nombreBuscado = url.searchParams.get("texto");

    if (nombreBuscado === null) {
        console.log("Ocurrió un error al buscar el producto");
    }
    const nombreBuscar = nombreBuscado.toLowerCase();

    let cantidadResultados = 0;

    clientServices.listaProductos().then(data => {
        data.forEach(({ nombre, precio, descripción, imagen, id, categoria }) => {
            const nombreProducto = nombre.toLowerCase();
            const nombreCategoria = categoria.toLowerCase();
            const validar = nombreProducto.includes(nombreBuscar);
            const validarCategoria = nombreCategoria.includes(nombreBuscado);

            if (validar || validarCategoria) {
                const mostrarResultado = mostrarProductos(nombre, precio, descripción, imagen, id, categoria);
                resultados.appendChild(mostrarResultado);
                cantidadResultados++;
            }
        });

        if (cantidadResultados == 0) {
            const textoInformativo = `
            <h2 class="productos_resultados_mensaje">No se encontraron resultados para esta busqueda</h2>
            `
            tituloBusqueda.innerHTML = textoInformativo;
        }
    }).catch(error => alert("Ocurrió un error en el producto buscado"));
}
mostrarResultado();

const buscador = document.querySelector("[data-buscador]");
let nuevaBusqueda = 0;

buscador.addEventListener("keypress", evento => {
    let texto = evento.target.value;
    if (evento.key === 'Enter') {
        texto = texto.toLowerCase();
        buscador.value = "";
        const limpiarContenido = ``;
        resultados.innerHTML = limpiarContenido;

        clientServices.listaProductos().then(data => {
            data.forEach(({ nombre, precio, descripción, imagen, id, categoria }) => {
                const nombreProducto = nombre.toLowerCase();
                const validar = nombreProducto.includes(texto);

                if (validar) {
                    const mostrarProductoBuscado = mostrarProductos(nombre, precio, descripción, imagen, id, categoria);
                    resultados.appendChild(mostrarProductoBuscado);
                    nuevaBusqueda++;
                }
                if (nuevaBusqueda > 0) {
                    const productoExistente = `
                    <h1 class="productos_head_titulo-principal">Resultados de la busqueda</h1>
                    `
                    tituloBusqueda.innerHTML = productoExistente;
                } else if (nuevaBusqueda <= 0) {
                    const textoInformativo = `
                     <h2 class="productos_resultados_mensaje">No se encontraron resultados</h2>
                    `
                    tituloBusqueda.innerHTML = textoInformativo;
                }
            });
        });
    }
});