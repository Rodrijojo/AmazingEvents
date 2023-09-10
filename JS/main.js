const eventos = data.events;

// Cards

const cardsContainer = document.getElementById("cardsContainer")

function crearCard(eventos) {
  let card = "";

  for (const evento of eventos) {
      card += `<div class="card" style="width: 18rem;">
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <img src="${evento.image}" alt="Food fair" class="card-img">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
        <div class="d-flex justify-content-around align-items-baseline gap-4">
          <p>$${evento.price}</p>
          <button type="button" class="btn btn-primary"><a href="Details.html?id=${evento._id}" class="card-link color-details">Details</a></button>                  
        </div>
      </div>
    </div>`
  }

  cardsContainer.innerHTML = card;
}

crearCard(eventos);

// Checkbox

let checkboxContainer = document.querySelector("#checkbox");

function crearCheckbox(eventos) {
  const categorias = [...new Set(eventos.map(evento => evento.category))]
  let checkbox = ""

  for (const categoria of categorias) {
    checkbox += `<div class="form-check">
                  <input class="form-check-input category_filter" type="checkbox" value="${categoria}" id="category_${categoria}">
                  <label class="form-check-label " for="category_${categoria}">
                    <p class="checkboxLabel">${categoria}</p>
                  </label>
                 </div>`
  }

  checkboxContainer.innerHTML = checkbox;
}

crearCheckbox(eventos)


//lograr mostrar por consola la categoria al apretar el checkbox
let checkboxEvent = document.getElementById("checkbox")
let checkboxCategory = document.querySelector(".checkboxLabel")

checkboxEvent.addEventListener("change", function(){
  crearCard(filtrarEventosCategoria(eventos))
})


function filtrarEventosCategoria (eventos){
  let categoryArray = []
  let checkboxes = Array.from(document.querySelectorAll(".category_filter"))

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      categoryArray.push(checkbox.value);
    } 
  })
  if(categoryArray.length === 0){
    return eventos
  }
  let arrayEventos = []
  eventos.forEach((evento) => {
    if(categoryArray.includes(evento.category)){
      arrayEventos.push(evento)
    }
  })
  return arrayEventos
}

let searchBar = document.getElementById("searchBar")
let searchButton = document.getElementById("searchButton")

//funcion que reciba eventos y filtre por nombre

let nameEventos = []
for (const evento of eventos) {
  nameEventos.push(evento.name)
}


function filtrarEventosSearch(nameEventos) {
  let arrayEventosSearch = []
  nameEventos.forEach((evento) => {
    if(evento.includes(searchBar.value))
    arrayEventosSearch.push(evento)
  })

  return arrayEventosSearch
}

function aplicarFiltros(eventos) {
  let eventosFiltradosPorCategoria = filtrarEventosCategoria(eventos);
  let nombresEventosFiltradosPorNombre = filtrarEventosSearch(nameEventos);
  
  // Realizar la intersección basada en el campo 'name'
  let eventosFiltrados = eventosFiltradosPorCategoria.filter((evento) =>
    nombresEventosFiltradosPorNombre.includes(evento.name)
  );

  return eventosFiltrados;
}

function mostrarMensaje() {
  cardsContainer.innerHTML = `<p>There are no results according to your search</p>`
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault()
  let eventosFiltrados = aplicarFiltros(eventos);
  if(eventosFiltrados.length === 0){
    mostrarMensaje();
  }
  else{
    crearCard(eventosFiltrados);
  }
  
})


// filtrarSearch me devuelve un array con nombres (string)
// filtrarCategory me devuelve un array de eventos (objetos)

//  let auxiliar = eventos.filter((evento) => categoryArray.includes(evento.category))

/* else if (!checkbox.checked && categoryArray.includes(checkbox.value)) {
  const index = categoryArray.indexOf(checkbox.value);
  categoryArray.splice(index, 1); 
*/