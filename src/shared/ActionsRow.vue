<template>
  <div class="row mt-3">
    <div class="col-lg-3">
      <div class="input-group">
        <span class="input-group-text negros buscador busca">
          <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
        </span>
        <input type="text" v-model.lazy="search" class="form-control buscador buscaa" placeholder="Buscar" />
      </div>
    </div>
    <div class="col-lg-7">
      <a @click="$emit('gets')" v-tooltip.top-center="longitude == 1 ? '' : 'Seleccione una fila para editar'"
        role="button" class="tamanio" :class="{ disabled: longitude != 1 }">
        <svg style=" margin-top: -3px;" class="me-2" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="18" ><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        <b class="me-3 gordo" :class="{ links: longitude === 1 }">Editar</b>
      </a>
      <a v-on="longitude ? { click: () => $emit('remove') } : {}" role="button" class=" tamanio"
        :class="{ disabled: longitude === 0 }"
        v-tooltip.top-center="longitude != 0 ? '' : 'Seleccione una o muchas filas para eliminar'">
        <svg style=" margin-top: -3px;" class="me-2 " data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="18"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
        <b class="me-3 gordo" :class="{ links: longitude != 0 }">Eliminar de la cuenta</b>
      </a>
      <a @click="$emit('desactiveState')" role="button" class=" tamanio" :class="{ disabled: longitude != 1 }"
        v-tooltip.top-center="longitude == 1 ? '' : 'Seleccione una fila para cambiar estado'">
        <svg style=" margin-top: -3px;" class="me-2 " data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="18" ><path d="M17 1l4 4-4 4"></path><path d="M3 11V9a4 4 0 014-4h14"></path><path d="M7 23l-4-4 4-4"></path><path d="M21 13v2a4 4 0 01-4 4H3"></path></svg>
       <b class="me-3 gordo" :class="{ links: longitude === 1 }">Cambiar estado</b>
      </a>
      <a v-if="ifGrids==1" @click="$emit('openModalh')" role="button" class=" tamanio" >
        
        <svg style=" margin-top: -3px;" class="me-2 " data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="18" ><path d="M3 3h7v7H3z"></path><path d="M14 3h7v7h-7z"></path><path d="M14 14h7v7h-7z"></path><path d="M3 14h7v7H3z"></path></svg>
       <b class="links gordo">Añadir con grilla</b>
      </a>
    </div>
    <div class="col-lg-2">
      <div class="d-flex justify-content-end mb-3">
        <a class="btn btn-vercel" @click="$emit('openModal')">
        <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" style="color: currentcolor;margin-top: -3px;"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          Añadir nuevo
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
    ifGrids : Number
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