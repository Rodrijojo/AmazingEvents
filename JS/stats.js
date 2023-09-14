import { crearTabla1, filtroEventosPorFecha, guardarCategory, agruparPorCategoria, acumulador, crearTabla3, acumuladorUpcoming, crearTabla2 } from "../Modules/functions.js"


const primeraTabla = document.getElementById("primeraTabla")
const segundaTabla = document.getElementById("segundaTabla")
const terceraTabla = document.getElementById("terceraTabla")

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing'

let eventos
fetch( URL_API )
  .then( response => response.json() )
  .then( ( data )  => {
    eventos = data.events
    let currentDate = data.currentDate.split("-")
    crearTabla1(filtroEventosPorFecha(eventos, currentDate)[0], primeraTabla, currentDate)
    let eventosFiltrados = filtroEventosPorFecha(eventos, currentDate)
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