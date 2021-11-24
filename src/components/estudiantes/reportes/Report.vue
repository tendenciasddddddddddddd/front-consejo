<template>
  <div class="row ">
    <div class="col-lg-9 col-12 mx-auto">
      <div class="row ">
        <div class="col-lg-10 col-12 mx-auto">
          <div class="text-center">
            <img
              class="img move-on-hover w-25 mt-3"
              src="../../../assets/img/logs/add-on-transactional-email.svg"
            />
          </div>
          <div>
            <div class="text-center mt-2">
              <p style="font-weight: 500;" class="h5 fuente">
                Exportar Reportes
              </p>
              <p class="parrafo">
                Puede imprimir reportes de su matricula y de sus notas de este
                periodo académico se recomienda [descargar]..
              </p>
            </div>
            <div class="mt-5 text-center">
              <button @click="__open()" class="btn btnNegro">
               Reporte matricula
              </button>
              &nbsp; &nbsp;
              <a class="btn btnNaranja">
               Reporte notas
              </a>
            </div>
          </div>
        </div>
      </div>

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
          <div class="row">
            <div class="col-lg-10">
              <h5
                style="font-weight: 400"
                class="mt-2 ms-5 mb-0 fuente text-white "
              >
                Reporte de matricula actual
              </h5>
            </div>
            <div class="col-lg-2">
              <div class="text-end mt-2">
                <a
                   @click="tablar = 'termina'"
                  class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                >
                  <i style="font-size: 32px" class="fa fa-close text-white"></i>
                </a>
                
              </div>
            </div>
          </div>
          <!-- End Toggle Button -->
        </div>
         

          <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
            <!-- Sidebar Backgrounds -->
            <div class="row" v-if="isVisibler=='nota'">
              <div class="col-lg-8 col-12 mx-auto">
                <Spinner v-if="isLoads"></Spinner>
                <div v-else class="row">
                  <div v-if="!info">
                    No tienes matricula!!!! Pregunta a secretaria
                  </div>
                  <div v-else>
                    <div class="mt-4">
                      
                      
                    </div>
                      <div style="border: 1px solid black;">
                              <div id="root" class="my-sm-5" >
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
                              Subsistema de Educación Fiscomisional del Ecuador
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
                            <p style="margin-top:-10px" class="h6 pb-0 fuente">
                              <b>Tulcán - Ecuador</b>
                            </p>
                            <br />
                            <br />
                            <p class="text-xs fuente"><b>COPIA DE:</b></p>
                            <p class="h4 fuente"><b>MATRICULA</b></p>
                            <p style="margin-top:-10px" class="h6 pb-0 fuente">
                              <b
                                >AÑO ELECTIVO: &nbsp;&nbsp;{{
                                  info.academico.nombre
                                }}</b
                              >
                            </p>
                            <br />
                            <p class="h6 pb-0 fuente">
                              <b
                                >CERTIFICO: &nbsp;&nbsp;
                                {{ info.nombre }}</b
                              >
                            </p>
                            <br />
                          <p class="h6 text-dark text-center">
                           Previo los requisitos legales
                          se matriculó en {{ info.fknivel.nombres }}
                        </p>
                        <p style="margin-top:-10px" class="h6 text-center fuente">
                          &nbsp;&nbsp;&nbsp;&nbsp; SUPERIOR con Matricula No.
                          {{ info.nmatricula }} y Folio No. {{ info.folio }} DEL
                          {{ info.fecha }}
                        </p>
                        <p style="margin-top:-10px" class="h6 text-center fuente">
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
          </div>
            <div  class=" modalFooter">
              <Spinner v-if="isLoads"></Spinner>
          <div v-else class="text-end">
            <div  v-if="info">
               <a
                class="btn btnNaranjaClaro"
                 @click="tablar = 'termina'"
              >
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <a @click="test()"  class="btn btnNaranja ms-3">
                Descargar
              </a>
              
            </div>
           
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Report.js"></script>

<style></style>
