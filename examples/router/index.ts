import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DockLayoutBaseTest from '../views/DockLayoutBaseTest.vue'
import DockLayoutCustomTest from '../views/DockLayoutCustomTest.vue'
import DockLayoutExtraTest from '../views/DockLayoutExtraTest.vue'
import DockLayoutDataTest from '../views/DockLayoutDataTest.vue'
import DockLayoutThemeTest from '../views/DockLayoutThemeTest.vue'
import HomeView from '../views/DockLayoutTests.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'DockLayoutBaseTest',
        component: DockLayoutBaseTest
      },
      {
        path: 'DockLayoutCustomTest',
        name: 'DockLayoutCustomTest',
        component: DockLayoutCustomTest
      },
      {
        path: 'DockLayoutDataTest',
        name: 'DockLayoutDataTest',
        component: DockLayoutDataTest
      },
      {
        path: 'DockLayoutExtraTest',
        name: 'DockLayoutExtraTest',
        component: DockLayoutExtraTest
      },
      {
        path: 'DockLayoutThemeTest',
        name: 'DockLayoutThemeTest',
        component: DockLayoutThemeTest
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
