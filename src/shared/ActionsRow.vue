<template>
   <div class="row mt-3">
            <div class="col-lg-3">
              <div class="input-group">
                <span class="input-group-text text-body buscador"
                  ><i class="fas fa-search links" aria-hidden="true"></i
                ></span>
                <input
                  type="text"  v-model.lazy="search"
                  class="form-control buscador"
                  placeholder="Buscar"
                />
              </div>
            </div>
            <div class="col-lg-6">
              <a
                @click="$emit('gets')" v-tooltip.top-center="longitude==1 ? '' : 'Seleccione una fila para editar'"
                role="button"
                class="fuente tamanio"
                :class="{ disabled: longitude != 1 }"
              >
                <i class="fas fa-pencil-alt me-2 ms-1 iconos"></i>
                <b class="me-4 " :class="{ links: longitude === 1 }"
                  >Editar</b
                >
              </a>
              <a
                v-on="longitude ? { click: () => $emit('remove') } : {}"
                role="button"
                class="fuente tamanio"
                :class="{ disabled: longitude === 0 }"  v-tooltip.top-center="longitude!=0 ? '' : 'Seleccione una o muchas filas para eliminar'"
              >
                <i class="far fa-trash-alt me-2 iconos"></i>
                <b class="me-4 " :class="{ links: longitude != 0 }"
                  >Eliminar registro</b
                >
              </a>
              <a
              @click="$emit('desactiveState')"
              role="button"
              class="fuente tamanio"
              :class="{ disabled: longitude != 1 }"
               v-tooltip.top-center="longitude==1 ? '' : 'Seleccione una fila para cambiar estado'"
            >
              <i class="fas fa-sync me-2  iconos"></i>
             
              <b :class="{ links: longitude === 1 }"
                >Cambiar estado</b
              >
            </a>
            </div>
            <div class="col-lg-3">
              <div class="d-flex justify-content-end mb-3">             
               <a
               @click="$emit('openModalh')"
                type="button"
                class="fuente tamanio me-3 pt-1"
              >
                <i class="fa fa-cloud-download me-2  iconos"></i>
                <b class="links">Exportar </b>
              </a>
                <a class="btn btn-sm btnNaranja" @click="$emit('openModal')">
                  Crear registro 
                </a>
              </div>
            </div>
        </div>
</template>
<script>
export default {
  name: 'ActionsRow',
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