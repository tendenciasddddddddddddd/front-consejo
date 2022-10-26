<template>
    <div >
      <NoFound2/>
    </div>
</template>
<script >
import NoFound2 from '../../../shared/NoFound';
  export default {
    name: 'HistoriaEst',
    components :{NoFound2},
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
      let text_1 = 'Historial'
      let text_2 = 'Detalle de Historial'
      this.$store.commit('updateHeader',{text_1, text_2}) 
    },
  }
</script>