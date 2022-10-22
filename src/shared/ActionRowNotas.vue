<template>
    <div class="row mt-1 mb-2">
        <div class="col-lg-3">
            <div class="input-group">
                <span class="input-group-text negros buscador busca">
                    <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
                </span>
                <input type="text" v-model="search" class="form-control buscador buscaa" placeholder="Buscar" />
            </div>
        </div>
        
        <div class="col-lg-9">
            <div class="d-flex justify-content-end">
                <button class="btn btn btnNaranja2 me-2" @click="$emit('toggle')">
                    Pantalla completa
                </button>
                <button class="btn btn btnNaranja2 me-2" @click="$emit('open')">
                    Imprimir reporte
                </button>
                <button class="btn btn btnNaranja" @click="$emit('save')">
                    Guardar cambios
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
            quimestre: 'p1',
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