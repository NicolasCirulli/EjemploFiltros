const $contFavs = document.getElementById('cont-favoritos')
const $btnBorrar = document.getElementById('btn-borrar-todo')
let personajes;
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
fetch('https://hp-api.herokuapp.com/api/characters/students')
    .then(data => data.json())
    .then(res => {
        personajes = res.filter(personaje => favoritos.includes(personaje.name.replace(' ', '')))
        imprimirCards(personajes, $contFavs)
    })
    .catch(err => console.log(err))

$btnBorrar.addEventListener( 'click', borrarTodo )

function crearCard(personaje) {
    let name = personaje.name.replace(' ', '')
    let clases;
    let texto;
    if (favoritos.includes(name)) {
        clases = "btn btn-danger"
        texto = 'Sacar fav'
    } else {
        clases = "btn btn-primary"
        texto = 'Agregar fav'
    }
    let div = document.createElement('DIV')
    div.classList = 'card col-3'
    div.innerHTML = `
                <img src="${personaje.image}" class="card-img-top" alt="Imagen de ${personaje.name}">
                <div class="card-body">
                   <h5 class="card-title">${personaje.name}</h5>
                   <h4 class="card-title">${personaje.house}</h4>
                    <a href="./details.html?personaje=${name}" class="btn btn-primary">Ver mas...</a>
                    <button class="${clases}" id="btn-${name}" onclick="handleFavs('${name}', 'btn-${name}' )">${texto}</button>
                </div>
        `
    return div
}

function borrarTodo(){
    localStorage.removeItem('favoritos')
    favoritos = []
    personajes = []
    $contFavs.innerHTML = '<h2> No hay personajes favoritos </h2>'
}

function imprimirCards(personajes, contenedor) {
    contenedor.innerHTML = ''
    if (personajes.length > 0) {
        let fragment = document.createDocumentFragment()
        personajes.forEach(personaje => fragment.appendChild(crearCard(personaje)))
        contenedor.appendChild(fragment)
    } else {
        contenedor.innerHTML = '<h2> No hay personajes favoritos </h2>'
    }
}

function handleFavs(nombre,id){

    let $btn = document.getElementById(id)
    if( favoritos.includes(nombre) ){
        // Acá lo saco de favoritos
        favoritos = favoritos.filter( personaje => personaje !== nombre )
        $btn.classList.remove('btn-danger')
        $btn.classList.add('btn-primary')
        $btn.textContent = 'Agregar fav'
        localStorage.setItem( 'favoritos', JSON.stringify(favoritos) )
        personajes = personajes.filter(personaje => favoritos.includes(personaje.name.replace(' ', '')))
        imprimirCards(personajes, $contFavs)
    }else{
        // Acá lo agrego a favoritos
        favoritos.push(nombre)
        $btn.classList.remove('btn-primary')
        $btn.classList.add('btn-danger')
        $btn.textContent = 'Sacar fav'
        localStorage.setItem( 'favoritos', JSON.stringify(favoritos) )
        personajes = personajes.filter(personaje => favoritos.includes(personaje.name.replace(' ', '')))
        imprimirCards(personajes, $contFavs)
        
    }
}
