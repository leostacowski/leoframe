import Component from '../component/component'

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

  clearRootElement() {
    if (this.rootElement.children.length > 0) this.rootElement.innerHTML = ''
  }

  renderComponentOnElement(targetComponent, targetElement = this.rootElement) {
    this.clearRootElement()

    let component = new Component(targetComponent)

    targetElement.append(component.formattedComponent)

    // targetElement.append(template.content)

    // console.log(frag.children[0].tagName)
    // this.rootElement.append(frag)
  }
}
