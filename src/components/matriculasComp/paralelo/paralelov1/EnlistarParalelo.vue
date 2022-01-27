<template>
  <div>
    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'inicio' }">
      <div
        class="card shadow-lg blur desplega"
        :class="{ 'w-100': tab === 'inicio' }"
        style="overflow-y: auto;  z-index: 9999; "
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
                @click="$emit('myEventClosedModalParalelo1')"
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

        <div
          class="card-body pt-sm-3 pt-0"
          style="overflow-y: auto;height: auto;"
        >
          <div class="row">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="row " v-if="isVisible === 'panel1'">
                <div
                  class="h5 mt-4 fuente text-center"
                  style="font-weight: 400;"
                >
                  Selecciona los cursos para asignar el paralelo
                </div>
                <Spinner v-if="isLoading1"></Spinner>
                <section v-else class="flex-containes mt-2">
                  <div v-for="item in listniveles" :key="item.id">
                    <div
                      class=" p-2 borde5 noactive cajas "
                    
                      style="max-width: 200px;"
                      :class="[{'activado': index === item._id}, {'isDisabled': index != item._id&& index!= '0'}]"
                    >
                   
                      <a href="javascript:;" @click="clicMe(item._id,item.nombres)" >
                        <div class="text-center position-relative">
                          <div class="blur-shadow-image">
                            <img
                              class="img  move-on-hover w-40"
                              src="../../../../assets/img/logs/electronic-signature.svg"
                            />
                          </div>
                        </div>
                        <div class="text-center">
                          <span
                            class="fuente cardTitle "
                            style="font-size: 20px;"
                            >Curso: </span
                          ><br />
                          <span class="cardSubTitle">{{
                            item.nombres.slice(0, 25)
                          }}</span>
                          <hr />
                          <a class="tamanio fuente">
                            <b class="links"
                              >Lista estudiantes
                              <i class="fa fa-plus ms-2" aria-hidden="true"></i
                            ></b>
                          </a>
                        </div>
                      </a>
                    </div>
                  </div>
                </section>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                <div class="d-flex">
                    <a
                    @click="isVisible = 'panel1'"
                    class="btn btn-sm me-3 "
                    style="box-shadow: none;"
                  >
                    <img
                      height="18px"
                      src="../../../../assets/img/usados/regresar.png"
                    />
                  </a>
                <span class="fuente h5 text-start" style="font-weight: 400;"
                    >Gestionar paralelos del {{nombre_curso}}</span
                  ><br /> 
                </div>
                
                <div class="mt-2">
                  
                 
                  <div class="contenidotabs mt-2">
                    <a
                      class="tabss "
                      @click="__volverAsignacion()"
                      :class="{ 'tabsActive links': istabs == '1' }"
                      >  Estudiantes sin paralelo  </a
                    >
                    <a
                      class="tabss "
                      @click="__mostrarConf('B')"
                      :class="{ 'tabsActive links': istabs == '2' }"
                      >Paralelo B
                    </a>
                    <a
                      class="tabss "
                       @click="__mostrarConf2('G')"
                      :class="{ 'tabsActive links': istabs == '3' }"
                      >Paralelo G</a
                    >
                  </div>
                  <hr
                    style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;"
                  />
                </div>
                <div v-if="istabs == '1'">
                  <div class="d-flex justify-content-between mt-3">
                    <select
                      v-model="check"
                      style="border-color: rgba(0, 208, 228, 0.5); box-shadow: 0 0 4px 1px rgb(0 208 228 / 30%), 0 0 0 2px #00d0e4; outline: 0; height: 35px;"
                      class="fuente  buscador "
                      @change="onChange($event)"
                    >
                      <option disabled value="">Seleccione un paralelo</option>
                      <option value="B">PARALELO B</option>
                      <option value="G">PARALELO G</option>
                    </select>
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
                        >Guardar asignación paralelo ({{ check }})</b
                      >
                      <i class="fa fa-plus ms-2 iconos"></i>
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
                    <div v-else class="table-responsive mt-4">
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

                <div v-if="istabs == '2'">
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
                <div v-if="istabs == '3'">
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
                <div v-else class=" mt-3">
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
                <div class="mt-3">
                  <div class=""></div>
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
              <a class="btn btnNaranjaClaro" @click="isVisible = 'panel1'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
            </div>
            <div v-if="isVisible == 'panel3'">
              <a class="btn btnNaranjaClaro" @click="isVisible = 'panel1'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./EnlistarParalelo.js"></script>
