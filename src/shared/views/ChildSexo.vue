<template>
  <v-select :options="sexos" v-model="mod" label="nombre" @input="checkExist($event)">
    <template #option="{ nombre }">
      <h6 style="margin: 0">{{ nombre }}</h6>
    </template>
    <template #no-options="{ }">
      Lo siento, no hay opciones de coincidencia.
    </template>
  </v-select>
</template>

<script>
export default {
  name: "ChildSexo",
  props: {
    modelo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sexos: [
        {
          value: "0",
          nombre: "Masculino",
        },
        {
          value: "1",
          nombre: "Femenino",
        },
        {
          value: "2",
          nombre: "Otros",
        },
        {
          value: "3",
          nombre: "No conforme",
        },
      ],
      mod : this.modelo
    };
  },
  methods: {
    checkExist(event) {
      if (event) {
        this.$emit("ComponentChildSexo", event);
      }
    },
  },
};
</script>
