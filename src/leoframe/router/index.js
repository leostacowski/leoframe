/**
 * Representa o Router do framework.
 * @module Router
 * @param routes {Array} routes - As rotas a serem consideradas pelo router.
 * @property {Array} routes As rotas que o router possui.
 */
export default class Router {
  constructor(routes) {
    this.routes = routes
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
  getComponentByPath(path = this.parseLocation()) {
    try {
      if (typeof path !== 'string') return undefined
      return this.routes.find((route) => route.path === path)
    } catch (err) {
      console.error(`@getComponentByPath: ${err}`)
    }

    return undefined
  }

  /**
   * Retorna o objeto do Componente pelo nome do Componente.
   * @function getComponentByName
   * @param name {String} name - Nome da rota do Componente desejado.
   * @returns {Object | undefined} Objeto do Componente encontrado no Array de rotas pelo nome de um Componente ou indefinido.
   */
  getComponentByName(name) {
    try {
      if (typeof name !== 'string') return undefined
      return this.routes.find((route) => route.name === name)
    } catch (err) {
      console.error(`@getComponentByName: ${err}`)
    }

    return undefined
  }

  /**
   * Executa uma função ao detectar o evento onhashchange do elemento window.
   * @function onRouteChange
   * @param callback {Function} callback - Função a ser executada quando o evento é detectado.
   * @returns {undefined}
   */
  onRouteChange(callback) {
    try {
      if (typeof callback !== 'function') throw `Callback is not a function!`
      window.addEventListener('hashchange', callback)
    } catch (err) {
      console.error(`@onRouteChange: ${err}`)
    }
  }
}
