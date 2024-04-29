
/**
 * Clone the template from id and return a documentFragment
 * @param {string} id 
 * @returns {DocumentFragment}
 */

export function cloneTemplate(id, deep = true) {
    return document.getElementById(id).content.cloneNode(deep)
}
