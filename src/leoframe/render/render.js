import { transform } from '@babel/standalone'
import Script from '../component/script'

/**
 * Representa o Render do framework.
 * @module Render
 * @param rootElement {HTMLElement} rootElement - Elemento HTML raíz da SPA.
 * @property {Object} targetComponent - Objeto literal contendo as propriedades de um componente a ser renderizado.
 * @property {HTMLElement} targetComponent.originalComponent - Elemento HTML do componente a ser renderizado.
 * @property {HTMLElement} targetComponent.formattedComponent - Elemento HTML formatado do componente renderizado.
 * @property {HTMLElement} targetComponent.rawTemplate - Elemento HTML TEMPLATE do componente.
 * @property {HTMLElement} targetComponent.rawScript - Elemento HTML SCRIPT do componente.
 * @property {HTMLElement} targetComponent.rawStyle - Elemento HTML STYLE do componente.
 * @property {Object} targetComponent.virtualTemplate - Objeto com a instância virtual do TEMPLATE.
 * @property {Object} targetComponent.virtualScript - Objeto com a instância virtual do SCRIPT.
 */
export default class Render {
  constructor({ rootElement }) {
    this.rootElement = rootElement

    this.targetComponent = {
      originalComponent: undefined,
      formattedComponent: undefined,
      rawTemplate: undefined,
      rawScript: undefined,
      rawStyle: undefined,
      virtualTemplate: undefined,
      virtualScript: undefined,
    }
  }

  renderComponentOnElement(targetComponent, targetElement = this.rootElement) {
    this.clearElement(targetElement)

    this.setTargetComponent(targetComponent)
    this.setTargetComponentFormattedDocument()

    targetElement.append(this.targetComponent.formattedComponent)
  }

  /**
   * Exclui o conteúdo HTML de dentro do elemento desejado.
   * @function clearElement
   * @param targetElement {HTMLElement} targetElement - Elemento HTML a ser limpo.
   * @returns {undefined}
   */
  clearElement(targetElement = this.rootElement) {
    if (
      targetElement &&
      HTMLCollection.prototype.isPrototypeOf(targetElement.children)
    )
      targetElement.innerHTML = ''
  }

  /**
   * Chama as funções responsáveis por povoar as propriedades [originalComponent, rawTemplate, rawScript, rawStyle, virtualTemplate, virtualScript] do Objeto literal targetComponent.
   * @function setTargetComponent
   * @param targetComponent {HTMLElement} targetComponent - Elemento HTML do componente a ser instanciado.
   * @returns {undefined}
   */
  setTargetComponent(targetComponent) {
    this.setTargetComponentRawProperties(targetComponent)
    this.setTargetComponentVirtualProperties()
  }

  /**
   * Povoa as propriedades Object do Objeto literal targetComponent.
   * @function setTargetComponentVirtualProperties
   * @returns {undefined}
   */
  setTargetComponentVirtualProperties() {
    if (this.targetComponent.rawScript) {
      this.setVirtualScript()
      this.setVirtualScriptListener()
    }
  }

  /**
   * Povoa a propriedade virtualScript do Objeto literal targetComponent com uma instância da classe Script a partir da propriedade HTMLElement rawScript do Objeto literal targetComponent.
   * @function setTargetComponentVirtualProperties
   * @returns {undefined}
   */
  setVirtualScript() {
    try {
      const rawJSCode = this.targetComponent.rawScript.innerHTML
      const transpiled = this.getTranspiledJSFromRawCode(rawJSCode)
      const ComponentScript = eval(transpiled)

      this.targetComponent.virtualScript = new Script(ComponentScript)
    } catch (err) {
      console.error(`@setVirtualScript: ${err}`)
    }
  }

  /**
   * Cria os listeners de eventos da propriedade virtualScript do Objeto literal targetComponent.
   * @function setVirtualScriptListener
   * @returns {undefined}
   */
  setVirtualScriptListener() {
    this.targetComponent.virtualScript.emitter.addListener(
      'change',
      this.onVirtualScriptChange
    )
  }

  /**
   * Cria o handler do evento "change" da propriedade virtualScript do Objeto literal targetComponent.
   * @function onVirtualScriptChange
   * @returns {undefined}
   */
  onVirtualScriptChange() {
    console.log('script mudou!')
  }

  /**
   * Retorna código Javascript transpilado para uma versão compilável pelo navegador usando o @Babel/standalone.
   * @function getTranspiledJSFromRawCode
   * @param rawJSCode {String} rawJSCode - Código transpilado para versão compilável pelo navegador.
   * @returns {String}
   */
  getTranspiledJSFromRawCode(rawJSCode) {
    try {
      const transpiled = transform(rawJSCode, {
        presets: ['env'],
      })

      return transpiled.code
    } catch (err) {
      console.error(`@getTranspiledJSFromRawCode: ${err}`)
    }
  }

  /**
   * Povoa as propriedades HTMLElement do Objeto literal targetComponent.
   * @function setTargetComponentRawProperties
   * @param targetComponent {HTMLElement} targetComponent - Elemento HTML do componente a ser instanciado.
   * @returns {undefined}
   */
  setTargetComponentRawProperties(targetComponent) {
    try {
      const documentFragment = this.getDocumentFragment(targetComponent)

      if (!documentFragment) throw `DocumentFragment not loaded!`

      if (!this.validateDocumentFragmentTagNames(documentFragment))
        throw `Invalid DocumentFragment TagNames!`

      let template = documentFragment.querySelector('template')
      let script = documentFragment.querySelector('script')
      let style = documentFragment.querySelector('style')

      this.targetComponent.originalComponent = documentFragment
      this.targetComponent.rawTemplate = template ? template.content : undefined
      this.targetComponent.rawScript = script ? script : undefined
      this.targetComponent.rawStyle = style ? style : undefined
    } catch (err) {
      console.error(`@setTargetComponentRawProperties: ${err}`)
    }
  }

  /**
   * Povoa a propriedade formattedComponent do Objeto literal targetComponent com a versão final dos HTMLElements a serem renderizados.
   * @function setTargetComponentFormattedDocument
   * @returns {undefined}
   */
  setTargetComponentFormattedDocument() {
    try {
      let newFormattedComponent = document.createDocumentFragment()

      if (this.targetComponent.rawTemplate)
        newFormattedComponent.append(this.targetComponent.rawTemplate)

      if (this.targetComponent.rawStyle)
        newFormattedComponent.append(this.targetComponent.rawStyle)

      this.targetComponent.formattedComponent = newFormattedComponent
    } catch (err) {
      console.error(`@setTargetComponentFormattedDocument: ${err}`)
    }
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
}
