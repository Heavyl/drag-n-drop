import { cloneTemplate } from "../functions/functions.js"


export class Character {

    constructor(characterData) {

        this.name = characterData.name ? characterData.name : this.nameCharacter()

        //basic stats declaration        
        this.force = characterData.force ? characterData.force : 0
        this.agility = characterData.agility ? characterData.agility : 0
        this.intelligence = characterData.intelligence ? characterData.intelligence : 0
        this.resistence = characterData.resistence ? characterData.resistence : 0

        //others property declaration
        this.coin = characterData.coin ? characterData.coin : 0
        this.inventoryCapacity = characterData.inventoryCapacity ? characterData.inventoryCapacity : 4

        this.characterStats = this.updateCharacter()

    }
    /**
     * Name the character in case of a new character creation
     * @returns {string} 
     */
    nameCharacter() {
        const maxCharacter = 20
        let name = ''

        while (name.length > maxCharacter || name === '') {
            if (name.length > maxCharacter) {
                alert(`Your name should be maximum ${maxCharacter} long`)
            }
            name = prompt('Name your character')
        }
        return name
    }
    /**
     * Update the character stats
     * @returns {Object}
     */
    updateCharacter() {
        return this.characterStats = {
            name: this.name,
            force: this.force,
            agility: this.agility,
            intelligence: this.intelligence,
            resistence: this.resistence,
            coin: this.coin,
        }
    }

}
/**
 * Manage the integration of the character to the dom
 */
export class CharacterIntegration {
    constructor(character) {

        const characterClone = cloneTemplate('character-template')
        this.characterElement = characterClone

        const nameElement = this.characterElement.querySelector('.character-name')
        nameElement.innerText = character.name

        const characterContainer = document.getElementById('character-container')
        const statListContainer = this.characterElement.querySelector('.stats-list')

        for (const [key, value] of Object.entries(character.characterStats)) {
            if (key !== 'name') {
                const statElement = document.createElement('li')
                statElement.classList.add('stat')
                statElement.innerText = `${key} :  ${value}`

                statListContainer.append(statElement)
            }
        }
        const newZbi = {
            name: 'Claude',
            force: 20,
            agility: 10,
            intelligence: 0,
            resistence: 5,
            coin: 100,
        }
        this.appendTo(characterContainer)


    }
    /**
    * Append the template to the dom
    * @param {HTMLElement} element 
    */
    appendTo(element) {
        element.append(this.characterElement)
    }

}