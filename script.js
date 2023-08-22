const BASEURL = 'https://pokeapi.co/api/v2/pokemon';

async function fetchPokemonData() {
    try {
        const response = await fetch(BASEURL);
        const data = await response.json();
        const pokemonList = data.results;
        const pokemonData = await fetchPokemonDetails(pokemonList);
        return pokemonData;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}

async function fetchPokemonDetails(pokemonList) {
    const pokemonData = [];

    for (const pokemon of pokemonList) {
        try {
            const response = await fetch(pokemon.url);
            const pokemonDetails = await response.json();
            pokemonData.push(
                {
                    name: pokemonDetails.name,
                    imageUrl: pokemonDetails.sprites.front_default,
                }
            )
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }

    return pokemonData;
};

function createPokemonItem(name, imageUrl) {
    const pokemonItem = document.createElement('div');
    pokemonItem.classList.add('pokemon-item');

    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image');
    pokemonImage.src = imageUrl;
    pokemonImage.alt = name;

    const pokemonName = document.createElement('p');
    pokemonName.classList.add('pokemon-name');
    pokemonName.textContent = name;

    pokemonItem.appendChild(pokemonImage);
    pokemonItem.appendChild(pokemonName);

    pokemonImage.addEventListener('click', () => {
        window.location.href = `detail.html?name=${name}`;
    });

    pokemonName.addEventListener('click', () => {
        window.location.href = `detail.html?name=${name}`;
    });

    return pokemonItem;
}

document.addEventListener('DOMContentLoaded', async () => {
    const pokemonGallery = document.getElementById('pokemonGallery');

    try {
        const pokemonList = await fetchPokemonData();
        for (const pokemon of pokemonList) {
            const pokemonItem = createPokemonItem(pokemon.name, pokemon.imageUrl);
            pokemonGallery.appendChild(pokemonItem);
        }
    } catch (error) {
        console.error('Error while fetching Pokemon data:', error);
    }
});
