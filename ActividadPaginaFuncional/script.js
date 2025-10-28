console.log(document);

const nodo = document.getElementById("container");
nodo.addEventListener("click", () => {
    console.log("Hiciste clic");
    const nodoHijo = document.createElement("p");
    nodoHijo.classList.add("text");
    nodoHijo.innerText = "Hola, soy un texto agregado desde JavaScript";
    nodoHijo.id = "Hola"
    nodo.appendChild(nodoHijo);
})

const btn = document.getElementById("boton");
btn.addEventListener("click", () => {
    btn.classList.contains("green")
    if (btn.classList.contains("green")) {
        btn.classList.remove("green")
        btn.classList.add("red")
    } else {
        btn.classList.remove("red")
        btn.classList.add("green")
    }
})

function addItem(event) {
    event.preventDefault();
    console.log(event);
    const value = event.target['info'];
    console.log(value.value);
    const nodo = document.getElementById("info");
    nodo.addEventListener("click", () => {
        const nodoHijo = document.createElement("p");
        nodoHijo.classList.add("text");
        nodoHijo.innerText = console.log(info);
        nodoHijo.id = "informacion"
        nodo.appendChild(nodoHijo);
    })
}