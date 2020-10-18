import Home from './components/Home.html'
import Math from './components/Math.html'
import Fetch from './components/Fetch.html'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/exemplo-1',
    name: 'Math',
    component: Math,
  },

  {
    path: '/exemplo-2',
    name: 'Fetch',
    component: Fetch,
  },
]
