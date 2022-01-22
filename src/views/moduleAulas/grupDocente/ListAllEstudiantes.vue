<template>
    <div class="fixed-plugin" :class="{ 'show w-100': tabb === true }">
        <div
          class="card shadow-lg  desplega"
          :class="{ 'w-100': tabb === true }"
          style="overflow-y: auto; z-index: 9999; transition: 0s;"
        >
          <div
            class=""
            style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
          >
            <div class="d-flex justify-content-between">
              <div class="h5 text-white">
                ...
              </div>
              <div>
                <h5
                  style="font-weight: 400;"
                  class="mt-2 mb-0 fuente text-white"
                >
                  Estudiantes registrados en este curso
                </h5>
              </div>
              <div class="mt-2">
                <button
                 @click="$emit('myEvent')"
                  class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"
                  >
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode: normal"
                    >
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#ffffff">
                        <path
                          d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>

            <!-- End Toggle Button -->
          </div>

          <div
            class="card-body pt-sm-3 pt-0"
            style="overflow-y: auto;height: auto;"
          >
            <!-- Sidebar Backgrounds -->
            <div class="row">
              <div class="col-lg-10 col-12 mx-auto">
                <div class="text-end">
                       <button
                    href="javascript:;"
                    @click="verLista()"
                    class="btn btn-sm btnTrasparente"
                   
                  >
                  Actualizar lista
                  </button>
                </div>
                
                <Refresh class="mt-10" v-if="isData"></Refresh>
                <section v-else class="flex-containes ">
                  <div
                    v-for="item in inAlumnos"
                    :key="item.id"
                    class="text-center"
                  >
                    <br />

                    <div
                      class="targetas1 cajas "
                      style="min-width:170px; width: 170px!important;max-height: 190px;margin-top: 0px!important;"
                    >
                      <div class="form-check my-auto">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          style="float: right; right: 10px; top: 10px;"
                          @click="selectUser(item._id)"
                        />
                      </div>
                      <div
                        class="avatar avatar-xl position-relative mt-3"
                        v-bind:style="{ 'background-color': item.colors }"
                        style="border-radius: 100%;"
                      >
                        <p class="text-white h3" style="font-weight: 600;">
                          {{ item.img }}
                        </p>
                      </div>

                      <p class="text-xs fuente mt-3">
                        {{ item.name }}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div class=" modalFooter">
            <div class="text-end">
              <a class="btn btnNaranjaClaro " @click="$emit('myEvent')">
                Cancelar
              </a>

               <a v-if="isSelecUsers.length === 0" class="btn btnDisabled ms-3" >
                Eliminar
              </a>
               <a v-else class="btn btnNaranja ms-3" @click="eliminar">
                Eliminar
              </a>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import Refresh from "../../../shared/Refresh.vue";

export default {
  name: "Aulaprincipal",
  components: { Refresh },
   props: {
    idGet: {
      type: String,
    },
  },
  data() {
    return {
      info: null,
      isData: false,
      tabb: true,
      inAlumnos: [],
      isCargar: false,
      colors: ["#00875a", "#00b8d9", "#6554c0", "#ff5630", "#57d9a3"],
      isSelecUsers: [],
      id : this.idGet,
    };
  },
  methods: {
    getData() {
      this.isData = true;
      if (this.id) {
        this.$proxies._aulaProxi
          .getMain(this.id)
          .then((x) => {
            this.info = x.data;
            this.isData = false;
            this.ids = this.info._id;
            this.empujarAlumnos();
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
          });
      }
    },
    empujarAlumnos() {
      this.inAlumnos = [];
      this.isCargar = true;
      for (let i = 0; i < this.info.estudiantes.length; i++) {
        let _id = this.info.estudiantes[i]._id;
        let iniciales = this.info.estudiantes[i].name;
        var arregloDeSubCadenas = iniciales.split(" ");
        let subcadena =
          arregloDeSubCadenas[0].substring(0, 1) //+ arregloDeSubCadenas[2].substring(0, 1);
        var random = this.colors[
          Math.floor(Math.random() * this.colors.length)
        ];
        this.inAlumnos.push({
          _id: _id,
          name: iniciales,
          img: subcadena,
          colors: random,
        });
      }
      setTimeout(() => this.isCargar = false, 500); 
     // this.isCargar = false;
    },
    verLista(){
      this.getData();
      this.empujarAlumnos();
    },
    //------------------------------------------LISTA DE ESTUDIANTES MATRICULADOS-----------
    selectUser(key){
      let longitud = this.isSelecUsers.length;
      let isExiste = 0;
      if(longitud>0){
         for (let i = 0; i < this.isSelecUsers.length; i++) {
            if(this.isSelecUsers[i]==key){
             this.isSelecUsers.splice(i, 1); 
             isExiste = 1;
             break;
            }
         }
         if(isExiste===0){ 
           this.isSelecUsers.push(key);
         }
      }else{
       this.isSelecUsers.push(key);
      } 
    },
    ejecuta_eliminar(){
      let longitud = this.isSelecUsers.length;//removeUsers
      if (longitud > 0) {
        this.$proxies._aulaProxi
        .removeUsers(this.id, this.isSelecUsers) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then(() => {
          this.isSelecUsers = [];
          this.getData();
          this. toast('Usuarios eliminados exitosamente')
        })
        .catch((x) => {
          alert("Error server not found", x.response);
        });
      }
    },
    eliminar(){
      let message = {
        title: "Eliminar",
        body: "Esta seguro que quiere eliminar estos usuarios de la su clase",
      };
      let options = {
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then(() => {
          this.ejecuta_eliminar(); 
        })
        .catch(function() {
         
        }); 
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 1300,
        position : 'bottom-center',
        icon: "check-circle",
        theme: "toasted-primary",
        action : {
          text : 'CERRAR',
          onClick : (e, toastObject) => {
              toastObject.goAway(0);
          }
        }
      });
    },
    callParent(){
        this.$emit('closedChildGruopen')
    },

  },
  created() {
    this.getData();
  },
};
</script>