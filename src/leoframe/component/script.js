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

    this.instance.funcao()
  }

  getTracedInstance(instance) {
    const self = this

    return new Proxy(instance, {
      get(object, propName) {
        //   const constructorName = object.__proto__.constructor.name
        //   console.log(`GET ${constructorName}.${propName}`)

        return Reflect.get(object, propName)
      },

      set: function (object, propName, value) {
        //   const constructorName = object.__proto__.constructor.name
        //   console.log(`SET ${constructorName}.${propName} = ${value}`)

        self.emitter.emitEvent('change')

        return Reflect.set(object, propName, value)
      },
    })
  }
}
