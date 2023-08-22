function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function fetchAndDisplayPokemonDetails(name) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const pokemonData = await response.json();
      displayPokemonDetails(pokemonData);
    } else {
      console.error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayPokemonDetails(pokemonData) {
  const pokemonDetailSection = document.getElementById('pokemonDetail');
  pokemonDetailSection.innerHTML = ''; 

  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemonData.sprites.front_default;
  pokemonImage.alt = pokemonData.name;

  const pokemonName = document.createElement('h2');
  pokemonName.textContent = pokemonData.name;

  const pokemonTypes = document.createElement('p');
  const types = pokemonData.types.map(type => type.type.name).join(', ');
  pokemonTypes.textContent = `Types: ${types}`;

  const pokemonAbilities = document.createElement('p');
  const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
  pokemonAbilities.textContent = `Abilities: ${abilities}`;

  pokemonDetailSection.appendChild(pokemonImage);
  pokemonDetailSection.appendChild(pokemonName);
  pokemonDetailSection.appendChild(pokemonTypes);
  pokemonDetailSection.appendChild(pokemonAbilities);
}

document.addEventListener('DOMContentLoaded', () => {
  const pokemonName = getQueryParam('name');
  if (pokemonName) {
    fetchAndDisplayPokemonDetails(pokemonName);
  }
});
