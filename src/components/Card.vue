<!-- Card.vue -->
<template>
<div class="col-md-3">
    <div class="card">
    <img :src="data.images[0]" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{ data.title }}</h5>
        <p class="card-text">{{ data.desc }}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        data: Object, // Pass the data as a prop
    },
};
</script>

<style scoped>
/* Add your styling here if needed */
</style>
