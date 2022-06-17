<template>
  <div class="row mt-3">
    <div class="col-lg-3">
      <div class="input-group">
        <span class="input-group-text text-body buscador"><i class="fas fa-search links" aria-hidden="true"></i></span>
        <input type="text" v-model="search" class="form-control buscador" placeholder="Buscar" />
      </div>
    </div>
    <div class="col-lg-6">
      <div class="d-flex justify-content-start">
        <div class="isPaginateActive">
           <div v-if="!allSelecteds" class="form-check " style="min-height: 0rem;margin-bottom: 0rem;">
          <input @click="$emit('selectAll')" class="form-check-input cheka" type="checkbox" />
        </div>
        <i @click="$emit('deletedSelected')" v-else  class="fa fa-minus s-icon-all" aria-hidden="true"></i>
        </div>
       
        <a  @click="$emit('getDataAlls')" role="button" class="fuente tamanio ms-2 me-2 isPaginateActive" v-tooltip.top-center="'Crear nueva tarea'">
          &nbsp; <i class="fa fa-refresh links" style="font-size: 17px;"></i>&nbsp;
        </a>
        <a @click="$emit('gets')" role="button" class="fuente tamanio me-2 isPaginateActive"
          :class="{ disabled: longitude != 1 }" v-tooltip.top-center="
            longitude
              ? ''
              : 'Seleccionar una tarea para editar'
          ">
          &nbsp; <i class="fas fa-pencil-alt" style="font-size: 17px;" :class="{ links: longitude === 1 }"></i>&nbsp;

        </a>
        <a v-if="isRoles" role="button" class="fuente tamanio  isPaginateActive" :class="{ disabled: longitude === 0 }" v-on="
          longitude ? { click: () => $emit('remove') } : {}
        " v-tooltip.top-center="
  longitude
    ? ''
    : 'Seleccionar una o muchas tareas para eliminar'
">
          &nbsp; <i class="far fa-trash-alt " style="font-size: 17px;" :class="{ links: longitude != 0 }"></i> &nbsp;

        </a>
      </div>


    </div>
    <div v-if="isRoles" class="col-lg-3">
      <div v-if="!isbtn" class="d-flex justify-content-end mb-3">

        <a class="btn btn btn-vercel" @click="$emit('openModal')">
        <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" style="color: currentcolor;"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          Crear tarea
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
     isRoles: Number,
     isbtn: Number,
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