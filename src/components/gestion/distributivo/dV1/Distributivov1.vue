<template>
  <div class="row">
    <div class="col-lg-11 col-12 mx-auto">
      <div
        class="mt-1"
        style="background-color: #e5f5f8; padding:5px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
      >
        <div>
          <div style="margin:3px;font-weight:700; color: #33475b;">
            <router-link to="/Menu-Distributivo" class="badge" style="box-shadow: none">
              <img
                height="23px"
                src="../../../../assets/img/usados/regresar.png"
              />
            </router-link>
            &nbsp;&nbsp; &nbsp; Intensivo vincular a los docentes con paralelos cursos y materias.
          </div>
        </div>
      </div>
       <p class="parrafo mt-3">Crea nuevos registros, edita y elimina los distributivos.</p>
      
      <div class="mt-4">
         
          <div class="row ">
            <div class="col-lg-3">
                <div class="input-group">
            <span class="input-group-text text-body buscador"
              ><i class="fas fa-search" aria-hidden="true"></i
            ></span>
            <input 
              type="text"
              class="form-control buscador"
              placeholder="Buscar"
            />
          </div>
           
            </div>
            <div class="col-lg-6">
              <a
                @click="gets()"
                role="button"
                class="fuente tamanio"
                :class="{ disabled: isSelecUsers.length != 1 }"
                 v-tooltip.top-center="isSelecUsers.length ? '' : 'Seleccionar un fila para poder editar'"
              >
                <i class="fas fa-pencil-alt me-2 ms-3 iconos"></i>
                <b class="me-4 " :class="{ links: isSelecUsers.length === 1 }"
                  >Editar</b
                >
              </a>
              <a
                v-on="isSelecUsers.length ? { click: () => remove() } : {}"
                role="button"
                class="fuente tamanio"
                :class="{ disabled: isSelecUsers.length === 0 }"
                v-if="!iseliminaddo"
                v-tooltip.top-center="isSelecUsers.length ? '' : 'Seleccionar una o muchas filas para eliminar'"
              >
                <i class="far fa-trash-alt me-2 iconos"></i>
                <b class="me-4 " :class="{ links: isSelecUsers.length != 0 }"
                  >Eliminar distributivo</b
                >
              </a>
            </div>
            <div class="col-lg-3">
              <div class="d-flex justify-content-end mb-3">
                <a class="btn btn-sm btnNaranja" @click="MostrarModal()">
                  Crear distributivo
                </a>
              </div>
            </div>
          </div>
        
        <Spinner v-if="isLoading"></Spinner>
        <div v-else >
          
          <div v-if="!info.length" >
            <div class="row mt-2">
              <div class="col-lg-12">
                <div class="text-center">
                  <img
                    class="w-15"
                    src="../../../../assets/img/logs/lupa.svg"
                    alt="fondo"
                  />
                  <div class="letra fuente mt-3">
                    No hay datos que mostrar
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>

                <div  class="table-responsive mt-2">
            <table class="table table-flush" style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
              <thead class="thead-light">
                <tr class="cabeza">
                  <th
                    style="background-color: rgb(234, 240, 246); "
                    class="text-uppercase text-center text-xxs font-weight-bolder"
                  >
                    Curso / Paralelo
                  </th>

                  <th
                    class="text-uppercase text-center text-xxs font-weight-bolder"
                  >
                    Docente
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in info" :key="item.id">
                  <td>
                  <div class="d-flex ms-3">
                    <div class="form-check my-auto supcheka">
                      <input
                        class="form-check-input cheka"
                        type="checkbox"
                        @click="selectUser(item._id)"
                      />
                    </div>

                    <div class="mb-0 ms-3 text-xs colorestabla fuente">
                     <span v-if="item.fnivel">{{ item.fnivel.nombres }}</span> 
                     <span v-else class="text-danger ">Elimine este resgistro</span>
                      / {{ item.paralelo }}
                      <div>
                     <span class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                        ></span> Materia : <span v-if="item.fmateria">{{ item.fmateria.nombre }} </span>  <span v-else class="text-danger ">Elimine este resgistro</span>
                      
                    </div>
                    </div>
                  </div>
                </td>
                  

                  <td class="text-sm text-center text-dark fuente">
                    <span v-if="item.fdocente">
                      {{
                        item.fdocente.fullname
                      }}
                    </span>
                    <span v-else class="text-danger ">Elimine este resgistro es inestable</span>
                    
                  
                </td>
                </tr>
              </tbody>
            </table>
            <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->

             <ul class="pagination pagination-dark justify-content-center mt-4">
            <li class="page-item">
              <router-link
                class="fuente tamanio links paginates me-3"
                :class="{ inactivo: paginaActual == 1 }"
                :to="{ query: { pagina: paginaActual - 1 } }"
              >
                <i class="fa fa-angle-left me-2" aria-hidden="true"></i>
                <b>Anterior</b>
              </router-link>
            </li>

            <li class="page-item active">
              <a class="paginaA">
                <b> {{ paginaActual }}</b></a
              >
            </li>

            <li class="page-item">
              <router-link
                :class="{ inactivo: paginaActual == paginas }"
                class="fuente tamanio links paginates ms-3"
                :to="{ query: { pagina: paginaActual + 1 } }"
              >
                <b>Siguiente</b>
                <i class="fa fa-angle-right ms-2" aria-hidden="true"></i>
              </router-link>
            </li>
            <li>
              <div class="btn-group dropup me-3 ms-3">
                <a
                  type="button"
                  class="fuente tamanio links paginates dropdown-toggle "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>{{ subtitulo }}</b>
                </a>
                <ul
                  class="dropdown-menu px-2 py-3"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a
                      @click="getAll(1, 6)"
                      class="dropdown-item border-radius-md fuente"
                      href="javascript:;"
                      >6 filas por página</a
                    >
                  </li>
                  <li>
                    <a
                      @click="getAll(1, 25)"
                      class="dropdown-item border-radius-md fuente"
                      href="javascript:;"
                      >25 filas por página</a
                    >
                  </li>
                  <li>
                    <a
                      @click="getAll(1, 50)"
                      class="dropdown-item border-radius-md fuente"
                      href="javascript:;"
                      >50 filas por página</a
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <strong class="fuente text-sm"> Total: {{ totalNotas }} </strong>
            </li>
          </ul>
          </div>
          </div>
         
        </div>
      </div>
    
    </div>
    
    <div v-if="tab === 'init1'" class="altural"></div>
    <!--el modal fijo -->
    <div class="fixed-plugin" :class="{ 'show reponv1': tab === 'init1' }">
      <!-- <a @click="tab = 'init1'" class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: rgb(14, 114, 237);">
        <i class="fa fa-cog py-2 text-white"> </i>
      </a> -->
      <div
        class="card shadow-lg desplega"
        :class="{ reponv1: tab === 'init1' }"
        style="overflow-y: auto; z-index: 9999; "
      >
        <div class=" cabesa"
                style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 52px;
         padding: 4px 25px 4px 40px;">
          <div class="float-start">
            <h5 class="mt-2 mb-0 text-white fuente" style="font-weight: 400;">
              Crear Distributivo
            </h5>
          </div>
          <div class="float-end mt-2">
            <button
              @click="tab = 'init'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size:30px" class="fa fa-close text-white"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>
        
        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->
          <p class="h5 fuente mt-3">Vincular docentes con paralelos y materias</p>
          <Spinner v-if="isCarga"></Spinner>
          <form v-else @submit.prevent="save" id="dist1">
            <p class="mt-4 parrafo">Curso</p>
            <IsSelect v-if="isCurso"></IsSelect>
            <v-select class="style-chooser" placeholder="Selecionar curso"
              v-else
              :class="{ error: validation.hasError('model.fnivel') }"
              :options.sync="listniveles"
              label="nombres"
              v-model="model.fnivel"
              required
            >
              <template #option="{ nombres }">
                <h6 style="margin: 0">{{ nombres }}</h6>
              </template>
              <template #no-options="{ }">
                Lo siento, no hay opciones de coincidencia.
              </template>
            </v-select>
            <p class="mb-0 text-sm text-danger">
              {{ validation.firstError("model.fnivel") }}
            </p>

            <p class="mt-3 parrafo">Paralelo</p>
            <v-select class="style-chooser" placeholder="Selecionar paralelo"
              :class="{ error: validation.hasError('model.paralelo') }"
              :options.sync="paralelos"
              label="nombre"
              v-model="model.paralelo"
              required
            >
              <template #option="{ nombre }">
                <h6 style="margin: 0">{{ nombre }}</h6>
              </template>
              <template #no-options="{ }">
                Lo siento, no hay opciones de coincidencia.
              </template>
            </v-select>
            <p class="mb-0 text-sm text-danger">
              {{ validation.firstError("model.paralelo") }}
            </p>

            <p class="mt-3 parrafo">Materia</p>
            <IsSelect v-if="isMateria"></IsSelect>
            <v-select class="style-chooser" placeholder="Selecionar materia"
              v-else
              :class="{ error: validation.hasError('model.fmateria') }"
              :options.sync="listMaterias"
              label="nombre"
              v-model="model.fmateria"
              required
            >
              <template #option="{ nombre }">
                <h6 style="margin: 0">{{ nombre }}</h6>
              </template>
              <template #no-options="{ }">
                Lo siento, no hay opciones de coincidencia.
              </template>
            </v-select>
            <p class="mb-0 text-sm text-danger">
              {{ validation.firstError("model.fmateria") }}
            </p>

            <p class="mt-3 parrafo">Docente</p>
            <IsSelect v-if="isDocente"></IsSelect>

            <v-select class="style-chooser" placeholder="Selecionar docente"
              v-else
              :class="{ error: validation.hasError('model.fdocente') }"
              :options.sync="listDocentes"
              label="fullname"
              v-model="model.fdocente"
              required
            >
              <template #option="{ fullname }">
                <h6 style="margin: 0">{{ fullname }}</h6>
              </template>
              <template #no-options="{ }">
                Lo siento, no hay opciones de coincidencia.
              </template>
            </v-select>
            <p class="mb-0 text-sm text-danger">
              {{ validation.firstError("model.fdocente") }}
            </p>
             <div class="text-center mt-4">
               <img
                    class="w-30"
                    src="../../../../assets/img/jira/conect.svg"
                    alt="fondo"
                  />

             </div>

          </form>
        </div>
        <div class="cord-footer modalFooter">
                 <div class="text-end">

                       <a
                        class="btn btnNaranjaClaro"
                        
                       @click="__limpiarCampos()"
                      >
                      Limpiar
                      </a>
                     
                           <button v-if="ifLoad"
                      class="btn btn-sm btnNaranja ms-3"
                      type="button"
                      disabled
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Enviando...
                    </button>
                    <button v-else
                      type="submit"
                      id="addRowButton"
                      class="btn btnNaranja ms-3"
                      form="dist1"
                    >
                     {{
                        model._id ? " Actualizar" : " Guardar"
                      }}
                    </button>

                     
                    </div>
              </div>
      </div>
    </div>
  </div>
</template>

<script src="./Distributivov1.js"></script>
<style>
#div1 {
  overflow-y: scroll;
  max-height: 440px;
}
#div1::-webkit-scrollbar {
  -webkit-appearance: none;
}

#div1::-webkit-scrollbar:vertical {
  width: 10px;
}

#div1::-webkit-scrollbar-button:increment,
.contenedor::-webkit-scrollbar-button {
  display: none;
}

#div1::-webkit-scrollbar:horizontal {
  height: 10px;
}

#div1::-webkit-scrollbar-thumb {
  background-color: #bbbbbb;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}
</style>
