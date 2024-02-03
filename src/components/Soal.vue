<!-- Card.vue -->
<template>
<div class="col-md-3">
    <div class="card">
    <div class="card-body">
        <h5 class="card-title">{{ data.name }}</h5>
        <!-- <p class="card-text">{{ data.status }}</p> -->
        <!-- <a href="#" class="btn btn-primary">Lihat Soal</a> -->
        <router-link :to="generateDynamicLink(data.id)" class="btn btn-primary">
          Lihat Soal
        </router-link>

        <button @click="openEditModal(data)" class="btn btn-secondary">Edit</button>

        <button @click="confirmDelete(data.id)" class="btn btn-danger">Delete</button>
      
     
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

        confirmDelete(id) {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            // Emit an event to the parent component to handle the delete action
            console.log(id);
            this.$emit('delete',id);
        }
        },
    },

    

    
};
</script>

<style scoped>
/* Add your styling here if needed */
</style>
