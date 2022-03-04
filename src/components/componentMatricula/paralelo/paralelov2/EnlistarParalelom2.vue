<template>
  <div>
    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'inicio' }">
      <div
        class="card desplega"
        :class="{ 'w-100': tab === 'inicio' }"
        style=" z-index: 9999; "
      >
      <div
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
        >
         <div class="d-flex justify-content-between">
            <div class="h5 text-white">
              ...
            </div>
            <div>
              <h5 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
                Configurar alunmos con sus paralelos
              </h5>
            </div>
            <div class="mt-2">
             <button
                @click="$emit('myEventClosedModalParalelo2')"
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

          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
          <div class="row">
              
            <div class="col-lg-9 col-12 mx-auto">
              <div class="row " v-if="isVisible === 'panel1'">
                <div
                  class="h5 mt-2 fuente text-start ms-3"
                  style="font-weight: 400;"
                >
                  Selecciona los cursos para asignar el paralelo
                </div>
                <Spinner v-if="isLoading1"></Spinner>
                   <section v-else class="flex-containes2 mt-2">
                  <a
                    v-for="(item, i) in listniveles"
                    :key="item.id"
                    type="button"
                    @click="clicMe(item._id, item.nombres)"
                    class="flex-none s-shadow s-pb-2 category-card s-center card-template s-py-3 s-px-2 s-decoration-none s-borderline-top animate__animated animate__fadeInUp"
                    href="javascript:;"
                    :class="[`s-borde-${i} animations-${i} `]"
                  >
                    <img class="img  s-mb-1 w-35" :src="arrays[i]" />
                    <span class="s-span mt-1">Mostrar c..</span>
                    <h6 class=" cardTitle text-start mt-1" style="font-size: 1rem;">
                      Curso de {{ item.nombres }}
                    </h6>
                  </a>
                </section>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                <div class="d-flex">
                    <a
                    @click="regresar"
                    class="btn btn-sm me-3 "
                    style="box-shadow: none;"
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
                      >  E sin paralelo  </a
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
        </div>
         <div class=" modalFooter">
          <div class="text-end">
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
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./EnlistarParalelom2.js"></script>

