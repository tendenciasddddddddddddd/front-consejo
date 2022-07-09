<template>
   <vue-editor id="editor" @input="onEditorUpdate"
    :value="value"  :editorToolbar="customToolbar" class="fuente">
   </vue-editor>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
 props: {
    value: {
      type: String,
      default: '',
    },
  },
 components: {VueEditor},
 data (){
    return{
        htmlForEditor: "",
        customToolbar: [],
        prop: "value",
        event: "change"
    }
 },
   methods: {
    onEditorUpdate(newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>

