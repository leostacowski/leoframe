/**
 * Representa o Render do framework e executa a função init.
 * @module Render
 * @param initProps {Object} initProps - Objeto literal contendo a propriedade rootElement.
 * @property {Element} rootElement Elemento HTML raíz da SPA.
 *
 */
export default class Render {
  constructor({ rootElement }) {
    this.rootElement = rootElement
  }

  /**
   * Retorna o DocumentFragment do componente.
   * @function getDocumentFragment
   * @param targetComponent {Object} targetComponent - Objeto do componente.
   * @returns {DocumentFragment | undefined}
   */
  getDocumentFragment(targetComponent) {
    try {
      if (!targetComponent) throw `Component not found!`
      if (typeof targetComponent !== 'object') throw `Component is invalid!`

      const range = document.createRange()

      return range.createContextualFragment(targetComponent.component)
    } catch (err) {
      console.error(`@getDocumentFragment: ${err}`)
    }
  }

  /**
   * Valida as TagNames do DocumentFragment.
   * @function validateDocumentFragmentTagNames
   * @param contextualFragments {DocumentFragment} contextualFragments - Objeto do componente.
   * @returns {boolean}
   */
  validateDocumentFragmentTagNames(documentFragment) {
    try {
      if (!documentFragment) throw `DocumentFragment not found!`
      if (!documentFragment.children) throw `Object is not a DocumentFragment!`

      const children = documentFragment.children

      if (!children.length > 0) throw `DocumentFragment is empty!`

      Array.from(children).forEach((child) => {
        switch (child.tagName) {
          case 'TEMPLATE':
          case 'SCRIPT':
          case 'STYLE':
            break

          default:
            throw `Tag ${child.tagName} not supported!`
        }
      })

      return true
    } catch (err) {
      console.error(`@validateDocumentFragmentTagNames: ${err}`)

      return false
    }
  }

  clearRootElement() {
    if (this.rootElement.children.length > 0) this.rootElement.innerHTML = ''
  }

  renderComponentOnElement(targetComponent, targetElement = this.rootElement) {
    this.clearRootElement()

    const documentFragment = this.getDocumentFragment(targetComponent)

    if (!documentFragment) throw `DocumentFragment not loaded!`

    if (!this.validateDocumentFragmentTagNames(documentFragment))
      throw `Invalid DocumentFragment TagNames!`

    const template = documentFragment.querySelector('template')

    console.log(template)
    targetElement.append(template.content)

    // console.log(frag.children[0].tagName)
    // this.rootElement.append(frag)
  }
}
