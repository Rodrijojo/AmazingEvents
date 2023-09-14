import { crearCardUpcoming, crearCheckbox, filtrarEventosCategoria, filtrarEventosSearch, aplicarFiltros, mostrarMensaje } from '../Modules/functions.js';

const cardsContainer = document.getElementById("cardsContainer")
const checkboxContainer = document.querySelector("#checkbox");
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
        console.log(data.events)
        let nameEventos = []
        for (const evento of eventos) {
        nameEventos.push(evento.name)
        }
        let currentDate = data.currentDate;
        currentDate = currentDate.split("-");
        crearCardUpcoming(eventos, cardsContainer, currentDate)
        crearCheckbox(eventos, checkboxContainer)
        checkboxEvent.addEventListener("change", function(){
        crearCardUpcoming(filtrarEventosCategoria(eventos, categoryFilter), cardsContainer, currentDate)
        })
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
    })
    .catch( err => console.log(err))

