<template>
  <section>
    <Modal @close="close">
    <template v-slot:header> Clonar matrículas</template>
    <template v-slot:body>
      <div class="alertdanger mb-3">
                    <p class="parrafo">
                      Este módulo permite respaldar las matrículas actuales a otra base de datos y 
                      elimina las matrículas actuales antes de empezar un nuevo periodo académico
                    </p>
                </div>
          
       
      <div class="text-center">
        <img width="200" src="../../../../assets/img/shapes/issue-navigator-feature.svg" alt="">
      </div>
    </template>
    <template v-slot:acccion>
        <ButtonLoading v-if="ifLoad" />
        <button @click="cloneData" v-else type="submit" class="btn btnNaranja mt-2"
          style="background-color: #0c2ccc !important;">
          Ejecutar
        </button>
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
                this.ifLoad = false;
                this.toast('La base de datos fue migrada')
                this.removeData();
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
                this.$emit('myEventClosedModalMigracion1');
              });
        },
        removeData(){
            this.ifLoad = true;
            this.$proxies._migracionProxi
              .remove()
              .then(() => {
                this.ifLoad = false;
                this.toast('Las matriculas de este periodo fueron eliminadas')
                this.$emit('myEventClosedModalMigracion1');
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
                this.$emit('myEventClosedModalMigracion1');
              });
        },
        toast(message) {
            this.$toasted.info(message, {
              duration: 3500,
              position : 'top-center',
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
