// guestGuard.js
export const guestGuard = (to, from, next) => {
    if (to.meta.requiresGuest && localStorage.getItem('token')) {
      next('/dashboard');
    } else {
      next();
    }
  };
  