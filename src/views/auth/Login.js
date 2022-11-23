const image10 = require("../../assets/img/alterna.jpg")
const image9 = require("../../assets/img/fondo2.webp")

export default {
  name: "Login",
  components: {
    ResetPass : () => import( /* webpackChunkName: "ResetPass" */ './components/ResetPass.vue'),
    UserError : () => import( /* webpackChunkName: "UserError" */ './components/UserError.vue'),//UserError.vue
    CheckCode : () => import( /* webpackChunkName: "CheckCode" */ './components/CheckCode.vue'),//UpdatePassword.vue
    Update : () => import( /* webpackChunkName: "Update" */ './components/Update.vue'),
  },
  data() {
    return {
      isLoading: false,
      isAuthGoogle: false,
      login: {
        email: null,
        password: null,
        loading: false,
      },
      infos: {},
      isVisible: "logins",
      code: "",
      emailss:'',
      fondo:image10,
      //AUTH LOGIN GOOGLE
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
    goToPage: function() {
      this.$user.initialize();
          this.isLoading = false;
          this.$parent.isLoggedIn = true;
          this.$router.push("/").catch(() => {});
    },
    postGoogleAuth(users) {
      this.isAuthGoogle = true;
      this.model.email = users;
      this.$proxies.identityProxy
        .GoogleAuthApi(this.model)
        .then((x) => {
          const {nombre, email, foto, modalidad, tokens} = x.data.isaccesos
          this.infos = {nombre, correo: email, modalidad}
          localStorage.setItem("access_token", tokens);
          localStorage.setItem("Xf", JSON.stringify(this.infos));
          localStorage.setItem("Avatar", JSON.stringify(foto));
          this.goToPage();
        })
        .catch((x) => {
          if (!x.response) {
            this.toast("Por favor revise su conexion a internet");
          }
          if (x.response.status == 400) {
            this.toast("El email no esta registrado en el sistema");
          } else {
            this.toast("La cuenta de correo electronico no existe");
          }
          this.isAuthGoogle = false;
        });
    },

    authenticate ()  {
      this.isLoading = true;
      this.$proxies.identityProxy
        .login(this.login)
        .then((x) => {
          const {nombre, email, foto, modalidad, tokens} = x.data.isaccesos
          this.infos = {nombre, correo: email, modalidad}
          localStorage.setItem("access_token", tokens);
          localStorage.setItem("Xf", JSON.stringify(this.infos));
          localStorage.setItem("Avatar", JSON.stringify(foto));
          this.goToPage();
        })
        .catch((x) => {
          if (!x.response) {
            this.toast("Por favor revise su conexion a internet");
          } else if (x.response.status == 400) {
            this.toast("El usuario no esta registrado en el sistema");
          } else if (x.response.status == 402) {
            this.toast("Contraseña Invalida");
          } else {
            this.toast("La cuenta de correo electronico no existe");
          }
          this.__limpiarCampos();
          this.isLoading = false;
        });
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
          position: "top-center",
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
    setTimeout(() => {
      this.fondo=image9;
    }, 1300)
  }
};
