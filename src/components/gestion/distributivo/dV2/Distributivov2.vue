<template>
    <div>
       <div class="row gx-4">
       <div
          class="mt-1"
          style="background-color: #e5f5f8; padding:5px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
        >
          <div>
            <p class="text-dark fuente " style="margin:7px;font-weight: 700; font-size: 16px ">
             <router-link to="/Menu-Distributivo" class="badge fuente regresar" style=""> 
               <i class="ni ni-bold-left"></i>&nbsp;Regresar</router-link>
              &nbsp;&nbsp;    &nbsp;&nbsp;  Distributivo entre materias docentes y paralelos.
            </p>
          </div>
        </div>
         
        <div class="col-lg-4 col-12 mx-auto ">
          <div class="mt-5">
            <div class="card-header pb-0">
              <h5 class="fuente">Extraordinaria</h5>
            </div>
             <div class="card-body p-3 text-center" >
                <div class="blur-shadow-image">
                    <img
                      height="170px"
                      class="img border-radius-lg move-on-hover"
                      src="../../../../assets/img/logs/segmented-lists.svg"
                    />
                  </div>
                  <div class="mt-5">
                    <button @click="MostrarModal()" class="btn btnNaranja w-80">Crear Ditributivo</button>
                  </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-12 mx-auto">
          <Spinner v-if="isLoading"></Spinner>
        <div v-else class="mt-5">
           <!-- <Spinner v-if="isLoading"></Spinner> -->
            <div v-if="!info.length" class="mt-4">
             
              <div class="row mt-3">
                 <div class="col-lg-12">
                     <div class="text-center">
                           <img class="w-35" src="../../../../assets/img/logs/lupa.svg" alt="fondo">
                         <div class="letra fuente">
                             No hay datos que mostrar
                      </div>
                     </div>
                         
                 </div>
              </div>
           </div>
        <div v-else class="table-responsive mt-3">
         
          <table  class="table table-flush" id="datatable-basic">
            <thead class="thead-light">
              <tr class="cabeza">
                <th style="background-color: rgb(234, 240, 246); "
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Curso / Paralelo
                </th>
               
                
                <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Accion
                </th>
              </tr>
            </thead>
            
            <tbody >
                 
              <tr v-for="item in info" :key="item.id" >
                <td class="text-xs text-dark font-weight-normal">
                  {{ item.fnivel.nombres }} / {{item.paralelo}}
                  <div>
                       Materia : {{ item.fmateria.nombre}} ⚡{{item.fdocente.apellidos}} {{item.fdocente.nombres}}⚡
                  </div>
               
                </td>
              
               
                <td class="text-sm text-center font-weight-normal">
                  <a @click="gets(item._id)" style="cursor: pointer;">
                    <i
                      class="fas fa-pencil-alt text-dark me-4 "
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a
                    class="text-danger link text-gradient px-3 mb-0 "
                    style="cursor: pointer;"
                    @click="__eliminar(item._id)"
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
     </div>
     <!--el modal fijo -->
     <div class="fixed-plugin" :class="{ 'show w-35': tab === 'init1' }">
      <!-- <a @click="tab = 'init1'" class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: rgb(14, 114, 237);">
        <i class="fa fa-cog py-2 text-white"> </i>
      </a> -->
      <div  class="card shadow-lg blur desplega" :class="{ 'w-35': tab === 'init1' }"
      style="overflow-y: auto;">
        <div class="card-header pb-0 pt-3  bg-transparent ">
          <div class="float-start">
              <h5 class="mt-3 mb-0 fuente" style="font-weight: 400;">Genere Distributivo</h5>
          </div>
          <div class="float-end mt-4">
            <button @click="tab = 'init'"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size:25px" class="fa fa-close"></i>
            </button>
          </div>
          <!-- End Toggle Button -->
        </div>
        <hr class="horizontal dark my-1" />
        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->
           
          <form  @submit.prevent="save">
              

                        <p class="mt-2 parrafo">Curso</p>
                      <IsSelect v-if="isCurso"></IsSelect>
                      <v-select  v-else
                          :class="{ error: validation.hasError('model.fnivel'), }"
                        :options.sync="listniveles"   label="nombres" v-model="model.fnivel"  required>
                      <template  #option="{ nombres }">
                        <h6  style="margin: 0">{{ nombres }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fnivel") }}
                      </p>

                       <p class="mt-2 parrafo">Paralelo</p>
                     <v-select  
                          :class="{ error: validation.hasError('model.paralelo'), }"
                        :options.sync="paralelos"   label="nombre" v-model="model.paralelo"  required>
                      <template  #option="{ nombre }">
                        <h6  style="margin: 0">{{ nombre }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.paralelo") }}
                      </p>

                       <p class="mt-2 parrafo">Materia</p>
                      <IsSelect v-if="isMateria"></IsSelect>
                      <v-select  v-else
                          :class="{ error: validation.hasError('model.fmateria'), }"
                        :options.sync="listMaterias"   label="nombre" v-model="model.fmateria"  required>
                      <template  #option="{ nombre }">
                        <h6  style="margin: 0">{{ nombre }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                    <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fmateria") }}
                      </p>

                       <p class="mt-2 parrafo">Docente</p>
                      <IsSelect v-if="isDocente"></IsSelect>

                     <v-select  v-else
                          :class="{ error: validation.hasError('model.fdocente'), }"
                        :options.sync="listDocentes"   label="fullname" v-model="model.fdocente"  required>
                      <template  #option="{ fullname }">
                        <h6  style="margin: 0">{{ fullname }}</h6>
                        
                      </template>
                       <template #no-options="{ }">
                         Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                    <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("model.fdocente") }}
                      </p>

                        <div class="row mt-5">
                         <div class="col-lg-6 text-center">
                          <a @click=" __limpiarCampos()" class="btn btn-sm w-80" style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;" name="button">Limpiar</a>
                    </div>
                    <div class="col-lg-6 text-center">
                           <button v-if="ifLoad"
                      class="btn btn-sm btnNaranja w-80"
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
                      <button v-else class="btn btn-sm btnNaranja w-80" type="submit" name="button">
                       {{
                        model._id ? "Actualizar" : "Guardar"
                      }}
                        </button>
                     
                    </div>
                   
                  </div>
          </form>
        
          
          
        </div>
      </div>
    </div>
    </div>
</template>

<script src="./Distributivov2.js">
</script>
<style >
#div1 {
     overflow-y:scroll;
     height:500px;
 
}
#div1::-webkit-scrollbar {
    -webkit-appearance: none;
}

#div1::-webkit-scrollbar:vertical {
    width:10px;
}

#div1::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button {
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

