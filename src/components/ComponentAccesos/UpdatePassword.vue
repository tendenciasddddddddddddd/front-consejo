<template>
  <div>
    <div class="card-header pb-0 text-center">
      <h2 class=" fuente ">
        Leonidas Proaño
        <i style="color: #ff7a59" class="ni ni-app"></i>
      </h2>
      <p class="h5 fuente" style="font-weight: 400;">
        Es un placer conocerte.
      </p>
      <p class="parrafo">
        Antes de empezar, pongamos en orden todos los detalles de tu cuenta. {{email}}
      </p>
    </div>
    <div class="card-body">
      <form @submit.prevent="ResetCount" class="text-start">
        <p class="parrafo">Nueva Contraseña</p>
        <div class="mb-3">
          <input
            v-model="resetPasswords.password"
            id="password"
            type="password"
            class="form-control buscador fuente"
            placeholder="Password"
            aria-label="Password"
            required
            minlength="5"
            autocapitalize="off"
          />
        </div>

        <div class="text-center">
          <button
            v-if="isResert"
            class="btn btnNaranja w-100 mt-4 mb-0"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Trabajando...
          </button>
          <button v-else class="btn btnNaranja w-100 mt-4 mb-0">
            Restablece tu contraseña
          </button>
        </div>
      </form>
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
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      resetPasswords: {
        email: this.email,
        password: null,
      },
      isResert: false,
    };
  },
  methods: {
    activeGoBackLogin: function() {
      this.$emit("emitGoBackLogin3");
    },
    ResetCount() {
      if (this.email) {
        this.isResert = true;
        this.$proxies.identityProxy
          .forgotPassword(this.resetPasswords)
          .then(() => {
            this.$emit("emitGoBackLogin3");
            this.isResert = false;
            this.toast('Cambio de contraseña es exitosos');
          })
          .catch(() => {
            this.$dialog.alert('Error del servidor')
            this.isResert = false;
          });
      }
    },
    toast(message) {
        this.$toasted.info(message, {
          duration: 3000,
          position: "top-right",
          icon: "check-circle",
          theme: "toasted-primary",
          action: {
            text: "CERRAR",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      },
  },
};
</script>
