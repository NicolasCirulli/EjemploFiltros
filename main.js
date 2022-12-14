// api https://hp-api.herokuapp.com/api/characters/students

const $search = document.getElementById('search')
const $checkboxs = document.getElementById('checkboxs')
const $contPersonajes = document.getElementById('cont-personajes')
let personajes;
let favoritos = JSON.parse( localStorage.getItem('favoritos') ) || []
fetch('https://hp-api.herokuapp.com/api/characters/students')
    .then( data => data.json() )
    .then( res => {
        personajes = res.filter( personaje => personaje.house)
        crearCheckbox(personajes,$checkboxs)
        imprimirCards(personajes, $contPersonajes)
        $search.addEventListener( 'keyup', filtrar )
        $checkboxs.addEventListener( 'change', filtrar )
    } )
    .catch( err => console.log(err))


// funciones

// funcion para crearCheckbox

function crearCheckbox( personajes , contenedor ){
    let fn = personajes => personajes.house
    let casas = new Set(personajes.filter( fn ).map( fn ))
    casas.forEach( casa => {
        contenedor.innerHTML += `
            <label class="btn btn-primary active">
                <input type="checkbox" class="me-2" value="${casa}" name="" id="" checked autocomplete="off"> ${casa}
            </label>
        `
    })
}


// funcion para crear cards

function crearCard(personaje){
    let name = personaje.name.replace(' ','')
    let clases;
    let texto;
    if(favoritos.includes(name)){
        clases = "btn btn-danger"
        texto = 'Sacar fav'
    }else{
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


// funcion para imprimir cards

function imprimirCards( personajes, contenedor){
    contenedor.innerHTML = ''
    if(personajes.length > 0) {
        let fragment = document.createDocumentFragment()
        personajes.forEach( personaje => fragment.appendChild( crearCard(personaje) ) )
        contenedor.appendChild(fragment)
    }else{
        contenedor.innerHTML = '<h2> No personajes que coincidan con su busqueda </h2>'
    }
}

// funcion para filtrar

function filtrar(){
   let checked = [...document.querySelectorAll( 'input[type="checkbox"]:checked' )].map( ele => ele.value)
   let filtradosPorCasa = personajes.filter( personaje => checked.includes( personaje.house ))
   let filtradosPorSearch = filtradosPorCasa.filter( personaje => personaje.name.toLowerCase().includes( $search.value.toLowerCase() ) )
   imprimirCards(filtradosPorSearch, $contPersonajes)
}

function handleFavs(nombre,id){

    let $btn = document.getElementById(id)
    if( favoritos.includes(nombre) ){
        // Ac?? lo saco de favoritos
        favoritos = favoritos.filter( personaje => personaje !== nombre )
        $btn.classList.remove('btn-danger')
        $btn.classList.add('btn-primary')
        $btn.textContent = 'Agregar fav'
        localStorage.setItem( 'favoritos', JSON.stringify(favoritos) )
    }else{
        // Ac?? lo agrego a favoritos
        favoritos.push(nombre)
        $btn.classList.remove('btn-primary')
        $btn.classList.add('btn-danger')
        $btn.textContent = 'Sacar fav'
        localStorage.setItem( 'favoritos', JSON.stringify(favoritos) )
        
    }
}
