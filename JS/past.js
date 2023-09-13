const eventos = data.events;

import { crearCheckbox, filtrarEventosCategoria, filtrarEventosSearch, aplicarFiltros, mostrarMensaje, crearCardPast} from '../Modules/functions.js';

// Cards
let currentDate = data.currentDate;
currentDate = currentDate.split("-");

const cardsContainer = document.getElementById("cardsContainer")

crearCardPast(eventos, cardsContainer, currentDate)

// Checkbox

let checkboxContainer = document.querySelector("#checkbox");

crearCheckbox(eventos, checkboxContainer)

// filtro por checkbox

let checkboxEvent = document.getElementById("checkbox")
//let checkboxCategory = document.querySelector(".checkboxLabel")
let categoryFilter = ".category_filter"

checkboxEvent.addEventListener("change", function(){
  crearCardPast(filtrarEventosCategoria(eventos, categoryFilter), cardsContainer, currentDate)
})

// filtro por search bar y cruzado

let searchBar = document.getElementById("searchBar")
let searchButton = document.getElementById("searchButton")


let nameEventos = []
for (const evento of eventos) {
  nameEventos.push(evento.name)
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault()
  let eventosFiltrados = aplicarFiltros(eventos, categoryFilter, nameEventos, searchBar);
  if(eventosFiltrados.length === 0){
    mostrarMensaje();
  }
  else{
    crearCardPast(eventosFiltrados, cardsContainer, currentDate);
  }
})