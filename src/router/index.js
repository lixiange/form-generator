
import Vue from 'vue'
import Router from 'vue-router'
import formDesign from '../views/formDesign'


const routes = [
  {
    path: '/',
    redirect: '/formdesign'
  },
  {
    path: '/formdesign',
    name: 'formdesign',
    component: formDesign
  }
]

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
