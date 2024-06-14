import {clientServices} from "../services/client-service.js";

const productos = document.querySelector("[data-productos-admin]");

//Creación card
const MostrarProductosAdmin = (nombre, precio, descripcion, imagen, id, categoria) => {

    const cardProducto = document.createElement("div");
    cardProducto.className = "producto_card";
    const contenido = `
    <div class="producto_card_imagen" style="background-image: url(${imagen})">
        <a class="boton_eliminar" id="${id}" href="#"><img src="../assets/imagenes/eliminar_boton.jpg" alt="boton eliminar"></a>
        <a class="boton_editar" href=""../screens/editar.producto.html?id=${id}"><img src="../assets/imagenes/boton_editar.png" alt="boton editar"></a>
    </div>
    <h3 class="producto_card_titulo">${nombre}</h3>
    <p class="producto_card_precio">${precio}</p>
    <p class="producto_card_titulo"></p>
    `
    cardProducto.innerHTML = contenido;

    const botonEliminar = cardProducto.querySelector(".boton_eliminar");

    botonEliminar.addEventListener("click", () => {
        const id= botonEliminar.id;
        alert({
            title: 'Estás seguro?',
            text: '¿Quieres eliminar: ${nombre} ?',
            icon: 'question',
            showCancelButton: true, 
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                clientServices.eliminarProducto(id).then(respuesta => {
                    console.log(respuesta);
                }).catch(error => alert("Ocurrió un error al momento de eliminar"))
                alert({
                    position: 'center',
                    icon: 'success',
                    title: 'El producto ha sido eliminado',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function(){
                    const limpiarContenido = ``;
                    productos.innerHTML = limpiarContenido;
                    imprimirProductos();
                }, 1700);
            }
        })
    })
}

const productosAdmin = document.querySelector("[data-productos-admin]");

const imprimirProductos = () => {
    //datos traidos del JSON
    clientServices.listaProductos().then(data => {
        data.forEach(({nombre, precio, descripcion, imagen, id, categoria}) => {
            const nuevoProducto = MostrarProductosAdmin(nombre, precio, descripcion, imagen, id, categoria);
            productosAdmin.appendChild(nuevoProducto);
        });
    }).catch(error => alert("ocurrio un error"));
}
imprimirProductos();

export const adminController = {
    MostrarProductosAdmin
}