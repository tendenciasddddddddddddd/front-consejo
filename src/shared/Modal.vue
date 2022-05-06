<template>
   <div class="modal fade show" style="overflow-y: auto;  z-index: 9999;display:block;" tabindex="-1" role="dialog" >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modalheader">
                   <p class="h5 fuente text-white mt-3 ms-3" style="font-weight:400;">
                       <!-- HEADER OF MODAL -->
                      <slot name="header">  </slot>
                  </p>
                  <button
                    @click="close"
                    class="btn btn-link text-white fuente"
                    style="margin-top: -100px; margin-right: -20px;"
                  >
                   CERRAR &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
                  </button>
                </div>
                <div class="modal-body croll">
                   <slot name="body">  </slot>
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
