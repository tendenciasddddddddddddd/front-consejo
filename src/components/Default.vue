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
           <a class="btn btnNaranja" target="_blank" href="https://pcei-tulcan.com/"> Pagina pública</a>
        </div>
  
   
 
   <!-- <button v-tooltip.top-center="{
    content: 'Tooltip content here',
    show: true,
    trigger: 'manual',
  }">Hover me</button> -->

  <!-- <v-popover>
 
  <button  class="btn btnNegro ms-10">Click me</button>

  <template slot="popover">
    <div class="headerss" >
      holas
    </div>
    <p class="parrafo">Para empezar, haz clic en Importar.</p>
  </template>
</v-popover> -->

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
<style>
.remix span {
    position:absolute;
    right:0;
    width:0;
    background: #fff;
    border-left: 3px solid #000;
    animation: escribir 5s steps(30) infinite alternate;
}

@keyframes escribir {
    from { width: 70% }
    to { width:24% }
}
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: #425b76;
  color: white;
  font-size:13px;
  font-family: AvenirNext LP Pro Regular, Helvetica, Arial, sans-serif;
  border-radius: 3px;
  padding: 5px 10px 4px;
   z-index: 10000;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #425b76;
   z-index: 10000;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 15px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 15px 15px 0 15px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -10px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
   z-index: 10000;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 10px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 15px 15px 15px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -10px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  max-width: 350px;
  width: 350px;
 border-radius: 3px;
  background-color: #fff;
    border: 0;
    box-shadow: 0 0 0 1px rgb(81 111 144 / 30%), 0 1px 24px 0 rgb(0 0 0 / 8%);
    
}
.headerss{
  display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 24px;
    background: rgb(106, 120, 209);
    color: rgb(255, 255, 255);
margin-top: -5px;
    margin-left: -10px;
    margin-right: -10px;
}

.tooltip.popover .popover-arrow {
 
    position: absolute;
    pointer-events: none;
    clip-path: polygon(100% 100%, 0px 100%, 100% 0px);
    border-top-left-radius: 100%;
    width: 20px;
    height: 20px;
    background-color: rgb(106, 120, 209);
    transform: rotate(-135deg);
    top: -10px;
    left: 260.362px!important;
    border-top-color: transparent !important;
    border-left-color: transparent !important;

}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 1;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
.opac{
   position: fixed;
  z-index: 3;
  background-color: #ffffffb3;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>

