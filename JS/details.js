const eventos = data.events;
let currentDate = data.currentDate;
currentDate = currentDate.split("-");

function compararFecha(fecha, currentDate) {
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

function crearDetails(eventos) {
    let parametro = location.search
    let params = new URLSearchParams(parametro)
    let idDetail = params.get("id")
    let evento = eventos.find(evento => evento._id === idDetail)
    let contenedorDetails = document.getElementById("Details1")

    if(compararFecha(evento.date, currentDate) === "menor"){ //no reconoce .date 
        console.log("menor")
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
        console.log('mayor')
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

crearDetails(eventos);