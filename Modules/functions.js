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

export function crearDetails(eventos, currentDate, idDetail) {

    let evento = eventos.find(evento => evento._id == idDetail)
    let contenedorDetails = document.getElementById("Details1")

    if(compararFecha(evento.date, currentDate) === "menor"){ //no reconoce .date 
        
        contenedorDetails.innerHTML = `<img src="${evento.image}" alt="Details Image" class="w-50 m-4">
                                    <div class="d-flex flex-column align-items-center justify-content-around border-card m-4">
                                        <h3>${evento.name}</h3>
                                        <p>${evento.description}</p>
                                        <p>Date: ${evento.date}</p>
                                        <p>Where at: ${evento.place}</p>
                                        <p>Capacity: ${evento.capacity}</p>
                                        <p>Price: $${evento.price}</p>
                                        <p>Assistance: ${evento.assistance}</p>
                                    </div>`    
    }
    else{
        
        contenedorDetails.innerHTML = `<img src="${evento.image}" alt="Details Image" class="w-50 m-4">
                                    <div class="d-flex flex-column align-items-center justify-content-around border-card m-4">
                                        <h3>${evento.name}</h3>
                                        <p>${evento.description}</p>
                                        <p>Date: ${evento.date}</p>
                                        <p>Where at: ${evento.place}</p>
                                        <p>Capacity: ${evento.capacity}</p>
                                        <p>Price: $${evento.price}</p>
                                        <p>Estimate: ${evento.estimate}</p>
                                    </div>`
    }
}

export function highestAssistance (eventos) {
    let highestAssistance = 0
    let highestEvent

    eventos.forEach( evento => {
        let asistenciaAux = evento.assistance/(evento.capacity/100)
        if(asistenciaAux > highestAssistance){
            highestAssistance = asistenciaAux
            highestEvent = evento.name
        }
    })

    return [highestEvent, highestAssistance]
}

export function lowestAssistance (eventos, currentDate) {
    let lowestAssistance = 1000
    let lowestEvent
    let fecha

    eventos.forEach( evento => {
        fecha = compararFecha(evento.date, currentDate)
        if(fecha == "menor"){
            let asistenciaAux = evento.assistance/(evento.capacity/100)
            if(asistenciaAux < lowestAssistance){
                lowestAssistance = asistenciaAux
                lowestEvent = evento.name
            }
        }
        else{
            let asistenciaAux = evento.estimate/(evento.capacity/100)
            if(asistenciaAux < lowestAssistance){
                lowestAssistance = asistenciaAux
                lowestEvent = evento.name
            }
        }
    })
    return [lowestEvent, lowestAssistance]
}

export function largerCapacity(eventos) {
    let largestCapacity = 0
    let largestEvent

    eventos.forEach( evento => {
        if( evento.capacity > largestCapacity ){
            largestCapacity = evento.capacity;
            largestEvent = evento.name
        }
    })
    return [largestEvent, largestCapacity]
}

export function crearTabla1 (eventos, container, currentDate) {
    
    let eventoConMasAsistencia = highestAssistance(eventos, currentDate)[0]
    let mayorAsistencia = highestAssistance(eventos, currentDate)[1]
    let eventoConMenosAsistencia = lowestAssistance(eventos, currentDate)[0]
    let menorAsistencia = lowestAssistance(eventos, currentDate)[1]
    let eventoConMayorCapacidad = largerCapacity(eventos)[0]
    let mayorCapacidad = largerCapacity(eventos)[1]
    
    container.innerHTML =   `<td>${eventoConMasAsistencia} %${mayorAsistencia}</td>
                            <td>${eventoConMenosAsistencia} %${menorAsistencia}</td>
                            <td>${eventoConMayorCapacidad} capacidad: ${mayorCapacidad}</td>`
}

export function filtroEventosPorFecha (eventos, currentDate) {
    let pastEvents = []
    let upcomingEvents = []

    eventos.forEach(evento => {
        if(compararFecha(evento.date, currentDate) == "mayor"){
            upcomingEvents.push(evento)
        }
        else{
            pastEvents.push(evento)
        }
    })
    return [pastEvents, upcomingEvents]
}

// esta funcion me guarda un array con las categorias pasando por parametro un array de eventos
export function guardarCategory (eventos) {
    let categorias = []
    for (const evento of eventos) {
        if(!categorias.includes(evento.category)){
            categorias.push(evento.category)
        }
    }
    return categorias;
}

export function agruparPorCategoria (eventos, categorias) {
    let arrayPorCategoria = []
    for (const categoria of categorias) {
        arrayPorCategoria.push(eventos.filter(evento => evento.category === categoria))
    }
    return arrayPorCategoria
}

// crea un array de objetos por cada categoria con la informacion acumulada
export function acumulador (arrayEventos) {
    let arrayAcumulado = []
    for (const subArray of arrayEventos) {
        arrayAcumulado.push(subArray.reduce((acc, cur) => {
            acc.revenue += cur.assistance * cur.price
            acc.assistance += cur.assistance
            acc.capacity += cur.capacity
            acc.porcentaje += (cur.assistance / (cur.capacity/100)) / subArray.length
            return acc
        }, {categoria: subArray[0].category, revenue: 0, assistance: 0, capacity: 0, porcentaje: 0}))
    }
    return arrayAcumulado
}


export function crearTabla3 (infoCategoria, container) {
    let tabla = ""
    for (const categoria of infoCategoria) {
        tabla += `<tr>
                    <td>${categoria.categoria}</td>
                    <td>$${categoria.revenue}</td>
                    <td>%${categoria.porcentaje}<br></td>
                </tr>`
    }

    container.innerHTML = tabla
}

export function acumuladorUpcoming (arrayEventos) {
    let arrayAcumulado = []
    for (const subArray of arrayEventos) {
        arrayAcumulado.push(subArray.reduce((acc, cur) => {
            acc.revenue += cur.estimate * cur.price
            acc.estimate += cur.estimate
            acc.capacity += cur.capacity
            acc.porcentaje += (cur.estimate / (cur.capacity/100)) / subArray.length
            return acc
        }, {categoria: subArray[0].category, revenue: 0, estimate: 0, capacity: 0, porcentaje: 0}))
    }
    console.log(arrayAcumulado)
    return arrayAcumulado
}

export function crearTabla2 (infoCategoria, container) {
    let tabla = ""
    for (const categoria of infoCategoria) {
        tabla += `<tr>
                    <td>${categoria.categoria}</td>
                    <td>$${categoria.revenue}</td>
                    <td>%${categoria.porcentaje}<br></td>
                </tr>`
    }

    container.innerHTML = tabla
}