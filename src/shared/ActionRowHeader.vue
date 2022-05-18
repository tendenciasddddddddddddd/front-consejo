<template>
  <div class="row ">
    <div class="col-md-5">
      <span v-if="!$store.state.isAppMobile" class="ms-2 s-title-page">
        {{FirstText}}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.25em"
          height="1.25em"
          viewBox="0 0 20 20"
          class="small svg-icon fill grey-500 s-mr-2 me-1 ms-1"
          id=""
          fill="currentColor"
          title=""
        >
          <path
            d="M6.52776 18.4722C6.16165 18.1061 6.16165 17.5125 6.52776 17.1464L14.3375 9.33669C14.7036 8.97057 15.2972 8.97057 15.6633 9.33669C16.0294 9.70281 16.0294 10.2964 15.6633 10.6625L7.85359 18.4722C7.48747 18.8383 6.89388 18.8383 6.52776 18.4722Z"
          ></path>
          <path
            d="M6.52776 1.52459C6.16164 1.8907 6.16164 2.4843 6.52776 2.85041L14.3397 10.6624C14.7059 11.0285 15.2995 11.0285 15.6656 10.6624C16.0317 10.2963 16.0317 9.70269 15.6656 9.33657L7.85359 1.52459C7.48747 1.15847 6.89388 1.15847 6.52776 1.52459Z"
          ></path>
        </svg>
        {{LastText}}</span
      >
    </div>
    <div class="col-md-7">
      <div class="d-flex justify-content-end">
        <div>
          <div class="input-group ">
            <input
              style="background: white;"
              type="text"  v-model="search"
              class="form-control buscador"
              placeholder="Buscar por materia"
            />
            <span
              class="input-group-text text-body buscador"
              style="background: white;"
              ><i class="fas fa-search colorhs" aria-hidden="true"></i
            ></span>
          </div>
        </div>

        <div class="mt-2" v-if="!$store.state.isAppMobile">
          <span class="ms-4" style="color:#181B32; font-size: 18px;"
            ><b style="font-weight: 700;">0{{ pageh }}</b
            >/ 0{{ numPages }}</span
          >
        </div>
        <div>
          <ul
            class="pagination pagination-dark justify-content-center mt-2 me-3"
          >
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
          <a role="button" style="padding-top: 7px; padding-left: 4px; padding-right: 4px;" @click="$emit('openCreateCourse')" class="fuente tamanio isPaginateActive ">
             &nbsp; <i class="fa fa-plus links" style="font-size: 17px;"></i>&nbsp;  
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
