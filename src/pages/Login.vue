<template>
<div class="container">
    <div class="row justify-content-center">
    <div class="col-md-6 mt-5">
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="login">
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>
    </div>
</div>
</template>
  
  <script>
  // Import the Axios instance
import axios from '@/axios'; // Adjust the path based on your project structure
export default {
  // ...
  data() {
    return {
        username:null,
        password:null,
    }
  },
  methods: {
    async login() {
      try {
        console.log(this.username,this.password);
        const response = await axios.post('login', {
          credentials: this.username,
          password: this.password,
          role_id:2
        });

        // Assuming your Laravel Sanctum returns an API token
        console.log(response.data.data);
        const token = response.data.data.token;

        // Store the token in local storage or Vuex store
        localStorage.setItem('token', token);

        // Redirect or perform any other actions after successful login
        console.log('Login successful');
        // You may want to use Vue Router to redirect
        // this.$router.push('/dashboard');
        this.$router.push('/dashboard');

        
      } catch (error) {
        console.error('Login failed', error);
        // Handle login error, display a message, etc.
      }
    },
  },
};
</script>
  