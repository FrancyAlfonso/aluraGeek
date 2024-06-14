const dropArea = document.querySelector("[data-drag-area]"),
dragText = dropArea.querySelector("p")

const input = document.querySelector(".agregar_imagen_boton");

let file;

//boton
input.addEventListener("change", function(){
    //seleccion varios archivos
    file = this.files[0];
    mostrarArchivo();
});

//arrastre
dropArea.addEventListener("dragover", (evento) => {
    evento.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta el archivo para cargarlo";
})

//Si se suelta fuera del area
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra para agregar una imagen";
})

//Si se carga el archivo
dropArea.addEventListener("drop", (evento) => {
    evento.preventDefault();
    file = evento.dataTransfer.files[0];
    mostrarArchivo();
})

let fileURL;
const mostrarArchivo = () => {
    let tipoArchivo = file.type;
    let validarExtensiones = ["image/jpeg", "image/jpg", "image/png"]
    if(validarExtensiones.includes(tipoArchivo)){
        let fileReader = new fileReader();
        fileReader.onload = () => {
            fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="" style="width:100%; height:100%; border-radius:5px">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file)
    }else{
        alert({
            title: 'El formato de archivo no es válido',           
        })

        dragText.textContent = "Arrastra una imagen para el producto";
    }
}