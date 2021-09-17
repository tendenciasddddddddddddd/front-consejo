<template>
  <div>
    <div
      class="fixed-plugin"
      :class="{ 'show w-100': tab === 'init1' }"
      style="   
   "
    >
      <a
        @click="tab = 'init1'"
        class="fixed-plugin-button text-dark position-fixed px-3 py-2"
        style="background-color: rgb(14, 114, 237);"
      >
        <i class="fa fa-cog py-2 text-white"> </i>
      </a>
      <div
        class="card shadow-lg blur desplega "
        :class="{ 'w-100': tab === 'init1' }"
        style="overflow-y: auto; z-index: 9999; top:35px; 
    "
      >
        <div
          class="card-header pb-0 pt-3  "
          style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;"
        >
          <div class="float-start">
            <h4 class="mt-3 mb-0 text-dark fuente" style="font-weight: 400;">Matricula Intensivo</h4>
          </div>
          <div class="float-end mt-4">
            <router-link
              to="/Matricula-1"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px" class="fa fa-close"></i>
            </router-link>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0">
          <!-- Sidebar Backgrounds -->
          <div class="row">
            <div class="col-lg-3 
                 
                  d-md-block d-none
                  me-n8" style="position:absolute;bottom:0;left:0;">
                   <div class="top-10" style="">
                            <img
                class=""
                src="../../../../assets/img/logos/fondoDerecho.svg"
                alt="fondo"
              />
                  </div>
            </div>
            <div class="col-lg-10 col-12 mx-auto">
              <div class="row">
                <div class="col-lg-3"></div>
                <div v-if="visible == 'uno'" class="col-lg-6 text-end">
                  <div class="row">
                    <div class="input-group mt-3">
                      <span class="input-group-text text-body buscador"
                        ><i class="fas fa-search" aria-hidden="true"></i
                      ></span>
                      <input
                        type="text"
                        v-model="searchQuery"
                        class="form-control buscador"
                        placeholder="Buscar"
                      />
                    </div>
                     <Spinner v-if="isLoading"></Spinner>
                    <div v-else class="mt-4">
                      <div v-if="info.length"> 
                        <div class="row" v-for="item in resultQuery.slice(0, 8)" :key="item._id">
                            <div class="col-lg-9 text-start">
                             <a class="parrafo" style="margin-left:35px; "> {{ item.fullname }} </a> 
                            </div>
                            <div v-if="item._id!='10'" class="col-lg-3 text-end">
                              <a @click="nextO(item)" href="javascript:;" class="text-primary fuente">Ingresar
                                   
                                </a>
                            </div>
                             <hr class="horizontal dark mt-4 mb-0" />
                        </div>
                            
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div v-if="visible == 'cero'" class="col-lg-6 text-end">
                  <div class="row">
                    <div class="col-lg-6 mt-8 ">
                      <p class="h6 fuente" style="font-weight: 400;">{{ result.fullname }} </p>

                      <p class="text-dark text-xs fuente">
                        Esta matricula estara vigente este periodo, despues de
                        eso pasara a formar parte de un historial es
                        recomendable que imprima su reporte posterior al la
                        creacion de la matricula.
                      </p>
                      <div class="mt-4">
                         <a @click="visible = 'uno'" class="btn btn-sm" style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;">Regresar</a> &nbsp;&nbsp;&nbsp;
                        <button
                          @click="mostrar()"
                          class="btn btn-sm btnNaranja"
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                    <div class="col-lg-6 mt-6">
                      <img
                        class="w-80"
                        src="../../../../assets/img/logs/team-alignment.svg"
                        alt="vuejs"
                      />
                    </div>
                    <div
                    v-if="isDuplicado"
                    class="mt-5"
                    style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
                  >
                    <div>
                      <p class="text-sm text-dark" style="margin:7px; ">
                        <strong>Error:</strong>
                        Este Estudiante ya se encuentra matriculado en este
                        periodo academico
                      </p>
                    </div>
                  </div>
                  </div>
                  
                </div>
                <div v-if="visible == 'dos'" class="col-lg-6 ">
                  <div class="text-center">
                    <div class="avatar avatar-xl position-relative">
                      <img
                        :src="result.foto"
                        alt="profile_image"
                        class="w-100 border-radius-xl shadow-sm"
                      />
                    </div>
                  </div>

                  <form @submit.prevent="save">
                    <Spinner v-if="isLoading2"></Spinner>
                    <div v-else class="col-12">
                      <a class="parrafo">Cursos</a>
                      <v-select
                        :class="{ error: validation.hasError('model.fknivel') }"
                        :options.sync="listniveles"
                        label="nombres"
                        v-model="model.fknivel"
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
                        {{ validation.firstError("model.fknivel") }}
                      </p>
                    </div>

                    <Spinner v-if="isLoading1"></Spinner>
                    <div v-else class="col-12 mt-3">
                      <p class="parrafo">Periodo</p>
                      <v-select
                        :class="{
                          error: validation.hasError('model.academico'),
                        }"
                        :options.sync="listPeriodo"
                        @input="checkExist($event)"
                        label="nombre"
                        v-model="model.academico"
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
                        {{ validation.firstError("model.academico") }}
                      </p>
                    </div>

                    <div class="row mt-3">
                      <IsSelect v-if="ifLoad1"></IsSelect>
                      <div v-else class="col-6">
                        <p class="parrafo">Número matricula</p>

                        <input
                          :class="{
                            error: validation.hasError('model.nmatricula'),
                          }"
                          class="form-control buscador"
                          type="number"
                          v-model="model.nmatricula"
                          readonly
                          required
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.nmatricula") }}
                        </p>
                      </div>
                      <IsSelect v-if="ifLoad1"></IsSelect>
                      <div v-else class="col-6">
                        <p class="parrafo">Folio</p>
                        <input
                          :class="{ error: validation.hasError('model.folio') }"
                          class="form-control buscador"
                          type="number"
                          v-model="model.folio"
                          readonly
                          required
                        />
                        <p class="mb-0 text-sm text-danger">
                          {{ validation.firstError("model.folio") }}
                        </p>
                      </div>
                    </div>


                    <div class="d-flex justify-content-end mt-5">
                      <a @click="visible = 'uno'" class="btn btn-default btn-sm" style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;">Cancelar</a> &nbsp;&nbsp;&nbsp;
                      <button
                        v-if="ifLoad"
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
                      <button
                        v-else
                        type="submit"
                        name="button"
                        class="btn btn-sm btnNaranja"
                      >
                        Crear Matricula
                      </button>
                    </div>
                  </form>
                </div>
                     <div v-if="visible == 'tres'" class="col-lg-6 text-center">
                  <div class="row">
                    <div class="mt-4">
                     
                      <p class="parrafo">
                       Felicidades su registro es exitoso.
                      </p>
                     
                    </div>
                    <div class="mt-4">
                      <img
                        class="w-40"
                        src="../../../../assets/img/logs/success.svg"
                        alt="vuejs"
                      />
                    </div>
                     <div>
                        <div class="mt-4">
                         <router-link to="/Matricula-1" class="btn btn-sm" style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;">Salir de aqui</router-link> &nbsp;&nbsp;&nbsp;
                        <button
                          @click="visible ='uno'"
                          class="btn btn-sm btnNaranja"
                        >
                          Otra Matricula
                        </button>
                      </div>
                     </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="col-lg-3 d-md-block d-none
                  
                 "  style="position:absolute;bottom:0;right:0;">
                   <div class="" style="">
                            <img
                class=""
                src="../../../../assets/img/logos/fondoIzquierdo.svg"
                alt="fondo"
              />
                  </div>
            </div>
          </div>

          <!-- Navbar Fixed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./CreateMatricula.js"></script>
