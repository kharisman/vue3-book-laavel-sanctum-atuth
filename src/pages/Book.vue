<template>
  <div class="container">
    <div v-if="!loading">
      <div class="row">
        <Card v-for="x in books.data.products" :key="x.id" :data="x" />
      </div>
    </div>
    <div v-else>
      <div class="text-center">
        <Loading/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from '@/components/Loading.vue'; // Import the Loading component
import Card from '@/components/Card.vue'; // Import the Card component

export default {
  data() {
    return {
      books: null,
      loading:true,
    };
  },
  components: {
    Loading, // Register the Loading component
    Card, // Register the Card component
  },
  mounted() {
    this.getBook();
  },
  methods: {
    async getBook() {
      try {
        this.books = await axios.get("https://dummyjson.com/products");

      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        
        // Set loading to false regardless of success or failure
        this.loading = false;
      }
    },
  },
};
</script>