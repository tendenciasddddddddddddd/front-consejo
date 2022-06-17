<template>
  <div class="fondoazul">
    <div class="">
      <div class="text-center mt-4">
        <span class="fuente h3 " style="font-weight: 400;"
          >Módulo de reportes</span
        >
        <p class="parrafo">
          Puede imprimir reportes de su matricula y de sus notas de este periodo
          académico se recomienda [descargar]..
        </p>
      </div>
     
      <section class="flex-containes mt-5">
        <div class="">
          <div
            class="marco p-4"
            style="max-width: 250px;margin-right: 23px!important;"
          >
            <p class="cardTitle fuente mt-1" style="font-size: 20px;">
              <img
                class="w-10 me-2"
                src="../../../assets/img/icons/CMS-Hub.svg"
                alt="fondo"
              />
              Rep Matricula
            </p>
            <!-- <div class="text-center">
                     <img
                  class="w-50"
                  src="../../../assets/img/logs/add-on-transactional-email.svg"
                  alt="fondo"
                />
                 </div> -->
            <p class="fuente text-dark" style="font-size: 13px;">
              Esta opción le permite descargar el reporte en PDF de su matricula
              del periodo actual
            </p>
            <hr />
            <span class="parrafo cardSubTitle">
              <img
                class="w-8 me-2"
                src="../../../assets/img/icons/Orange_Checkmark.svg"
                alt="fondo"
              />
              Formato PDF
            </span>
            <br />
            <span class="parrafo cardSubTitle">
              <img
                class="w-8 me-2"
                src="../../../assets/img/icons/Orange_Checkmark.svg"
                alt="fondo"
              />
              Descarga en la maquina
            </span>
            <a
              @click="__open(1)"
              href="javascript:;"
              class="btn btn-sm btnNaranja w-100 mt-4"
            >
              Continuar
            </a>
          </div>
        </div>
        <div class="">
          <div
            class="marco p-4"
            style="max-width: 250px;margin-right: 23px!important;"
          >
            <p class="cardTitle fuente mt-1" style="font-size: 20px;">
              <img
                class="w-10 me-2"
                src="../../../assets/img/icons/CMS-Hub.svg"
                alt="fondo"
              />
              Rep Notas
            </p>
            <!-- <div class="text-center">
                     <img
                  class="w-50"
                  src="../../../assets/img/logs/add-on-transactional-email.svg"
                  alt="fondo"
                />
                 </div> -->
            <p class="fuente text-dark" style="font-size: 13px;">
              Esta opción le permite descargar el reporte en PDF de sus notas
              del periodo actual
            </p>
            <hr />
            <span class="parrafo cardSubTitle">
              <img
                class="w-8 me-2"
                src="../../../assets/img/icons/Orange_Checkmark.svg"
                alt="fondo"
              />
              Formato PDF
            </span>
            <br />
            <span class="parrafo cardSubTitle">
              <img
                class="w-8 me-2"
                src="../../../assets/img/icons/Orange_Checkmark.svg"
                alt="fondo"
              />
              Descarga en la maquina
            </span>
            <a
              @click="__open(2)"
              href="javascript:;"
              class="btn btn-sm btnNaranja w-100 mt-4"
            >
              Continuar
            </a>
          </div>
        </div>
      </section>

      <!-- <div style="width: 70%;  ">
         hola
         <div class="d-flex justify-content-center" style="
    margin: 80px 0 0;display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
  justify-content: center;">
    <div class="flexible anchos" >hola</div>
    <div class="flexible anchos" style="border-right: 1px solid rgb(203, 214, 226);
    border-bottom: 1px solid rgb(203, 214, 226); text-align: center;
    padding: 30px;">chao</div>
    
    <div class="flexible anchos" style="    border-right: 0;
    border-bottom: 1px solid rgb(203, 214, 226);   text-align: center;
    padding: 30px;">perro</div>
     <div class="flexible anchos" style="border-right: 1px solid rgb(203, 214, 226);
    border-bottom:0; text-align: center;
    padding: 30px;">perro 2</div>
    <div class="flexible anchos" style="border-right: 1px solid rgb(203, 214, 226);
    border-bottom:0;text-align: center;
    padding: 30px;">perro 3</div>
    <div class="flexible anchos" style="border-right: 0;
    border-bottom:0;text-align: center;
    padding: 30px;">perro 4</div>
         </div>
       </div> -->

      <div class="fixed-plugin" :class="{ 'show w-100': tablar === 'notasr' }">
        <div
          class="card shadow-lg desplega"
          :class="{ 'w-100': tablar === 'notasr' }"
          style="overflow-y: auto; z-index: 9999; "
        >
          <div
            class=""
            style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 40px 4px 40px;background-color: #253342;"
          >
           
            <div class="d-flex justify-content-between">
            <div class="h5 text-white">
              ...
            </div>
            <div>
              <h5 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
                Reporte de matricula actual
              </h5>
            </div>
            <div class="mt-2">
              <button
                @click="tablar = 'termina'"
                class="btn btn-link text-dark p-0 fixed-plugin-close-button"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"></path></g></g></svg>
              </button>
            </div>
          </div>
            <!-- End Toggle Button -->
          </div>

          <div
            class="card-body pt-sm-3 pt-0"
            style="overflow-y: auto;height: auto;"
          >
            <!-- Sidebar Backgrounds -->
            <div class="row" v-if="isVisibler == 'nota'">
              <div class="col-lg-8 col-12 mx-auto">
                <Spinner v-if="isLoads"></Spinner>
                <div v-else class="row">
                  <div v-if="!info">
                    No tienes matricula!!!! Pregunta a secretaria
                  </div>
                  <div v-else>
                    <div class="mt-4"></div>
                    <div style="border: 1px solid black;">
                      <div id="root" class="my-sm-5">
                        <div class="card-header text-center ">
                          <div class="row justify-content-between">
                            <div class="col-md-2 text-start">
                              <img
                                class="mb-2 w-80 "
                                src="../../../assets/img/escudo.png"
                                alt="Logo"
                              />
                            </div>
                            <div class="col-md-8">
                              <p class="h6 fuente">
                                Subsistema de Educación Fiscomisional del
                                Ecuador
                              </p>
                              <p
                                style="margin-top:-10px"
                                class="h6 text-center fuente"
                              >
                                "Mons. Leonidas Proaño"
                              </p>

                              <p
                                style="margin-top:20px"
                                class="h6 text-center fuente"
                              >
                                UNIDAD EDUCATIVA FISCOMISIONAL DEL CARCHI PCEI
                              </p>
                            </div>
                            <div class="col-lg-2  text-md-end ">
                              <img
                                class="mb-2 w-100 h-80"
                                src="../../../assets/img/aaaa.png"
                                alt="Logo"
                              />
                            </div>
                          </div>
                          <br />
                          <div class="row justify-content">
                            <br />
                            <br />
                            <div class="col-12">
                              <p class="h6 fuente">
                                <b>UNIDAD EDUCATIVA FISCOMISIONAL</b>
                              </p>
                              <p style="margin-top:-10px" class="h6 fuente">
                                <b>"MONSEÑOR LEONIDAS PROAÑO" PCEI</b>
                              </p>
                              <p
                                style="margin-top:-10px"
                                class="h6 pb-0 fuente"
                              >
                                <b>Tulcán - Ecuador</b>
                              </p>
                              <br />
                              <br />
                              <p class="text-xs fuente"><b>COPIA DE:</b></p>
                              <p class="h4 fuente"><b>MATRICULA</b></p>
                              <p
                                style="margin-top:-10px"
                                class="h6 pb-0 fuente"
                              >
                                <b
                                  >AÑO ELECTIVO: &nbsp;&nbsp;{{
                                    info.academico.nombre
                                  }}</b
                                >
                              </p>
                              <br />
                              <p class="h6 pb-0 fuente">
                                <b>CERTIFICO: &nbsp;&nbsp; {{ info.nombre }}</b>
                              </p>
                              <br />
                              <p class="h6 text-dark text-center">
                                Previo los requisitos legales se matriculó en
                                {{ info.fknivel.nombres }}
                              </p>
                              <p
                                style="margin-top:-10px"
                                class="h6 text-center fuente"
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp; SUPERIOR con Matricula
                                No.
                                {{ info.nmatricula }} y Folio No.
                                {{ info.folio }} DEL
                                {{ info.fecha }}
                              </p>
                              <p
                                style="margin-top:-10px"
                                class="h6 text-center fuente"
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp; Así consta en el libro
                                respectivo del Departamento de Secretaría
                              </p>
                              <br />
                              <br />
                              <br />
                              <br />
                              <p class="h6 pb-0">
                                <b>__________________________________</b>
                              </p>
                              <p class="h6 pb-0"><b>Msc. Marino Arellano</b></p>
                              <p class="h6 pb-0"><b>RECTOR-UNEF.C</b></p>
                              <br />
                              <br />
                              <p class="text-start">
                                <b>Tulcán, {{ fechasActual }} </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="isVisibler == 'nota2'">
              <div class="col-lg-8 col-12 mx-auto">
                <Spinner v-if="isLoads"></Spinner>
                <div v-else class="row">
                  <div v-if="!info">
                    No tienes matricula!!!! Pregunta a secretaria
                  </div>
                  <div v-else>
                    <div class="mt-4"></div>
                    <div style="border: 1px solid black;">
                      <div id="root" class="my-sm-4">
                        <div class="card-header text-center ">
                          <div class="row justify-content-end">
                            <div class="col-md-3 text-start">
                              <img
                                class="mb-2 w-80 "
                                src="../../../assets/img/icons/logo-ministerio-educacion.png"
                                alt="Logo"
                              />
                            </div>

                            <div class="col-lg-3  text-md-end ">
                              <img
                                class="mb-2 w-100 h-80"
                                src="../../../assets/img/icons/el-gobierno-de-todo.jpg"
                                alt="Logo"
                              />
                            </div>
                          </div>
                          <br />
                          <div class="row justify-content">
                            <br />
                            <br />
                            <div class="col-12">
                              <p class="h6 " style="font-weight: 700;">
                                <b
                                  >UNIDAD EDUCATIVA FISCOMISIONAL MONSEÑOR
                                  LEONIDAS PROAÑO</b
                                >
                              </p>
                              <p
                                style="margin-top:-10px;font-weight: 700;"
                                class="h6 "
                              >
                                <b> (PCEI)</b>
                              </p>
                              <p
                                style="margin-top:-10px;font-weight: 500;"
                                class="h6 pb-0 fuente"
                              >
                                <span>CERTIFICADO DE PROMOCIÓN</span><br />
                                <span
                                  >AÑO ELECTIVO
                                  {{ info.academico.nombre }}</span
                                ><br />
                                <span>JORNADA MATUTINA</span>
                              </p>
                              <br />
                              <br />
                              <div class="table-responsive p-0">
                                  <table class="table align-items-center mb-0 " style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                               <thead>
                            <tr class="cabeza">
                              <th
                                style="background-color: rgb(234, 240, 246)"
                                class="
                                  text-uppercase text-secondary text-xxs
                                  font-weight-bolder
                                "
                              >
                                ASIGNATURAS
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder
                                "
                              >
                                CALIFICACIONES
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                                
                                <tbody>
                                  <tr v-for="item in info.calificaciones"
                                             :key="item.id">
                                  <td class="mb-0 ms-3 text-sm colorestabla fuente">{{item.materia}}</td>
                                  <td class="mb-0 ms-3 text-sm colorestabla fuente">
                                    <div v-if="item.promediof">
                                       {{item.promediof}}
                                    </div>
                                    <div v-else>
                                       S/N
                                    </div>
                                    </td>
                                  <td class="mb-0 ms-3 text-sm colorestabla fuente"></td>
                                </tr>
                                
                                </tbody>
                                
                              </table>
                              </div>
                             

                              <p class="h6 pb-0">
                                <b>__________________________________</b>
                              </p>
                              <p class="h6 pb-0"><b>Msc. Marino Arellano</b></p>
                              <p class="h6 pb-0"><b>RECTOR-UNEF.C</b></p>
                              <br />
                              <br />
                              <p class="text-start">
                                <b>Tulcán, {{ fechasActual }} </b>
                              </p>
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
          <div class=" modalFooter">
            <Spinner v-if="isLoads"></Spinner>
            <div v-else class="text-end">
              <div v-if="info">
                <template v-if="isVisibler == 'nota'">
                  <a class="btn btnNaranjaClaro" @click="tablar = 'termina'">
                    <i class="ni ni-bold-left"></i> &nbsp; Vulver
                  </a>

                  <a v-if="isprint" class="btn btnDisabled ms-3">
                    Trabajando...
                  </a>
                  <a v-else @click="test()" class="btn btnNaranja ms-3">
                    Descargar
                  </a>
                </template>
                <template v-if="isVisibler == 'nota2'">
                  <div>
                    hola
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Report.js"></script>

