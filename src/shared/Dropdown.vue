<template>
  <v-select
    class="style-chooser croll"
    placeholder="--Seleccionar items--"
    :options.sync="options"
    label="nombre"
    v-model="selectedOption"
    required
    @input="(event) => { $emit('input', selectedOption); }">
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
  props: {
    value: null,
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  mounted() {
    this.selectedOption = this.value;
  },
  watch: {
    value: function(newValue) {
      this.selectedOption = newValue;
    },
  },
};
</script>
