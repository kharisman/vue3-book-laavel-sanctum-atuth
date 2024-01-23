<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Book Store</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" :class="{ 'active': $route.path === '/' }">
                <router-link to="/" class="nav-link" exact>Beranda</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/book' }">
              <router-link to="/book" class="nav-link" exact>Buku</router-link>
            </li>
          </ul>
          
          <!-- Move the search bar to the center -->
          <form class="d-flex justify-content-center">
            <input class="form-control me-2" type="search" placeholder="Anda bisa mencari buku di sini" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Cari</button>
          </form>
          
          <router-link to="/login" class="btn btn-outline-primary ms-2" exact>Login</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.nav-item.active a {
  color: blue !important; /* Atur warna teks menjadi biru */
  font-weight: bold; /* Teks menjadi bold */
}

/* Style for the login button */
.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>
