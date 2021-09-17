<template>
  <div class="row">
    <div class="col-lg-12 text-center">
      <div class="d-flex flex-column h-100">
        <h2 class=" mb-0 fuente" style="font-weight: 400;">
          Bienvenidos al sistema Integrado
        </h2>
      </div>
    </div>
    <div class="col-lg-5 mt-6">
      <div class="" id="sessions">
        <div class="card-header pb-3">
          <h5 class="fuente">Sesiones</h5>
          <p class="parrafo">
            Esta es una lista de dispositivos que han iniciado sesión en su
            cuenta. Elimina los que no reconoces.
          </p>
        </div>
        <div class="card-body pt-0">
          <div>
            <div class="d-flex align-items-center">
              <div class="text-center w-5">
                <i
                  class="fas fa-desktop text-lg opacity-6"
                  aria-hidden="true"
                ></i>
              </div>
              <div class="my-auto ms-3">
                <div class="h-100">
                  <p class="text-sm mb-1 fuente">Su Host es {{ host }}</p>
                  <p class="mb-0 text-xs fuente">{{ nombre }}</p>
                </div>
              </div>
              <span class="badge badge-success badge-sm my-auto ms-auto me-3 fuente"
                >Active</span
              >

              <a
                href="javascript:;"
                class="text-primary text-sm icon-move-right my-auto"
                >{{ fecha }}
              </a>
            </div>
          </div>

          <hr class="horizontal dark" />
          <div class="d-flex align-items-center">
            <div class="text-center w-5">
              <i
                class="fas fa-desktop text-lg opacity-6"
                aria-hidden="true"
              ></i>
            </div>
            <p class="my-auto ms-3 fuente">Chrome on macOS</p>
            <p class="text-secondary text-sm ms-auto my-auto me-3 fuente">EC</p>
          </div>
          <hr class="horizontal dark" />
        </div>
      </div>
    </div>

    <div class="col-lg-7 position-relative z-index-2 mt-4 text-center">
      <img
        class="w-80"
        
        src="../assets/img/logs/guidelines.svg"
        alt=""
      />
    </div>
    
    <div class="fixed-plugin" :class="{ 'show': tab === 'init1' }">
      <!-- <a @click="tab = 'init1'" class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: rgb(14, 114, 237);">
        <i class="fa fa-cog py-2 text-white"> </i>
      </a> -->
      <div  class="card shadow-lg blur desplega" style="overflow-y: auto;">
        <div class="card-header pb-0 pt-3  bg-transparent ">
          <div class="float-start">
            <h5 class="mt-3 mb-0 fuente" style="font-weight: 400;">Periodos Escolar</h5>

          </div>
          <div class="float-end mt-4">
            <button @click="tab = 'init'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 20px" class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>
        <hr class="horizontal dark my-1" />
        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->
          <div>
            <h6 class="mb-0">Sidebar Colors</h6>
          </div>
          <a href="javascript:void(0)" class="switch-trigger background-color">
            <div class="badge-colors my-2 text-start">
              <span
                class="badge filter bg-gradient-primary active"
                data-color="primary"
                onclick="sidebarColor(this)"
              ></span>
              <span
                class="badge filter bg-gradient-dark"
                data-color="dark"
                onclick="sidebarColor(this)"
              ></span>
              <span
                class="badge filter bg-gradient-info"
                data-color="info"
                onclick="sidebarColor(this)"
              ></span>
              <span
                class="badge filter bg-gradient-success"
                data-color="success"
                onclick="sidebarColor(this)"
              ></span>
              <span
                class="badge filter bg-gradient-warning"
                data-color="warning"
                onclick="sidebarColor(this)"
              ></span>
              <span
                class="badge filter bg-gradient-danger"
                data-color="danger"
                onclick="sidebarColor(this)"
              ></span>
            </div>
          </a>
          <!-- Sidenav Type -->
          <div class="mt-3">
            <h6 class="mb-0">Sidenav Type</h6>
            <p class="text-sm">Choose between 2 different sidenav types.</p>
          </div>
          <div class="d-flex">
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 active"
              data-class="bg-transparent"
              onclick="sidebarType(this)"
            >
              Transparent
            </button>
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 ms-2"
              data-class="bg-white"
              onclick="sidebarType(this)"
            >
              White
            </button>
          </div>
          <div class="d-flex">
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 active"
              data-class="bg-transparent"
              onclick="sidebarType(this)"
            >
              Transparent
            </button>
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 ms-2"
              data-class="bg-white"
              onclick="sidebarType(this)"
            >
              White
            </button>
          </div>
          <div class="d-flex">
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 active"
              data-class="bg-transparent"
              onclick="sidebarType(this)"
            >
              Transparent
            </button>
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 ms-2"
              data-class="bg-white"
              onclick="sidebarType(this)"
            >
              White
            </button>
          </div>
          <div class="d-flex">
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 active"
              data-class="bg-transparent"
              onclick="sidebarType(this)"
            >
              Transparent
            </button>
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 ms-2"
              data-class="bg-white"
              onclick="sidebarType(this)"
            >
              White
            </button>
          </div>
          <p class="text-sm d-xl-none d-block mt-2">
            You can change the sidenav type just on desktop view.
          </p>
          <!-- Navbar Fixed -->
          <div class="mt-3">
            <h6 class="mb-0">Navbar Fixed</h6>
          </div>
          <div class="form-check form-switch ps-0">
            <input
              class="form-check-input mt-1 ms-auto"
              type="checkbox"
              id="navbarFixed"
              onclick="navbarFixed(this)"
            />
          </div>
          <hr class="horizontal dark mb-1" />
          <div class="mt-2">
            <h6 class="mb-0">Sidenav Mini</h6>
          </div>
          <div class="form-check form-switch ps-0">
            <input
              class="form-check-input mt-1 ms-auto"
              type="checkbox"
              id="navbarMinimize"
              onclick="navbarMinimize(this)"
            />
          </div>
          
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { usersCollection } from "../boot/firebase";
const seccio = JSON.parse(localStorage.getItem("datos"));
export default {
  name: "Default",
  data() {
    return {
      tab: "init",
      userss: null,
      nombre: seccio.nombre,
      host: seccio.host,
      fecha: seccio.fecha,
      tasks: [
        {
          id: "idTask",
          texto: "Aquí irá el texto de la nota",
          estado: false,
        },
      ],
      info: null,
    };
  },

  methods: {
    imprinit() {
      var users = [];
      usersCollection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            texto: doc.data().texto,
            estado: doc.data().estado,
          });
        });
        this.userss = users;
        console.log(this.userss);
      });
    },
  },
  created() {},
};
</script>
<style>

</style>

