<template>
  <ScrimModal @close="close">
        <template v-slot:header> Lista de migraciones</template>
         <template v-slot:body>
              <div class="row">
                <div class="col-lg-3">
                    <div class="input-group">
                <span class="input-group-text text-body buscador"
                  ><i class="fas fa-search links" aria-hidden="true"></i
                ></span>
                <input
                  type="text"  v-model.lazy="search"
                  class="form-control buscador"
                  placeholder="Buscar"
                />
              </div>
                </div>
                <div class="col-lg-9">
                  <div class="d-flex justify-content-start">
                    <div style="width:280px">
                       <Spinner v-if="ifLoadPeriodo"></Spinner>
                       <Dropdown  v-model="namePeriodo"  :options="arrayDocumentsLevel"/>
                    </div>
                     &nbsp; &nbsp;
                     <div style="width:280px">
                        <Spinner v-if="ifLoadCourse"></Spinner>
                         <Dropdown  v-model="nameCourse"  :options="arrayDocumentsCourse"/>
                     </div>
                     <div class="ms-3">
                        <a v-if="!isComplete" class="btn btn-sm btnDisabled">Seleccione items</a>
                        <a v-else @click="searchForCourseAndLever" class="btn btn-sm  btnNaranja ">
                        Buscar
                     </a>
                     </div>
                  </div>
                  
                </div>
                
              
                 <span v-if="isSearch" @click="killQuery" class="fuente tamanio links mt-2"> <b>Salir de busqueda</b>  </span>
                <Spinner v-if="isLoading"></Spinner>
                <div v-else class="table-responsive mt-3">
                  <div v-if="!collections.length" class="row mt-3">
                    <div class="col-lg-9 col-12 mx-auto">
                      <div class="text-center mt-6">
                        <img
                          class="w-15"
                          src="../../../assets/img/usados/undraw_search.svg"
                          alt="fondo"
                        />
                        <div class="letra fuente mt-4">
                          No hay datos que mostrar en esta vista
                        </div>
                      </div>
                    </div>
                  </div>
                  <section v-else>
                         <table class="dataTable-table table s-table-flush">
                    <thead class="thead-light">
                      <tr class="cabeza">
                       <th style="background-color: rgb(234, 240, 246); ">
                   <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                        Nombres
                   </span>
                  </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          Curso
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                         Periodo
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                         Modalidad
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in collections" :key="item.id">
                        <td>
                          <div class="d-flex ms-3">
                            <div class="form-check my-auto supcheka">
                              <input
                                class="form-check-input cheka"
                                type="checkbox"
                                
                              />
                            </div>
                            &nbsp;&nbsp;
                            <a class="mb-0 text-sm colorestabla fuente">
                              {{ item.nombre }}
                            </a>
                          </div>
                        </td>
                         <td class="text-sm text-center colorestabla fuente">
                          <p class="mb-0 text-xs">{{ item.fknivel.nombre }}</p>
                        </td>
                        <td class="text-sm text-center colorestabla fuente">
                          <p class="mb-0 text-xs">{{ item.academico.nombre }}</p>
                        </td>
                        <td class="text-sm text-center colorestabla fuente">
                          <span v-if="item.typo=='m1'">
                              Intensivos
                          </span>
                         <span v-else>
                               Extraordinaria
                         </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Paginate2 v-if="!isSearch" :numPages="paginas"  :page="pagina" :total="totalNotas" :subtitulo="subtitulo" @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
                  </section>
                </div>
              </div>
         </template>
        <template v-slot:footer>
               <a class="btn btnNaranjaClaro" @click="close">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
         </template>
    </ScrimModal>
</template>

<script src="./MigrationnList.js"></script>

