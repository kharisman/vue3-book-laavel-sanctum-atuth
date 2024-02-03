<template>
    <div class="coontainer">
        <h3>Tambah Kategori</h3>
        
        <a href="/dashboard/kategori" class="btn btn-primary btn-sm" >  Lihat Kategori </a>
        <form @submit.prevent="addCat" v-if="!loading">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="text" class="form-control" v-model="name" >
                <div v-if="errorMessages?.name" class="text-danger">{{ errorMessages.name[0] }}</div>
                <div v-else ></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div v-else> <Loading/> </div>
    </div>
</template>
<script>

import axios from '@/axios'; 
import Loading from '@/components/Loading.vue';

export default {
    components : {
        Loading
    },
    data() {
        return {
            loading:false,
            name:null,
            errorMessages: null, // Initialize errorMessages property
        }
    },
    methods: {
        view (){
            this.$emit('tambah');
        },
        async addCat(){
           this.loading = true
           try {
                const response = await axios.post('kategori/add', {
                    name:this.name,
                })
                console.log(response.data.status);
                this.errorMessages = null
                this.name= null
                this.$swal.fire({
                    title: 'Berhasil!',
                    text: 'Kategori berhasil ditambah',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                this.loading = false
           } catch (error) {


            if (error.response && error.response.status === 422) {
            // Validation error response
                this.errorMessages = error.response.data.errors;
                // console.log(this.errorMessages);
                this.loading = false
            } else {
                // Handle other types of errors, display a generic message, etc.
                // For example, you might set a general error message here.
                this.loading = false
            }
            
           } finally{
                console.log(1);
           }
        }
    },
}
</script>