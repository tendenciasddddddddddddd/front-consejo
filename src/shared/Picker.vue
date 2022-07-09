<template>
   <date-picker  @input="onPikerUpdate" :value="value" type="datetime" class="w-100 fuente">
    </date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    props: {
    value: {
      type: Date,
      default: '',
    },
  },
  components: {DatePicker},
  data (){
    return{
        prop: "value",
        event: "change"
    }
 },
   methods: {
    onPikerUpdate(newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>