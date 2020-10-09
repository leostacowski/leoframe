import Home from './components/Home.html'
import Reactive from './components/Reactive.html'
import Static from './components/Static.html'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/reactive',
    name: 'Reactive',
    component: Reactive,
  },

  {
    path: '/static',
    name: 'Static',
    component: Static,
  },
]
