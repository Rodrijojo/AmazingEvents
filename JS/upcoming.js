const eventos = data.events;

var currentDate = data.currentDate;

currentDate = currentDate.split("-");

console.log(currentDate);

const cardsContainer = document.getElementById("cardsContainer")

let card = "";


//compararFecha()
// separar la fecha que viene como string en array y comparar elemento a elemento con if

function compararFecha(fecha) {
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

function restringeFecha(evento){
    let date = evento.date

    if(compararFecha(date) === "mayor"){
        return true;
    }
    else{
        return false;
    }
}


for (const evento of eventos) {
    if(restringeFecha(evento) === true){
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
}



cardsContainer.innerHTML = card;