import EventEmitter from 'wolfy87-eventemitter'

/**
 * Representa a instância Script do componente.
 * @module Script
 * @param {ComponentScript} ComponentScript - Classe Script do componente transpilado do HTMLElement SCRIPT.
 * @property {Proxy} instance - Instância de objeto Proxy contendo a instância da classe exportada Script transpilada do SCRIPT do componente.
 * @property {EventEmitter} emitter - Instância da classe EventEmitter, responsável por gerenciar eventos em Javascript fora do âmbito do DOM.
 */
export default class Script {
  constructor(ComponentScript) {
    this.instance = this.getTracedInstance(new ComponentScript())
    this.emitter = new EventEmitter()

    this.onStart()
  }

  onStart() {
    if (this.instance.onStart && typeof this.instance.onStart === 'function')
      this.instance.onStart()
  }

  onFinish() {
    if (this.instance.onFinish && typeof this.instance.onFinish === 'function')
      this.instance.onFinish()
  }

  /**
   * Retorna uma instância de Proxy contendo uma instância do ComponentScript.
   * @function getTracedInstance
   * @param instance {ComponentScript} instance - Objeto literal contido nas rotas do Router.
   * @returns {Proxy}
   */
  getTracedInstance(instance) {
    const self = this

    return new Proxy(instance, {
      get(object, propName) {
        return Reflect.get(object, propName)
      },

      set: function (object, propName, value) {
        Reflect.set(object, propName, value)

        self.emitter.emitEvent('change')

        return true
      },
    })
  }
}
