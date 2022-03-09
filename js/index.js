//DONE: 1. Traer los datos de los productos de cada categoria pasando por parametro el valor de la categoria
// Podría pasarlo con el valor de cada boton con un data-category.

//DONE: 2. Buscar el producto con mayor rating o más votos para el producto destacado.

//DONE: 3. Agregar ids a un array de objetos para luego armar el carrito.

//TODO: 4. Mostrar el carrito y el valor total a pagar

const apiCategorias = [
    "electronics",
    "jewelery",
    "men's%20clothing",
    "women's%20clothing",
]

let pagina = "home"

// Secciones
const home = document.querySelectorAll("[data-pagina=home]")
const articuloDestacado = document.querySelector("#articuloDestacado")
const categorias = document.querySelector("#categorias")
const articulosCategoria = document.querySelector("#articulosCategoria")
const carrito = document.querySelector("#carrito")
const carritoLista = document.querySelector('#carritoLista')
const loading = document.querySelector("#loading")
const articuloDestacadoHero = document.querySelector(
    ".articuloDestacado__hero"
)

// Inicia la App

document.addEventListener("DOMContentLoaded", function() {
    iniciarApp()
})

function iniciarApp() {
    mostrarHomePage()

    botonesNavBar()
}

// mostrarHomePage hace cambio de pagina manejando la class 'off', con setTimeOut
// hace el fetch y trae los datos con la funcion mostrarCategorias

function mostrarHomePage() {
    loading.classList.remove("off")
    categorias.innerHTML = ""
    setTimeout(() => {
        fetch("https://fakestoreapi.com/products/14")
            .then((res) => res.json())
            .then((item) => {
                articuloDestacadoHero.style.backgroundImage = `url('${item.image}')`
                document.getElementById('aD').id = item.id
                mostrarCategorias(apiCategorias)
                loading.classList.add("off")
                articuloDestacado.classList.remove("off")
                categorias.classList.remove("off")
            })
        botonesCarrito()
    }, 3000)
}

// mostrarCategorias con el array compuesto por categorias que tiene la api
// ejecuta la funcion crearCategoria por cada item

function mostrarCategorias(apiCats) {
    apiCats.forEach((element) => {
        crearCategoria(element)
    })
}

// crearCategoria con el nombre de la categoria hace el fetch y lo agrega al innerHtml de
// la section id="categorias"

function crearCategoria(categoria) {
    const url = `https://fakestoreapi.com/products/category/${categoria}?limit=1`
    fetch(url)
        .then((res) => res.json())
        .then((res) =>
            res.map((item) => {
                const { image, category } = item
                if (category.includes("women", 0)) {
                    const textID = category.slice(0, 5)
                    const modelo = `<article><div class="categoria"><img class="categoria__img" src=${image} alt="Categoria ${category}"/></div><button class="categoria__boton" id="${textID}\'s clothing" onClick={mostrarCategoria(this.id)}>${category}</button></article>`
                    categorias.innerHTML += modelo
                } else if (category.includes("men")) {
                    const textID = category.slice(0, 3)
                    const modelo = `<article><div class="categoria"><img class="categoria__img" src=${image} alt="Categoria ${category}"/></div><button class="categoria__boton" id="${textID}\'s clothing" onClick={mostrarCategoria(this.id)}>${category}</button></article>`
                    categorias.innerHTML += modelo
                } else {
                    const modelo = `<article><div class="categoria"><img class="categoria__img" src=${image} alt="Categoria ${category}"/></div><button class="categoria__boton" id=${category} onClick={mostrarCategoria(this.id)}>${category}</button></article>`
                    categorias.innerHTML += modelo
                }
            })
        )
}

// mostrarCategoria primero vacía el innerHtml de articulosCategoria y luego hace el fetch
// con el valor de categoria que paso por parametro a su vez que hace la paginacion
// y devuelve el innerHtml de articulosCategoria con los productos con crearArticulosCategoria

