/**
 * Representa o Router do framework e chama a função init.
 * @module Router
 * @param routes {Array} routes - As rotas a serem consideradas pelo router.
 * @property {Array} routes As rotas que o router possui.
 */
export default class Router {
  constructor(routes) {
    this.routes = routes
    this.init()
  }

  /**
   * Chama a função setHashIfNotExist.
   * @function init
   * @returns {undefined}
   */
  init() {
    this.setHashIfNotExist()
  }

  /**
   * Adiciona o símbolo # na rota do navegador caso ainda não exista.
   * @function setHashIfNotExist
   * @returns {undefined}
   */
  setHashIfNotExist() {
    if (!window.location.hash.includes('#/')) window.location.hash = '#/'
  }

  /**
   * Retorna o caminho da rota atual.
   * @function getCurrentRoutePath
   * @returns {String} Caminho da rota atual a partir do símbolo # senão a rota index /.
   */
  getCurrentRoutePath() {
    try {
      return location.hash.slice(1).toLowerCase() || '/'
    } catch (err) {
      console.error(`@getCurrentRoutePath: ${err}`)
    }

    return '/'
  }

  /**
   * Retorna o objeto do Componente pelo caminho da rota.
   * @function getComponentByPath
   * @param path {String} path - Caminho da rota do Componente desejado.
   * @returns {Object | undefined} Objeto do Componente encontrado no Array de rotas pelo caminho de uma rota ou indefinido.
   */
  getComponentByPath(path = this.getCurrentRoutePath()) {
    try {
      if (typeof path !== 'string') return `Invalid path '${path}'!'`

      const targetComponent = this.routes.find((route) => route.path === path)

      if (!targetComponent) throw `Route '${path} not found!'`

      return targetComponent
    } catch (err) {
      console.error(`@getComponentByPath: ${err}`)
    }
  }

  /**
   * Retorna o objeto do Componente pelo nome do Componente.
   * @function getComponentByName
   * @param name {String} name - Nome da rota do Componente desejado.
   * @returns {Object | undefined} Objeto do Componente encontrado no Array de rotas pelo nome de um Componente ou indefinido.
   */
  getComponentByName(name) {
    try {
      if (typeof name !== 'string') return `Invalid name '${name}'!'`

      const targetComponent = this.routes.find((route) => route.name === name)

      if (!targetComponent) throw `Name '${name} not found!'`

      return targetComponent
    } catch (err) {
      console.error(`@getComponentByName: ${err}`)
    }
  }

  /**
   * Retorna pelo parâmetro do callback o objeto do componente após o evento onhashchange da janela.
   * @function onRouteChange
   * @param callback {Function} callback - Função a ser executada quando o evento é detectado.
   * @returns {undefined}
   */
  onRouteChange(callback) {
    window.onhashchange = () => {
      try {
        if (typeof callback !== 'function') throw `Callback is not a function!`

        const targetComponent = this.getComponentByPath()

        if (!targetComponent) throw `Component not found!`

        callback(targetComponent)
      } catch (err) {
        console.error(`@onRouteChange: ${err}`)
      }
    }
  }

  /**
   * Retorna pelo parâmetro do callback o objeto do componente após o evento onload da janela.
   * @function onFirstLoad
   * @param callback {Function} callback - Função a ser executada quando o evento é detectado.
   * @returns {undefined}
   */
  onFirstLoad(callback) {
    window.onload = () => {
      try {
        if (typeof callback !== 'function') throw `Callback is not a function!`

        const targetComponent = this.getComponentByPath()

        if (!targetComponent) throw `Component not found!`

        callback(targetComponent)
      } catch (err) {
        console.error(`@onFirstLoad: ${err}`)
      }
    }
  }
}
