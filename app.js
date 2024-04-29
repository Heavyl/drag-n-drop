import { Character, CharacterIntegration } from "./components/character.js"
import { Inventory, Items } from "./components/items.js"
import { fetchJSON } from "./functions/api.js"

const itemsJSON = await fetchJSON('./data/items-database.json')
const characterJSON = await fetchJSON('./data/character.json')


const backpackItems = new Items(itemsJSON)
const backpack = document.getElementById('backpack')
backpackItems.appendTo(backpack)

const character = new Character(characterJSON)
const integration = new CharacterIntegration(character)

const inventoryItems = new Inventory(character.inventoryCapacity)
const inventory = document.getElementById('character-inventory')
inventoryItems.appendTo(inventory)






