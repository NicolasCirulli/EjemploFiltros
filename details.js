const $titulo = document.getElementById('titulo')
const $imgCard = document.getElementById('img-card')
const $listCard = document.getElementById('list-card')

let personaje;
let param = new URLSearchParams(location.search)
let personajeParam = param.get('personaje')

fetch('https://hp-api.herokuapp.com/api/characters/students')
    .then( data => data.json() )
    .then( res => {
        personaje = res.find( personaje => personaje.name.replace(' ','') === personajeParam)
        $titulo.textContent = personaje.name
        document.title = ` Detalle ${personaje.name} `
        $imgCard.setAttribute('src', personaje.image)
        $listCard.appendChild( crearCardDetails(personaje) )
    } )
    .catch( err => console.log(err))

function crearCardDetails(personaje){
    let div = document.createElement('DIV')
    div.classList = 'card'
    div.innerHTML = `
        <div class="card-body">
            <h4 class="card-title">${personaje.name}</h4>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Actor: ${personaje.actor || 'Desconocido'}</li>
            <li class="list-group-item">Fecha de nacimiento: ${personaje.dateOfBirth || 'Desconocido'}</li>
            <li class="list-group-item">Casa: ${personaje.house || 'Desconocido'}</li>
            <li class="list-group-item">Genero: ${personaje.gender || 'Desconocido'}</li>
            <li class="list-group-item">Especie: ${personaje.species || 'Desconocido'}</li>
            <li class="list-group-item">Patronus: ${personaje.patronus || 'Desconocido'}</li>
        </ul>
    `
    return div

}