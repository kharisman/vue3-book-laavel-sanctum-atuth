<!-- Card.vue -->
<template>
<div class="col-md-3">
    <div class="card">
    <div class="card-body">
        <h5 class="card-title">{{ data.name }}</h5>
        <p class="card-text">{{ data.status }}</p>
        <!-- <a href="#" class="btn btn-primary">Lihat Soal</a> -->
        <router-link :to="generateDynamicLink(data.id)" class="btn btn-primary">
          Lihat Soal
        </router-link>

        <button @click="openEditModal(data)" class="btn btn-secondary">Edit</button>
     
    </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        data: Object, // Pass the data as a prop
    },
    methods: {
        generateDynamicLink(id) {
        // Customize the route or URL structure based on your requirements
        return `soal/${id}`; // Example: /soal/123
        },

        openEditModal(data) {
        // Emit an event to the parent component to handle opening the edit modal
        console.log(data);
        this.$emit('edit', data);
        },
    },

    
};
</script>

<style scoped>
/* Add your styling here if needed */
</style>
