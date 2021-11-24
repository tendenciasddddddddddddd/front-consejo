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
          <div class="row">
            <div class="col-lg-10">
              <h5
                style="font-weight: 400"
                class="mt-2 ms-5 mb-0 fuente text-white "
              >
                Asignar Paralelos 😍
              </h5>
            </div>
            <div class="col-lg-2">
              <div class="text-end mt-2">
                <router-link
                  to="/Matricula-2"
                  class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                >
                  <i style="font-size: 32px" class="fa fa-close text-white"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0" style="overflow-y: auto;height: auto;">
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
                      class=" p-2  noactive cajas"
                      :class="{ activado: index === item._id }"
                      style="max-width: 200px;"
                    >
                      <a href="javascript:;" @click="clicMe(item._id)">
                        <div class="text-center position-relative">
                          <div class="blur-shadow-image">
                            <img
                              class="img  move-on-hover"
                              src="../../../../assets/img/logs/electronic-signature.svg"
                            />
                          </div>
                        </div>
                        <div>
                          <p class="parrafo text-center">
                            Curso: <br />
                            <span class="cardSubTitle">{{
                              item.nombres.slice(0, 25)
                            }}</span>
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </section>
              </div>

              <div class="row" v-if="isVisible === 'panel2'">
                 <div class="mt-4">
                  <div class="">
                    <a
                      @click="isVisible = 'panel1'"
                      class="btn btn-sm"
                      style="box-shadow: none"
                    >
                      <img
                        height="23px"
                        src="../../../../assets/img/usados/regresar.png"
                      />
                    </a>
                    <span class="fuente h6 ms-3 text-center">LISTA DE ALUMNOS QUE NO TIENE O NO ESTAS ASIGNADO UN PARALELO</span>
                    
                  </div>
                 
                  <div class="d-flex mt-3">
                    
                    <select
                      v-model="check"
                      
                      class="fuente  buscador "
                      @change="onChange($event)"
                    >
                     <option disabled value="">Seleccione un paralelo</option>
                       <option value="A">PARALELO A</option>
                      <option value="C">PARALELO C</option>
                      <option value="D">PARALELO D</option>
                      <option value="E">PARALELO E</option>
                       <option value="F">PARALELO F</option>
                    </select>
                    <a
                      v-on="isSelected ? { click: () => __mostrarConf() } : {}"
                      role="button"
                      class="fuente tamanio ms-2"
                      :class="{ disabled: !isSelected }"
                    >
                      <i class="fa fa-archive me-2 ms-3 iconos"></i>
                      <b class="me-4 " :class="{ links: isSelected }"
                        >Ver asignados</b
                      >
                    </a>
                    <a
                      v-on="isSelecCurosos.length ? { click: () => remove() } : {}"
                      role="button"
                      class="fuente tamanio"
                      :class="{ disabled: isSelecCurosos.length == 0 && !isSelected}"
                    >
                      <i class="fa fa-refresh me-2 iconos"></i>
                      <b
                        class="me-4 "
                        :class="{
                          links: isSelecCurosos.length != 0 && isSelected,
                        }"
                        >Guardar asignación de paralelos</b
                      >
                    </a>

                    <span v-if="isError != ''">
                      <p class="parrafo text-danger">{{ isError }}</p>
                    </span>
                  </div>
                </div>
              
                <Spinner v-if="isTabla"></Spinner>
                <div v-else class="table-responsive mt-4">
                  <div v-if="!infoMat.length" class="row mt-3">
                      <div class="col-lg-9 col-12 mx-auto">
                        <div class="text-center">
                          <img
                            class="w-20 mt-5"
                            src="../../../../assets/img/usados/undraw_search.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente mt-4">
                            No se encontraron resultados
                          </div>
                        </div>
                      </div>
                    </div>
                  <table v-else class="elevation-2 table table-flush "  style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                    
                        <thead  class="thead-light">
                      <tr class="cabeza">
                        <th
                          style="background-color: rgb(234, 240, 246); "
                          class="text-uppercase text-secondary text-xxs "
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs "
                        >
                          Curso
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

                            <a class="mb-0 ms-3 text-sm colorestabla fuente">
                              {{ item.nombre }}
                            </a>
                          </div>
                        </td>
                         
                        <td class="text-sm text-center fuente">
                          <p class="mb-0 text-xs">
                            {{ item.fknivel.nombres }} ({{ item.curso }})
                          </p>
                        </td>
                       
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row" v-if="isVisible === 'panel3'">
                 <div class="mt-4">
                  <div >
                     <a
                      @click="__volverAsignacion()"
                      class="btn btn-sm"
                      style="box-shadow: none"
                    >
                      <img
                        height="23px"
                        src="../../../../assets/img/usados/regresar.png"
                      />
                    </a>
                    <span class="fuente h6 ms-3">ESTUDIANTES YA ASIGNADOS</span>
                  </div>
                  <div class="d-flex mt-3">
                   
                    <a
                      v-on="isRemoveSelecC.length ? { click: () => remove2() } : {}"
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
                <div v-else class="table-responsive mt-4">
                  <div v-if="!infoMat2.length" class="row mt-3">
                      <div class="col-lg-9 col-12 mx-auto">
                        <div class="text-center">
                          <img
                            class="w-20 mt-5"
                            src="../../../../assets/img/usados/undraw_search.svg"
                            alt="fondo"
                          />
                          <div class="letra fuente mt-4">
                             No se encontraron resultados
                          </div>
                        </div>
                      </div>
                    </div>
                  <table v-else class="elevation-2 table table-flush " style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                    
                    <thead  class="thead-light">
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
                          Curso
                        </th>
                       
                      </tr>
                    </thead>
                    <Spinner v-if="isConfig"></Spinner>
                    <tbody v-else>
                       <tr v-for="item in infoMat2" :key="item.id">
                        <td >
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
                            {{ item.fknivel.nombres }} ({{ item.curso }})
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
