<template>
  <div>
    <Spinner v-if="isData"></Spinner>
    <template v-else>
      <div v-if="!info" class="row">
        <div class="col-lg-9 col-12 mx-auto mt-4">
         <div class="alertdanger">
              <p class="text-sm fuente text-dark" style="margin:7px; ">
                Su matrícula aun no está registrada, para resolver esto
                comuníquese con secretaria para registre su matrícula.
              </p>
            </div>

          <div class="row mt-4">
            <div class="col-lg-9 col-12 mx-auto">
              <div class="text-center">
                <img
                  class="w-25"
                  src="../../../assets/img/logs/lupa.svg"
                  alt="fondo"
                />
                <div class="letra fuente mt-3">No hay datos que mostrar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="row ">
          <div class="col-lg-11 col-12 mx-auto">
          <div  style="
              background-color: #e5f5f8;
              padding: 7px;
              border-color: #7fd1de;
              border-style: solid;
              border-width: 1px;
              text-align: left;
            ">
             <div>
              <p class="h6 text-dark " style="margin: 7px">
                  {{ info.academico.nombre }} {{ info.fknivel.nombres }} {{
                    info.curso
                  }}
              </p>
            </div>
          </div>

          <section>
            
          <div class="row mt-4">
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
               @click="viewsdetails"
                role="button"
                class="fuente tamanio"
                :class="{ disabled: isSelecUsers.length != 1 }"
                v-tooltip.top-center="isSelecUsers.length  ? '' : 'Seleccionar una fila para editar'"
              >
                <i class="fas fa-pencil-alt me-2 ms-3 iconos"></i>
                <b class="me-4 " :class="{ links: isSelecUsers.length === 1 }"
                  >Ver detalles</b
                >
              </a>
            
            </div>
            <div class="col-lg-3">
              <div class="d-flex justify-content-end mb-3">
                <button v-if="isExcel" class="btn btn-sm btnNaranja" disabled>
                  Trabajando...
                </button>
                 <a v-else class="btn btn-sm btnNaranja" @click="__exportEcxel">
                  Exportar lista
                </a>
              </div>
            </div>
          </div>
           <div>
               <div
                      v-if="inAlumnos.length"
                      class="card-body px-0 pt-0 pb-2 mt-2"
                    >
                      <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0"  style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                          <thead>
                            <tr class="cabeza">
                              <th
                                style="background-color: rgb(234, 240, 246)"
                                class="
                                  text-uppercase text-secondary text-xxs
                                  font-weight-bolder
                                "
                              >
                                Materia
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder
                                "
                              >
                                Docente
                              </th>
                              <th
                                class=" text-center text-uppercase  text-secondary  text-xxs"
                              >
                                Quimestre 1
                              </th>

                              <th
                                class="
                                  text-center text-uppercase text-secondary text-xxs"
                              >
                                Quimestre 2
                              </th>
                               <th
                                class="
                                  text-center text-uppercase text-secondary text-xxs "
                              >
                                Promedio final
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in inAlumnos"
                              :key="item.fora"
                              
                            >
                               <td>
                  <div class="d-flex ms-3">
                    <div class="form-check my-auto">
                      <input
                        class="form-check-input cheka"
                        type="checkbox"
                        @click="selectUser(item.fora)"
                      />
                    </div>

                    <a class="mb-0 ms-3 text-sm colorestabla fuente">
                      {{ item.materia }}
                    </a>
                  </div>
                </td>
                              <td
                                class="
                                 text-sm colorestabla fuente
                                "
                              >
                                {{ item.name }}
                              </td>
                              <td
                                class="
                                 text-sm colorestabla fuente text-center
                                "
                              >
                                {{ item.par1 }}
                              </td>
                              <td
                                class="
                                 text-sm colorestabla fuente text-center
                                "
                              >
                                {{ item.par2 }}
                              </td>
                              <td
                                class="
                                 text-sm colorestabla fuente text-center
                                "
                              >
                                {{ item.promed }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div v-else>
                        <div class="row mt-5">
                          <div class="col-lg-9 col-12 mx-auto">
                            <div class="text-center">
                              <img
                                class="w-15 mt-4"
                                src="../../../assets/img/usados/undraw_search.svg"
                                alt="fondo"
                              />
                              <div class="mt-3 letra fuente">
                                Hemos buscado en todas partes, pero no tenemos
                                <br />
                                nada que mostrarte. Pregunta a tus<br />
                                docentes.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
           </div>
          </section>
           
          </div>
        </div>

        <!-- <div class="row mt-7">
          <div class="col-lg-8 col-12 mx-auto mt-4">
            <div class="row">
              <div class="col-lg-6 mt-4">
                <p class="h5 fuente">
                  Haz seguimiento del tus notas para que no existe confusiones
                  ni sorpresas 😎
                </p>
               

                <p class="parrafo">
                  ⮕ {{ info.academico.nombre }} ⮕{{ info.fknivel.nombres }} ⮕{{
                    info.curso
                  }}
                  <br />
                </p>
                <div class="mt-4">
                  <button @click="tabla = 'notasv'" class="btn btnNaranja">
                    Visualizar
                  </button>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="text-start">
                  <img
                    height="290px"
                    class="w-100"
                    src="../../../assets/img/jira/tele.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div> -->

        

        <div class="fixed-plugin" :class="{ 'show w-100': tabla === 'notasv' }">
          <div
            class="card shadow-lg desplega"
            :class="{ 'w-100': tabla === 'notasv' }"
            style="overflow-y: auto; z-index: 9999"
          >
           <div
          class=""
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
        >
          <div class="row">
            <div class="col-lg-10">
              <h5
                style="font-weight: 400"
                class="mt-2 ms-5 mb-0 fuente text-white "
              >
                Detelle de las calificaciones
              </h5>
            </div>
            <div class="col-lg-2">
              <div class="text-end mt-2">
                <a
                   @click="cerrarModal"
                  class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                >
                  <i style="font-size: 32px" class="fa fa-close text-white"></i>
                </a>
                
              </div>
            </div>
          </div>
          <!-- End Toggle Button -->
        </div>
           

            <div class="card-body pt-sm-3 pt-0">
              <!-- Sidebar Backgrounds -->
              <div class="row">
                

                <div class="col-lg-9 col-12 mx-auto">
                  
                  <div v-if="isTabla === 'notasquimestre'">
                    <div
                      v-if="inAlumnos.length"
                      class="card-body px-0 pt-0 pb-2 mt-2"
                    >
                    <p class="fuente">Docente : <b class="h6">{{detalleCalificacion[0].docente}}</b> </p>
                     <p class="fuente">Materia : <b class="h6">{{detalleCalificacion[0].materia}}</b> </p>
                      <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0"  style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                          <thead>
                            <tr class="cabeza">
                              <th
                                style="background-color: rgb(234, 240, 246)"
                                class="
                                  text-uppercase text-secondary text-xxs
                                  font-weight-bolder
                                "
                              >
                                Quimestre
                              </th>
                              <th
                                class="
                                  text-uppercase text-secondary text-xxs
                                  font-weight-bolder
                                "
                              >
                                Aportes
                              </th>
                              <th
                                class="
                                  text-center
                                  text-uppercase
                                  text-secondary
                                  text-xxs
                                "
                              >
                                Examen
                              </th>

                              <th
                                class="
                                  text-center
                                  text-uppercase
                                  text-secondary
                                  text-xxs
                                "
                              >
                                Promedio quimestral
                              </th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in detalleCalificacion[0].notas"
                              :key="item.id"
                              
                            >
                              <td
                               
                              >
                                <div v-if="item.quimestre=='p1'">
                                   <span class="text-sm colorestabla fuente"> Primer Quimestre</span>
                                </div>
                               <div v-if="item.quimestre=='p2'">
                                   <span class="text-sm colorestabla fuente"> Segundo Quimestre</span>
                                </div>
                              </td>
                              <td
                                class="
                                 text-sm colorestabla fuente 
                                "
                              >
                                {{ item.arraysNote.split(',') }}
                               
                              </td>
                              <td
                                class="
                                 text-sm colorestabla fuente text-center
                                "
                              >
                                {{ item.examen }}
                              </td>
                              <td
                                class="
                                  text-sm colorestabla fuente text-center
                                "
                              >
                                {{ item.promedio }}
                              </td>
                            
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- <div v-else>
                        <div class="row mt-5">
                          <div class="col-lg-9 col-12 mx-auto">
                            <div class="text-center">
                              <img
                                class="w-30 mt-4"
                                src="../../../assets/img/jira/search-error.svg"
                                alt="fondo"
                              />
                              <div class="mt-3 letra fuente">
                                Hemos buscado en todas partes, pero no tenemos
                                <br />
                                nada que mostrarte. Pregunta a tus<br />
                                docentes.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> -->
                  </div>

                </div>
              </div>
            </div>
            <div  class=" modalFooter">
          <div class="text-end">
            <div v-if="isTabla === 'notasquimestre'">

               <a
              @click="cerrarModal"
              style="text-decoration: underline;"
              href="javascript:;"
              class="fuente tamanio"
            >
              <b>Regresar</b>
            </a>
              
            </div>
           
          </div>
        </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script src="./Nota.js"></script>

<style>
.freemeeting-tip {
  border-radius: 3px;
  background-color: rgba(254, 116, 37, 0.1);
  border: solid 1px #fe7425;
  padding: 15px;
  margin-top: -8px;
}
.letra {
  font-family: Avenir Next W02, Helvetica, Arial, sans-serif;

  font-size: 16px;
  color: #33475b;
  line-height: 24px;
}
.actic {
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-thickness: initial;
  text-decoration-style: initial;
  text-decoration-color: initial;
}
</style>
