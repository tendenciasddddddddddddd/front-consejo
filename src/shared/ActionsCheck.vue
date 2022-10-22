<template>
   <div class="input-group">
        <span class="input-group-text text-body buscador busca"><i class="fas fa-search" aria-hidden="true"></i></span>
        <input type="text" v-model="search" class="form-control buscador buscaa" placeholder="Buscar" />
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