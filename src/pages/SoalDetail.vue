<!-- SoalDetail.vue -->
<template>
    <div class="container mt-5">
      <div v-if="loading"><Loading/></div>
      <div v-else>
        <div v-if="soal">
            <h1>{{ soal.name }}</h1>
        </div>
        <div v-else> 404 </div>
      </div>
    </div>
</template>
  
  <script>
  import axios from '@/axios'; // Adjust the path based on your project structure
  import Loading from '@/components/Loading.vue'; // Import the Loading component
  export default {
    // Komponen detail soal
    data() {
        return {
            loading:true,
            soal:null,
        }
    },
    components :{
        Loading
    },
    methods: {
        async getSoal(){

        }
    },
    methods: {
      async getBook() {
        try {
          const response = await axios.get('kuis/'+this.$route.params.id);
          this.soal = response.data.data; // Assuming the data property holds the kuis array
        //   console.log(this.soal);
        } catch (error) {
          console.error("Error fetching kuis:", error);
        } finally {
          console.log(121);
          this.loading=false;
        }
      },
    },
    mounted() {
      this.getBook(); 
    },
  }
  </script>
  
  <style scoped>
  /* Gaya khusus untuk halaman detail soal jika diperlukan */
  </style>
  