<template>
  <div class="row mt-3">
    <div class="col-lg-3">
      <div class="input-group">
        <span class="input-group-text text-body buscador"><i class="fas fa-search links" aria-hidden="true"></i></span>
        <input type="text" v-model.lazy="search" class="form-control buscador" placeholder="Buscar" />
      </div>
    </div>
    <div class="col-lg-5">
      <a @click="$emit('gets')" v-tooltip.top-center="longitude == 1 ? '' : 'Seleccione una fila para editar'"
        role="button" class="fuente tamanio" :class="{ disabled: longitude != 1 }">
        <svg style=" margin-top: -3px;" class="me-2 ms-1 text-dark" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        
        <b class="me-4 " :class="{ links: longitude === 1 }">Editar</b>
      </a>
      <a v-on="longitude ? { click: () => $emit('remove') } : {}" role="button" class="fuente tamanio"
        :class="{ disabled: longitude === 0 }"
        v-tooltip.top-center="longitude != 0 ? '' : 'Seleccione una o muchas filas para eliminar'">
        <svg style=" margin-top: -3px;" class="me-2 text-dark" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
      
        <b class="me-4 " :class="{ links: longitude != 0 }">Eliminar</b>
      </a>
      <a @click="$emit('desactiveState')" role="button" class="fuente tamanio" :class="{ disabled: longitude != 1 }"
        v-tooltip.top-center="longitude == 1 ? '' : 'Seleccione una fila para cambiar estado'">
    
        <svg style=" margin-top: -3px;" class="me-2 text-dark" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M17 1l4 4-4 4"></path><path d="M3 11V9a4 4 0 014-4h14"></path><path d="M7 23l-4-4 4-4"></path><path d="M21 13v2a4 4 0 01-4 4H3"></path></svg>
       <b :class="{ links: longitude === 1 }">Estado</b>
      </a>
    </div>
    <div class="col-lg-4">
      <div class="d-flex justify-content-end mb-3">
        <!-- <a @click="$emit('openModalh')" type="button" class="fuente tamanio me-3 pt-1">
          <svg style=" margin-top: -3px;" class="me-2 text-dark" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path></svg>
          
          <b class="links">Clonar</b>
        </a> -->
        <a class="btn btn-vercel-white me-3" @click="$emit('openModal')">
        <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" style="color: currentcolor;margin-top: -3px;"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          Nuevo
        </a>
        <a class="btn btn-vercel " @click="$emit('openModalh')">
       
        <svg style=" margin-top: -3px;" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M18 8h1a4 4 0 010 8h-1"></path><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"></path><path d="M6 1v3"></path><path d="M10 1v3"></path><path d="M14 1v3"></path></svg>
        &nbsp; Muy fácil
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