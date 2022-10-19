<template>
    <Modal  @close="close">
        <template v-slot:body>
            <youtube :video-id="videoId" :player-vars="playerVars" ></youtube>
        </template>
    </Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  props: {
    videoId: {
      type: String,
    },
  },
    components: {
        Modal
    },
    data() {
    return {
      // videoId: 'dbG1xucfNHA',
      playerVars: {
        autoplay: 1
      }
    }
  },
  methods: {

    close() {
            this.$emit('ClosedYoutuve')
    },
  }
}
</script>
<style>
iframe {
  width: 100%;
  max-width: 650px; /* Also helpful. Optional. */
}</style>
