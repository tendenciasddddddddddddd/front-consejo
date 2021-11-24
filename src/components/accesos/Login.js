
import axios from 'axios'
import ServiceLogins from './ServiceLogin';
const ResultServiceLogin = new  ServiceLogins();
/* import Firebase from "firebase";
import config from "../../config";
let app = Firebase.initializeApp(config);
let db = app.database();
let seccionRef = db.ref("seccions"); */
//import { usersCollection } from "../../boot/firebase";
export default {
  name: "Login",

  data() {
    return {
      isLoading: false,
      isAuthGoogle : false,
      isPasswd: false,
      isResert : false,
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
      infos:{
        nombre: null,
        correo: null,
        modalidad: null,
      },
      isVisible: 'logins', 
      recordingPassword : {
        email: ''
      },
      code : '',
      isCode: '',
      isErrorCode: '',
      resetPasswords: {
        email: null,
        password : null,
      },
      //AUTH LOGIN GOOGLE 
      isLogin: false,
      model: {
        email: null
      }
    };
  },
  methods: {

    async logOut(){
      try {
        const result = this.$gAuth.signOut();
        console.log('result', result);
      } catch (error) {
        console.error(error, 'LOG OUT');
      }
    },

    async loginGoogleAuth(){
      try {
        const  googleUser = await this.$gAuth.signIn();
        const users = googleUser.getBasicProfile().getEmail();
        if (this.$gAuth.isAuthorized) {
          this.postGoogleAuth(users);
        }
      
      } catch (error) {
        this.$notify({
          group: "global",
          text: "Si tienes problemas en iniciar sesión, consulta en el chat.",
        });
      }
    },

    postGoogleAuth(users){
      this.isAuthGoogle = true;
      this.model.email = users;
      this.$proxies.identityProxy
        .GoogleAuthApi(this.model)
        .then((x) => {
          let img = x.data.isaccesos.foto;
          this.infos.nombre = x.data.isaccesos.nombre;
          this.infos.correo = x.data.isaccesos.email;
          this.infos.modalidad = x.data.isaccesos.modalidad;
          this. __enviarUbicacion(10);
          localStorage.setItem("access_token", x.data.isaccesos.tokens);
          localStorage.setItem('Xf', JSON.stringify(this.infos));
          localStorage.setItem('Avatar', JSON.stringify(img));
          this.$user.initialize();
          this.isAuthGoogle = false;
          this.$parent.isLoggedIn = true;
          this.$router.push("/").catch(()=>{});
        })
        .catch((x) => {
          if(!x.response){
            this.$notify({
              group: "global",
              text: "Por favor revise su conexion a internet",
            });
          }
          if (x.response.status == 400) {
            this.$notify({
              group: "global",
              text: "El usuario no esta registrado en el sistema",
            });
            this.isAuthGoogle = false;
          }  else {
            this.$notify({
              group: "global",
              text: "La cuenta de correo electronico no existe",
            });
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
          this. __enviarUbicacion(10);
          localStorage.setItem("access_token", x.data.isaccesos.tokens);
          localStorage.setItem('Xf', JSON.stringify(this.infos));
          localStorage.setItem('Avatar', JSON.stringify(img));
          this.$user.initialize();
          this.isLoading = false;
          this.$parent.isLoggedIn = true;
          this.$router.push("/").catch(()=>{});
          
          //window.location.reload(true);
        })
        .catch((x) => {
          if(!x.response){
            this.$notify({
              group: "global",
              text: "Por favor revise su conexion a internet",
            });
            this.isLoading = false;
          }
         else if (x.response.status == 400) {
            this.__limpiarCampos();
            this.$notify({
              group: "global",
              text: "El usuario no esta registrado en el sistema",
            });
            this.isLoading = false;
          } else if (x.response.status == 402) {
            this.__limpiarCampos();
            this.$notify({
              group: "global",
              text: "Contraseña Invalida",
            });
            this.isLoading = false;
          } else {
            this.__limpiarCampos();
            this.$notify({
              group: "global",
              text: "La cuenta de correo electronico no existe",
            });
            this.isLoading = false;
          }
        });
    },

    ResetPassword(){
      this.isPasswd = true;
      this.$proxies.identityProxy
        .resetPasswords(this.recordingPassword)
        .then((x) => {
          this.code = x.data.code;
          this.isPasswd = false;
          if (this.code!='') {
            this.isVisible= 'forgot';
          }
          //window.location.reload(true);
        })
        .catch(() => {
          
          this.isVisible= 'error';
          this.isPasswd = false;
         
        });
    },

    verificarCode(){
      if (this.isCode==this.code) {
        this.isVisible= 'resett';
        this.resetPasswords.email = this.recordingPassword.email;
        this.code = '';
        this.isCode = '';
        this.recordingPassword.email='';
      }else{
        this.isErrorCode = 'El Código es incorrecto'
      }
    },

    ResetCount(){
      this.isResert = true;
      this.$proxies.identityProxy
        .forgotPassword(this.resetPasswords)
        .then(() => {
          this.isVisible= 'logins';
          this.isResert = false;
          this.resetPasswords.email='';
          this.resetPasswords.password = '';
        })
        .catch(() => {
          this.recordingPassword.email='';
          this.resetPasswords.password = '';
          this.isVisible= 'logins';
          this.isResert = false;
         
        });
    },
    rediricLogin(){
      this.isVisible= 'logins';
      this.resetPasswords.email='';
      this.resetPasswords.password = '';

      //this.recordingPassword = '';
      this.code = '';
      this.isCode = '';
      this.isErrorCode = '';
    },

    __enviarUbicacion(id) {
       this.newSeccions.Identificador = id;
       this.newSeccions.fecha = ResultServiceLogin.__calcularFecha();
       this.newSeccions.nombre = ResultServiceLogin.__navegador() + " en " + ResultServiceLogin.ubicacion();
       this.newSeccions.host = this.ipEthernet;
       localStorage.setItem('datos', JSON.stringify(this.newSeccions));
    }, 

    async getIpClient() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        this.ipEthernet = response.data.ip;
      } catch (error) {
        console.log(error);
      }
    },

  
    __limpiarCampos() {
      this.login.email = null;
      this.login.password = null;
    },
    
    // __createSesions(id){
    //   this.newSeccions.Identificador = id;
    //    this.newSeccions.fecha = this.__calcularFecha();
    //    this.newSeccions.nombre = this.__navegador() + " en " + this.ubicacion();
    //    this.newSeccions.host = this.ipEthernet;
    //   usersCollection.add(this.newSeccions)
    //   .then(() => {
    //         console.log("Document successfully written!");
    //         return true
    //       })
    //     .catch((error) => {
    //         console.log("Error writing document: ", error);
    //       });
    // },


  },
  created(){
    this.getIpClient();
  }
};