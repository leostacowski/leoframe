import Render from '../render/render'

/**
 * Representa o framework e executa a função init.
 * @module Leo
 * @param initProps {Object} initProps - Objeto literal contendo as propriedades id e router.
 * @property {Integer} id Identificador do elemento HTML raíz da SPA.
 * @property {Object} router Uma instância do módulo Router.
 * @property {Element} rootElement Elemento HTML raíz da SPA.
 * @property {Object} activeComponent Objeto do componente ativo.
 *
 */
export default class Leo {
  constructor({ id, router }) {
    this.id = id
    this.router = router
    this.render = undefined
    this.rootElement = undefined
    this.activeComponent = undefined

    this.init()
  }

  /**
   * Inicializa  rootElement, handler dos eventos do Router e o Render.
   * @function init
   * @returns {undefined}
   */
  init() {
    try {
      this.setRootElement()
      this.setRouterListenersHandlers()
      this.setRender()
    } catch (err) {
      console.error(`@init: ${err}`)
    }
  }

  /**
   * Inicializa o módulo do Render.
   * @function setRender
   * @returns {undefined}
   */
  setRender() {
    try {
      this.render = new Render({ rootElement: this.rootElement })
    } catch (err) {
      console.error(`@setRender: ${err}`)
    }
  }

  /**
   * Salva o elemento HTML raíz pelo identificador id.
   * @function setRootElement
   * @returns {undefined}
   */
  setRootElement() {
    try {
      this.rootElement = document.getElementById(this.id) || undefined
      if (!this.rootElement) throw `Element with id '${this.id}' not found!`
    } catch (err) {
      console.error(`@setRootElement: ${err}`)
    }
  }

  /**
   * Inicializa os callbacks do eventos onChangeRoute e onFirstLoad do Router.
   * @function setRouterListenersHandlers
   * @returns {undefined}
   */
  setRouterListenersHandlers() {
    const self = this

    this.router.onFirstLoad((targetComponent) => {
      try {
        self.renderComponent(targetComponent)
        self.setActiveComponent(targetComponent)
      } catch (err) {
        console.error(`@onFirstLoadListenerHandler: ${err}`)
      }
    })

    this.router.onRouteChange((targetComponent) => {
      try {
        self.renderComponent(targetComponent)
        self.setActiveComponent(targetComponent)
      } catch (err) {
        console.error(`@onRouteChangeListenerHandler: ${err}`)
      }
    })
  }

  /**
   * Atribui na variável activeComponent um componente por nome ou objeto.
   * @function setActiveComponent
   * @param targetComponent {String | Object} targetComponent - Nome ou objeto do componente.
   * @returns {boolean}
   */
  setActiveComponent(targetComponent) {
    try {
      if (typeof targetComponent === 'string')
        targetComponent = this.router.getComponentByName(targetComponent)

      if (!targetComponent) throw `Component not found!`

      this.activeComponent = targetComponent
    } catch (err) {
      console.error(`@setActiveComponent: ${err}`)
    }
  }

  renderComponent(targetComponent, element) {
    this.render.renderComponentOnElement(targetComponent)
  }
}