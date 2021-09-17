<template>
  <div>
    <div class="row ">
      <Spinner v-if="isData"></Spinner>
      <div v-else class="col-lg-10 col-12 mx-auto">
        <!--  <div
          class="mt-1"
          style="background-color: #e5f5f8; padding:5px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p
              class="text-dark fuente "
              style="margin:7px;font-weight: 700; font-size: 16px "
            >
              <router-link
                to="/aulas-lista"
                class="badge fuente regresar"
                style=""
              >
                <i class="ni ni-bold-left"></i>&nbsp;Regresar</router-link
              >
              &nbsp;&nbsp; &nbsp;&nbsp; Gestíon de Aulas Virtuales => {{ info.nombre }} => {{ info.icono }}
            </p>
          </div>
        </div> -->
        <div>
          <div class=" p-3 position-relative ">
            <div class="row mt-3 bOSBYo1">
              <div class="col-lg-5 text-start">
                <router-link
                  to="/my-lista"
                  class="badge fuente regresar"
                  style=""
                >
                  <i class="ni ni-bold-left"></i>&nbsp;Regresar</router-link
                >
                <h4 class=" fuente" style="font-weight: 400; color:#172B4D">
                  {{ info.materia }}
                </h4>
                <p class="parrafo" style="color:#172B4D">
                  {{ info.nombre }}<br />
                  {{ info.icono }}
                </p>
              </div>

              <div class="col-lg-7 ">
                <div
                  class="text-end  d-md-block d-none
                  me-n8"
                >
                  <img
                    height="230px"
                    class="w-100"
                    src="../../../../assets/img/jira/subir-escalera.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div class="row mt-5">
              <h4 class=" fuente" style="font-weight: 400;">Actividades</h4>
              <hr />
              <div class="col-lg-10 ">
                <div @click="empujarAlumnos()" class="row mt-3 fwkeBY1 ">
                  <div class="col-lg-3 esnRuO1">
                    <div class="text-center ">
                      <div class="">
                        <div class="">
                          <img
                            class="w-50"
                            src="../../../../assets/img/logs/sunny.svg"
                            alt="fondo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8 ">
                    <div class="">
                      <p class="h6 fuente" >
                        Compañeros de clase
                      </p>
                      <p class="parrafo">
                        Se podra visualizar todos los comañeros que estas
                        registrados
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row mt-3 fwkeBY1 ">
                  <div class="col-lg-3 esnRuO1">
                    <div class="text-center ">
                      <div class="">
                        <div class="">
                          <img
                            class="w-55"
                            src="../../../../assets/img/shapes/integrations.01fedc9b3a99ac60b83f009e759a275e.8.svg"
                            alt="fondo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8 ">
                    <div class="">
                      <p class="h6 fuente" >
                        Tareas
                      </p>
                      <p class="parrafo">
                        Se podra visualizar y regsitrar todos las actividades de
                        tareas
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row mt-3 fwkeBY1 ">
                  <div class="col-lg-3 esnRuO1">
                    <div class="text-center ">
                      <div class="">
                        <div class="">
                          <img
                            class="w-55"
                            src="../../../../assets/img/shapes/issue-navigator-feature.svg"
                            alt="fondo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8 ">
                    <div class="">
                      <p class="h6 fuente" >
                        Evaluaciones
                      </p>
                      <p class="parrafo">
                        Se podra rendir todas las evaluaciones que el docente de
                        curso
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed-plugin" :class="{ 'show w-100': tabb === 'iniciarr' }">
        <div
          class="card shadow-lg blur desplega"
          :class="{ 'w-100': tabb === 'iniciarr' }"
          style="overflow-y: auto; z-index: 9999; top:35px;"
        >
          <div class="card-header pb-0 pt-3 "  style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;">
            <div class="float-start">
              <h5 class="mt-3 mb-0 fuente" style="font-weight: 400;">
                Estudiantes en este curso
              </h5>
            </div>
            <div class="float-end mt-4">
              <button
                @click="tabb = 'cerrarr'"
                class="btn btn-link text-dark p-0 fixed-plugin-close-button"
              >
                <i style="font-size: 30px" class="fa fa-close"></i>
              </button>
            </div>
            <!-- End Toggle Button -->
          </div>
         
          <div class="card-body pt-sm-3 pt-0">
            <!-- Sidebar Backgrounds -->
            <div class="row">
                <Spinner v-if="isCargar"></Spinner>
              <div v-else class="col-lg-6 col-12 mx-auto">
                <p class="h5 fuente">Personas</p>
                
                <div  class="row">
                  <div v-for="item in inAlumnos" :key="item.id" class="col-sm-3">
                     
                    <div class="text-center ">
                      <div class="targetas">
                        <div class="avatar avatar-xl position-relative mt-3" v-bind:style="{'background-color':item.colors}" style="border-radius: 100%;">
                          <p class="text-white h3" style="font-weight: 600;">{{item.img}}</p>
                        </div>

                        <p class="text-xs fuente mt-3">{{item.name.slice(0,20)}}</p>
                      </div>
                    </div>
                     <br>
                  </div>
                  <!-- <div class="col-sm-3">
                    <div class="text-center ">
                      <div class="targetas">
                        <div class="avatar avatar-xl position-relative mt-3">
                          <img
                            class=""
                            style="border-radius: 100%;"
                            src="https://res.cloudinary.com/stebann/image/upload/v1631310792/profile_b9t64l.png"
                            alt="fondo"
                          />
                        </div>

                        <p class="text-xs fuente mt-3">
                          Esteban Wladimir Martinez Martinez
                        </p>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
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
