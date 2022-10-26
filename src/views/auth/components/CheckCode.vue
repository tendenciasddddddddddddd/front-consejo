<template>
  <div>
    <div class="card-header pb-0 text-center">
      <h3 class="negros fuente ">
        PLATAFORMA
       
      </h3>
      <img
        class="w-30"
        src="../../../assets/img/logs/successful-send.svg"
        alt=""
      />
    </div>

    <div class="card-body">
      <div class="h4 fuente text-center">
        La ayuda está en camino
      </div>

      <p class="parrafo text-center">
        Recibirás un correo electrónico en un momento con un codigo, verifica
        que hayas escrito el correo electrónico correcto y revisa tu carpeta de
        spam.
      </p>
      <p class="parrafo">Código</p>
      <div class="mb-3">
        <input
          v-model="isCode"
          maxlength="6"
          autocomplete="off"
          autocapitalize="off"
          class="form-control buscador fuente"
          required
        />
      </div>
     
      <div class="text-center">
        <button
          v-if="isCode != ''"
          class="btn btnNaranja w-100 mt-2 mb-0"
          type="button"
          @click="verificarCode()"
        >
          Verificar Code
        </button>
        <button v-else class="btn btnDisabled w-100 mt-2 mb-0">
          Verificar Code
        </button>
      </div>
       <div v-if="isErrorCode" class="mt-1" style="border: 1px solid #f28799;
    border-radius: 5px;
    padding: 5px;
    background: #fbd5dc;"> 
           <span class="text-sm fuente text-dark">{{ isErrorCode }}</span></div>
    </div>
    <div class="mb-4">
      <a
        @click="activeGoBackLogin"
        href="javascript:;"
        class="tamanio ms-4"
        >Volver a <b class="links2 ms-2 gordo">Inicio de sesión</b>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    codex: {
      type: String,
      required: true,
    },
    
  },
  data() {
    return {
        isCode: "",
        isErrorCode: '',
    };
  },
  methods: {
    activeGoBackLogin: function() {
      this.$emit("emitGoBackLogin2");
    },
   verificarCode() {
      if (this.isCode == this.codex) {
        //this.isVisible = "resett";
        this.$emit("emitGoPageUpdatePassword");
      } else {
        this.isErrorCode = "El Código es incorrecto";
      }
    },
  },
};
</script>
