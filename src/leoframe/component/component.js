import { transform } from '@babel/standalone'

/**
 * Representa o Componente do framework e executa a função init.
 * @module Component
 * @param component {Object} component - Objeto literal contido no import da rota.
 * @property {Element} rootElement Elemento HTML raíz da SPA.
 *
 */
export default class Component {
  constructor(targetComponent) {
    this.originalComponent = targetComponent
    this.formattedComponent = undefined

    this.rawTemplate = undefined
    this.rawScript = undefined
    this.rawStyle = undefined

    this.templateData = undefined
    this.scriptModel = undefined

    this.init()
  }

  init() {
    this.setRawProperties()
    this.setFormattedDocument()
    this.setVProperties()
  }

  setVProperties() {
    if (this.rawScript) this.setScriptModel()
  }

  setScriptModel() {
    const rawJSCode = this.rawScript.innerHTML
    const transpiled = this.getTranspiledJSFromRawCode(rawJSCode)

    class t {
      constructor({ data, functions }) {
        this.data = data
        this.functions = functions
      }
    }

    const component = eval(transpiled)
    this.scriptModel = component(new t({ ...component() }))
  }

  getTranspiledJSFromRawCode(rawJSCode) {
    const transpiled = transform(rawJSCode, {
      presets: ['env'],
    })

    return transpiled.code
  }

  setRawProperties() {
    const documentFragment = this.getDocumentFragment(this.originalComponent)

    if (!documentFragment) throw `DocumentFragment not loaded!`

    if (!this.validateDocumentFragmentTagNames(documentFragment))
      throw `Invalid DocumentFragment TagNames!`

    let template = documentFragment.querySelector('template')
    let script = documentFragment.querySelector('script')
    let style = documentFragment.querySelector('style')

    this.originalComponent = documentFragment
    this.rawTemplate = template ? template.content : undefined
    this.rawScript = script ? script : undefined
    this.rawStyle = style ? style : undefined
  }

  setFormattedDocument() {
    let newFormattedComponent = document.createDocumentFragment()

    if (this.rawTemplate) newFormattedComponent.append(this.rawTemplate)
    if (this.rawStyle) newFormattedComponent.append(this.rawStyle)

    this.formattedComponent = newFormattedComponent
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
