import { crearTabla1, filtroEventosPorFecha, guardarCategory, agruparPorCategoria, acumulador, crearTabla3, acumuladorUpcoming, crearTabla2 } from "../Modules/functions.js"

// Contenedores dentro del HTML de las tablas
const primeraTabla = document.getElementById("primeraTabla")
const segundaTabla = document.getElementById("segundaTabla")
const terceraTabla = document.getElementById("terceraTabla")

// ruta de la API
const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing'

let eventos

// fetch para manejar la data de la API
fetch( URL_API )
  .then( response => response.json() )
  .then( ( data )  => {
    eventos = data.events  // almacenamos los datos de los eventos
    let currentDate = data.currentDate.split("-")
    let eventosFiltrados = filtroEventosPorFecha(eventos, currentDate)  // guardamos los eventos separados en past y upcoming
    crearTabla1(eventosFiltrados[0], primeraTabla, currentDate)
    let categoriasPast = guardarCategory(eventosFiltrados[0])
    let categoriasUpcoming = guardarCategory(eventosFiltrados[1])
    let eventosAgrupadosPast = agruparPorCategoria(eventosFiltrados[0], categoriasPast)
    let eventosAgrupadosUpcoming = agruparPorCategoria(eventosFiltrados[1], categoriasUpcoming)
    let categoriasAcumuladas = acumulador(eventosAgrupadosPast)
    crearTabla3(categoriasAcumuladas, terceraTabla)
    let categoriasAcumuladasUpcoming = acumuladorUpcoming(eventosAgrupadosUpcoming)
    crearTabla2(categoriasAcumuladasUpcoming, segundaTabla)
  })
  .catch( err => console.log(err))