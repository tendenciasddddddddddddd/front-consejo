<template>
    <div class="row mt-1">
        <div class="col-3">
            <div class="input-group " >
                <span class="input-group-text text-body buscador busca">
                    <svg style="margin-top: -7px;" class="links" data-testid="geist-icon" fill="none" height="20"
                        shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20">
                        <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path>
                        <path d="M16 16l4.5 4.5"></path>
                    </svg>
                </span>
                <input type="text" v-model="search" class="form-control buscador buscaa" placeholder="Buscar" />
            </div>
        </div>
       
        <div class="col-9">
            <div class="d-flex justify-content-end mb-3">
                <!-- <button class="btn btnNaranja2 me-2">
                    <div v-if="!allSelecteds" class="form-check center-icon ">
                        <input @click="$emit('selectAll')" class="form-check-input cheka " type="checkbox" />
                    </div>
                    <i @click="$emit('deletedSelected')" v-else class="fa fa-minus s-icon-all center-icon" aria-hidden="true"></i>
                </button> -->
                <button v-if="!$store.state.isAppMobile" :disabled="longitude != 1" class="btn btnNaranja2 me-2"  @click="$emit('gets')">
                    Actualizar
                </button>
                <a v-else @click="$emit('gets')" role="button" class="fuente tamanio me-2 btnOption"
                    :class="{ disabled: longitude != 1 }"
                    v-tooltip.top-center="longitude ? '' : 'Seleccionar una item para editar'">
                    <svg class="center-icon" :class="{ links: longitude === 1 }" data-testid="geist-icon" fill="none"
                        height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                </a>
                <button role="botton" v-if="!$store.state.isAppMobile" :disabled="longitude === 0" class="btn btnNaranja2 me-2"  @click="$emit('remove')">
                    Eliminar
                </button>
                <a v-else @click="$emit('remove')" role="button" class="fuente tamanio me-2 btnOption"
                    :class="{ disabled: longitude === 0 }"
                    v-tooltip.top-center="longitude ? '' : 'Seleccionar uno o varios items para eiminar'">
                    <svg class="center-icon" :class="{ links: longitude != 0 }" data-testid="geist-icon" fill="none"
                        height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                    </svg>
                </a>
                <button v-if="!$store.state.isAppMobile" class="btn btnNaranja2 me-2"  @click="$emit('getDataAlls')">
                    Actualizar
                </button>
                <button v-if="!$store.state.isAppMobile" class="btn btnNaranja" @click="$emit('openModal')">
                    Añaidir
                </button>
                <a v-else class="fuente tamanio me-2 btnOption" @click="$emit('openModal')">
                    <svg class="center-icon negros" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        viewBox="0 0 24 24" width="20" style="color: currentcolor;">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                    </svg>
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