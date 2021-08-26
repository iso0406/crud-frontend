import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ListExpense from '../views/Expense/List.vue'
import RegisterExpense from '../views/Expense/Register.vue'
import EditExpense from '../views/Expense/Edit.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/expenses',
    name: 'ListExpense',
    component: ListExpense
  },
  {
    path: '/expenses/create',
    name: 'CreateExpense',
    component: RegisterExpense
  },
  {
    path: '/expenses/edit/:id',
    name: 'EditExpense',
    component: EditExpense
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
