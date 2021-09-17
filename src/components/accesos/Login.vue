<template>
  <div>
    <div class="container position-sticky z-index-sticky top-0">
      <div class="row">
        <div class="col-12">
          <!-- Navbar -->
          <nav
            class="navbar navbar-expand-lg  blur blur-rounded top-0  z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4"
          >
            <div class="container-fluid">
              <a
                class="navbar-brand font-weight-bolder ms-lg-0 ms-3 "
                href="../../../pages/dashboards/default.html"
              >
                Unidad Educativa
              </a>
              <button
                class="navbar-toggler shadow-none ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navigation"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon mt-2">
                  <span class="navbar-toggler-bar bar1"></span>
                  <span class="navbar-toggler-bar bar2"></span>
                  <span class="navbar-toggler-bar bar3"></span>
                </span>
              </button>
              <div
                class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
                id="navigation"
              >
                <ul class="navbar-nav navbar-nav-hover mx-auto">
                  <li class="nav-item dropdown dropdown-hover mx-2">
                    <a
                      role="button"
                      class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center "
                      id="dropdownMenuPages"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Servicios
                    </a>
                  </li>
                  <li class="nav-item dropdown dropdown-hover mx-2">
                    <a
                      role="button"
                      class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center "
                      id="dropdownMenuAccount"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Desarrollo de aplicaciones
                    </a>
                  </li>
                  <li class="nav-item dropdown dropdown-hover mx-2">
                    <a
                      role="button"
                      class="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center "
                      id="dropdownMenuBlocks"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Mas Información
                    </a>
                  </li>
                </ul>
                <ul class="navbar-nav d-lg-block d-none">
                  <li class="nav-item">
                    <a
                      href="#"
                      class="btn btn-sm  bg-gradient-primary  btn-round mb-0 me-1"
                      onclick="smoothToPricing('pricing-soft-ui')"
                      >Regresar</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <!-- End Navbar -->
        </div>
      </div>
    </div>
    <main
      class="main-content main-content-bg mt-0"
      style="background-color: #f8f9fa;"
    >
      <section>
        <div class="page-header min-vh-75">
          <div class="container">
            <div class="row">
              <div
                class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto"
              >
                <div class="card card-plain mt-8">
                  <div class="card-header pb-0 text-start">
                    <h3 class="font-weight-bolder text-info text-gradient fuente" >
                      Bienvenido de nuevo
                    </h3>
                    <p class="parrafo">
                      Ingrese su email y contraseña para iniciar sesión
                    </p>
                  </div>
                  <div  class="card-body">
                    <form @submit.prevent="authenticate" class="text-start">
                      <p class="parrafo">Email</p>
                      <div class="mb-3">
                        <input
                          v-model="login.email"
                          id="username"
                          type="email"
                          class="form-control buscador fuente"
                          placeholder="Email"
                          aria-label="Email"
                          required
                          autocomplete="off"
                        />
                      </div>
                      <p class="parrafo">Password</p>
                      <div class="mb-3">
                        <input
                          v-model="login.password"
                          id="password"
                          type="password"
                          class="form-control buscador fuente"
                          placeholder="Password"
                          aria-label="Password"
                          required
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          checked=""
                        />
                        <label class="form-check-label" for="rememberMe"
                          >Remember me</label
                        >
                      </div>
                      <div class="text-center">
                        <button
                          v-if="isLoading"
                          class="btn bg-gradient-info w-100 mt-4 mb-0"
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
                        <button
                          v-else
                          class="btn bg-gradient-info w-100 mt-4 mb-0"
                        >
                          Ingresar
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center pt-0 px-lg-2 px-1">
                    <p class="mb-4 text-sm mx-auto">
                      Don't have an account?
                      <a
                        href="javascript:;"
                        class="text-info text-gradient font-weight-bold"
                        >Sign up</a
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div
                  class="
                  oblique
                  position-absolute
                  top-0
                  h-100
                  d-md-block d-none
                  me-n8
                "
                >
                  <div
                    class="
                    oblique-image
                   
                    position-absolute
                   
                    ms-auto
                    h-100
                    z-index-0
                    ms-n6
                    alligator-show-box
                  "
                   
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
    <footer class="footer py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mb-4 mx-auto text-center">
            <a
              @click="__enviarUbicacion(10)"
             
              class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2"
            >
              Company
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2"
            >
              About Us
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2"
            >
              Team
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2"
            >
              Products
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2"
            >
              Blog
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2"
            >
              Pricing
            </a>
          </div>
          <div class="col-lg-8 mx-auto text-center mb-4 mt-2">
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-4 me-4"
            >
              <span class="text-lg fab fa-dribbble"></span>
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-4 me-4"
            >
              <span class="text-lg fab fa-twitter"></span>
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-4 me-4"
            >
              <span class="text-lg fab fa-instagram"></span>
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-4 me-4"
            >
              <span class="text-lg fab fa-pinterest"></span>
            </a>
            <a
              href="javascript:;"
              target="_blank"
              class="text-secondary me-xl-4 me-4"
            >
              <span class="text-lg fab fa-github"></span>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-8 mx-auto text-center mt-1">
            <p class="mb-0 text-secondary">
              Copyright © 2021
            </p>
          </div>
        </div>
      </div>
    </footer>
    <!-- -------- END FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
  </div>
