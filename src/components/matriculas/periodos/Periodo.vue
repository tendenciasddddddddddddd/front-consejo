<template>
  <div class="row">
    <div class="col-lg-11 col-12 mx-auto">

          <div class="mt-3">
        <div
          class=""
          style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;     "
        >
          <div>
            <p class="text-sm text-dark fuente" style="margin:7px;font-weight: 700; ">
              Solo puede tener un periodo activo por cada modalidad.
            </p>
          </div>
        </div>
      </div>
      <p class="parrafo mt-3">Crea nuevos periodos, uno por cada modalidad y elimina periodos del periodo.</p>
      <div class="card ">
        
        <!-- Card header -->
        <div class="mt-2">
          <div class="row ">
           
             <div class="col-lg-4">
             
             <div class="input-group">
            <span class="input-group-text text-body buscador"
              ><i class="fas fa-search" aria-hidden="true"></i
            ></span>
            <input 
              type="text"
              class="form-control buscador text-sm"
              placeholder="Buscar"
            />
          </div>
            </div>
            <div class="col-lg-8">
              <div class="text-end">
                <!-- <a  type="button" class="btn btn-sm " style="background-color: #eaf0f6;
                      border-color: #cbd6e2; color: #506e91; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;">
                      Descargar Lista
                      </a> --> 
                   
                <a
                  class="btn btn-sm btnNaranja" 
                  @click="__limpiarCampos()"
                >
                  Nuevo periodo
                </a>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-if="isLoading"></Spinner>

        <div v-else class="table-responsive mt-3">
          <table class="table table-flush" id="datatable-basic">
            <thead class="thead-light">
              <tr class="cabeza">
                <th style="background-color: rgb(234, 240, 246); "
                  class=" text-center text-xxs font-weight-bolder"
                >
                  Periodo
                </th>
                  <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Modalidad
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Fecha modicado
                </th>

                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Estado
                </th>
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in info" :key="item.id">
                <td class="text-sm text-center text-dark fuente" >
                  {{ item.nombre }}
                </td>
                 <td class="text-sm text-center font-weight-normal fuente">
                  {{ item.typo }}
                </td>
                  <td class="text-xs text-center font-weight-normal fuente">
                  {{ item.updatedAt.substring(0,10) }}
                </td>
                <td class="text-sm text-center font-weight-normal">
                     <span class="icon">
                <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                <i v-else class="fa fa-times"></i>
              </span>
                </td>

                <td class="text-sm text-center font-weight-normal">
                  <a  @click="gets(item._id, this)"  
                      style="cursor: pointer;"
                      >
                    <i
                      class="fas fa-pencil-alt text-secondary me-4 "
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a
                    class="text-primary link text-gradient px-3 mb-0 "
                    style="cursor: pointer;"
                    @click="openModal(item._id, item.nombre)"
                    title="Eliminar"
                  >
                    <i class="far fa-trash-alt me-2" aria-hidden="true"> </i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->

          <ul class="pagination pagination-dark justify-content-center">
            &nbsp;&nbsp;
            <li class="page-item">
              <router-link
                class="page-link"
                v-if="paginaActual != 1"
                :to="{ query: { pagina: paginaActual - 1 } }"
              >
                <i class="ni ni-bold-left" aria-hidden="true"></i>
              </router-link>
            </li>

            <li class="page-item active">
              <a class="page-link">{{ paginaActual }}</a>
            </li>

            <li class="page-item">
              <router-link
                v-if="paginaActual != paginas"
                class="page-link"
                :to="{ query: { pagina: paginaActual + 1 } }"
              >
                <i class="ni ni-bold-right" aria-hidden="true"></i>
              </router-link>
            </li>
            <li>
              <strong class="text-dark">
                &nbsp;&nbsp;&nbsp; Total: {{ totalNotas }} - Páginas:
                {{ paginas }}
              </strong>
            </li>
          </ul>


        </div>
     
      </div>
    </div>
       <div class="fixed-plugin" :class="{ 'show': tabbla === 'abre' }">

      <div  class="card shadow-lg blur desplega" style="overflow-y: auto;">
        <div class="card-header pb-0 pt-3  bg-transparent ">
          <div class="float-start">
            <h5 class="mt-3 mb-0 fuente" style="font-weight: 400;">Periodos Escolar</h5>
            
          </div>
          <div class="float-end mt-4">
            <button @click="tabbla = 'cier'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 27px" class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>
        
        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->
           
          <form @submit.prevent="save" role="form text-left">
                     <h6 class="text-danger text-center">{{MsmError}}</h6>
                    <p class="parrafo">Periodo</p>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        :class="{ error: validation.hasError('model.nombre') }"
                        v-model="model.nombre"
                        class="form-control buscador fuente"
                      />
                   
                    </div>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.nombre") }}
                      </p>
                      <p class="parrafo mt-1">Inicio de Periodo</p>
                        <date-picker 
                         v-model="model.inicia" 
                         valueType="format" class="w-100 fuente" 
                         :class="{ error: validation.hasError('model.inicia') }"
                         >
                         </date-picker>
                         <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.inicia") }}
                      </p>
                     
                       <p class="parrafo mt-1">Fin de Periodo</p>
                    
                      <date-picker
                        :class="{ error: validation.hasError('model.finaliza') }"
                        v-model="model.finaliza"
                        valueType="format" class="w-100 fuente"
                      ></date-picker>
                   
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.finaliza") }}
                      </p>
                      <div class="row mt-3">
                    <div class="col-6" v-for="ite in modalidad" :key="ite.id">
                      <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          v-model="checked"
                          type="radio"
                          name="ite.id"
                          :id="ite.id"
                          :value="ite.name"
                        />
                        <p class="parrafo" for="ite.id">
                          {{ ite.name }}</p
                        >
                      </div>
                    </div>
                  </div>
                    <div class="form-check form-check-info">
                      <a class="fuente">{{ model.estado ? "Estado" : "Active Estado" }}</a>
                      <input
                          v-model="model.estado"
                          class="form-check-input"
                          type="checkbox"
                          id="checkbox"
                          value="1"
                          v-bind:true-value="1"
                          v-bind:false-value="0"
                        />
                    </div>
                    <br>
                    <div class="text-center">
                      <button v-if="ifLoad"
                      class="btn btn-sm btnNaranja"
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
                      class="btn btn-sm btnNaranja"
                    >
                      {{
                        model._id ? "Actualizar Registro " : "Guardar"
                      }}
                    </button>
                     
                    </div>
                  </form>
          
        </div>
      </div>
    </div>
      <div
          class="modal fade "
          :class="{ 'show ': modals1 === 'opennn' }"
          :style="[modals1 === 'opennn' ? { display: 'block' } : {}]"
          style="overflow-y: auto;    z-index: 9999;"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content ">

              <div class="modal-body">
                <p class="h4 fuente">¿Eliminar a <br>
               {{name}}?</p>
                
                <p class="parrafo">Estás a punto de eliminar a {{name}} de esta cuenta. Esta acción no se puede deshacer</p>
                <div class="mt-3">
                  <a @click="modals1 = 'cier'" class="btn btn-sm " style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;" name="button">Cancelar</a>&nbsp; &nbsp;
                   <button @click="__eliminar()" class="btn btn-sm btnNaranja">
                           Continuar
                   </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>

  </div>
</template>

<script src="./Periodo.js"></script>
<style >

</style>