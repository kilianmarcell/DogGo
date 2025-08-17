import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('../components/sites/HomePage.vue')
const Text = () => import('../components/parts/Text.vue')
const Locations = () => import('../components/parts/Locations.vue')
const Footer = () => import('../components/layouts/Footer.vue')
const Register = () => import('../components/authentication/Register.vue')
const Login = () => import('../components/authentication/Login.vue')
const Info = () => import('../components/parts/Info.vue')
const UserData = () => import('../components/parts/UserData.vue')
const MyLocations = () => import('../components/parts/MyLocations.vue')
const Error = () => import('../components/parts/Error.vue')
const Ratings = () => import('../components/parts/Ratings.vue')

const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/regisztracio',
      name: 'Register',
      component: Register
    },
    {
      path: '/bejelentkezes',
      name: 'Login',
      component: Login
    },
    {
      path: '/doggoinformacio',
      name: 'Info',
      component: Info
    },
    {
      path: '/felhasznalo',
      name: 'UserData',
      component: UserData
    },
    {
      path: '/helyek',
      name: 'MyLocationsPage',
      component: MyLocations
    },
    {
      path: '/hibajelentes',
      name: 'ErrorPage',
      component: Error
    },
    {
      path: '/ertekelesek/:id',
      name: 'RatingsPage',
      component: Ratings
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
