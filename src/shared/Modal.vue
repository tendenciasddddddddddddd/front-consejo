<template>
  <div class="modal fade show" style="overflow-y: auto;  z-index: 9999;display:block;" tabindex="-1" role="dialog" >
           <div class="modal-dialog modal-dialog-centered mt-8" role="document">
             <div class="modal-content">
               
               <div class="modal-body croll">
                 <div class="h5 negros mb-3 text-center" style="font-weight: 600"><slot name="header">  </slot></div>
                 <slot  name="body">  </slot> 
                 <div class="d-flex justify-content-between mt-3">
                   <button
                   @click="close"
                   class="btn btnNaranja2 mt-2"
                 >
                 Cancelar &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
                   </button>
                 <slot name="acccion">  </slot>
                 </div>
               </div>
             </div>
           </div>
         </div>
</template>
<script>
export default {
 name: "Modal",
 methods: {
   close() {
     this.$emit("close");
   },
 },
};
</script>