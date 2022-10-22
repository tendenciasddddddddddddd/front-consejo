<template>
    <div class="fixed-plugin show w-100"  style=" z-index: 9999;  ">
      <a class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: #000;">
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div class="card shadow-lg  desplega w-100" style="z-index: 9999;">
        <div style="    margin-left: -20px;
    margin-right: -10px;
    border-radius: 0px;
    min-height: 44px;
    padding: 1px 13px 1px 20px;
    background: radial-gradient(100.99% 100.73% at 0% 0%,rgba(0,196,204,0.725916) 0%,#00bda5 0.01%,rgba(0,196,204,0) 100%),radial-gradient(68.47% 129.02% at 22.82% 97.71%,#00bda5 0%,rgba(100,32,255,0) 100%),radial-gradient(106.1% 249.18% at 0% 0%,#00bda5 0%,rgba(0,196,204,0) 100%),radial-gradient(64.14% 115.13% at 5.49% 50%,#8958f7 0%,rgba(100,32,255,0) 100%),#8b3dff;
    ">
          <div class="d-flex justify-content-between">
            <div class="h5 text-white">
              ...
            </div>
            <div>
              <h5 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
                <slot name="header">  </slot>
              </h5>
            </div>
            <div class="mt-2">
              <button
                @click="$emit('close')"
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
              </button>
            </div>
          </div>
          <!-- End Toggle Button -->
        </div>
        <div class="card-body pt-sm-3 pt-0 croll" style="overflow-y: auto;height: auto;">
          <!-- Cuerpo -->
             <slot name="body">  </slot>
          <!-- fin cuerpo -->
        </div>
        <div class="modalFooter">
          <div class="text-end">
             <slot name="footer">  </slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
   name: "ScrimModal",
}
</script>

