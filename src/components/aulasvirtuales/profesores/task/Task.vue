<template>
  <div class="row ">
    <Spinner v-if="isData"></Spinner>

    <div v-else class="col-lg-11 col-12 mx-auto">
      <div class="mt-1">
        <div
          class=""
          style="background-color: #e5f5f8; padding:4px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <div style="margin:3px;font-weight:700; color: #33475b;">
              <a @click="$router.go(-1)" class="badge" href="javascript:;" style="box-shadow: none">
                <img
                  height="23px"
                  src="../../../../assets/img/usados/regresar.png"
                />
              </a>
              &nbsp; {{info.materia}}
              <span class="fuente ms-2 parrafo"
                >Administra tareas</span
              >
            </div>
          </div>
        </div>
      </div>
      <p class="parrafo mt-3">
        Las tareas que ta revisaste las puedes eliminar para mejorar el rendimiento de lectura.
      </p>
      
      <div  class="row">
        <div v-if="!info.task.length" class="row mt-3">
          <div class="col-lg-12 col-12 mx-auto">
            <div class="text-end">
                 <a class="btn btn-sm btnNaranja" @click="openModals()">
                Crear tarea
              </a>
            </div>
           
            <div class="text-center mt-4">
              <img
                class="w-15"
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
          <div class="mt-2">
            <div class="row ">
              <div class="col-lg-3">
                <div class="input-group">
                  <span class="input-group-text text-body buscador"
                    ><i class="fas fa-search colorhs" aria-hidden="true"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control buscador"
                    placeholder="Buscar"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <a @click="editTask()"
                  role="button"
                  class="fuente tamanio"
                  :class="{ disabled: isSelecUsers.length != 1 }"
                >
                  <i class="fas fa-pencil-alt me-2 ms-3 iconos"></i>
                  <b class="me-4 " :class="{ links: isSelecUsers.length === 1 }"
                    >Editar</b
                  >
                </a>
                <a
                  role="button"
                  class="fuente tamanio"
                  :class="{ disabled: isSelecUsers.length === 0 }"
                  v-on="
                    isSelecUsers.length ? { click: () => __eliminar() } : {}
                  "
                >
                  <i class="far fa-trash-alt me-2 iconos"></i>
                  <b class="me-4 " :class="{ links: isSelecUsers.length != 0 }"
                    >Eliminar tarea</b
                  >
                </a>
              </div>
              <div class="col-md-3">
                <div class="text-end">
                  <a class="btn btn-sm btnNaranja" @click="openModals()">
                    Crear tarea
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="table-responsive mt-3">
             <Spinner v-if="!displayedArticles.length"></Spinner>
            <table v-else
              class="table table-flush"
              id="datatable-basic"
              style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
            >
              <thead class="thead-light">
                <tr class="cabeza">
                  <th
                    style="background-color: rgb(234, 240, 246); "
                    class="text-uppercase text-center text-xxs font-weight-bolder"
                  >
                    Nombre tarea
                  </th>

                  <th
                    class="text-uppercase text-center text-xxs font-weight-bolder"
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in displayedArticles" :key="item.id">
                  <td>
                    <div class="d-flex ms-3">
                      <div class="form-check my-auto">
                        <input
                          class="form-check-input cheka"
                          type="checkbox"
                          @click="selectTask(item._id)"
                        />
                      </div>
                       <!--v-tooltip.top-center="{content: item.descripcion, html: true}"-->
                      <a class="mb-0 ms-3 fuente tamanio" @click="nextO(item._id)" href="javascript:;">
                        <b class="links">{{ item.nombre }}</b>
                      </a>
                    </div>
                  </td>
                  <td class="text-sm text-center colorestabla fuente">
                    <div v-if="item.estado.includes('1')">
                      <span
                        style="background-color: rgb(0, 189, 165);"
                        class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                      ></span>
                      Tarea Revisada
                    </div>
                    <div v-else>
                      <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"></span>
                      Revision Pendiente
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
             <ul class="pagination pagination-dark justify-content-center mt-4">
              <li class="page-item">
                <a
                  class="fuente tamanio links paginates me-3"
                  :class="{ inactivo: page == 1 }"
                  @click="page--"
                >
                  <i class="fa fa-angle-left me-2" aria-hidden="true"></i>
                  <b>Anterior</b>
                </a>
              </li>

              <li class="page-item active">
                <a class="paginaA">
                  <b> {{ page }}</b></a
                >
              </li>

              <li class="page-item">
                <a
                  :class="{ inactivo: page == numPages }"
                  class="fuente tamanio links paginates ms-3"
                   @click="page++"
                >
                  <b>Siguiente</b>
                  <i class="fa fa-angle-right ms-2" aria-hidden="true"></i>
                </a>
              </li>
             
              <li>
                <strong class="fuente text-sm ms-3">
                  Total paginas: {{ numPages }}
                </strong>
              </li>
            </ul>
          </div>
        </template>
       
        <!-- <Spinner v-if="isData"></Spinner>
        <div v-else>
          <div class="row mt-4">
            <div class="col-md-12 col-12" v-if="info">
              <div class="card-body pb-0" v-if="info.task.length">
                <ul
                  v-for="(item) in info.task"
                  :key="item.id" 
                  class="list-unstyled mx-auto boxes"
                >
                
                
                  <li class="d-flex" >
                    <a href="javascript:;">
                      <div class="d-flex px-3 py-1">
                        <div>
                          <img
                            src="../../../../assets/img/usados/paquete.svg"
                            class="avatar me-3"
                            alt="avatar image"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm fuente">
                            {{ item.nombre }}:
                          </h6>
                          <a
                            class="fuente text-xs"
                            style="color: rgb(124, 152, 182); font-size:12px"
                            v-html="item.descripcion"
                          ></a>
                        </div>
                      </div>
                    </a>
                    <div class="dropstart ms-auto">
                      <p
                        @click="__eliminar(item)"
                        class="badge  aula text-dark"
                        style="color: black"
                      >
                        &nbsp;Eliminar
                      </p>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          
          <div class="row mt-4 ">
            <div class="col-md-3 col-12 ">
              <div class="card card-plain text-end w-90">
                <a @click="openModals()" class="btn btnNaranja" name="button"
                  >Crear tarea</a
                >
              </div>
            </div>
          </div>
        </div> -->
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
              <div class="row">
                <div class="col-lg-10">
                  <h5
                    style="font-weight: 400"
                    class="mt-2 ms-5 mb-0 fuente text-white "
                  >
                    Crear nueva tarea
                  </h5>
                </div>
                <div class="col-lg-2">
                  <div class="text-end mt-2">
                    <button
                      @click="isTask = 'closed'"
                      class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                    >
                      <i
                        style="font-size: 32px"
                        class="fa fa-close text-white"
                      ></i>
                    </button>
                  </div>
                </div>
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
                     <i class="fa fa-refresh refresh-start" style="font-size: 50px" aria-hidden="true"></i>
                  </div>

                </div>
                  <form @submit.prevent="save" id="task">
                    <div class="row ">
                      <div class="col-12">
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
                      <div v-if="idtask!=null" class="mt-2">
                        <span class="parrafo">Fecha de entrega actual</span><br>
                          <a class="parrafo text-danger"> <b>{{this.dateTask}}</b> </a>
                        
                          
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
                    <div class="mt-3">
                        <span @click="clickme=1" class="links text-sm fuente"> <b> Subir archivo 👆 (Opcional)</b> </span>
                    <div v-if="clickme==1">
                      <div @click="clickme=0" class=" fuente tamanio text-center"><i class="fa fa-times" aria-hidden="true"></i> <b class="ms-1 links">Ocultar</b> </div>
                        <vue-dropzone
                      class="mt-1"
                      style="height:180px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                      ref="dropzone"
                      @vdropzone-complete="afterComplete"
                      id="drop1"
                      :options="dropOptions"
                    >
                    </vue-dropzone>
                    <a @click="removeAllFiles" class="fuente tamanio" href="javascript:;"><i class="far fa-trash-alt me-2 iconos"></i> 
                    <b class=" me-2 links">Eliminar documento</b> </a>
                    
                    </div>
                    </div>
                    
                   
                    
                    <div class="mt-3">
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
                <a class="btn btnNaranjaClaro"  @click="isTask = 'closed'">
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
      </div>
    </div>
  </div>
</template>

<script src="./Task.js"></script>


