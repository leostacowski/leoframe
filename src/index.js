import Leo from './leoframe/core'
import Router from './leoframe/router'
import Routes from './routes'

// import Mod from './ass.html'

// let parser = new DOMParser()

// let mod = parser.parseFromString(Mod, 'text/html')

// mod = mod.head
// let template = mod.firstElementChild

// console.log(document.documentElement)

// rootElement.appendChild(template.content)

window.leo = new Leo({
  id: 'leo',
  router: new Router(Routes),
})

// leo.rootElement.innerHtml = component.component
