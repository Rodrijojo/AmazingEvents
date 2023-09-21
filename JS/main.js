import { crearCard, crearCheckbox, filtrarEventosCategoria, filtrarEventosSearch, aplicarFiltros, mostrarMensaje } from '../Modules/functions.js';

const cardsContainer = document.getElementById("cardsContainer")
const checkboxContainer = document.querySelector("#checkbox")
const checkboxEvent = document.getElementById("checkbox")
const categoryFilter = ".category_filter"
const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("searchButton")


const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing'

let eventos
fetch( URL_API )
  .then( response => response.json() )
  .then( ( data )  => {
    eventos = data.events
    let nameEventos = []
    for (const evento of eventos) {
      nameEventos.push(evento.name)
    }
    // Cards

    crearCard(eventos, cardsContainer);

    // Checkbox

    crearCheckbox(eventos, checkboxContainer)
    // filtro por checkbox

    checkboxEvent.addEventListener("change", function(){
      crearCard(filtrarEventosCategoria(eventos, categoryFilter), cardsContainer)
    })

    // filtro por search bar y cruzado

    searchButton.addEventListener("click", function (event) {
      event.preventDefault()
      let eventosFiltrados = aplicarFiltros(eventos, categoryFilter, nameEventos, searchBar);
      if(eventosFiltrados.length === 0){
        mostrarMensaje();
      }
      else{
        crearCard(eventosFiltrados, cardsContainer);
      }
    })
  })
  .catch( err => console.log(err))