<template>
    <div class="row ">
        <div class="d-flex justify-content-start mb-3">
            <button  class="btn btnNaranja me-2" @click="$emit('openModal')">
                Añaidir 
                </button>
                <button  class="btn btnNaranja2 me-2"  @click="$emit('getDataAlls')">
                    Actualizar
                </button>
                <button  v-if="longitude == 1"  class="btn btnNaranja2 me-2"  @click="$emit('gets')">
                    Editar
                </button>
                
                <button  v-if="longitude != 0" role="botton"   class="btn btnNaranja3 me-2"  @click="$emit('remove')">
                    Eliminar
                </button>  
            </div>
    </div>
</template>
<script>
export default {
    name: 'ActionsTrask',
    props: {
        longitude: {
            type: Number,
        },
        allSelecteds: Boolean,
    },
    data() {
        return {
            search: '',
        }
    },
    watch: {
        search: function (value) {
            this.$emit("changeSearch", value);
        }
    }
}
</script>
<style>
.btnOption {
    width: 34px;
    height: 34px;
    border-radius: 5px;
    border: 1px solid #E8EAF0;
}
.center-icon {
    margin: 5px;
}
</style>