// DOM 
const info = document.querySelector('.s2');
const pokedex = document.querySelector('.s1-inner');
const spriteElement = document.querySelector(".frontSprite")
const shinyElement = document.querySelector(".frontSpriteShiny")
const artElement = document.querySelector(".artwork")
const idElement = document.querySelector(".nbDex-s2")
const nameElement = document.querySelector(".idTextName")
const typeElement = document.getElementById("type")
const secondTypeElement = document.getElementById("secondType")
const heightElement = document.getElementById("height")
const weightElement = document.getElementById("weight")
const evoChainElement = null
const descriptionElement = null
const notfound = document.querySelector(".notfound")

// fetch pokemons from API
let pokemons = [];
const fetchPokemon = () => {
    const res = [];
    for (let i = 1; i <= 151; i++) {
        const url1 = `https://pokeapi.co/api/v2/pokemon/${i}`;
        res.push(fetch(url1).then((res) => res.json()));
    }
    Promise.all(res).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            id: result.id.toString().padStart(3, '0'),
            imageInfo: result.sprites['versions']['generation-v']['black-white']['animated']['front_default'],
            imageShiny: result.sprites['versions']['generation-v']['black-white']['animated']['front_shiny'],
            artwork: result.sprites['other']['official-artwork']['front_default'],
            type: result.types,
            weight: (result.weight / 10),
            height: (result.height * 10)
        }));
        pokemons = pokemon;
        displayPokemons(pokemon);
    });
};

// display 151 pkmns left side
const displayPokemons = (pokemon) => {
    const divContent = pokemon
        .map(
            (pokemon) =>
            `
        <li class="cube" id="${pokemon.id}">
            <p class="overallName" id="${pokemon.id}">${pokemon.name}</p>
            <img class="sprite" id="${pokemon.id}" src="${pokemon.image}"/>
            <p class="nbDex" id="${pokemon.id}">${pokemon.id}</p>
        </li>
            `
        ).join(' ');
    pokedex.innerHTML = divContent;
};

fetchPokemon();

// fetch a random pkmn (right infobox)
const fetchRandomInfo = () => {
    const res = []
    const randomId = Math.floor(Math.random() * 151)
    const id = randomId
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    res.push(fetch(url).then((res) => res.json()));
    Promise.all(res).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            imageInfo: result.sprites['versions']['generation-v']['black-white']['animated']['front_default'],
            imageShiny: result.sprites['versions']['generation-v']['black-white']['animated']['front_shiny'],
            artwork: result.sprites['other']['official-artwork']['front_default'],
            type: result.types,
            id: result.id.toString().padStart(3, '0'),
            weight: (result.weight / 10),
            height: (result.height * 10)
        }))[0];
        spriteElement.style.backgroundImage = `url(${pokemon.imageInfo})`;
        shinyElement.style.backgroundImage = `url(${pokemon.imageShiny})`;
        artElement.style.backgroundImage = `url(${pokemon.artwork})`;
        idElement.innerHTML = `#${pokemon.id}`;
        nameElement.innerHTML = `${pokemon.name}`;
        heightElement.innerHTML = `${pokemon.height} cm`;
        weightElement.innerHTML = `${pokemon.weight} kg`;

        // split types            
        let types = pokemon.type
        typeElement.src = "/frontend/assets/types/" + types[0]['type']['name'] + ".png";
        if (types.length !== 2) {
            secondTypeElement.style.removeProperty("width");
            secondTypeElement.style.removeProperty("height");
            secondTypeElement.src = " "
        } else {
            secondTypeElement.src = "/frontend/assets/types/" + types[1]['type']['name'] + ".png";
        }
    });
};
fetchRandomInfo();

// click on pkmn thumbnail to show more
pokedex.addEventListener('click', (event) => {
    const pokemon = pokemons.filter(pokemon => pokemon.id === event.target.id)[0]
    spriteElement.style.backgroundImage = `url(${pokemon.imageInfo})`;
    shinyElement.style.backgroundImage = `url(${pokemon.imageShiny})`;
    artElement.style.backgroundImage = `url(${pokemon.artwork})`;
    idElement.innerHTML = `#${pokemon.id}`;
    nameElement.innerHTML = `${pokemon.name}`;
    heightElement.innerHTML = `${pokemon.height} cm`;
    weightElement.innerHTML = `${pokemon.weight} kg`;

    // split types            
    let types = pokemon.type
    typeElement.src = "/frontend/assets/types/" + types[0]['type']['name'] + ".png";
    if (types.length !== 2) {
        secondTypeElement.style.removeProperty("width");
        secondTypeElement.style.removeProperty("height");
        secondTypeElement.src = " "
    } else {
        secondTypeElement.src = "/frontend/assets/types/" + types[1]['type']['name'] + ".png";
    }
})

/* searchbar */
const searchBar = document.querySelector("#searchPkmn")
searchBar.addEventListener("input", filterData)

function filterData(event) {

    pokedex.innerHTML = "";
    const string = event.target.value;
    const filteredPkmns = pokemons.filter(pokemon => pokemon.name.includes(string))

    if (filteredPkmns.length == 0) {
        console.log(notfound)
        notfound.style.display = "inline"
        notfound.innerHTML = `No result found! <br> <img src="/frontend/assets/missingno.png" alt="missingno">`

    } else if (filteredPkmns.length !== 0) {
        notfound.style.display = "none"
    }

    displayPokemons(filteredPkmns)
}

/* get 3 randoms sprites (header) */
const getRandomSprites = () => {

    const randomSprite = document.getElementById("random")

    const numbers = []
    while (numbers.length !== 3) {
        const randomNb = Math.floor(Math.random() * 151)
        if (!numbers.includes(randomNb)) {
            numbers[numbers.length] = randomNb
        }
    }

    for (let i = 0; i <= 2; i++) {
        const id = numbers[i]
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                res.json()
                    .then((pokemon) => {
                        randomSprite.children[i].src = pokemon.sprites['front_default'];
                    })
            })
    }
}

getRandomSprites()