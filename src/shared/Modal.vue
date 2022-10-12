<template>
  <div class="modal fade show" style="overflow-y: auto;  z-index: 9999;display:block;" tabindex="-1" role="dialog" >
           <div class="modal-dialog mt-8" role="document">
             <div class="modal-content">
               
               <div class="modal-body croll">
                 
                 <div class="h5 negros mb-3" style="font-weight: 600"><slot name="header">  </slot></div>
                 <slot  name="body">  </slot> 
                 <div class="d-flex justify-content-between mt-3">
                   <a
                   @click="close"
                   class="btn btnNaranja mt-2"
                   style="background-color: white !important; color: #000 !important;"
                 >
                  Cerrar &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
                 </a>
                 <slot name="acccion">  </slot>
                 </div>
                  
                  <!-- BODY OF MODAL -->
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