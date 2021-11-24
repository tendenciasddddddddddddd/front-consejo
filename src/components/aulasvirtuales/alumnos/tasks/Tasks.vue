<template>
  <div
    class="row "
    style="background-image:url(https://prismic-io.s3.amazonaws.com/www-static/e2b726ab-087a-4e53-8aca-65826c3f93e7_bg-grid.svg);background-color:null;min-height: 80vh; margin-left:-50px; margin-top:-22px;"
  >
    <div class="col-lg-9 col-12 mx-auto">
      <div class="row">
        <div
          class="mt-4"
          style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p class="text-sm text-dark fuente" style="margin:7px; ">
              <i class="ni ni-bell-55"></i> &nbsp;
              <strong>Nota:</strong> Registre mis trabajos y deberes... 👌
            </p>
          </div>
        </div>
        <Spinner v-if="isData"></Spinner>
        <div v-else>
          <div class="row mt-4">
            <div class="col-md-12 col-12">
              <div class="card-body pb-0" v-if="fullTask.length">
                <ul
                  v-for="item in fullTask"
                  :key="item.id"
                  class="list-unstyled mx-auto"
                >
                  <li class="d-flex">
                    <a href="javascript:;">
                      <img
                        alt="Image placeholder"
                        height="35px;"
                        class="mx-1 mt-n2"
                        src="../../../../assets/img/usados/inc.svg"
                      />
                    </a>
                    <a
                      @click="openModal(item)"
                      href="javascript:;"
                      class="mb-0 fuente text-dark"
                      >{{ item.nombre }}</a
                    >
                    <div class="dropstart ms-auto">
                      <div v-if="item.estado" class="form-check ">
                        <input
                          disabled
                          checked
                          class="form-check-input"
                          type="checkbox"
                        />
                      </div>
                      <div v-else class="form-check ">
                        <input
                          disabled
                          class="form-check-input"
                          type="checkbox"
                        />
                      </div>
                    </div>
                  </li>

                  <li>
                    <hr />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- BLUR-->
          <div v-if="tabla === 'ontask'" class="altural"></div>
          <!-- MODAL-->
          <div
            class="fixed-plugin"
            :class="{ 'show reponv2': tabla === 'ontask' }"
          >
            <div
              class="card shadow-lg desplega"
              :class="{ reponv2: tabla === 'ontask' }"
              style="overflow-y: auto; z-index: 9999; "
            >
              <div
                class=" cabesa"
                style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 52px;
         padding: 4px 40px 4px 40px;"
              >
                <div class="float-start">
                  <h5
                    style="font-weight: 400;"
                    class="mt-3 mb-0 fuente text-white"
                  >
                    Enviar Tarea
                  </h5>
                  <!--  <p class="parrafo">{{nombre}}</p> -->
                </div>
                <div class="float-end mt-2">
                  <button
                    @click="tabla = 'termina'"
                    class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                  >
                    <i
                      style="font-size: 32px;"
                      class="fa fa-close text-white"
                    ></i>
                  </button>
                </div>
                <!-- End Toggle Button -->
              </div>

              <div class="card-body pt-sm-3 pt-0">
                <!-- Sidebar Backgrounds -->
                <div class="row">
                  <Spinner v-if="ifcarga"></Spinner>
                  <div v-else class="col-lg-11 col-12 mx-auto">
                    <p class="h5 fuente efecto">
                      {{ title }}<span>&#160;</span>
                    </p>
                    <div class="mt-3" style="padding:9px; background-color: rgb(243, 243, 243);">
                         <p class="parrafo" v-html="descrition"></p>
                    </div>
                    

                    <div class="mt-4" >
                    
                      <p class="parrafo text-sm">
                         <a class="text-primary"> <img
                          alt="Image placeholder"
                          height="50px;"
                          class="mx-1 mt-n2 move-on-hover"
                          src="../../../../assets/img/usados/timpo.svg"
                        /> </a> &nbsp;&nbsp; <b>{{ isPlaso }}</b>
                        </p>
                    </div>
                    <div lass="mt-4">
                     
                           <a
                          v-if="recursos"
                          class="parrafo"
                          style=" cursor: pointer;"
                          target="_blank"
                          :href="recursos"
                        >
                          <img
                            alt="Image placeholder"
                            height="50px;"
                            class=" move-on-hover "
                            src="../../../../assets/img/usados/word.svg"
                          /> &nbsp;&nbsp;&nbsp; Descargar
                        </a>
                        
                    </div>
                    
                    <vue-dropzone class="mt-5"
                      style="height:200px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                      ref="dropzone"
                      @vdropzone-complete="afterComplete"
                      id="drop1"
                      :options="dropOptions"
                    >
                    </vue-dropzone>
                      <p class="parrafo text-sm mt-3">
                          <a class="text-primary">Vence: </a>{{ datetimes }} 
                        
                        </p>
                  </div>
                </div>
              </div>
              <div class="cord-footer" style="background-color: #f5f8fa;
                   border-top: 1px solid #cbd6e2;
                   padding: 10px ">
                 <div class="text-end">
                      <a
                        class="btn "
                        style="background-color: #fff;
                       border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
                      border-style: solid;
                      font-size: 14px;
                      line-height: 16px;
                      text-transform: none;
                       border-width: 1px;"
                        @click="removeAllFiles"
                      >
                        Eliminar
                      </a>
                      &nbsp; &nbsp;
                      <button
                        v-if="ifLoad"
                        disabled
                        class="btn btn-sm btnNaranja"
                      >
                        Enviando...
                      </button>
                      <button
                        v-else
                        class="btn btnNaranja " 
    
                        @click="saveArbolEntrega()"
                      >
                        Guardar
                      </button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Tasks.js"></script>

<style>
.efecto span {
  position: absolute;
  right: 0;
  width: 0;
  background: #fff;
  border-left: 3px solid #000;
  animation: escribir 5s steps(30) infinite alternate;
}

@keyframes escribir {
  from {
    width: 90%;
  }
  to {
    width: 20%;
  }
}
</style>
