import Home from './components/Home.html'
import ComponentA from './components/ComponentA.html'
import ComponentB from './components/ComponentB.html'
import DepInjection from './components/DependencyInjection.html'
import TwoWayDataBinding from './components/TwoWayDataBinding.html'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/componente-a',
    name: 'ComponentA',
    component: ComponentA,
  },

  {
    path: '/componente-b',
    name: 'ComponentB',
    component: ComponentB,
  },

  {
    path: '/injecao-de-dependencias',
    name: 'DepInjection',
    component: DepInjection,
  },

  {
    path: '/two-way-data-binding',
    name: 'TwoWayDataBinding',
    component: TwoWayDataBinding,
  },
]
