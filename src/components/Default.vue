<template>
  <div class="row">
    
    <div class="col-lg-8 col-12 mx-auto">
      <div class="mt-2">
        
         <h1 style="font-weight: 400;" class="remix fuente " >Bienvenidos al sistema.<span>&#160;</span></h1>
      </div>
      
    </div>
  
    <div class="col-lg-6 mt-5">
      <div class="" id="sessions">
        <div class="card-header pb-3">
          <h5 class="fuente">Sesiones</h5>
          <p class="parrafo">
            Esta es una lista de dispositivos que han iniciado sesión en su
            cuenta. Elimina los que no reconoces.
          </p>
        </div>
        <div class="card-body pt-0">
          <div>
            <div class="d-flex align-items-center">
              <div class="text-center w-5">
                <i
                  class="fas fa-desktop text-lg opacity-6"
                  aria-hidden="true"
                ></i>
              </div>
              <div class="my-auto ms-3">
                <div class="h-100">
                  <p class="text-sm mb-1 fuente">Su Host es 192.168.1.100</p>
                  <p class="mb-0 text-xs fuente">Mac</p>
                </div>
              </div>
              <span class="badge badge-success badge-sm my-auto ms-auto me-3 fuente"
                >Active</span
              >

              <a
                href="javascript:;"
                class="text-primary text-sm icon-move-right my-auto"
                >10-10-2020
              </a>
            </div>
          </div>

          <hr class="horizontal dark" />
          <div class="d-flex align-items-center">
            <div class="text-center w-5">
              <i
                class="fas fa-desktop text-lg opacity-6"
                aria-hidden="true"
              ></i>
            </div>
            <p class="my-auto ms-3 fuente">Chrome on macOS</p>
            <p class="text-secondary text-sm ms-auto my-auto me-3 fuente">EC</p>
          </div>
          <hr class="horizontal dark" />
        </div>
        <div  class="mt-3">
          
        </div>
  
   <!-- <img
        class="w-75"
        
        src="../assets/img/icons/nofound.svg"
        alt=""
      /> -->


      </div>
    </div>

    <div class="col-lg-6  mt-1 text-center">
      <img
        class="w-100"
        
        src="https://assets.vercel.com/image/upload/q_auto/front/assets/design/components/triangle.gif"
        alt=""
      />
    </div>
    

  </div>
</template>
<script>

export default {
  name: "Default",

};
</script>

