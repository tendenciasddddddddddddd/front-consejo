<template>
  <div class="fixed-plugin show w-100" style=" z-index: 9999;  ">
    <a class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: #000;">
      <i class="fa fa-cog py-2 text-white"> </i>
    </a>
    <div class="card shadow-lg  desplega w-100 " style="z-index: 9999;">
      <div class="" style="margin-left: -20px;margin-right: -10px; border-radius: 0px; padding: 1px 13px 1px 20px;
       background: radial-gradient(100.99% 100.73% at 0% 0%,rgba(0,196,204,0.725916) 0%,#00c4cc 0.01%,rgba(0,196,204,0) 100%),radial-gradient(68.47% 129.02% at 22.82% 97.71%,#6420ff 0%,rgba(100,32,255,0) 100%),radial-gradient(106.1% 249.18% at 0% 0%,#00c4cc 0%,rgba(0,196,204,0) 100%),radial-gradient(64.14% 115.13% at 5.49% 50%,#6420ff 0%,rgba(100,32,255,0) 100%),#7d2ae7;">
         <nav class="navbar navbar-expand-lg navbar-dark ">
  <div class="container-fluid">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse " id="navbarColor02" style="">
      <slot name="header"> </slot>
      
      <div class="d-flex d-none d-lg-block">
        <a @click="$emit('close')" class="text-white" style="cursor:pointer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172"
              style=" fill:#000000;">
              <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                font-family="none" font-weight="none" font-size="none" text-anchor="none"
                style="mix-blend-mode: normal">
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#ffffff">
                  <path
                    d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z">
                  </path>
                </g>
              </g>
            </svg>
          </a>
        </div>
    </div>
  </div>
</nav>
        
       
        <!-- End Toggle Button -->
      </div>
      <div class="card-body pt-sm-3 pt-0 croll" style="overflow-y: auto;height: auto;">
        <!-- Cuerpo -->
        <slot name="body"> </slot>
        <!-- fin cuerpo -->
      </div>
      <div class="modalFooter">
      <div class="text-end">
        <slot name="footer"> </slot>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrimModal2",
}
</script>