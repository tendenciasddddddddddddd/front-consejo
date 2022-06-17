<template>
  <div>
    <time-ago long :refresh="60" :datetime="fecha" locale="es" tooltip ></time-ago>
    
  </div>
</template>

<script>
import { TimeAgo } from 'vue2-timeago'
import 'vue2-timeago/dist/vue2-timeago.css'
export default {
  name: 'TimeEgo',
  props: {
    fecha: String
  },
  components: {
    TimeAgo,
  },
  data(){
    return {
        longString: false,
        value: new Date(),
    }
  },
}
</script>

<style>

</style>