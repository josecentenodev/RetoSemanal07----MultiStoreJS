//DONE: 1. Traer los datos de los productos de cada categoria pasando por parametro el valor de la categoria
// Podría pasarlo con el valor de cada boton con un data-category.

// 2. Buscar el producto con mayor rating o más votos para el producto destacado.

// 3. Agregar items a un array de objetos para luego armar el carrito.

// 4. Mostrar el carrito y el valor total a pagar

// Buscar una manera de controlar la paginación mediante una función. Ya que hay que hacer más de un fetch.

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
const loading = document.querySelector("#loading")
const articuloDestacadoHero = document.querySelector(
  ".articuloDestacado__hero"
)

// Inicia la App

document.addEventListener("DOMContentLoaded", function () {
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
        mostrarCategorias(apiCategorias)
        loading.classList.add("off")
        articuloDestacado.classList.remove("off")
        categorias.classList.remove("off")
      })
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
  home.forEach((pagina) => {
    pagina.classList.add("off")
  })
  loading.classList.remove("off")
  setTimeout(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) =>
        res.map((item) => {
          const { id, image, title, price, description } = item
          crearArticulosCategoria(id, image, title, price, description)
        })
      )
    loading.classList.add("off")
    articulosCategoria.classList.remove("off")
  }, 3000)
}

// crearArticulosCategoria arma el innerHtml de articulosCategoria

function crearArticulosCategoria(id, image, title, price, description) {
  console.log(id, image, title, price, description)
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

}