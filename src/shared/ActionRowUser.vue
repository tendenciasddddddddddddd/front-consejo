<template>
    <div class="row mt-1">
        <div class="col-5">
            <div class="input-group">
                <span class="input-group-text text-body buscador">
                   <svg style="margin-top: -7px;" class="links" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path><path d="M16 16l4.5 4.5"></path></svg>
                </span>
                    
                <input type="text" v-model="search" class="form-control buscador" placeholder="Buscar" />
            </div>
        </div>
        <div class="col-7">
            <div class="d-flex justify-content-start">
                <a @click="$emit('getDataAlls')" role="button" class="fuente tamanio ms-2 me-2 btnOption"
                    v-tooltip.top-center="'Actualizar datos'">
                   <svg class="links center-icon" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" ><path d="M1 4v6h6"></path><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg>
                </a>
                <a @click="$emit('gets')" role="button" class="fuente tamanio me-2 btnOption"
                    :class="{ disabled: longitude != 1 }" v-tooltip.top-center="longitude? '': 'Seleccionar una item para editar'">
                        <svg class="center-icon" :class="{ links: longitude === 1 }" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" ><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </a>
                <a @click="$emit('examDetail')" role="button" class="fuente tamanio me-2 btnOption"
                    :class="{ disabled: longitude != 1 }" v-tooltip.top-center="longitude? '': 'Seleccionar una item para mostrar'">
                    <svg class="center-icon" :class="{ links: longitude === 1 }" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" ><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </a>
               
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
.btnOption{
    width: 34px;
    height: 34px;
    border-radius: 5px;
    border: 1px solid #E8EAF0;
}
.center-icon{
        margin: 5px;
}
</style>