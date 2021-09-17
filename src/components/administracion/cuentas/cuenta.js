
export default {
    name: 'cuenta',
    data(){
        return{
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
            MsmError : "",
            isContrasenia : true,
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
                   this.MsmError="Usuario No encontrado";
                   this.__limpiarCampos();
                  this.isLoading = false;
                } else if (x.response.status == 402) {
                  this.__limpiarCampos();
                  this.MsmError="Contraseña Inválida"
                  this.isLoading = false;
                } else {
                  this.__limpiarCampos();
                  this.$notify({
                    group: "global",
                    text: "Problemas en el servidor por favor reportar",
                  });
                  this.isLoading = false;
                }
              });
          },
        actualizar() {
            this.$validate().then(success => { 
                if (!success){ 
                  this.$notify({
                      group: "global",
                      text: "Por favor llena correctamente los campos solicitados",
                    });
                    return
                }
                this.isLoading1 = true;
                let ids = this.user.id;
                this.$proxies.identityProxy
                  .updateCuenta(ids,this.newContraseña)
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

          __limpiarCampos(){
              this.contraseñaActual.password= null
            },

            __limpiarCampos2(){
                this.newContraseña.password= null;
                this.confpass= null;
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