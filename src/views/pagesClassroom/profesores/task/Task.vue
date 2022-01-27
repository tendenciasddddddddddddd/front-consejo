<template>
  <div class="row ">
     <vue-progress-bar  ></vue-progress-bar>
    <ProgressBar v-if="isData"></ProgressBar>
    <div v-else class="col-lg-11 col-12 mx-auto">
      <div class="row mt-2 ">
        <div class="col-md-4 d-flex">
          <a
            @click="$router.go(-1)"
            class="btn btn-sm me-3"
            style="box-shadow: none; padding: 0 !important;"
          >
            <img
              height="23px"
              src="../../../../assets/img/usados/regresar.png"
            />
          </a>
          <span
            class="col-11 text-truncate d-block"
            style="font-weight: 700;color:#181B32; font-size: 21px;margin-top: -5px;"
          >
            {{ info.materia }}
          </span>
        </div>
        <div class="col-md-8">
          <div class="d-flex justify-content-end">
             <div>
                <div class="d-flex justify-content-start">
             <div>
                <div class="input-group me-3">
                  <input style="background: white;width: 150px;"
                    type="text"
                    v-model="searchQuery"
                    class="form-control buscador"
                    placeholder="Buscar por materia"
                  />
                  <span class="input-group-text text-body buscador" style="background: white;"
                    ><i class="fas fa-search colorhs" aria-hidden="true"></i
                  ></span>
                </div>
             </div>
                
                 <a
                  role="button"
                  class="fuente tamanio ms-3 me-2 isPaginateActive"
                  @click="openModals()"
                   v-tooltip.top-center=" 'Crear nueva tarea' "
                >
                 &nbsp; <i class="fa fa-plus links" style="font-size: 17px;"></i>&nbsp;
                 
                </a>
                <a
                  @click="editTask()"
                  role="button"
                  class="fuente tamanio me-2 isPaginateActive"
                  :class="{ disabled: isSelecUsers.length != 1 }"
                  v-tooltip.top-center="
                    isSelecUsers.length
                      ? ''
                      : 'Seleccionar una tarea para editar'
                  "
                >
                &nbsp;  <i class="fas fa-pencil-alt" style="font-size: 17px;" :class="{ links: isSelecUsers.length === 1 }"></i>&nbsp;
                  
                </a>
                <a
                  role="button"
                  class="fuente tamanio  isPaginateActive"
                  :class="{ disabled: isSelecUsers.length === 0 }"
                  v-on="
                    isSelecUsers.length ? { click: () => __eliminar() } : {}
                  "
                  v-tooltip.top-center="
                    isSelecUsers.length
                      ? ''
                      : 'Seleccionar una o muchas tareas para eliminar'
                  "
                >
                  &nbsp; <i class="far fa-trash-alt " style="font-size: 17px;" :class="{ links: isSelecUsers.length != 0 }"></i>  &nbsp;
                  
                </a>
                
            </div>
             </div>
            <div class="mt-2">
              <span class="ms-4" style="color:#181B32; font-size: 18px;"
                ><b style="font-weight: 700;">0{{ page }}</b
                >/ 0{{ numPages }}</span
              >
            </div>
            <div>
              <ul
                class="pagination pagination-dark justify-content-center mt-2"
              >
                <li class="page-item">
                  <a
                    class="fuente tamanio links paginates ms-3 me-2 isPaginateh isPaginateActive"
                    :class="{ 'inactivo isNoActive': page == 1 }"
                    @click="page--"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      class=""
                      data-icon="left"
                      width="1.2em"
                      height="1.2em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                      ></path>
                    </svg>
                  </a>
                </li>

                <li class="page-item">
                  <a
                    :class="{
                      'inactivo isNoActive': page == numPages || numPages == 0,
                    }"
                    class="fuente tamanio links paginates isPaginateh isPaginateActive"
                    @click="page++"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      class=""
                      data-icon="right"
                      width="1.2em"
                      height="1.2em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-if="!info.task.length" class="row mt-3">
          <div class="col-lg-12 col-12 mx-auto">
            

            <div class="text-center mt-6">
              <img
                class="w-10"
                src="../../../../assets/img/usados/undraw_search.svg"
                alt="fondo"
              />
              <div class="letra fuente mt-4">
                No se encontraron resultados
              </div>
            </div>
          </div>
        </div>

        <template v-else>
         

          <div class=" mt-4">
            <ProgressBar v-if="!displayedArticles.length"></ProgressBar>
            <section v-else>
              <div class="row">
                <div
                  class="col-md-6 liTask"
                  v-for="(item, index) in displayedArticles"
                  :key="item.id"
                >
                  <div
                    class="d-flex cajasTask fadeIn1 fadeInBottom "
                    style="    background-color: #F6F7F9;"
                    :class="[`animation-${index}`]"
                  >
                    <a href="javascript:;" @click="openChildRewiewTrask(item._id)">
                      <div class="d-flex py-1">
                        <div class="">
                          <img
                            src="../../../../assets/img/icons/task.png"
                            style="height:40px"
                            alt="avatar image"
                          />
                        </div>
                        <div
                          class="d-flex flex-column justify-content-center ms-3"
                        >
                          <h6
                            class="mb-0 text-sm negros"
                            style="color: #007dbc;"
                          >
                            {{ item.nombre }}
                          </h6>
                          <div class="text-sm colorestabla fuente">
                            <div v-if="item.estado.includes('1')">
                              <span
                                style="background-color: rgb(0, 189, 165);"
                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                              ></span>
                              Tarea Revisada
                            </div>
                            <div v-else>
                              <span
                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                              ></span>
                              Revision Pendiente
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="dropstart ms-auto">
                      <div class="d-flex  mt-2">
                        <div class="form-check my-auto">
                          <input
                            class="form-check-input cheka"
                            type="checkbox"
                            v-model="isSelecUsers"
                            :value="item._id"
                            @click="selectOne(item._id)"
                          />
                        </div>
                        <!--v-tooltip.top-center="{content: item.descripcion, html: true}"-->
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </template>

        <div v-if="isTask === 'open'" class="altural"></div>
        <div class="fixed-plugin" :class="{ 'show repon': isTask === 'open' }">
          <div
            class="card shadow-lg desplega"
            :class="{ repon: isTask === 'open' }"
            style="overflow-y: auto; z-index: 9999;"
          >
            <div
              class=" cabesa"
              style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
               padding: 4px 25px 4px 25px;"
            >
              <div class="float-start">
                <h5
                  style="font-weight: 400;"
                  class="mt-2 mb-0 fuente text-white"
                >
                  Crear nueva tarea
                </h5>
                <!--  <p class="parrafo">{{nombre}}</p> -->
              </div>
              <div class="float-end mt-2">
                <button
                  @click="isTask = 'closed'"
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
              <!-- End Toggle Button -->
            </div>
            <div
              class="card-body pt-sm-3 pt-0"
              style="overflow-y: auto;height: auto;"
            >
              <div class="row">
                <div class="col-lg-11 col-12 mx-auto">
                  <div v-if="ifLoad2" class="loadingg">
                    <div class="inn">
                      <i
                        class="fa fa-refresh refresh-start"
                        style="font-size: 50px"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                  <form @submit.prevent="save" id="task">
                    <div class="row ">
                      <div
                        v-if="idtask != null"
                        class="mt-2 col-12 alertdanger"
                      >
                        <span class="parrafo">Fecha de entrega actual</span
                        ><br />
                        <a class="parrafo ">
                          <b>{{ this.dateTask }}</b>
                        </a>
                      </div>
                      <div class="col-12 mt-2">
                        <span class="parrafo">Nombre de Tarea</span>
                        <input
                          :class="{
                            error: validation.hasError('model.task.nombre'),
                          }"
                          v-model="model.task.nombre"
                          class="form-control buscador fuente"
                          type="text"
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.task.nombre") }}
                        </p>
                      </div>

                      <div class="col-12 mt-2">
                        <span class="parrafo ">Establecer nueva fecha</span>

                        <date-picker
                          v-model="model.task.finicio"
                          @input="fechas($event)"
                          type="datetime"
                          class="w-100 fuente"
                          :class="{
                            error: validation.hasError('model.task.finicio'),
                          }"
                        >
                        </date-picker>
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.task.finicio") }}
                        </p>
                        <span class="parrafo" style="color:rgb(124, 152, 182);">
                          {{ isPlaso }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-2">
                      <span @click="openCont" class="links text-sm fuente">
                        <b> Subir archivo 👆 (Opcional)</b>
                      </span>
                      <div v-if="clickme == true">
                        <vue-dropzone
                          class="mt-1"
                          style="height:180px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                          ref="dropzone"
                          @vdropzone-success="afterComplete"
                          id="drop1"
                          :options="dropOptions"
                        >
                        </vue-dropzone>
                        <a
                          @click="removeAllFiles"
                          class="fuente tamanio"
                          href="javascript:;"
                          ><i class="far fa-trash-alt me-2 iconos"></i>
                          <b class=" me-2 links">Eliminar documento</b>
                        </a>
                      </div>
                    </div>

                    <div class="mt-2">
                      <span class="parrafo">Descripción</span>
                      <vue-editor
                        id="editor"
                        :class="{
                          error: validation.hasError('model.task.descripcion'),
                        }"
                        v-model="model.task.descripcion"
                        :editorToolbar="customToolbar"
                        class="fuente"
                      >
                      </vue-editor>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.task.descripcion") }}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modalFooter">
              <div class="text-end">
                <a class="btn btnNaranjaClaro" @click="isTask = 'closed'">
                  Cancelar
                </a>
                &nbsp; &nbsp;
                <button
                  v-if="ifLoad"
                  class="btn  btnNaranja"
                  type="button"
                  disabled
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Trabajando...
                </button>

                <button
                  v-else
                  type="submit"
                  id="addRowButton"
                  class="btn btnNaranja"
                  form="task"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="ifChildRevision">
           <TaskReview :idGetAula="idAula" :idGetTask="idTasks" @myEventTask="closedChildRewiewTrask"></TaskReview>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Task.js"></script>
