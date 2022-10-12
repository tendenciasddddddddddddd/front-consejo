<template>
  <input 
   class="form-control buscador" 
    type="text" 
    :value="value" 
    @input="$emit('update', $event.target.value)"
  />
</template>

<script>
export default {
  props: ["value"],
  model: {
    prop: "value",
    event: "update"
  }
};
</script>