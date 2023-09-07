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
          <button type="button" class="btn btn-primary"><a href="Details.html#Details1" class="card-link color-details">Details</a></button>                  
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
  console.log(categorias)
  let checkbox = ""

  for (const categoria of categorias) {
    checkbox += `<div class="form-check">
                  <input class="form-check-input category_filter" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    <p>${categoria}</p>
                  </label>
                 </div>`
  }

  checkboxContainer.innerHTML = checkbox;
}

crearCheckbox(eventos)

/*
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".categoty_filter");

});
*/