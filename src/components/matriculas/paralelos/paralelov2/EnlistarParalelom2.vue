<template>
  <div>
    <div class="fixed-plugin" :class="{ 'show w-100': tab === 'inicio' }">
      <div
        class="card shadow-lg blur desplega"
        :class="{ 'w-100': tab === 'inicio' }"
        style="overflow-y: auto;  z-index: 9999; top:35px;"
      >
        <div
          class="card-header pb-0 pt-3"
          style="background-color: #f5f8fa; border-bottom: 1px solid #dfe3eb;"
        >
          <div class="float-start">
            <h5 class="mt-3 mb-0 fuente">Asiganar a un Paralelos 😍 </h5>
          </div>
          <div class="float-end mt-4">
            <router-link
              to="/Matricula-2"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button "
            >
              <i style="font-size: 35px;" class="fa fa-close"></i>
            </router-link>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0">
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
            <div class="col-lg-8 col-12 mx-auto">
              <div class="row " v-if="isVisible === 'panel1'">
                <!--  style="background-color:rgb(245, 248, 250);" -->
                <Skeleton v-if="isLoading1"></Skeleton>
                <div
                  v-else
                  v-for="item in listniveles"
                  :key="item.id"
                  class="col-sm-3"
                >
                  <br />

                  <div
                    class=" border-radius-md p-3 mole"
                    style="  border: 1px solid #7fd1de; "
                  >
                    <div class="">
                      <div class="text-center position-relative">
                        <a @click="__verLista(item._id)" href="javascript:;">
                          <div class="blur-shadow-image">
                            <img
                              height="100px"
                              class="img  move-on-hover"
                              src="../../../../assets/img/logs/marketing-starter.svg"
                            />
                          </div>
                        </a>
                      </div>
                      <div>
                        <p class="text-xs text-center mt-2">
                          <b>{{ item.nombres }}</b>
                        </p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                <div class="mt-4">
                  <div class="d-flex justify-content-start">
                    <a
                      @click="isVisible = 'panel1'"
                      type="button"
                      class="btn w-20"
                      style="background-color: #ff7a59;
                      border-color: #ff7a59; color: #fff; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                    >
                      Regresar
                    </a>
                    &nbsp; &nbsp;
                    <a
                      @click="__mostrarConf()"
                      v-if="check.nombre"
                      type="button"
                      class="btn w-20"
                      style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                    >
                      Ver Asignaciones
                    </a>
                    &nbsp; &nbsp;
                    <v-select
                      v-model="check"
                      :options="paralelos"
                      label="nombre"
                      placeholder="Elejir un periodo"
                      class="w-20"
                    >
                      <template #option="{ nombre }">
                        <h6 style="margin: 0">{{ nombre }}</h6>
                      </template>
                      <template #no-options="{ }">
                        Lo siento, no hay opciones de coincidencia.
                      </template>
                    </v-select>
                  </div>
                </div>
                <Espera v-if="isTabla"></Espera>
                <div v-else class="table-responsive mt-4">
                  <table class="elevation-2 table table-flush ">
                    <div v-if="!infoMat.length" class="row mt-3">
                      <div class="col-lg-9 col-12 mx-auto">
                        <div class="text-center">
                          <img
                            class="w-30"
                            src="../../../../assets/img/logs/lupa.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente">
                            No hay datos que mostrar
                          </div>
                        </div>
                      </div>
                    </div>
                    <thead v-else class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-center text-secondary text-xxs "
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs "
                        >
                          Curso
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs "
                        >
                          Accion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in infoMat" :key="item.id">
                        <td class="text-sm text-center font-weight-normal">
                          <h6 class="mb-0 text-sm fuente">
                            {{ item.fkestudiante.apellidos }}
                            {{ item.fkestudiante.nombres }}
                          </h6>
                        </td>
                        <td class="text-sm text-center fuente">
                          <p class="mb-0 text-xs">
                            {{ item.fknivel.nombres }} ({{ item.curso }})
                          </p>
                        </td>
                        <td class="text-sm text-center font-weight-normal">
                          <a
                            class="text-primary link text-gradient px-3 mb-0 fuente"
                            style="cursor: pointer;"
                            @click="remove(item._id)"
                            title="Asignar"
                          >
                            Asignar Paralelo
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row" v-if="isVisible === 'panel3'">
                <div class="mt-4">
                  <a
                    @click="isVisible = 'panel2'"
                    type="button"
                    class="btn w-20"
                    style="background-color: #ff7a59;
                      border-color: #ff7a59; color: #fff; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                  >
                    Volver
                  </a>
                </div>
                <Espera v-if="isTabla"></Espera>
                <div v-else class="table-responsive mt-4">
                  <table class="elevation-2 table table-flush ">
                    <div v-if="!infoMat2.length" class="row mt-3">
                      <div class="col-lg-9 col-12 mx-auto">
                        <div class="text-center">
                          <img
                            class="w-30"
                            src="../../../../assets/img/logs/lupa.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente">
                            No hay datos que mostrar
                          </div>
                        </div>
                      </div>
                    </div>
                    <thead v-else class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-center text-secondary text-xxs"
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs"
                        >
                          Curso
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs"
                        >
                          Accion
                        </th>
                      </tr>
                    </thead>
                    <Skeleton v-if="isConfig"></Skeleton>
                    <tbody v-else>
                      <tr v-for="item in infoMat2" :key="item.id">
                        <td class="text-sm text-center ">
                          <h6 class="mb-0 text-sm fuente">
                            {{ item.fkestudiante.apellidos }}
                            {{ item.fkestudiante.nombres }}
                          </h6>
                        </td>
                        <td class="text-sm text-center">
                          <p class="mb-0 text-xs">
                            {{ item.fknivel.nombres }} ({{ item.curso }})
                          </p>
                        </td>
                        <td class="text-sm text-center fuente">
                          <a
                            class="text-primary link text-gradient px-3 mb-0 fuente"
                            style="cursor: pointer;"
                            @click="__quitarParalelo(item._id)"
                            title="Asignar"
                          >
                            Quitar Paralelo
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./EnlistarParalelom2.js"></script>

<style>
div.dataTables_wrapper div.dataTables_filter {
  width: 100%;
  padding-left: 20px;
}
.botonimagen{
background-image:url(../../../../assets/img/logos/logoE.png);
background-repeat:no-repeat;
height:50px;
width:50px;
background-position:center;
}
div.dataTables_wrapper div.dataTables_filter input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4rem;
  color: #495057;
  background-clip: padding-box;
  border: none;
  appearance: none;
  border-radius: 0.5rem;
}
.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
  background: none;
  color: black !important;
  border-radius: 4px;
  border: 1px solid #828282;
}

.dataTables_wrapper .dataTables_paginate .paginate_button {
  z-index: 3;

  color: #8392ab;
  padding: 0;
  margin: 0 3px;
  border-radius: 50% !important;
  width: 36px;
  height: 36px;
  font-size: 0.875rem;
}
.fondos {
  border-radius: 0;
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
  padding: 15px;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}

</style>
