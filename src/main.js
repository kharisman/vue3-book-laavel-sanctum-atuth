import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from '@/pages/Home.vue'
import Book from '@/pages/Book.vue'
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'

import { authGuard } from '@/authGuard';
import { guestGuard } from '@/guestGuard';

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: false }, beforeEnter: authGuard },
    { path: '/home', component: Home, meta: { requiresAuth: true }, beforeEnter: authGuard },
    { path: '/book', component: Book, meta: { requiresAuth: true }, beforeEnter: authGuard },
    { path: '/login', component: Login, meta: { requiresGuest: true }, beforeEnter: guestGuard },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }, beforeEnter: authGuard },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });




const app = createApp(App)
app.use(router);
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
