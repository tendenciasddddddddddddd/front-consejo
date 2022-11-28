<template>
    <div class="row">
      <div class="col">
         <div class="input-group ">
          <span class="input-group-text negros buscador busca">
              <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
            </span>
            <input  type="text"  v-model="search" class="form-control buscador buscaa" placeholder="Buscar por materia o por curso" />
           
          </div>
      </div>
       <div class="col" :style="[$store.state.isAppMobile ? {'min-width': '115px'} : {'min-width': '245px'}]">
            <div class="d-flex justify-content-end">
        <div class="mt-1 ms-2" v-if="IfAdd==1">
          <button v-if="!$store.state.isAppMobile" href="javascript:;" style="margin-top: -3px;" @click="$emit('openCreateCourse')"  class="btn btnNaranja">
             <span class="me-2">Crear curso</span> 
            </button>
            <a v-else href="javascript:;" style="margin-top: -3px;" @click="$emit('openCreateCourse')"  class="btn btn-vercel ">
            <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" style="color: currentcolor;"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
           
            </a>
        </div>
      </div>
       </div>
       
    </div>
</template>

<script>
export default {
  name: "ActionRowHeader",
  props: {
    IfAdd: Number,
  },
  data() {
    return {
      search: "",
      numPagesh: this.numPages,
      pageh: this.page,
    };
  },
  watch: {
    search: function(value) {
      this.$emit("changeSearch", value);
    },
  },
  methods: {
    onClickPreviousPage() {
      this.pageh--;
      this.$emit("pagechanged", this.pageh);
    },
    onClickNextPage() {
      this.pageh++;
      this.$emit("pagechanged", this.pageh);
    },
  },
};
</script>
<style>
.stack_stack__A16oG1 {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    flex: initial;
}
.input_container__GHJdJ {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
}
.ewgrtr{
      min-width: 245px;
    max-width: 300px;
    margin-left: 8px;
}</style>
