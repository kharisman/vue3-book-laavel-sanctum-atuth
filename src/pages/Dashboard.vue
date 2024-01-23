<template>
<div class="container">
    <div v-if="loading" class="text-center mt-5">
    Loading...
    </div>
    <div v-else>
    <!-- Display auth data or perform other actions based on the auth state -->
    {{ auth }}
    </div>
</div>
</template>
  
  <script>
  import axios from '@/axios'; // Adjust the path based on your project structure
  
  export default {
    data() {
      return {
        auth: null,
        loading: true,
      };
    },
    methods: {
      async getAuth() {
        try {
          const response = await axios.get('user');
          // Assuming the user data is in response.data
          this.auth = response.data;
        } catch (error) {
          console.error('Error fetching user data', error);
        } finally {
          // Set loading to false whether the request succeeds or fails
          this.loading = false;
        }
      },
    },
    mounted() {
      // Call the getAuth method when the component is mounted
      this.getAuth();
    },
  };
  </script>
  