</template>
<script>
//import LoaderBotton from "../../shared/LoaderBotton";
import axios from 'axios'
/* import Firebase from "firebase";
import config from "../../config";
let app = Firebase.initializeApp(config);
let db = app.database();
let seccionRef = db.ref("seccions"); */
import { usersCollection } from "../../boot/firebase";
export default {
  name: "Login",
 /*  firebase: {
    secciones: seccionRef,
  }, */
  data() {
    return {
      isLoading: false,
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
        foto: null,
        nombre: null,
        correo: null,
        modalidad: null,
      }
    };
  },
  methods: {
    authenticate() {
      this.isLoading = true;
      this.$proxies.identityProxy
        .login(this.login)
        .then((x) => {
          this.infos.foto = x.data.isaccesos.foto;
          this.infos.nombre = x.data.isaccesos.nombre;
          this.infos.correo = x.data.isaccesos.email;
          this.infos.modalidad = x.data.isaccesos.modalidad;
          this. __enviarUbicacion(10);
          localStorage.setItem("access_token", x.data.isaccesos.tokens);
          localStorage.setItem('Xf', JSON.stringify(this.infos));
          this.$user.initialize();
          this.isLoading = false;
          this.$parent.isLoggedIn = true;
          this.$router.push("/");
          
          window.location.reload(true);
        })
        .catch((x) => {
          if (x.response.status == 400) {
            this.__limpiarCampos();
            this.$notify({
              group: "global",
              text: "Usuario no encontrado",
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

    __enviarUbicacion(id) {
       this.newSeccions.Identificador = id;
       this.newSeccions.fecha = this.__calcularFecha();
       this.newSeccions.nombre = this.__navegador() + " en " + this.ubicacion();
       this.newSeccions.host = this.ipEthernet;
       localStorage.setItem('datos', JSON.stringify(this.newSeccions));
    }, 


    __createSesions(id){
      this.newSeccions.Identificador = id;
       this.newSeccions.fecha = this.__calcularFecha();
       this.newSeccions.nombre = this.__navegador() + " en " + this.ubicacion();
       this.newSeccions.host = this.ipEthernet;
      usersCollection.add(this.newSeccions)
      .then(() => {
            console.log("Document successfully written!");
            return true
          })
        .catch((error) => {
            console.log("Error writing document: ", error);
          });
    },


    async getIpClient() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        this.ipEthernet = response.data.ip;
      } catch (error) {
        console.log(error);
      }
    },

    __calcularFecha() {
      let tiempoTranscurrido = Date.now();
      let hoy = new Date(tiempoTranscurrido);
      return hoy.toLocaleString();
    },
    __limpiarCampos() {
      this.login.email = null;
      this.login.password = null;
    },
    ubicacion() {
      var OSName = "Desconocido";
      if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
      if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
      if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
      if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
      if (navigator.appVersion.indexOf("Android") != -1) OSName = "Android";
      return OSName;
    },
    __navegador() {
      if (navigator.userAgent.search("MSIE") >= 0) {
        return "Edge";
      } else if (navigator.userAgent.search("Chrome") >= 0) {
        return "Chrome";
      }
      //Check if browser is Firefox
      else if (navigator.userAgent.search("Firefox") >= 0) {
        return "Firefox";
      }
      //Check if browser is Safari
      else if (
        navigator.userAgent.search("Safari") >= 0 &&
        navigator.userAgent.search("Chrome") < 0
      ) {
        return "Safari";
      }
      //Check if browser is Opera
      else if (navigator.userAgent.search("Opera") >= 0) {
        return "Opera";
      } else {
        return "None";
      }
    },
  },
  created(){
    this.getIpClient();
  }
};
</script>
<style >
.alligator-show-box {
  margin-top: 150px;
  width: 90%;
  
  background-repeat: no-repeat;
  background-size: contain;
  background-image:
    url('../../assets/img/shapes/jira.png');
}
</style>