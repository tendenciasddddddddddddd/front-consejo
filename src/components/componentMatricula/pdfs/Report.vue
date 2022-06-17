<template>
      <ScrimModal @close="close">
         <template v-slot:header>   Imprimir reporte de la matricula</template>
          <template v-slot:body>
             <div class="row">
         
            <Spinner v-if="isLoading1"></Spinner>
            <div v-else class="col-lg-9 col-12 mx-auto">
              <div v-if="isVisible === 'pa1'">
                <div class="h5 fuente text-dark text-center" style="font-weight: 400">Todos los cursos</div>
                <div class="contenidotabs">
                  <a style=""
                    class="tabss fuente"
                    @click="_cambiar2()"
                    :class="{ 'tabsActive links': tabbs == '1' }"
                    >Modalidad intensivo</a
                  >
                  <a
                    class="tabss fuente"
                    @click="_cambiar()"
                    :class="{ 'tabsActive links': tabbs == '2' }"
                    >Modalidad extraordinario
                  </a>
                </div>
                <hr
                  style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;"
                />
                <div class="row " v-if="tabbs === '1'">
                <section  class="flex-containes mt-4">
                 <div v-for="item in listniveles"
                  :key="item.id">
                     <div
                    class=" p-2  noactive cajas"
                    :class="{ activado: index === item._id }"
                    style="max-width: 200px;"
                  >
                    <a href="javascript:;" @click="clicMe(item._id,'m1')">
                      <div class="text-center position-relative">
                        <div class="blur-shadow-image">
                          <img  style="height: 100px;"
                            class="img  move-on-hover"
                            src="../../../assets/img/logs/task.svg"
                          />
                        </div>
                      </div>
                      <div>
                        <p class="parrafo text-center mt-2">Nivel / Curso <br> <span class="cardSubTitle">{{ item.nombre.slice(0, 23) }}</span> </p>
                        
                      </div>
                    </a>
                  </div>
                 </div>
               </section>
                   
                
                </div>
                <div class="row " v-if="tabbs === '2'">
                  <section  class="flex-containes mt-2">
                 <div v-for="item in listniveles2"
                  :key="item.id">
                     <div
                    class=" p-2  noactive cajas"
                    :class="{ activado: index === item._id }"
                    style="max-width: 200px;"
                  >
                    <a href="javascript:;" @click="clicMe(item._id,'m2')">
                      <div class="text-center position-relative">
                        <div class="blur-shadow-image">
                          <img  style="height: 100px;"
                            class="img  move-on-hover"
                            src="../../../assets/img/logs/task.svg"
                          />
                        </div>
                      </div>
                      <div>
                        <p class="parrafo text-center mt-2">Nivel / Curso <br> <span class="cardSubTitle">{{ item.nombre.slice(0, 23) }}</span> </p>
                        
                      </div>
                    </a>
                  </div>
                 </div>
               </section>
                 
                </div>
              </div>

              <div class="row" v-if="isVisible === 'pa3'">
                <div class="mt-2">
                   <a
                    @click="isVisible = 'pa1'"
                    class="btn btn-sm"
                     style="box-shadow: none; padding: 0.5rem 0em !important;"
                  >
                    <img
                      height="23px"
                      src="../../../assets/img/usados/regresar.png"
                    />
                   &nbsp;&nbsp; Regresar
                  </a>

                </div>
                <Spinner v-if="isTabla"></Spinner>
                <div v-else class="table-responsive mt-2">
                   <div v-if="!infoMat.length" class="row mt-5">
                      <div class="col-lg-9 col-12 mx-auto">
                        <div class="text-center">
                          <img
                            class="w-20"
                            src="../../../assets/img/usados/undraw_search.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente mt-4">
                           No se encontraron resultados
                          </div>
                        </div>
                      </div>
                    </div>
                  <table v-else class="elevation-2 table table-flush " style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                   
                    <thead  class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          Accion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in infoMat" :key="item.id">
                         <td>
                          <div class="d-flex ms-3">
                           
                            <a class="mb-0 text-sm colorestabla fuente">
                              {{ item.nombre }}
                            </a>
                          </div>
                        </td>
                       
                        <td class="text-sm text-center font-weight-normal">
                          <a
                            @click="get(item._id)"
                            href="javascript:;"
                            class="px-3 text-dark mb-0" title="IMPRIMIR REPORTE"
                          >
                            <i
                              class="fas fa-file-pdf text-lg me-1"
                              aria-hidden="true"
                            ></i>
                          </a>
                       
                        </td>
                      </tr>
                    </tbody>
                  </table>
               
                </div>
              </div>
              <div class="row" v-if="isVisible === 'pa4'">
                    <div class="mt-2">
                   <a
                    @click="isVisible = 'pa3'"
                    class="btn btn-sm"
                    style="box-shadow: none; padding: 0.5rem 0em !important;"
                  >
                    <img
                      height="23px"
                      src="../../../assets/img/usados/regresar.png"
                    />
                   &nbsp;&nbsp; Regresar
                  </a>

                </div>
                <Spinner v-if="isdescarga"></Spinner>
                <div v-else style="border: 1px solid black;">
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
                            <b>CERTIFICO: {{ info.nombre }}</b>
                          </p>
                          <br />
                          <p class="h6 text-dark text-center">
                            Previo los requisitos legales se matriculó en
                            {{ info.fknivel.nombre }}
                          </p>
                          <p style="margin-top:-10px" class="h6 text-center">
                            &nbsp;&nbsp;&nbsp;&nbsp; SUPERIOR con Matricula No.
                            {{ info.nmatricula }} y Folio No.
                            {{ info.folio }} DEL
                            {{ info.fecha }}
                          </p>
                          <p style="margin-top:-10px" class="h6 text-center">
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
          </template>
           <template v-slot:footer>
                <div v-if="isVisible === 'pa1'">
              <a class="btn btnNaranja " v-if="index != '0'" @click="verLista()">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
              <a v-else class="btn btnDisabled">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible == 'pa3'">
              <a class="btn btnNaranjaClaro" @click="isVisible = 'pa1'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
            </div>
            <div v-if="isVisible == 'pa4'">
              <a class="btn btnNaranjaClaro" @click="isVisible = 'pa3'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <button v-if="isprint" disabled  class="btn btnNaranja ms-3">
               <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span> Trabajando
              </button>
               <a v-else @click="test()"  class="btn btnNaranja ms-3">
                Descargar
              </a>
            </div>
           </template>
      </ScrimModal>
</template>

<script src="./Report.js"></script>

