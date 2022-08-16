<template>
   <div >
    <div class="altural"></div>
    <div class="fixed-plugin show reponv1">
      <div
        class="card desplega reponv1"
        style="overflow-y: auto; z-index: 9999; "
      >
        <div class="cabesa modal-header">
          <div class="float-start">
            <h5 style="font-weight: 400;" class=" mb-0 fuente text-white">
              <slot name="header">  </slot>
            </h5>
          </div>
          <div class="float-end mt-1">
            <a
              @click="close"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
             <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#ffffff">
                    <path
                      d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                    ></path>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
        <div class="card-body pt-sm-3 pt-0 croll" style="overflow-y: auto;height: auto;">
            <slot name="body">  </slot>
        </div>
        <div class="cord-footer modalFooter" >
          <div class="text-end">
            <slot name="footer">  </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name: "FullModal",
 data() {
     return {
         tabla: true,
     }
 },
  methods: {
    close() {
      this.$emit("close");
    },
  },
}
</script>
<style >
 .modal-header{
margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;
 }   
</style>