export function crearCard(eventos, container) {
    let card = "";
  
    for (const evento of eventos) {
        card += `<div class="card" style="width: 18rem;">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <div class="card-height d-flex flex-column justify-content-center align-items-center">
            <img src="${evento.image}" alt="Food fair" class="card-img">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
          </div>
          <div class="d-flex justify-content-around align-items-baseline gap-4">
            <p>$${evento.price}</p>
            <button type="button" class="btn btn-primary"><a href="Details.html?id=${evento._id}" class="card-link color-details">Details</a></button>                  
          </div>
        </div>
      </div>`
    }
  
    container.innerHTML = card;
}

export function crearCheckbox(eventos, container) {
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

  container.innerHTML = checkbox;
}

export function filtrarEventosCategoria (eventos, classCategoria){
    let categoryArray = []
    let checkboxes = Array.from(document.querySelectorAll(classCategoria))
  
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

export function filtrarEventosSearch(nameEventos, searchBar) {
    let arrayEventosSearch = []
    nameEventos.forEach((evento) => {
      if(evento.includes(searchBar.value))
      arrayEventosSearch.push(evento)
    })
  
    return arrayEventosSearch
}

export function aplicarFiltros(eventos, classCategoria, nameEventos, searchBar) {
    let eventosFiltradosPorCategoria = filtrarEventosCategoria(eventos, classCategoria);
    let nombresEventosFiltradosPorNombre = filtrarEventosSearch(nameEventos, searchBar);
    
    let eventosFiltrados = eventosFiltradosPorCategoria.filter((evento) =>
      nombresEventosFiltradosPorNombre.includes(evento.name)
    );
  
    return eventosFiltrados;
}
  
export function mostrarMensaje() {
    cardsContainer.innerHTML = `<p>There are no results according to your search</p>`
}

export function compararFecha(fecha, currentDate) {
    let fechaSplit = fecha.split("-");
    for (let i = 0; i < 3; i++) {
        if (parseInt(currentDate[i]) < parseInt(fechaSplit[i])) {
            return "mayor";
        } else if (parseInt(currentDate[i]) > parseInt(fechaSplit[i])) {
            return "menor";
        }
    }
    return "igual";
}

export function crearCardPast(eventos, container, currentDate) {
    let card = "";
    for (const evento of eventos) {
        if(compararFecha(evento.date, currentDate) == "menor"){
            card += `<div class="card" style="width: 18rem;">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <div class="card-height d-flex flex-column justify-content-center align-items-center">
                                <img src="${evento.image}" alt="Food fair" class="card-img">
                                <h5 class="card-title">${evento.name}</h5>
                                <p class="card-text">${evento.description}</p>
                            </div>
                            <div class="d-flex justify-content-around align-items-baseline gap-4">
                                <p>$${evento.price}</p>
                                <button type="button" class="btn btn-primary"><a href="Details.html?id=${evento._id}" class="card-link color-details">Details</a></button>                  
                            </div>
                        </div>
                    </div>`
        }
    }
    container.innerHTML = card;
}

export function crearCardUpcoming(eventos, container, currentDate){
    let card = "";
    for (const evento of eventos) {
        if(compararFecha(evento.date, currentDate) === "mayor"){
            card += `<div class="card" style="width: 18rem;">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <div class="card-height d-flex flex-column justify-content-center align-items-center">
                                <img src="${evento.image}" alt="Food fair" class="card-img">
                                <h5 class="card-title">${evento.name}</h5>
                                <p class="card-text">${evento.description}</p>
                            </div>
                            <div class="d-flex justify-content-around align-items-baseline gap-4">
                                <p>$${evento.price}</p>
                                <button type="button" class="btn btn-primary"><a href="Details.html?id=${evento._id}" class="card-link color-details">Details</a></button>                  
                            </div>
                        </div>
                    </div>`
        }
    }

    container.innerHTML = card;
}