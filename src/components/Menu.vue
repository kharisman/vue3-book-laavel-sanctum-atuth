<template>
    <div>
      <ul class="nav flex-column">
        <router-link
          :to="{ name: 'dashboard' }"
          tag="li"
          class="nav-item"
          exact
          active-class="active"
        >
          <a class="nav-link">Dashboard</a>
        </router-link>
        <router-link
          :to="{ name: 'info' }"
          tag="li"
          class="nav-item"
          exact
          active-class="active"
        >
          <a class="nav-link">Info</a>
        </router-link>
  
        <router-link
          :to="{ name: 'soal' }"
          tag="li"
          class="nav-item"
          exact
          active-class="active"
        >
          <a class="nav-link">Soal</a>
        </router-link>
  
        
      </ul> 
    </div>
</template>
  
  <script>
  export default {
    // ...
  };
  </script>
  
<style scoped>
  .active {
    color: red;
    font-weight: bold;
    /* Tambahkan properti CSS lain sesuai kebutuhan */
  }
  
  .nav-item {
    /* Gaya umum untuk item menu */
  }
</style>
  