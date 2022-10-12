<template>
  <section>
    <Modal @close="close">
    <template v-slot:header> Respaldo de matriculas</template>
    <template v-slot:body>
          <p v-if="ifview=='1'" style="font-weight:400;" class="h6 fuente negros">Guardar matriculas en la base de datos de respaldo</p>

          <p v-if="ifview=='2'" style="font-weight:400;" class="h6 fuente negros">Mantenimiento de la base de datos actual</p>
 
      <div class="text-center">
        <img width="220" src="../../../../assets/img/shapes/issue-navigator-feature.svg" alt="">
      </div>
    </template>
    <template v-slot:acccion>
      <div v-if="ifview=='1'">
        <ButtonLoading v-if="ifLoad" />
        <button @click="cloneData" v-else type="submit" class="btn btnNaranja mt-2"
          style="background-color: #0c2ccc !important;">
          Clonar Data
        </button>
      </div>
      <div v-if="ifview=='2'">
        <ButtonLoading v-if="ifLoad" />
        <button @click="removeData" v-else type="submit" class="btn btnNaranja mt-2"
          style="background-color: #0c2ccc !important;">
         Limpiar base de datos actual
        </button>
      </div>
    </template>
  </Modal>
  </section>
    
</template>
<script >
import Modal from "../../../../shared/Modal.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
export default {
    name: 'MigracionMatricula',
    components : {
        Modal, ButtonLoading
    },
    data() {
        return {
            modals: true,
            ifview: '1',
            ifLoad: false,
        }
    },
    methods: {
      close(){
        this.$emit('myEventClosedModalMigracion1')
      },
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
