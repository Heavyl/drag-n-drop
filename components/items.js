import { cloneTemplate } from "../functions/functions.js"

let dragged = null
let dropTarget = null

export class Inventory {
    constructor(capacity) {
        this.capacity = capacity
        this.className = 'inventory'

    }
    appendTo(element) {
        for (let i = 0; i < this.capacity; i++) {
            const item = new InventoryItem()
            element.append(item.element)
        }

    }
}
class InventoryItem {
    constructor() {
        //template generation
        const item = cloneTemplate('inventory-template')
        this.element = item

        const itemNodeList = this.element.querySelectorAll('.item')

        makeDragAndDrop(itemNodeList, '.item-container')
    }
}
export class Items {
    constructor(itemsDatas) {
        this.datas = itemsDatas
    }
    appendTo(element) {
        for (const [key, value] of Object.entries(this.datas)) {
            const item = new Item(this.datas[key])
            element.append(item.element)
        }
    }
}



class Item {

    constructor(itemdata) {
        this.datas = itemdata

        //template generation
        const item = cloneTemplate('item-template')
        this.element = item

        const name = item.querySelector('.item-name')
        const description = item.querySelector('.item-description')


        if (this.datas !== undefined) {
            this.imageUrl = `url(${this.datas.imageURL})`
            name.innerText = this.datas.name
            description.innerText = this.datas.description
            this.container = item.querySelector('.item-container')
            this.container.style.backgroundImage = this.imageUrl
        }

        const containers = this.element.querySelectorAll('.item-container')
        containers.forEach(selectedItem => {
            selectedItem.addEventListener("click", e => {
                this.toggle(description, 'hidden')
                this.toggle(name, 'hidden')
            })
        })
        //make the item drag-and-drop ready
        const itemNodeList = this.element.querySelectorAll('.item')
        makeDragAndDrop(itemNodeList, '.item-container')
    }
    /**
     * Take the element and toggle the attribute
     * @param {HTMLElement} element 
     * @param {string} attribute 
     */
    toggle(element, attribute) {
        element.classList.toggle(attribute)
    }

}

/**
 * Take a node list and set the logic to make the element drag-and-drop ready
 * @param {NodeList} listItems 
 * @param {DOMstring} elementClass 
 */
export function makeDragAndDrop(nodelist, elementClass) {
    nodelist.forEach(selectedItem => {
        selectedItem.addEventListener("dragstart", e => {
            dragged = e.target.parentNode.firstElementChild
        })

        selectedItem.addEventListener("dragover", e => {
            dropTarget = e.currentTarget

            e.preventDefault()
            selectedItem.classList.add('hovered')
        })

        selectedItem.addEventListener("dragleave", () => {
            selectedItem.classList.remove('hovered')

        })

        selectedItem.addEventListener("drop", (e) => {
            const eTarget = e.currentTarget.querySelector(elementClass)
            e.preventDefault()

            selectedItem.classList.remove('hovered')
            if (e.currentTarget.innerHTML.trim()) {
                dragged.parentNode.replaceChildren(dropTarget.firstElementChild)
                e.currentTarget.replaceChildren(dragged)
                return
            }
            else if (eTarget) {
                e.currentTarget.replaceChildren(dragged)
                return
            }
            e.target.append(dragged)


        })
    })
}