<template>
  <div class="s-header-notification ">
              <a v-if="initText" href="javascript:;" @click="$router.go(-1)" class="s-regresar me-2 ms-2 mb-3">
             <svg class="me-2" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color: #000;"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
            Atrás</a>
         <b class="text-sm ms-1" style="color:#000">{{firsttext}},</b> <span class="parrafo ">{{lasttext}}...</span> 
      </div>
</template>

<script>
export default {
    props: {
    firsttext: {
      type: String,
      required: true
    },
    lasttext: {
        type: String,
        required: true
    },
    initText: {
       type: String,
    }
  },
}
</script>
