import Leo from './leoframe/core'
import Router from './leoframe/router'
import Routes from './routes'

new Leo({
  router: new Router(Routes),
})
