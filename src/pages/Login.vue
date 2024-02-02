<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 mt-5">
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" >
            <div v-if="errorMessages?.credential" class="text-danger">{{ errorMessages.credential[0] }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" >
            <div v-if="errorMessages?.kata_sandi" class="text-danger">{{ errorMessages.kata_sandi[0] }}</div>
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Login</span>
          </button>
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
      username: null,
      password: null,
      loading: false, // Add loading variable
      errorMessages:null
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true; // Set loading to true when starting the login process

        console.log(this.username, this.password);
        const response = await axios.post('login', {
          credential: this.username,
          kata_sandi: this.password,
          tipe: "admin"
        });

        // Assuming your Laravel Sanctum returns an API token
        console.log(response.data.data);
        const token = response.data.data.token;
        if (token){   
          localStorage.setItem('token', token);
          const res= await axios.get('user')
          
          console.log(res.data.data);
          localStorage.setItem('username', res.data.data.username);
        }

        // Store the token in local storage or Vuex store

        // Redirect or perform any other actions after successful login
        // console.log('Login successful');
        // You may want to use Vue Router to redirect
        // this.$router.push('/dashboard');
        this.$router.push('/dashboard');

      } catch (error) {
        console.error('Login failed', error);
        // Handle login error, display a message, etc.

        if (error.response && error.response.status === 422) {
          // Validation error response
          this.errorMessages = error.response.data.errors;
          // console.log(this.errorMessages);
        } else {
          // Handle other types of errors, display a generic message, etc.
          // For example, you might set a general error message here.
        }
      } finally {
        this.loading = false; // Set loading to false after the login process is complete
      }
    },
  },
};
</script>
