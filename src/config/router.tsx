import { RouteRecordRaw } from 'vue-router'
import { Welcome } from '../views/Welcome'
import { First } from '../components/welcome/First'
import { FirstActions } from '../components/welcome/FirstActions'
import { Second } from '../components/welcome/Second'
import { SecondActions } from '../components/welcome/SecondActions'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome/1' },
  {
    path: '/welcome',
    component: Welcome,
    children: [
      { path: '', redirect: '/welcome/1' },
      {
        path: '1',
        name: 'Welcome1',
        components: { main: First, footer: FirstActions }
      },
      {
        path: '2',
        name: 'Welcome2',
        components: { main: Second, footer: SecondActions }
      },
    ]
  }
]
