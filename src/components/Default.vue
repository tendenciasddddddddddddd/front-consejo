<template>
  <div class="row">
    <div class="col-lg-8 col-12 mx-auto">
      <div class="mt-2">
        
         <h1 style="font-weight: 400;" class="remix fuente ">Bienvenidos al sistema.<span>&#160;</span></h1>
      </div>
      
    </div>
    <div class="col-lg-6 mt-5">
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
        <div  class="mt-3">
          
        </div>
  
   <!-- <img
        class="w-75"
        
        src="../assets/img/icons/nofound.svg"
        alt=""
      /> -->


      </div>
    </div>

    <div class="col-lg-6  mt-1 text-center">
      <img
        class="w-75"
        
        src="../assets/img/logs/guidelines.svg"
        alt=""
      />
    </div>
    

  </div>
</template>
<script>
import { usersCollection } from "../boot/firebase";

export default {
  name: "Default",
  data() {
    return {
      tab: "init",
      userss: null,
      nombre: '',
      host: '',
      fecha: '',
      tasks: [
        {
          id: "idTask",
          texto: "Aquí irá el texto de la nota",
          estado: false,
        },
      ],
      info: null,
      name: '',
      //EFECTO MAQUINAL
     msg: 'This is a button.'
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
    welcom(){
       const seccio = JSON.parse(localStorage.getItem("datos"));
       this.nombre= seccio.nombre;
      this.host= seccio.host;
      this.fecha= seccio.fecha;
    }
  },
  created() {
   this.welcom();
  },
};
</script>


