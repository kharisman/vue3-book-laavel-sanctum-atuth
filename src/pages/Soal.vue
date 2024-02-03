<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-3">
          <Menu />
        </div>
        <div class="col-9">
          <h3>Soal</h3>

            <button @click="openModal" class="btn btn-primary mb-3">Tambah Soal</button>

            <div v-if="!loading" class="row"> <Soal v-for="x in kuis" :key="x.id" :data="x"  @edit="editSoal"  @delete="deleteSoal"/>  </div>
            <div v-else><Loading/></div>
        </div>
      </div>

        <!-- Custom modal for adding a new question -->
        <div v-if="modalOpen" class="custom-modal">
          <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Form Tambah Soal</h2>

            <!-- Form for adding a new question -->
            <form @submit.prevent="handleSubmit">
              <label for="name">Name:</label>
              <input type="text" v-model="newSoalName">
              <div v-if="errorMessages?.name" class="text-danger">{{ errorMessages.name[0] }}</div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>


        <!-- Custom modal for editing a question -->
      <div v-if="editModalOpen" class="custom-modal custom-modal-small">
        <div class="modal-content">
          <span class="close" @click="closeEditModal">&times;</span>
          <h2>Edit Soal</h2>

          <!-- Form for editing a question -->
          <form @submit.prevent="handleEdit">
            <label for="editName">Name:</label>
            <input type="text" v-model="editedSoalName">
            <div v-if="editErrorMessages?.name" class="text-danger">{{ editErrorMessages.name[0] }}</div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>


    </div>

    
</template>
  
  <script>
  import Menu from '@/components/Menu.vue'
  import Soal from '@/components/Soal.vue'
  import axios from '@/axios'; // Adjust the path based on your project structure
  
  import Loading from '@/components/Loading.vue'; // Import the Loading component
  
  export default {
    data() {
      return {
        kuis: null,
        loading:true,
        modalOpen: false,
        newSoalName: '',
        errorMessages: null, // Initialize errorMessages property
        editModalOpen: false,
        editedSoalName: '',
        editErrorMessages: null,
        editingSoal: null,
      }
    },
    components: {
      Menu,
      Loading, 
      Soal,
    },
    methods: {
      async getBook() {
        try {
          const response = await axios.get('kuis');
          this.kuis = response.data.data; // Assuming the data property holds the kuis array
          // console.log(this.kuis);
        } catch (error) {
          console.error("Error fetching kuis:", error);
        } finally {
          // console.log(121);
          this.loading=false;
        }
      },
      openModal() {
        this.modalOpen = true;
      },
      closeModal() {
        this.modalOpen = false;
      },
      async handleSubmit() {
        try {
          this.loading = true; // Set loading to true when starting the login process

          console.log(this.username, this.password);
          const response = await axios.post('kuis/add', {
            name: this.newSoalName,
          });

          // Assuming your Laravel Sanctum returns an API token
          console.log(response.data.data);

          // Push the new data into the kuis array
          this.kuis.unshift(response.data.data);
          

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
          alert("Berhasil");
        }
      },
      editSoal(data) {
        // Open the edit modal and set the data to be edited
        this.editingSoal = data;
        this.editedSoalName = data.name;
        this.editErrorMessages = null;
        this.editModalOpen = true;
      },
      closeEditModal() {
        // Close the edit modal and reset the edited data
        this.editModalOpen = false;
        this.editedSoalName = '';
        this.editErrorMessages = null;
        this.editingSoal = null;
      },

      async handleEdit() {
        try {
          // Handle the edit logic here, use Axios to make the edit request
          // Example assumes an API endpoint for editing is available at 'kuis/edit'
          const response = await axios.post('kuis/edit', {
            id: this.editingSoal.id,
            name: this.editedSoalName,
          });

          
           // Find the index of the edited item in the kuis array
          const index = this.kuis.findIndex(soal => soal.id === this.editingSoal.id);

          if (index !== -1) {
            // Create a new array with the updated item
            const updatedKuis = [...this.kuis];
            updatedKuis[index] = response.data.data;

            // Assign the updated array to maintain reactivity
            this.kuis = updatedKuis;
          }

          // Close the edit modal
          this.closeEditModal();
          console.log('Soal edited successfully:', response.data.data);

        } catch (error) {
          console.error('Error editing soal:', error);

          if (error.response && error.response.status === 422) {
            // Validation error response
            this.editErrorMessages = error.response.data.errors;
          } else {
            // Handle other types of errors
          }
        }
      },

      async deleteSoal(id) {
      try {
        const response = await axios.post('kuis/delete', {
          id:id,
        });
        // Handle successful deletion, update your kuis array, etc.
        // Find the index of the deleted item in the kuis array
        const index = this.kuis.findIndex(soal => soal.id === id);

        if (index !== -1) {
          // Create a new array without the deleted item
          const updatedKuis = [...this.kuis.slice(0, index), ...this.kuis.slice(index + 1)];

          // Assign the updated array to maintain reactivity
          this.kuis = updatedKuis;
        }

        console.log('Soal deleted successfully:', response.data);
      } catch (error) {
        console.error('Error deleting soal:', error);
        // Handle error, display a message, etc.
      }
    },

    },
    mounted() {
      this.getBook(); 
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
  