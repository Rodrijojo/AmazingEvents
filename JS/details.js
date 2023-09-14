import {crearDetails} from "../Modules/functions.js"

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing'
let parametro = location.search
let params = new URLSearchParams(parametro)
let idDetail = params.get("id")
let eventos

fetch( URL_API )
  .then( response => response.json() )
  .then( ( data )  => {
    let currentDate = data.currentDate;
    currentDate = currentDate.split("-");
    eventos = data.events
    crearDetails(eventos, currentDate, idDetail);
  })
  .catch( err => console.log(err))