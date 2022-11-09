<template>
  <Modal @close="close">
    <template v-slot:body>
      <!-- <youtube :video-id="videoId" :player-vars="playerVars" ></youtube> -->
      <vueVimeoPlayer ref="player" :options="options" :video-id="videoId" @ready="onReady" ></vueVimeoPlayer>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import { vueVimeoPlayer } from 'vue-vimeo-player'
export default {
  props: {
    videoId: {
      type: String,
    },
  },
  components: {
    Modal, vueVimeoPlayer
  },
  data() {
    return {
      // videoId: 'dbG1xucfNHA',
      playerVars: {
        autoplay: 1
      },
      height: 400,
      options: {
        muted: true,
        autoplay: true,
      },
      playerReady: false
    }
  },
  methods: {

    close() {
      this.$emit('ClosedYoutuve')
    },
    onReady() {
      this.playerReady = true
    },
    play() {
      this.$refs.player.play()
    },
    pause() {
      this.$refs.player.pause()
    }
  }
}
</script>
<style>
iframe {
  width: 100%;
}
</style>
