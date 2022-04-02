<template>
    <div>
       <AlertHeader :firsttext="'Gestión'" :lasttext="'Ingresar materias'" ></AlertHeader>  
         <p class="parrafo mt-2">Crea nuevas asignaturas, edita y elimina segun sea necesario.</p>
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
             <div class="col-lg-7">
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
                <b class="me-2" :class="{ links: isSelecUsers.length != 0 }"
                  >Eliminar materias</b
                >
              </a>
               <a
              @click="desactiveState"
              role="button"
              class="fuente tamanio"
              :class="{ disabled: isSelecUsers.length != 1 }"
              v-tooltip.top-center="
                isSelecUsers.length
                  ? ''
                  : 'Seleccionar un fila para poder desactivar'
              "
            >
              <i class="fas fa-sync me-2 ms-3 iconos"></i>
             
              <b :class="{ links: isSelecUsers.length === 1 }"
                >Cambiar estado</b
              >
            </a>
            </div>
            <div class="col-lg-2">
              <div class="d-flex justify-content-end mb-3">
               <a class="btn btn-sm btnNaranja" @click="openModal">
                  Crear materia
               </a>
              </div>
            </div>
          </div>
        <Spinner v-if="isLoading"></Spinner>
        <div v-else class="table-responsive mt-2">
          <table class="table table-flush" 
          style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
            <thead class="thead-light">
              <tr class="cabeza">
                <th style="background-color: rgb(234, 240, 246); "
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Nombre
                </th>
                  <th
                  class="text-uppercase text-center text-xxs font-weight-bolder"
                >
                  Descripción
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
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in info" :key="item.id">
                <td>
                  <div class="d-flex ms-3">
                    <div class="form-check my-auto">
                      <input
                        class="form-check-input cheka"
                        type="checkbox"
                        v-model="isSelecUsers" :value="item._id"
                        @click="selectUser(item._id)"
                      />
                    </div>

                    <a class="mb-0 ms-3 text-sm colorestabla fuente">
                      {{ item.nombre }}
                    </a>
                  </div>
                </td>
                 <td class="text-sm text-center text-dark fuente">
                  {{ item.descripcion }}
                </td>
                  <td class="text-sm text-center text-dark fuente">
                  {{ item.updatedAt.substring(0,10) }}
                </td>
                <td class="text-sm text-center font-weight-normal fuente">
                     <span class="icon">
                <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                <i v-else class="fa fa-times"></i>
              </span>
                </td>

                
              </tr>
            </tbody>
          </table>
          <Paginate2 :numPages="paginas"  :page="pagina" :total="totalNotas" :subtitulo="subtitulo" @pagechanged="onPageChange"></Paginate2>
             <Modal v-show="visible" @close="close">
          <template v-slot:header> {{model._id ? "Editar materia" : "Añadir nueva materia"}}</template>
          <template v-slot:body>
             <Spinner v-if="isCarga"></Spinner>
                <form @submit.prevent="save" role="form">
                  <h6 class="text-danger text-center" v-if="MsmError!=''">{{ MsmError }}</h6>
                  <span class="parrafo">Nombre de Materia</span>
                  <CustomInput v-model="model.nombre" />
                  <p class=" text-xs fuente text-danger">
                    {{ validation.firstError("model.nombre") }}
                  </p>
                 
                  <span class="parrafo mt-2">Descripción</span>
                  <CustomInput v-model="model.descripcion" />
                  <p class="mb-0 text-xs fuente text-danger">
                    {{ validation.firstError("model.descripcion") }}
                  </p>
                   <hr class="horizontal dark mb-1 d-xl-block d-none">
                  <div class="text-center">
                    <ButtonLoading v-if="ifLoad"/>
                    <button
                      v-else
                      type="submit"
                      class="btn btnNaranja  mt-1 mb-0 "
                    >
                      {{ model._id ? "Actualizar" : "Guardar" }}
                    </button>
                  </div>
                </form>
          </template>
        </Modal>
        </div>
    </div>
</template>

<script src="./Materias.js"></script>
