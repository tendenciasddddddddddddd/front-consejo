<template>
  <ul class="pagination pagination-dark justify-content-center mt-4">
    <li class="page-item">
      <a
        class="fuente tamanio links paginates me-3"
        :class="{ inactivo: pages == 1 }"
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
        <b class="ms-2">Anterior</b>
      </a>
    </li>

    <li class="page-item active">
      <a class="paginaA">
        <b> {{ pages }}</b></a
      >
    </li>

    <li class="page-item">
      <a
        :class="{
          inactivo: pages == numPages || numPages == 0,
        }"
        class="fuente tamanio links paginates ms-3"
        @click="onClickNextPage"
      >
        <b class="me-2">Siguiente</b>
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
      <strong class="fuente text-sm ms-3">
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
    },
    total: {
        type: Number,
    }
  },
  data(){
    return{
       pages : this.page 
    }
  },
   methods: {

    onClickPreviousPage() {
      this.pages--
      this.$emit('pagechanged', this.pages);
    },

    onClickNextPage() {
      this.pages++
      this.$emit('pagechanged', this.pages);
    },

  }
};
</script>

