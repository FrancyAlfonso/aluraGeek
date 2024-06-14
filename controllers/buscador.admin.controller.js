import { clientServices} from "../services/client-service.js";
import { adminController} from "../controllers/admin.controller.js";

//Nueva búsqueda
const productos = document.querySelector("[data-productos-admin]");
const buscador = document.querySelector("[data-buscador]");
const tituloBusqueda = document.querySelector("[data-titulo-busqueda]");
let resultadoNuevaBusqueda = 0;

//pagina de resultados
buscador.addEventListener("keypress", evento => {
    let texto = evento.target.value;
    if (evento.key === 'Enter') {
      texto = texto.toLowerCase();
      buscador.value = "";
      const limpiarContenido = ``;
      productos.innerHTML = limpiarContenido;

      clientServices.listaProductos().then(data => {
        data.forEach(({nombre, precio, descripcion, imagen, id, categoria}) => {
            const nombreProducto = nombre.toLowerCase();
            const validar = nombreProducto.includes(texto);

            if(validar){
                const mostrarProductoBuscado = adminController.mostrarProductosAdmin(nombre, precio, descripcion, imagen, id, categoria);
                productos.appendChild(mostrarProductoBuscado);
                resultadoNuevaBusqueda++;
            }
            if (resultadoNuevaBusqueda > 0) {
                const tituloProductoExistente = `
                <h1 class="productos_head_titulo_principal">Resultado de la búsqueda</h1>
                `
                tituloBusqueda.innerHTML = tituloProductoExistente;
            }else if (resultadoNuevaBusqueda <= 0){
                const textoInformativo = `
                <h1 class="productos_resultados_mensaje">No se encontraron resultados</h2>
                `
                tituloBusqueda.innerHTML = textoInformativo
            }
        })
      })
    }
})