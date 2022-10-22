<template>
  <div>
    <div class="card-header pb-0 text-center">
      <h3 class="negros fuente ">
        PLATAFORMA
      </h3>
      <p class="h5 fuente gordo">
        Restablece tu contraseña
      </p>
      <p class="parrafo">
        Introduce la dirección de correo electrónico en la que deseas recibir la
        información para restablecer la contraseña.
      </p>
    </div>
    <div class="card-body">
      <form @submit.prevent="ResetPassword" class="text-start">
        <p class="parrafo">Dirección de correo</p>
        <div class="mb-3">
          <input
            v-model="recordingPassword.email"
            type="email"
            class="form-control buscador fuente"
            placeholder="Email"
            aria-label="Email"
            required
            autocomplete="off"
          />
        </div>

        <div class="text-center">
          <button
            v-if="isPasswd"
            class="btn btnNaranja w-100 mt-4 mb-0"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Cargando...
          </button>
          <button v-else class="btn btnNaranja w-100 mt-4 mb-0">
            Restablece tu contraseña
          </button>
        </div>
      </form>
    </div>
    <div class="mb-4">
      <a @click="activeGoBackLogin" href="javascript:;" class="tamanio ms-4"
        >Volver a <b class="links ms-2 gordo">Inicio de sesión</b>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordingPassword: {
        email: "",
      },
      isPasswd: false,
      code: '',
    };
  },
  methods: {
    activeGoBackLogin: function() {
      //this.$emit('optionsFuntions', code)
      this.$emit('emitGoBackLogin')
    },
    ResetPassword() {
      this.isPasswd = true;
      this.$proxies.identityProxy
        .resetPasswords(this.recordingPassword)
        .then((x) => {
          this.code = x.data.code;
          this.isPasswd = false;
          if (this.code) {
           this.$emit('emitCambioPageResset', this.code, this.recordingPassword.email)
          }
        })
        .catch(() => {
          this.$emit('emitGoUserError')
          this.isPasswd = false;
        });
    },
  },
};
</script>
