<template>
  <div>
    <vue-editor id="editor" @input="onEditorUpdate" :value="value" :editorToolbar="customToolbar" useCustomImageHandler
      @image-added="handleImageAdded" class="fuente">
    </vue-editor>
    <div v-if="isUploads" class="loadingg">
      <div class="inn ">
        <h4 style="font-weight:400" class="text-white mb-0 fadeIn2 fadeInBottom">Procesando imagen
          <div  class="text-center me-3">
      <div class="spinner-grow text-danger me-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning me-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
    <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
        </div>
        </h4>
      </div>
    </div>
  </div>

</template>

<script>
import { VueEditor } from "vue2-editor";
import * as axios from "axios";
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  components: { VueEditor },
  data() {
    return {
      htmlForEditor: "",
      customToolbar: [],
      prop: "value",
      event: "change",
      isUploads: false
    }
  },
  methods: {
    onEditorUpdate(newVal) {
      this.$emit('input', newVal)
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      this.isUploads = true;
      var formData = new FormData();
      formData.append("myFile", file);
      axios.post("https://ueangel.online/api/upload/tareas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(result => {
          const url = result.data;
          Editor.insertEmbed(cursorLocation, "image", url);
          this.isUploads = false;
          resetUploader();
        })
        .catch(err => {
          console.log(err);
          this.isUploads = false;
        });
    }
  },
}
</script>

