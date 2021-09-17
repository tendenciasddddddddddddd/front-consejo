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
        <div class="">
          <div class=" p-3 position-relative ">
            <div class="row mt-3 bOSBYo">
              <div class="col-lg-5 text-start">
                <div class="sc-cqCuEk  ">
                  <router-link
                    to="/aulas-lista"
                    class="badge fuente regresar"
                    style=""
                  >
                    <i class="ni ni-bold-left"></i>&nbsp;Regresar</router-link
                  >
                  <h4 class=" fuente" style="font-weight: 400;">
                    {{ info.materia }}
                  </h4>
                  <p class="parrafo">
                    {{ info.nombre }}<br>
                     {{ info.icono }}
                  </p>
                 

                  <!-- <p v-html="info.descripcion" class="parrafo" style="margin:7px; ">
                           
                        </p> -->
                </div>
              </div>

              <div class="col-lg-7 ">
                <div class="text-end">
                  <img
                    height="230px"
                    class="w-100"
                    src="../../../../assets/img/jira/conect.svg"
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
                      <div class="avatar-group ">
                              <a
                                href="javascript:;"
                                class="avatar avatar-xl avatar-xxl rounded-circle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title=""
                                data-bs-original-title="Martin Doe"
                              >
                                <img
                                  alt="Image placeholder"
                                  src="../../../../assets/img/jira/estudiantes.svg"
                                />
                              </a>
                              <a
                                href="javascript:;"
                                class="avatar avatar-xl avatar-xxl rounded-circle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title=""
                                data-bs-original-title="Romina Hadid"
                              >
                                <img
                                  alt="Image placeholder"
                                  src="../../../../assets/img/jira/estudiantes2.svg"
                                />
                              </a>
                             
                            </div>
                             <br>
                    </div>
                  </div>
                  <div class="col-lg-8 ">
                    <div class="">
                      <p class="h6 fuente mt-2" >
                        Lista de Estudiantes
                      </p>
                      <p class="parrafo">
                        Se podra visualizar todos los estudiantes que estan
                        en este curso
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row mt-4 fwkeBY1 ">
                  <div class="col-lg-3 esnRuO1">
                    <div class="text-center ">
                      <div class="">
                        <div class="">
                          <img
                            class="w-45"
                            src="../../../../assets/img//jira/calificar.svg"
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
                      <button
                                to="/crear-aula"
                                class="btn btn-sm mt-2"
                                style="background-color: #fff;border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
                                 border-style: solid;border-width: 1px;"
                              >
                                Calificar
                              </button>
                              &nbsp;&nbsp;
                              <button
                                to="/crear-aula"
                                class="btn btnNaranja btn-sm mt-2"
                              >
                                Crear Tarea
                              </button>
                    </div>
                  </div>
                </div>
                <div class="row mt-4 fwkeBY1 ">
                  <div class="col-lg-3 esnRuO1">
                    <div class="text-center ">
                      <div class="">
                        <div class="">
                          <img
                            class="w-75"
                            src="../../../../assets/img/shapes/tareass.png"
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
                    
                        <button
                                to="/crear-aula"
                                class="btn btn-sm mt-2"
                                style="background-color: #fff;border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
                                 border-style: solid;border-width: 1px;"
                              >
                                Calificar
                              </button>
                              &nbsp;&nbsp;
                              <button
                                to="/crear-aula"
                                class="btn btnNaranja btn-sm mt-2"
                              >
                                Crear Tarea
                              </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!--  <div class="row mt-4">
              <div class="col-lg-12">
                <h4 class=" fuente" style="font-weight: 400;">Evaluaciones</h4>
                <hr />
                <div class="row mt-3">
                  <div class="col-md-9 col-12">
                    <div class="table-responsive p-0 mt-2">
                      <table class="table align-items-center mb-0">
                        <thead>
                          <tr class="cabeza">
                            <th
                              style="background-color: rgb(222, 235, 255);"
                              class="text-center "
                            >
                              <p class="parrafo">
                                Evaluaciones
                              </p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              class="text-center"
                              style="height: 72px; padding: 16px 24px;    "
                            >
                              <p class="h5 fuente">
                                No has creado ningún evaluación
                              </p>
                              <p class="parrafo">
                                Cargar la lista y crear una nueva evaluacón para
                                que se puedan mostrar<br />
                                a los participantes
                              </p>
                              <router-link
                                to="/crear-aula"
                                class="btn btnNaranja btn-sm mt-4 w-40"
                              >
                                Cargar Lista
                              </router-link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="col-md-3 col-12">
                    <div class="card card-plain text-center w-100">
                      <div class="card-body ">
                        <router-link :to="`/507`">
                          <img
                            class="w-100"
                            src="../../../../assets/img/shapes/evaluaciones.png"
                            alt="fondo"
                          />
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div class="row mt-4">
               <div class="col-lg-12">
                   <h3 class=" fuente" style="font-weight: 400;">Integrantes</h3>
                   <hr>
                  <div class="row mt-3">
                    <div class="col-md-9 col-12">
                      <a class="btn btnNaranja mt-6" href="javascript;;">
                            Ver Partisipantes
                      </a>
                    </div>
                    
                    <div class="col-md-3 col-12">
                      <div class="card card-plain text-center w-100">
                        <div class="card-body " >
                          <router-link :to="`/507`"  href="javascript:;">
                               <img class="w-100" src="../../../../assets/img/shapes/value-prop-2.7009c5230a70f384093ef76d2ccc26d5.8.png" alt="fondo">
                            
                          </router-link>
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div> -->
          </div>
        </div>
      </div>

      <div class="fixed-plugin" :class="{ 'show w-100': tabb === 'iniciarr' }">
        <div
          class="card shadow-lg blur desplega"
          :class="{ 'w-100': tabb === 'iniciarr' }"
          style="overflow-y: auto; z-index: 9999; top:35px;"
        >
          <div class="card-header pb-0 pt-3  bg-transparent ">
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
          <hr class="horizontal dark my-1" />
          <div class="card-body pt-sm-3 pt-0">
            <!-- Sidebar Backgrounds -->
            <div class="row">
              <div class="col-lg-6 col-12 mx-auto">
                <p class="h5 fuente">Personas</p>
                <div class="row">
                  <div class="col-sm-3">
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

                          <p class="text-xs fuente mt-3">2. Tareas</p>
                        
                      </div>
                    </div>
                  </div>
                     <div class="col-sm-3">
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

                          <p class="text-xs fuente mt-3">Esteban Wladimir Martinez Martinez</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Aulaprincipal.js"></script>

<style>
.bOSBYo {
  display: flex;
  height: 200px;
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  color: inherit;
  background: rgb(222, 235, 255);
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-image: initial;
  border-radius: 3px;
  border-left: 20px solid rgb(188, 216, 253);
  box-sizing: border-box;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px;
  transition: box-shadow 0.3s ease-in-out 0s, border-color 0.6s ease-in 0s;
}
.fwkeBY {
  border-radius: 3px;
  height: 180px;
  min-width: 140px;
  box-sizing: border-box;
  transition: box-shadow 0.25s ease-in-out 0s;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}
.fwkeBY:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
}
.esnRuO {
  width: 100%;
  height: 70%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
    90deg,
    rgb(235, 236, 240) 0%,
    rgb(244, 245, 247) 100%
  );
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
