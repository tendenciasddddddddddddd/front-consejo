<template>
   <div class="input-group">
        <span class="input-group-text text-body buscador"><i class="fas fa-search links" aria-hidden="true"></i></span>
        <input type="text" v-model="search" class="form-control buscador" placeholder="Buscar" />
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