class Producto {
    constructor (nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}


class Interfaz {
    agregarProducto(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong> Nombre del producto: <strong/> ${product.nombre} - 
                <strong> Precio del producto: <strong/> ${product.precio}
                <a href="#" class="btn btn-danger mx-5" name="delete"> Borrar <a/>
            <div/>
        <div/>
        `;
        productList.appendChild(element);
    }
    resetForm(){
        document.getElementById("product-form").reset();
    }
    eliminarProducto(element) {
        if (element.name === "delete") {
            console.log(element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove());
            this.mostrarMensaje("Producto eliminado", "warning");
        }
    }
    mostrarMensaje(mensaje, cssClass) {
        const div = document.createElement("div")
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(mensaje));
        //Muestro en el DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#app");
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 5000);
    }
}

//EVENTOS DEL DOM
document.getElementById("product-form")
.addEventListener("submit", function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const product = new Producto (name, price);

    localStorage.setItem("nombre", name);
    localStorage.setItem("precio", price);

    const interfaz = new Interfaz();


    if(name === "" || price === "") {
        return interfaz.mostrarMensaje("Complete los campos del producto", "danger");
    }

    interfaz.agregarProducto(product);
    interfaz.resetForm();
    interfaz.mostrarMensaje("Producto agregado con exito", "success");

    e.preventDefault();
})

document.getElementById("product-list").addEventListener("click", function(e) {
    const interfaz = new Interfaz();
    interfaz.eliminarProducto(e.target);
})

