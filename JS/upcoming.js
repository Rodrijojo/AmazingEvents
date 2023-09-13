const eventos = data.events;

import { crearCardUpcoming, crearCheckbox, filtrarEventosCategoria, filtrarEventosSearch, aplicarFiltros, mostrarMensaje } from '../Modules/functions.js';

// Cards

var currentDate = data.currentDate;
currentDate = currentDate.split("-");

const cardsContainer = document.getElementById("cardsContainer")

crearCardUpcoming(eventos, cardsContainer, currentDate)

// Checkbox

let checkboxContainer = document.querySelector("#checkbox");

crearCheckbox(eventos, checkboxContainer)

let checkboxEvent = document.getElementById("checkbox")
let checkboxCategory = document.querySelector(".checkboxLabel")
let categoryFilter = ".category_filter"

checkboxEvent.addEventListener("change", function(){
  crearCardUpcoming(filtrarEventosCategoria(eventos, categoryFilter), cardsContainer, currentDate)
})

let searchBar = document.getElementById("searchBar")
let searchButton = document.getElementById("searchButton")

//funcion que reciba eventos y filtre por nombre

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
    crearCardUpcoming(eventosFiltrados, cardsContainer, currentDate);
  }
})