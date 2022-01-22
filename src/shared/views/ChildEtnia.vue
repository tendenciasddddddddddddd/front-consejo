<template>
<div >
    <p v-if="isEtnia">Espere por favor...</p>
     <v-select class="style-chooser "  v-else
    :options="listEtnia"
    v-model="modEtnia" label="nombre" @input="checkExist($event)"
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
    modeloEtnia: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modEtnia : this.modeloEtnia,
      isEtnia : false,
      listEtnia : [],
    };
  },
  methods: {
    checkExist(event) {
      if (event) {
        this.$emit("ComponentChildEtnia", event);
      }
    },
    listEtnias() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isEtnia = true;
      this.$proxies._registroProxi
        .getEtnias()
        .then((x) => {
          this.listEtnia = x.data.datas;
          this.isEtnia = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isEtnia = false;
        });
    },
  
  },
  mounted() {
    this.listEtnias();
  }
}
</script>
