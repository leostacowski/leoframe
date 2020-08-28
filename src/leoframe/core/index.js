/**
 * Representa o framework e executa a função init().
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
    this.rootElement = undefined
    this.activeComponent = undefined

    this.init()
  }

  /**
   * Inicializa rootElement e handler dos eventos do Router.
   * @function init
   * @returns {undefined}
   */
  init() {
    try {
      this.setRootElement()
      this.setRouterListenerHandler()
    } catch (err) {
      console.error(`@init: ${err}`)
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
   * Inicializa o handler do evento onChangeRoute do Router.
   * @function setRouterListenerHandler
   * @returns {undefined}
   */
  setRouterListenerHandler() {
    const self = this

    this.router.onRouteChange(() => {
      try {
        const currentPath = self.router.getCurrentRoutePath()
        const targetComponent = self.router.getComponentByPath(currentPath)

        if (!targetComponent) throw `Route '${currentPath} not found!'`

        if (!self.isComponentActive(targetComponent.name))
          self.setActiveComponent(targetComponent)
      } catch (err) {
        console.error(`@setRouterListeners: ${err}`)
      }
    })
  }

  /**
   * Verifica se o componente com o nome informado está ativo.
   * @function isComponentActive
   * @param name {String} name - Nome do componente.
   * @returns {boolean}
   */
  isComponentActive(name) {
    return this.activeComponent ? this.activeComponent.name === name : false
  }

  /**
   * Atribui na variável activeComponent um componente por nome ou objeto.
   * @function setActiveComponent
   * @param target {String | Object} target - Nome ou objeto do componente.
   * @returns {boolean}
   */
  setActiveComponent(target) {
    try {
      if (typeof target === 'string')
        target = this.router.getComponentByName(target)

      if (!target) throw `Component '${target}' not found!`

      if (!this.isComponentActive(target.name)) {
        this.activeComponent = target
        this.renderActiveComponent()
      }
    } catch (err) {
      console.error(`@setActiveComponent: ${err}`)
    }
  }

  renderActiveComponent() {}
}
