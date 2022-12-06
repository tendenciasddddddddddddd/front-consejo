<template>
  <div>
    
    <div class="card-body">
      <div class="pt-4 pb-2 text-center">
        <h5 class="negros gordo text-center pb-0 fs-4">PLATAFORMA</h5>
      <img
        class="w-30"
        src="../../../assets/img/usados/account-security.svg"
        alt=""
      />
    </div>
     
      <div class="alerRed">
        <p style="font-size: 16px;    font-weight: 700;color: black;">
          <b>Esto no se ve bien.</b>
        </p>
        <p class="parrafo">
          Escribiste una dirección de correo no válida. Para obtener más
          detalles sobre por qué podría estar pasando esto, inicia el chat y
          pregunta por inconveniete.
        </p>
      </div>
    </div>
    <div class="mb-4">
      <a
        @click="activeGoBackLogin"
        href="javascript:;"
        class=" tamanio ms-4"
        > <b class="links2 ms-2 gordo">Volver a inicio de sesión</b>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    activeGoBackLogin: function() {
      this.$emit("emitGoBackLogin1");
    },
  },
};
</script>
