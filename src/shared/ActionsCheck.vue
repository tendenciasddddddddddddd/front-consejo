<template>
  <div class="row mt-3">
    <div class="col-lg-6">
      <div class="input-group">
        <span class="input-group-text text-body buscador"><i class="fas fa-search links" aria-hidden="true"></i></span>
        <input type="text" v-model="search" class="form-control buscador" placeholder="Buscar" />
      </div>
    </div>
    <div class="col-lg-3">
      <div class="form-check form-switch mt-2">
               <input @click="$emit('_taskload')" v-model="estados" class="form-check-input" type="checkbox"
                value="1" v-bind:true-value="1" v-bind:false-value="0" :disabled="estado == 1" />
         </div>
    </div>
    <div class="col-lg-3">
      <div class="d-flex justify-content-end mb-3">
        <a class="btn btn btn-vercel" @click="$emit('openModal')">
        <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" style="color: currentcolor;"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          Gardar cambios
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ActionsCheck',
  props: {
     isRoles: Number,
     estado: String
  },
  data() {
    return {
      search: '',
      estados : this.estado
    }
  },
  watch: {
    search: function (value) {
      this.$emit("changeSearch", value);
    }
  }
}
</script>