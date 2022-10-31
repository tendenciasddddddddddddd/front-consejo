<template>
    <div class="fixed-plugin show w-100" style=" z-index: 9999;  ">
      <a class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: #000;">
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div class="card shadow-lg  desplega w-100" style="z-index: 9999;">
        <div style="margin-left: -20px;margin-right: -10px; border-radius: 0px; min-height: 58px;padding: 1px 13px 1px 20px;box-shadow: 0 0 0 1px rgb(68 92 116 / 2%), 0 2px 8px rgb(57 76 96 / 15%) !important;">
          <div class="d-flex justify-content-between">
           
            <div>
              <div class=" mb-0 ">
                <slot name="header"> </slot>
              </div>
            </div>
            <div class="text-sm negros mt-2">
                <a @click="$emit('close')" class="negros" style="cursor:pointer">
                <svg focusable="false" width="40" height="40" viewBox="0 0 24 24" class=" NMm5M"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>
            </a>
            </div>
          </div>
          <!-- End Toggle Button -->
        </div>
        <div class="card-body pt-sm-3 pt-0 croll" style="overflow-y: auto;height: auto;">
          <!-- Cuerpo -->
          <slot name="body"> </slot>
          <!-- fin cuerpo -->
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ScrimModal2",
  }
  </script>
  
  