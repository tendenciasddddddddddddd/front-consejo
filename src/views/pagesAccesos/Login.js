import ServiceLogins from "./ServiceLogin";
const ResultServiceLogin = new ServiceLogins();
export default {
  name: "Login",
  components: {
    ResetPassword : () => import( /* webpackChunkName: "ResetPassword" */ '../../components/ComponentAccesos/ResetPassword.vue'),
    UserError : () => import( /* webpackChunkName: "UserError" */ '../../components/ComponentAccesos/UserError.vue'),//UserError.vue
    VerifiedCode : () => import( /* webpackChunkName: "VerifiedCode" */ '../../components/ComponentAccesos/VerifiedCode.vue'),//UpdatePassword.vue
    UpdatePassword : () => import( /* webpackChunkName: "UpdatePassword" */ '../../components/ComponentAccesos/UpdatePassword.vue'),
  },
  data() {
    return {
      isLoading: false,
      isAuthGoogle: false,
      isPasswd: false,
      isResert: false,
      login: {
        email: null,
        password: null,
        loading: false,
      },
      newSeccions: {
        Identificador: null, //id del usuario
        fecha: null,
        host: null,
        nombre: null,
      },
      ipEthernet: null,
      infos: {
        nombre: null,
        correo: null,
        modalidad: null,
      },
      isVisible: "logins",
      code: "",
      emailss:'',
      //AUTH LOGIN GOOGLE
      isLogin: false,
      model: {
        email: null,
      },
      showPassword: false,
    };
  },
  computed: {
    buttonLabel() {
      return (this.showPassword) ? "Hide" : "Show";
    }
  },
  methods: {
    async logOut() {
      try {
        const result = this.$gAuth.signOut();
        console.log("result", result);
      } catch (error) {
        console.error(error, "LOG OUT");
      }
    },

    async loginGoogleAuth() {
      try {
        const googleUser = await this.$gAuth.signIn();
        const users = googleUser.getBasicProfile().getEmail();
        if (this.$gAuth.isAuthorized) {
          this.postGoogleAuth(users);
        }
      } catch (error) {
        this.toast("No se puede conectar con el API.");
      }
    },

    postGoogleAuth(users) {
      this.isAuthGoogle = true;
      this.model.email = users;
      this.$proxies.identityProxy
        .GoogleAuthApi(this.model)
        .then((x) => {
          let img = x.data.isaccesos.foto;
          this.infos.nombre = x.data.isaccesos.nombre;
          this.infos.correo = x.data.isaccesos.email;
          this.infos.modalidad = x.data.isaccesos.modalidad;
          this.__enviarUbicacion(10);
          localStorage.setItem("access_token", x.data.isaccesos.tokens);
          localStorage.setItem("Xf", JSON.stringify(this.infos));
          localStorage.setItem("Avatar", JSON.stringify(img));
          this.$user.initialize();
          this.isAuthGoogle = false;
          this.$parent.isLoggedIn = true;
          this.$router.push("/").catch(() => {});
        })
        .catch((x) => {
          if (!x.response) {
            this.toast("Por favor revise su conexion a internet");
          }
          if (x.response.status == 400) {
            this.toast("El usuario no esta registrado en el sistema");
            this.isAuthGoogle = false;
          } else {
            this.toast("La cuenta de correo electronico no existe");
            this.isAuthGoogle = false;
          }
        });
    },

    authenticate() {
      this.isLoading = true;
      this.$proxies.identityProxy
        .login(this.login)
        .then((x) => {
          let img = x.data.isaccesos.foto;
          this.infos.nombre = x.data.isaccesos.nombre;
          this.infos.correo = x.data.isaccesos.email;
          this.infos.modalidad = x.data.isaccesos.modalidad;
          this.__enviarUbicacion(10);
          localStorage.setItem("access_token", x.data.isaccesos.tokens);
          localStorage.setItem("Xf", JSON.stringify(this.infos));
          localStorage.setItem("Avatar", JSON.stringify(img));
          this.$user.initialize();
          this.isLoading = false;
          this.$parent.isLoggedIn = true;
          this.$router.push("/").catch(() => {});

          //window.location.reload(true);
        })
        .catch((x) => {
          if (!x.response) {
            this.$notify({
              group: "global",
              text: "Por favor revise su conexion a internet",
            });
            this.isLoading = false;
          } else if (x.response.status == 400) {
            this.__limpiarCampos();
            this.toast("El usuario no esta registrado en el sistema");
            this.isLoading = false;
          } else if (x.response.status == 402) {
            this.__limpiarCampos();
            this.toast("Contraseña Invalida");
            this.isLoading = false;
          } else {
            this.__limpiarCampos();
           
            this.toast("La cuenta de correo electronico no existe");
            this.isLoading = false;
          }
        });
    },

   

    __enviarUbicacion(id) {
      this.newSeccions.Identificador = id;
      this.newSeccions.fecha = ResultServiceLogin.__calcularFecha();
      this.newSeccions.nombre =
        ResultServiceLogin.__navegador() +
        " en " +
        ResultServiceLogin.ubicacion();
      this.newSeccions.host = this.ipEthernet;
      localStorage.setItem("datos", JSON.stringify(this.newSeccions));
    },

    getIpClient() {
      // const url = "https://api.ipify.org/?format=json";
      // fetch(url)
      //   .then((response) => response.json())
      //   .then((data) => this.ipEthernet = data.ip);
      this.ipEthernet = '127.0.0.1: noIp'
    },

    goBackLogin: function() {
    this.isVisible = "logins";
   },
   goRessetPassword: function(codex, emin){
    this.isVisible = "forgot";
    this.code = codex;
    this.emailss = emin;
   },
   goUpdatePassword: function(){
    this.isVisible = "resett";
   },
   goUserError: function(){
    this.isVisible = "error";
   },
    __limpiarCampos() {
      this.login.email = null;
      this.login.password = null;
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
      toggleShow() {
        this.showPassword = !this.showPassword;
      }
  },
  created() {
    this.getIpClient();
  },
};
