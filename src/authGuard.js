// authGuard.js
export const authGuard = (to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
      next('/login');
    } else {
      next();
    }
  };