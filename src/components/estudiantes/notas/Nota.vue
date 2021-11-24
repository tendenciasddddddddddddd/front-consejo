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
                  class="w-40"
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
          <div
            class="col-lg-11 col-12 mx-auto"
            style="
              background-color: #e5f5f8;
              padding: 7px;
              border-color: #7fd1de;
              border-style: solid;
              border-width: 1px;
              text-align: left;
            "
          >
            <div>
              <p class="text-sm text-dark parrafo" style="margin: 7px">
                Recuerde que usted puede visualizar sus notas una vez que ya
                termino por lo menos un quimestre...
              </p>
            </div>
          </div>
        </div>

        <div class="row mt-7">
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
        </div>

        

        <div class="fixed-plugin" :class="{ 'show w-100': tabla === 'notasv' }">
          <div
            class="card shadow-lg desplega"
            :class="{ 'w-100': tabla === 'notasv' }"
            style="overflow-y: auto; z-index: 9999"
          >
           <div
          class=""
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 40px 4px 40px;background-color: #253342;"
        >
          <div class="row">
            <div class="col-lg-10">
              <h5
                style="font-weight: 400"
                class="mt-3 ms-5 mb-0 fuente text-white "
              >
                Notas del actual periodo
              </h5>
            </div>
            <div class="col-lg-2">
              <div class="text-end mt-2">
                <a
                   @click="tabla = 'termina'"
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
                

                <div class="col-lg-8 col-12 mx-auto">
                  
                  <div v-if="isTabla === 'notasquimestre'">
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
                                class="
                                  text-uppercase text-secondary text-xxs
                                  font-weight-bolder
                                "
                              >
                                Docente
                              </th>
                              <th
                                class="
                                  text-center
                                  text-uppercase
                                  text-secondary
                                  text-xxs
                                "
                              >
                                Quimestre 1
                              </th>

                              <th
                                class="
                                  text-center
                                  text-uppercase
                                  text-secondary
                                  text-xxs
                                "
                              >
                                Quimestre 2
                              </th>
                               <th
                                class="
                                  text-center
                                  text-uppercase
                                  text-secondary
                                  text-xxs
                                "
                              >
                                Promedio
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in inAlumnos"
                              :key="item.id"
                              
                            >
                              <td
                                class="
                                  text-xs text-dark
                                  font-weight-normal
                                  fuente
                                "
                              >
                                {{ item.materia }}
                              </td>
                              <td
                                class="
                                  text-xs text-dark
                                  font-weight-normal
                                  fuente
                                "
                              >
                                {{ item.name }}
                              </td>
                              <td
                                class="
                                  align-middle
                                  text-dark text-center text-sm
                                  fuente
                                "
                              >
                                {{ item.par1 }}
                              </td>
                              <td
                                class="
                                  align-middle
                                  text-dark text-center text-sm
                                  fuente
                                "
                              >
                                {{ item.par2 }}
                              </td>
                              <td
                                class="
                                  align-middle
                                  text-dark text-center text-sm
                                  fuente
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
                      </div>
                  </div>

                </div>
              </div>
            </div>
            <div  class=" modalFooter">
          <div class="text-end">
            <div v-if="isTabla === 'notasquimestre'">
               <a
                class="btn btnNaranjaClaro"
                
                 @click="tabla = 'termina'"
              >
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <a  class="btn btnDisabled ms-3">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
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
