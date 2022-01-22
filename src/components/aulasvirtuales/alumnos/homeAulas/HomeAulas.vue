<template>

      <div class="fixed-plugin" :class="{ 'show w-100': tabb === true }">
        <div
          class="card shadow-lg  desplega"
          :class="{ 'w-100': tabb === true }"
          style="overflow-y: auto; z-index: 9999;"
        >
          <div
            class=""
            style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
          >
           <div class="d-flex justify-content-between">
              <div class="h5 text-white">
                ...
              </div>
              <div>
                <h5
                  style="font-weight: 400;"
                  class="mt-2 mb-0 fuente text-white"
                >
                  Estudiantes en este curso
                </h5>
              </div>
              <div class="mt-2">
                <button
                  @click="$router.go(-1)"
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
            
          </div>

          <div class="card-body pt-sm-3 pt-0">
            <!-- Sidebar Backgrounds -->
             <Spinner v-if="isData"></Spinner>
            <div v-else class="row">
             
              <div class="col-lg-10 col-12 mx-auto">
                <Refresh class="mt-10" v-if="isCargar"></Refresh>
                <section v-else class="flex-containes ">
                  <div
                    v-for="item in inAlumnos"
                    :key="item.id"
                    class="text-center"
                  >
                    <br />

                    <div
                      class="targetas1 cajas "
                      style="min-width:170px;width: 170px!important;min-height: 190px;margin-top: 0px!important;"
                    >
                      
                      <div
                        class="avatar avatar-xl position-relative mt-3"
                        v-bind:style="{ 'background-color': item.colors }"
                        style="border-radius: 100%;"
                      >
                        <p class="text-white h3" style="font-weight: 600;">
                          {{ item.img }}
                        </p>
                      </div>

                      <p class="text-xs fuente mt-3">
                        {{ item.name.slice(0, 30) }}
                      </p>
                    </div>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
          <div class=" modalFooter">
            <div class="text-end">
              <a class="btn btnNaranjaClaro "  @click="$router.go(-1)">
                Volver
              </a>

              
            </div>
          </div>
        </div>
      </div>
    
  
</template>

<script src="./HomeAulas.js"></script>

<style>
.bOSBYo1 {
  display: flex;
  height: 200px;
  max-width: 100%;
  padding-top: 16px;
  flex-direction: column;
  color: inherit;
  background: rgb(222, 235, 255);
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-image: initial;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px;
  transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
}
.fwkeBY1 {
  border-radius: 3px;

  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in-out 0s;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.fwkeBY1:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
}
.esnRuO1 {
  background: rgb(244, 245, 247);
}

.targetas {
  border-radius: 3px;
  height: 180px;
  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in-out 0s;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.targetas:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
}
</style>
