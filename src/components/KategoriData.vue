<template>
        <div>
            <div v-if="loading"><Loading/></div>
            <div v-else>
                <h3>Kategori</h3>
                <button class="btn btn-primary btn-sm" @click="viewA()">tambah Katageri</button>
                <DataTable class="display table table-bordered" v-if="kategori" :key="kategori.length">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Ktegori</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for=" (x,index) in kategori" :key="x.id">
                            <td>{{ index+1 }}</td>
                            <td>{{ x.name }}</td>
                            <td>
                                <a class="btn btn-sm btn-warning" @click="getC(x)"> Edit </a>
                            </td>
                        </tr>
                    </tbody>
                </DataTable>
                <div v-else class="alert alert-danger">Data belum ada</div>
            </div>

            <!-- Custom modal for editing a question -->
            <div v-if="editModalOpen" class="custom-modal custom-modal-small">
                <div class="modal-content">
                <span class="close" @click="closeEditModal">&times;</span>
                <h2>Edit Kategori</h2>


                <form  @submit.prevent="editCat" >
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nama Kategori</label>
                        <input type="text" class="form-control" v-model="name" >
                        <div v-if="errorMessages?.name" class="text-danger">{{ errorMessages.name[0] }}</div>
                        <div v-else ></div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

                
                </div>
            </div>
        </div>

</template>

<script>

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
DataTable.use(DataTablesCore);

import Loading from '@/components/Loading.vue';
        
import axios from '@/axios'; 
export default {
    components : {
        Loading,
        DataTable
    },
    data() {
        return {
            loading:true,
            kategori:null,
            editModalOpen: false,
            errorMessages:null,
            name:null,
            kat:null
        }
    },
    methods: {
        async getCat(){
            try {

                const response = await axios.get('kategori');
                this.kategori = response.data.data; // Assuming the data property holds the kuis array
                // console.log(this.kategori);
            } catch (error) {
                console.error("Error fetching kuis:", error);
            } finally {
                this.loading = false
            }
        },
        
        viewA(){
            this.$emit('view');
        },
        getC(data){
            try {
                this.editModalOpen=true
                this.name=data.name
                this.kat=data
            } catch (error) {
                
            }
        },
        closeEditModal() {
            // Close the edit modal and reset the edited data
            this.editModalOpen = false;
        },

        async editCat(){
           try {
                const res = await axios.post('kategori/edit', {
                    id:this.kat.id,
                    name:this.name,
                })
                console.log(res.data.status);
                // console.log(1);

                this.errorMessages = null
                this.name= null
                this.editModalOpen= false
                this.$swal.fire({
                    title: 'Berhasil!',
                    text: 'Kategori berhasil dibah',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                 // Find the index of the edited item in the kuis array
                const index = this.kategori.findIndex(k => k.id === this.kat.id);
                if (index !== -1) {
                // Create a new array with the updated item
                const updatedKuis = [...this.kategori];
                updatedKuis[index] = res.data.data;

                // Assign the updated array to maintain reactivity
                this.kategori = updatedKuis;
                console.log(res.data.data);
                }
           } catch (error) {


            if (error.response && error.response.status === 422) {
            // Validation error response
                this.errorMessages = error.response.data.errors;
                // console.log(this.errorMessages);
            } else {
                // Handle other types of errors, display a generic message, etc.
                // For example, you might set a general error message here.
            }
            
           } finally{
                // console.log("ok");
           }
        }

    },
    mounted() {
        this.getCat();
    },
}
</script>

<style scoped>
.custom-modal {
  display: block; /* or flex or grid, depending on your layout preference */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black background */
  z-index: 1;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>