function mostrarCategoria(category) {
    articulosCategoria.innerHTML = ""
    const url = `https://fakestoreapi.com/products/category/${category}`
    if(!carrito.classList.contains('off')){
        carrito.classList.add('off')
    }
    home.forEach((pagina) => {
        pagina.classList.add("off")
    })
    loading.classList.remove("off")
    setTimeout(() => {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                res.map((item) => {
                    const { id, image, title, price, description } = item
                    crearArticulosCategoria(id, image, title, price, description)
                })
                botonesCarrito()
            })
        loading.classList.add("off")
        articulosCategoria.classList.remove("off")
    }, 3000)
}

// crearArticulosCategoria arma el innerHtml de articulosCategoria

function crearArticulosCategoria(id, image, title, price, description) {
    const modelo = `<article>
    <div class="articulo">
      <img
        class="articulo__img"
        src=${image}
        alt="Categoria electronics"
      />
    </div>
    <h3 class="articulo__titulo">${title}</h3>
    <p class="articulo__precio">$${price}</p>
    <button id=${id} class="boton--comprar">
      Agregar <i class="fa-solid fa-cart-shopping white"></i>
    </button>
  </article>`
    articulosCategoria.innerHTML += modelo
}

// Agrego los addEventListener en los botones del nav con una función 

function botonesNavBar() {
    const buttons = document.querySelectorAll('.navBar__boton')
    buttons.forEach((boton) => {
        boton.addEventListener('click', e => {
            const categoria = e.target.innerHTML.toLowerCase()
            mostrarCategoria(categoria)
        })
    })
}

// TODO: Falta hacer el Modal de los productos

// CARRITO:
// Primer objetivo es un array de objetos de compras
// e ir modificando en funcion a los articulos que agrego y tambien tener
// la posibilidad de eliminarlos (para esto genero un id unico con Date.now)
// 1. Crear el array de articulos y mapearlo para agregar los items al innerHtml
// 2. Totalizar los saldos del carrito

const carritoCompras = {
    articulosId: [],
    precioTotal: 0
}
// Funcion para agregar el listener a los botones e ir agregando los id al array del carrito
function botonesCarrito() {
    const botones = document.querySelectorAll('.boton--comprar')
    if (botones) {
        botones.forEach(boton => boton.addEventListener('click', (e) => {
            const id = e.target.id
            if (id) {
                agregarCarrito(id)
                Swal.fire('Se agregó al Carrito!')
            }
        }))
    }
}
// Funcion para crear id unico y pushear el array de carrito
function agregarCarrito(id) {
    const carritoID = `${id}-${Date.now()}`
    carritoCompras.articulosId.push(carritoID)
    document.getElementById('carNumber').innerHTML = carritoCompras.articulosId.length
}

// Mostrar Carrito

const botonCarrito = document.querySelector('#carBoton').addEventListener('click', ()=>{
    mostrarCarrito(carritoCompras)
})

function mostrarCarrito(carritoCompras) {
    const {articulosId} = carritoCompras
    carritoLista.innerHTML = ''
    home.forEach((pagina) => {
        pagina.classList.add("off")
    })
    if(!categorias.classList.contains('off')){
        categorias.classList.add('off')
    }
    loading.classList.remove("off")
    setTimeout(()=>{
        articulosId.map(idCarrito=>{
            const idApi = idCarrito.split('-')
            const id = idApi[0]
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(res => res.json())
                .then((item) => {
                    const {image, title, price, description} = item
                    crearArticulosCarrito(idCarrito, image, title, price, description)
                })
        })
    },3000)
}

function crearArticulosCarrito(idCarrito, image, title, price, description) {
    //console.log(idCarrito, id, image, title, price, description)
    carritoCompras.precioTotal += parseFloat(price)
    const modelo = `<div class="carrito__lista--item">
    <div class="articulo">
      <img
        class="articulo__img"
        src=${image}
        alt="Categoria electronics"
      />
    </div>
    <div class="carrito__item--descripcion">
      <h2 class="carrito__item--titulo">${title}</h2>
      <p class="carrito__item--texto">${description}</p>
      <p class="carrito__item--label">Precio:</p>
      <p class="carrito__item--precio">$ ${price}</p>
    </div>
    <div class="carrito__botonera">
      <i class="fa-solid fa-eye carrito__botonera--eye"></i>
      <i class="fa-solid fa-trash carrito__botonera--trash data-id=${idCarrito}"></i>
    </div>
  </div>`
  console.log('precio: ' + carritoCompras.precioTotal.toFixed(2))
}
