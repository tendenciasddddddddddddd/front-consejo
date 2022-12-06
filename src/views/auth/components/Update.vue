<template>
  <div>
   
    <div class="card-body pt-2">
      <div class="pt-4 pb-2 text-center">
        <h5 class="negros gordo text-center pb-0 fs-4">PLATAFORMA</h5>
        <p class="parrafo">
        Antes de empezar, pongamos en orden todos los detalles de tu cuenta. {{email}}
      </p>
    </div>
      <form @submit.prevent="ResetCount" class="text-start">
        <p class="parrafo">Nueva contraseña
          <span style="font-size: 17px;cursor: pointer;" class="ms-2">
            <svg @click="toggleShow" v-if="showPassword" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color: #000"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <svg @click="toggleShow" v-else data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color:#000"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path><path d="M1 1l22 22"></path></svg>
          </span>
        </p>
        <div class="mb-3">

          <input v-if="showPassword" type="text" class="form-control buscador fuente"
                   v-model="resetPasswords.password" />
            <input v-else v-model="resetPasswords.password"  type="password"
                   class="form-control buscador fuente" required />
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
      showPassword: false,
    };
  },
  computed: {
    buttonLabel() {
      return (this.showPassword) ? "Hide" : "Show";
    }
  },
  methods: {
    toggleShow() {
        this.showPassword = !this.showPassword;
     },
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
