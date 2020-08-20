import Leo from './leojs/core'
import Router from './leojs/router'
import Routes from './routes'

new Leo({
  router: new Router(Routes),
})
