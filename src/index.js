import Leo from './leoframe/core/core'
import Router from './leoframe/router/router'
import Routes from './routes'

window.leo = new Leo({
  id: 'leo',
  router: new Router(Routes),
})
