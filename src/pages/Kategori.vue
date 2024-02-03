<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-3">
                <Menu />
            </div>
            <div class="col-9">
                <KategoriData v-show="view" @view="viewA"/>
                <KategoriTambah v-show="tambah" @tambah="viewD"/>
            </div>

        </div>
    </div>
</template>
<script>

import Menu from '@/components/Menu.vue';
import KategoriData from '@/components/KategoriData.vue';
import KategoriTambah from '@/components/KategoriTambah.vue';
export default {
    components : {
        Menu,
        KategoriData,
        KategoriTambah
    },
    data() {
        return {
            view:true,
            tambah:false
        }
    },
    methods: {
        viewD(){
            this.view = true
            this.tambah = false
        },
        viewA(){
            this.view = false
            this.tambah = true
        }
    },

}
</script>