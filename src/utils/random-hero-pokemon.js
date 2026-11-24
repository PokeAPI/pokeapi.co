const ARTWORK_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const SHINY_CHANCE = 1 / 64;
let selection;

export function getRandomHeroPokemon(max) {
  if (!Number.isInteger(max) || max < 1) return null;
  if (!selection) {
    const id = Math.floor(Math.random() * max) + 1;
    const shiny = Math.random() < SHINY_CHANCE;
    selection = {id, shiny, url: `${ARTWORK_URL}${shiny ? "shiny/" : ""}${id}.png`};
  }
  return selection;
}
