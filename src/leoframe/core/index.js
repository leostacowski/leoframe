export default class Leo {
  constructor({ router }) {
    this.app = undefined
    this.router = Leo.getNewRouterInstace(router)
  }

  begin(id) {
    this.app = Leo.getNewAppInstance(id)
    return this
  }

  static getNewAppInstance(id) {
    return {
      id,
      html: document.getElementById(id),
    }
  }

  static getNewRouterInstace(router) {
    return router
  }
}
