<template>
<div >
    <p v-if="isNacion">Espere por favor...</p>
     <v-select v-else class="style-chooser" 
    :options="listNacionalidad"
    v-model="modNacion" label="nombre" @input="checkExist($event)"
  >
    <template #option="{ nombre }">
      <h6 style="margin: 0">{{ nombre }}</h6>
    </template>
    <template #no-options="{ }">
      Lo siento, no hay opciones de coincidencia.
    </template>
  </v-select>
</div>
 
</template>

<script>
export default {
    name : "ChildEtnia",
    props: {
    modeloNacion: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modNacion : this.modeloNacion,
      isNacion : false,
      listNacionalidad : [],
    };
  },
  methods: {
    checkExist(event) {
      if (event) {
        this.$emit("ComponentChildNacion", event);
      }
    },
    listNacion() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isNacion = true;
     this.$proxies._registroProxi
        .getNacionalidad()
        .then((x) => {
          this.listNacionalidad = x.data.datas;
          this.isNacion = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isNacion = false;
        });
    },
  
  },
  mounted() {
    this.listNacion();
  }
}
</script>
