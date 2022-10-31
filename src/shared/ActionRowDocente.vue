<template>
    <div class="row ">
        <div class="col-lg-4">
            <div class="input-group">
                <span class="input-group-text text-body buscador busca">
                    <svg style="margin-top: -7px;"  data-testid="geist-icon" fill="none" height="20"
                        shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20">
                        <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path>
                        <path d="M16 16l4.5 4.5"></path>
                    </svg>
                </span>

                <input type="text" v-model="search" class="form-control buscador buscaa" placeholder="Buscar" />
            </div>
        </div>
        <div class="col-lg-8">
            <div class="d-flex justify-content-end mb-3">
                <button  v-if="longitude != 0" role="botton"   class="btn btnNaranja3 me-2"  @click="$emit('remove')">
                    Eliminar
                </button> 
                <button  v-if="longitude == 1"  class="btn btnNaranja2 me-2"  @click="$emit('gets')">
                    Editar
                </button>
                <button  class="btn btnNaranja2 me-2"  @click="$emit('getDataAlls')">
                    Actualizar
                </button> 
                <button  class="btn btnNaranja" @click="$emit('openModal')">
                Añaidir 
                </button>
            </div>
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