<template>
  <div>
    
    <div class="card-body pt-2">
      <div class="pt-4 pb-2">
                    <h5 class="negros gordo text-center pb-0 fs-4">PLATAFORMA</h5>
                    <p class="text-center small">Ingrese su email o cédula y contraseña para iniciar sesión</p>
                  </div>
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
        > <b class="links2 ms-2 gordo">Volver a inicio de sesión</b>
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
