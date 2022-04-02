<template>
  <div>
    <div class="card-header pb-0 text-center">
      <h2 class=" fuente ">
        Leonidas Proaño
        <i style="color: #ff7a59" class="ni ni-app"></i>
      </h2>
      <img
        class="w-30"
        src="../../assets/img/usados/account-security.svg"
        alt=""
      />
    </div>
    <div class="card-body">
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
    <div class="">
      <a
        @click="activeGoBackLogin"
        href="javascript:;"
        class="fuente tamanio ms-4"
        >Volver a <b class="links ms-2">Inicio de sesión</b>
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
