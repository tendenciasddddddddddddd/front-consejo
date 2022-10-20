<template>
    <div class="stack_stack__A16oG1">
      <div class="input_container__GHJdJ">
         <div class="input-group ">
          <span class="input-group-text negros buscador busca">
              <svg style=" margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
            </span>
            <input  type="text"  v-model="search" class="form-control buscador buscaa" placeholder="Buscar por materia" />
           
          </div>
      </div>
       <div class="ewgrtr" :style="[$store.state.isAppMobile ? {'min-width': '115px'} : {'min-width': '245px'}]">
            <div class="d-flex justify-content-end">
        <div class="mt-2" v-if="!$store.state.isAppMobile">
          <span  style="color:#181B32; font-size: 18px;"
            >{{ pageh }} de {{ numPages }}</span
          >
        </div>
        <div>
          <ul
            class="pagination pagination-dark justify-content-center mt-1 me-1" >
            <li class="page-item">
              <a
                class="fuente tamanio links paginates ms-1 me-1 isPaginateh isPaginateActive"
                :class="{ 'inactivo isNoActive': pageh == 1 }"
                @click="onClickPreviousPage"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class=""
                  data-icon="left"
                  width="1.2em"
                  height="1.2em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                  ></path>
                </svg>
              </a>
            </li>

            <li class="page-item">
              <a
                :class="{
                  'inactivo isNoActive': pageh == numPages || numPages == 0,
                }"
                class="fuente tamanio links paginates isPaginateh isPaginateActive"
                @click="onClickNextPage"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="right"
                  width="1.2em"
                  height="1.2em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="mt-1 ms-2" v-if="IfAdd==1">
          <a v-if="!$store.state.isAppMobile" href="javascript:;" style="margin-top: -3px;" @click="$emit('openCreateCourse')"  class="btn btn-vercel ">
            <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" style="color: currentcolor;"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
             <span class="me-2">Agregar</span> 
            </a>
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
    FirstText: String,
    LastText: String,
    numPages: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
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
