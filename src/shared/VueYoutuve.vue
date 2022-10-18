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
    components: {
        Modal
    },
    data() {
    return {
      videoId: 'lG0Ys-2d4MA',
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
