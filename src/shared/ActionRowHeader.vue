<template>
  <div class="row ">
    <div class="col-md-7">
      <div class="input-group ">
            <input style="background: white;" type="text"  v-model="search" class="form-control buscador" placeholder="Buscar..."
            />
            <span class="input-group-text text-body buscador" style="background: white;">
              <i class="fas fa-search colorhs" aria-hidden="true"></i
            ></span>
          </div>
    </div>
    <div class="col-md-5">
         <div class="d-flex justify-content-end">
        <div class="mt-2" v-if="!$store.state.isAppMobile">
          <span class="ms-4" style="color:#181B32; font-size: 18px;"
            ><b style="font-weight: 700;">0{{ pageh }}</b
            >/ 0{{ numPages }}</span
          >
        </div>
        <div>
          <ul
            class="pagination pagination-dark justify-content-center mt-2 me-3" >
            <li class="page-item">
              <a
                class="fuente tamanio links paginates ms-3 me-2 isPaginateh isPaginateActive"
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
        <div class="mt-2" v-if="IfAdd==1">
          <a href="javascript:;" style="margin-top: -3px;" @click="$emit('openCreateCourse')"  class="btn btn-vercel ">
            <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" style="color: currentcolor;"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
             <span class="me-2">Agregar</span> 
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
