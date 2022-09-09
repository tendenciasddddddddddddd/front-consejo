<template>
     <div
      class="modal fade "
      :class="{ 'show ': modals === true }"
      :style="[modals === true ? { display: 'block' } : {}]"
      style="overflow-y: auto;   z-index: 9999;"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content ">
          <div class="modalheader2">
            <p class="h5 fuente text-white mt-3 ms-3" style="font-weight:400;">
             Clonar matriculas de esta modalidad
            </p>
            <button
              @click="$emit('myEventClosedModalMigracion1')"
              class="btn btn-link text-white fuente"
              style="margin-top: -100px; margin-right: -20px;"
            >
              CERRAR &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-start">
              <div v-if="ifview=='1'" >
                <span class="parrafo">Migrar datos antes de limpiar la base de datos</span>
                <div class="p-7">
                      <button v-if="ifLoad"  class="btn btnCreanaBorder w-100" >
                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" ></span>
                   Trabajando...
                   </button>
                    <button v-else @click="cloneData" class="btn btnCreanaBorder  w-100 " >
                     <b> <i class='bx bx-cloud-light-rain' style="font-size:22px"></i> Clonar Data</b>
                   
                    </button>
                </div>
                  
              </div>

               <div v-if="ifview=='2'">
                  <span class="parrafo">Limpiar los datos que fueron migrados</span>
                   <div class="p-7">
                      <button v-if="ifLoad"  class="btn btnCreanaBorder w-100" >
                   <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" ></span>
                   Trabajando...
                   </button>
                    <button v-else @click="removeData" class="btn btnCreana  w-100 " >
                     <b> <i class='bx bx-task-x me-2' style="font-size:22px"></i> Limpiar Data</b>
                  
                    </button>
                </div>
              </div>  
            </div>
           
          </div>
        </div>
      </div>
    </div>
</template>
<script >
export default {
    name: 'MigracionMatricula',
    props: {
        idGet: {
          type: String,
          required: true
        },
    },
    data() {
        return {
            modals: true,
            ifview: '1',
            ifLoad: false,
        }
    },
    methods: {
        cloneData() { 
            this.ifLoad = true;
            this.$proxies._migracionProxi
              .create()
              .then(() => {
                this.ifview = '2';
                this.ifLoad = false;
                this.toast('La base de datos fue migrada')
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
        },
        removeData(){
            this.ifLoad = true;
            this.$proxies._migracionProxi
              .remove()
              .then(() => {
                this.ifLoad = false;
                this.toast('La base de datos esta limpia en esta modalidad')
                this.$emit('myEventClosedModalMigracion1');
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
        },
        toast(message) {
            this.$toasted.info(message, {
              duration: 2300,
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
    },
   
}
</script>
