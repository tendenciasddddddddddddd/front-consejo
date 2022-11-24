<template>
  <Modal @close="close">
    <template v-slot:header> LISTA DE MATRICULAS</template>
    <template v-slot:body>

      <p style="font-weight:400;" class="h6 fuente negros">
        El archivo a descargar en un documento con la lista de todas las matriculas del periodo actual</p>
      <div class="text-center">
        <img width="240" src="../../../../assets/img/consolidado.svg" alt="">
      </div>
      <section v-if="iflista" style="display: none">
        <FormatoNomina  :settings="settings" @changeStatus="changeStatus" />
      </section>
    </template>
    <template v-slot:acccion>
      <ButtonLoading v-if="ifLoad" />
      <button @click="getData" v-else type="submit" class="btn btnNaranja mt-2">
        Descargar archivo
      </button>
    </template>

  </Modal>

</template>
<script >
import Modal from "../../../../shared/Modal.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
export default {
  name: 'Consolidado',
  components: {
    Modal, ButtonLoading,
    FormatoNomina: () => import( /* webpackChunkName: "FormatoNomina" */ "./FormatoNomina.vue"),
  },
  data() {
    return {
      iflista: false,
      ifLoad: false,
      settings : {},
    }
  },
  methods: {
    close() {
      this.$emit('myEventClosedModalConsolidado')
    },
    getData() {
      this.iflista = true;
      this.ifLoad = true;
    },
    changeStatus(ev) {
      if (ev == '100') {
        this.ifLoad = false;
        this.iflista = false;
        this.close()
      }
    },
    verificarUsuario() {
      this.ifLoad = true;
      this.$proxies._settingProxi.getConfigure()
          .then((x) => {
              const {rector,logo, secretario,unidadeducativa,ubicacion,direccion,telefono} = x.data[0];
              this.settings = {
                secretario : secretario,
                rector : rector,
                unidadeducativa: unidadeducativa,
                ubicacion: ubicacion,
                telefono:telefono,
                direccion: direccion,
                logo : logo,
              }  
              this.ifLoad = false;
          }).catch(() => {
            this.ifLoad = false;
              console.log("Error")
          });
    },
  },
  created() {
    this.verificarUsuario();
  },
}
</script>
