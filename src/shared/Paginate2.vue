<template>
  <ul class="pagination pagination-dark justify-content-center mt-4">
    <li class="page-item">
      <a
        class=" tamanio links paginates me-3"
        :class="{ inactivo: pageh == 1 }"
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
        <b class="ms-2 gordo">Anterior</b>
      </a>
    </li>

    <li class="page-item active">
      <a class="paginaA">
        <b> {{ pageh }}</b></a
      >
    </li>

    <li class="page-item">
      <a
        :class="{
          inactivo: pageh == numPagesh || numPagesh == 0,
        }"
        class="tamanio links paginates ms-3"
        @click="onClickNextPage"
      >
        <b class="me-2 gordo">Siguiente</b>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          class=""
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
      <li>
            <div class="btn-group dropup me-3 ms-3">
              <a  @click="activar" type="button"
                class=" tamanio links paginates dropdown-toggle " >
                <b> {{subtitulo}} </b>
              </a>
              <ul  :class="{ 'show': isActive === true }"
                class="dropdown-menu px-2 py-3">
                <li>
                  <a
                   @click="goChangedQuery(7)"
                    class="dropdown-item border-radius-md fuente"
                    href="javascript:;"
                    >7 filas por página</a
                  >
                </li>
                <li>
                  <a
                    @click="goChangedQuery(25)"
                    class="dropdown-item border-radius-md fuente"
                    href="javascript:;"
                    >25 filas por página</a
                  >
                </li>
                <li>
                  <a
                   @click="goChangedQuery(50)"
                    class="dropdown-item border-radius-md fuente"
                    href="javascript:;"
                    >50 filas por página</a
                  >
                </li>
              </ul>
            </div>
          </li>
    <li>
      <strong class="fuente text-sm ">
        Total : {{total}}
      </strong>
    </li>
  </ul>
</template>

<script>
export default {
    props: {
      
    numPages: {
      type: Number,
      required: true
    },

    page: {
      type: Number,
      required: true
    },
    total: {
        type: Number,
    },
    subtitulo : {
        type: String
    }
  },
  data() {
      return {
          numPagesh: this.numPages,
          pageh: this.page,
          isActive: false,
      }
  },
   methods: {
    activar(){
      if (this.isActive) {
        this.isActive=false;
      }else{
        this.isActive=true;
      }
    },
    onClickPreviousPage() {
        this.pageh--;
      this.$emit('pagechanged', this.pageh);
    },

    onClickNextPage() {
        this.pageh++;
      this.$emit('pagechanged', this.pageh );
    },
    goChangedQuery(row){
       this.$emit('setChangedQuery', row );
    }
  }
};
</script>

