<template>
  <div>
     <ScrimModal @close="close">
         <template v-slot:header> Asignar paralelos a Extraordinaria</template>
        <template v-slot:body>
             <div class="row">
              
            <div class="col-lg-11 col-12 mx-auto">
              <div class="row " v-if="isVisible === 'panel1'">
                <div
                  class="h5 mt-2 fuente text-start ms-3"
                  style="font-weight: 400;"
                >
                  Selecciona los cursos 
                </div>
                <Spinner v-if="isLoading1"></Spinner>
                   <section v-else class="flex-containes2 mt-2">
                  <a
                    v-for="(item, i) in listniveles"
                    :key="item.id"
                    type="button"
                    @click="clicMe(item._id, item.nombre)"
                    class="flex-none s-shadow s-pb-2 category-card s-center card-template s-py-3 s-px-2 s-decoration-none s-borderline-top animate__animated animate__fadeInUp"
                    href="javascript:;"
                    :class="[`s-borde-${i} animations-${i} `]"
                  >
                    <img class="img  s-mb-1 w-35" :src="arrays[i]" />
                    <span class="s-span mt-1">Curso de...</span>
                    <h6 class=" cardTitle text-start mt-1" style="font-size: 0.9rem;">
                       {{ item.nombre }}
                    </h6>
                  </a>
                </section>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                <div class="d-flex">
                    <a
                    @click="regresar"
                    class="btn btn-sm me-3 "
                    style="box-shadow: none;padding: 0.5rem 0.5em !important;"
                  >
                    <img
                      height="18px"
                      src="../../../../assets/img/usados/regresar.png"
                    />
                  </a>
                <span class="fuente h5 text-start" style="font-weight: 400;"
                    >Gestionar paralelos del <span class="text-azul">{{nombre_curso}}</span> </span
                  ><br /> 
                </div>
                 <div class="mt-2">
                  
                 
                  <div class="contenidotabs mt-2">
                    <a
                      class="tabss "
                      @click="__volverAsignacion()"
                      :class="{ 'tabsActive links': istabs == '1' }"
                      >  No Pararlelo  </a
                    >
                    <a
                      class="tabss "
                      @click="__mostrarConf('A','2')"
                      :class="{ 'tabsActive links': istabs == '2' }"
                      >Paralelo A
                    </a>
                    <a
                      class="tabss "
                       @click="__mostrarConf('C','3')"
                      :class="{ 'tabsActive links': istabs == '3' }"
                      >Paralelo C</a
                    >
                     <a
                      class="tabss "
                       @click="__mostrarConf('D','4')"
                      :class="{ 'tabsActive links': istabs == '4' }"
                      >Paralelo D</a
                    >
                     <a
                      class="tabss "
                       @click="__mostrarConf('E','5')"
                      :class="{ 'tabsActive links': istabs == '5' }"
                      >Paralelo E</a
                    >
                     <a
                      class="tabss "
                       @click="__mostrarConf('F','6')"
                      :class="{ 'tabsActive links': istabs == '6' }"
                      >Paralelo F</a
                    >
                  </div>
                  <hr
                    style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;"
                  />
                </div>
                  <div v-if="istabs == '1'">
                  <div class="d-flex justify-content-between mt-1">
                  
                     <div class="d-flex justify-content-start">
                     
                      <div  v-for="ite in paralelos" :key="ite.id">
                        <div class="form-check mb-3 me-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="ite.id"
                            :id="ite.id"
                            :value="ite.id"
                            @click="onChange(ite.nombre)"
                          />
                          <b class="links" for="ite._id">
                            {{ ite.nombre}}</b
                          >
                        </div>
                      </div>
                    </div>

                    <a
                      v-on="
                        isSelecCurosos.length ? { click: () => remove() } : {}
                      "
                       v-tooltip.top-center="isSelecCurosos.length ? '' : 'Seleccionar una o más filas para asignar a los estudiantes a los diferentes paralelos'"
                      role="button"
                      class="fuente tamanio ms-3"
                      :class="{
                        disabled: isSelecCurosos.length == 0,
                      }"
                    >
                      <b
                        class=""
                        :class="{
                          links: isSelecCurosos.length != 0,
                        }"
                        >Asignar</b
                      >
                      <i class="bx bx-duplicate iconos ms-2"></i>
                    </a>
                  </div>
                  <Spinner v-if="isTabla"></Spinner>
                  <div v-else class="">
                    <div v-if="!infoMat.length" class="row mt-3">
                      <div
                        class="col-lg-9 col-12 mx-auto "
                       
                      >
                        <div class="text-center mt-5 ">
                          <img
                            class="w-15"
                            src="../../../../assets/img/usados/undraw_search.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente mt-3">
                            No se encontraron resultados
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="table-responsive mt-3">
                      <table
                        class="elevation-2 table table-flush "
                        style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
                      >
                        <thead class="thead-light">
                          <tr class="cabeza">
                            <th
                              style="background-color: rgb(234, 240, 246); "
                              class="text-uppercase text-center text-secondary text-xxs "
                            >
                              Nombre
                            </th>
                            <th
                              class="text-uppercase text-center text-secondary text-xxs "
                            >
                              Paralelo
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in infoMat" :key="item.id">
                            <td>
                              <div class="d-flex ms-3">
                                <div class="form-check my-auto supcheka">
                                  <input
                                    class="form-check-input cheka"
                                    type="checkbox"
                                    @click="selectcursos(item._id)"
                                  />
                                </div>

                                <a
                                  class="mb-0 ms-3 text-sm colorestabla fuente"
                                >
                                  {{ item.nombre }}
                                </a>
                              </div>
                            </td>

                            <td class="text-sm text-center fuente">
                              <p class="mb-0 text-xs">
                               {{ item.curso }}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                  <div v-if="istabs == '2' || istabs == '3'|| istabs == '4'|| istabs == '5'|| istabs == '6'">
                  <div class="mt-4">
                  
                  <div class="d-flex mt-3">
                    <a
                      v-on="
                        isRemoveSelecC.length ? { click: () => remove2() } : {}
                      "
                       v-tooltip.top-center="isRemoveSelecC.length ? '' : 'Seleccionar una o muchas filas para eliminar'"
                      role="button"
                      class="fuente tamanio"
                      :class="{ disabled: isRemoveSelecC.length === 0 }"
                    >
                      <i class="far fa-trash-alt me-2 iconos"></i>
                      <b
                        class="me-4 "
                        :class="{ links: isRemoveSelecC.length != 0 }"
                        >Remover Paralelos</b
                      >
                    </a>
                  </div>
                </div>

                <Spinner v-if="isTabla"></Spinner>
                <div v-else class="mt-3">
                  <div v-if="!infoMat2.length" class="row mt-3">
                    <div class="col-lg-9 col-12 mx-auto">
                      <div class="text-center mt-5">
                        <img
                          class="w-15"
                          src="../../../../assets/img/usados/undraw_search.svg"
                          alt="fondo"
                        />
                        <div class="letra fuente mt-3">
                          No se encontraron resultados
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="table-responsive">
                    <table
                    
                    class="elevation-2 table table-flush "
                    style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
                  >
                    <thead class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-secondary text-xxs"
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs"
                        >
                          Paralelo
                        </th>
                      </tr>
                    </thead>
                    <Spinner v-if="isConfig"></Spinner>
                    <tbody v-else>
                      <tr v-for="item in infoMat2" :key="item.id">
                        <td>
                          <div class="d-flex ms-3">
                            <div class="form-check my-auto supcheka">
                              <input
                                class="form-check-input cheka"
                                type="checkbox"
                                checked=""
                                @click="removeSelectCursos(item._id)"
                              />
                            </div>
                            &nbsp;&nbsp;
                            <a class="mb-0 text-sm colorestabla fuente">
                              {{ item.nombre }}
                            </a>
                          </div>
                        </td>
                        <td class="text-sm text-center">
                          <p class="mb-0 text-xs">
                            {{ item.curso }}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                 
                </div>
                </div>
              </div>
            
            </div>
           
          </div>
        </template>
        <template v-slot:footer>
            <div v-if="isVisible === 'panel1'">
              <a
                v-if="index != '0'"
                class="btn btnNaranja "
                @click="verLista()"
              >
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
              <a v-else class="btn btnDisabled">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible == 'panel2'">
              <a class="btn btnNaranjaClaro" @click="regresar">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
            </div>
        </template>
     </ScrimModal>
  </div>
</template>

<script src="./Paralelo.js"></script>

