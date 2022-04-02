import Modal from "../../../shared/Modal.vue";
export default {
  name: 'Cuenta',
  components: {
    Modal
  },
  data() {
    return {
      contraseñaActual: {
        id: null,
        password: null,
      },
      newContraseña: {
        password: null,
      },
      confpass: "",
      user: this.$store.state.user,
      isLoading: false,
      MsmError: "",
      isContrasenia: true,
      visible: true,
    }
  },
  methods: {
    authenticate() {
      this.isLoading = true;
      this.contraseñaActual.id = this.user.id;
      this.$proxies.identityProxy
        .cuenta(this.contraseñaActual)
        .then(() => {
          this.isLoading = false;
          this.MsmError = ""
          this.__limpiarCampos();
          this.isContrasenia = false;

        })
        .catch((x) => {
          if (x.response.status == 400) {
            this.MsmError = "Usuario No encontrado";
            this.__limpiarCampos();
            this.isLoading = false;
          } else if (x.response.status == 402) {
            this.__limpiarCampos();
            this.MsmError = "Contraseña Inválida"
            this.isLoading = false;
          } else {
            this.__limpiarCampos();
            this.isLoading = false;
          }
        });
    },
    actualizar() {
      this.$validate().then(success => {
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados');
          return
        }
        this.isLoading1 = true;
        let ids = this.user.id;
        this.$proxies.identityProxy
          .updateCuenta(ids, this.newContraseña)
          .then(() => {
            this.isLoading1 = false;
            this.MsmError = ""
            this.__limpiarCampos2();
            this.isContrasenia = false;
            this.$router.push("/");
          })
          .catch((x) => {
            alert(x);
            this.__limpiarCampos2();
            this.isLoading1 = false;
          });
      })
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2600,
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
    __limpiarCampos() {
      this.contraseñaActual.password = null
    },
    close() {
      this.$emit('cerrarCuenta')
    },

    __limpiarCampos2() {
      this.newContraseña.password = null;
      this.confpass = null;
    }
  },
  created() {

  },
  validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    'newContraseña.password'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(6)
        .maxLength(20);
    },
    'confpass'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(6)
        .maxLength(20);
    },
  },
}