const URL_API = 'https://www.google.com/url?q=https://mindhub-xj03.onrender.com/api/amazing&sa=D&source=editors&ust=1694558996105135&usg=AOvVaw1ws9TssKAJAvuLH7tEPQih'

const eventos = data.events;

import { crearCard, crearCheckbox, filtrarEventosCategoria, filtrarEventosSearch, aplicarFiltros, mostrarMensaje } from '../Modules/functions.js';

// Cards

const cardsContainer = document.getElementById("cardsContainer")

crearCard(eventos, cardsContainer);

// Checkbox

let checkboxContainer = document.querySelector("#checkbox");

crearCheckbox(eventos, checkboxContainer)

// filtro por checkbox

let checkboxEvent = document.getElementById("checkbox")
//let checkboxCategory = document.querySelector(".checkboxLabel")
let categoryFilter = ".category_filter"

checkboxEvent.addEventListener("change", function(){
  crearCard(filtrarEventosCategoria(eventos, categoryFilter), cardsContainer)
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
    crearCard(eventosFiltrados, cardsContainer);
  }
})