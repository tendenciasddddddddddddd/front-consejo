<template>
  <div>
    <!--  @input="checkExist($event)" -->

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
            <h5 style="font-weight: 400;" class="mt-3 mb-0 fuente">
              Todos los cursos de activos
            </h5>
          </div>
          <div class="float-end mt-4">
            <router-link
              to="/opciones-reportes"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button "
            >
              <i style="font-size: 35px;" class="fa fa-close"></i>
            </router-link>
          </div>
          <!-- End Toggle Button -->
        </div>

        <div class="card-body pt-sm-3 pt-0">
          <div class="row">
            <div class="col-lg-3">
              <div
                class="mt-4"
                @click="isVisible = 'pa1'"
                :class="{ activado: isVisible === 'pa1' }"
                style="border-color: #00a4bd; box-shadow: 0 0 0 1px #00a4bd;     padding: 20px;  border-radius: 3px;"
              >
                <div class="row">
                  <div class="col-lg-6">
                    <p class="h5 fuente">Intensivo</p>
                  </div>
                  <div class="col-lg-6 text-center">
                    <img
                      class="img  move-on-hover w-60"
                      src="../../../../assets/img/shapes/contacts.svg"
                    />
                  </div>
                </div>
              </div>
              <div
                class="mt-4"
                @click="_cambiar()"
                :class="{ activado: isVisible === 'pa2' }"
                style="border-color: #00a4bd;box-shadow: 0 0 0 1px #00a4bd;     padding: 20px;  border-radius: 3px;"
              >
                <div class="row">
                  <div class="col-lg-6">
                    <p class="h5 fuente">Extraordinario</p>
                  </div>
                  <div class="col-lg-6 text-center">
                    <img
                      class="img  move-on-hover w-60"
                      src="../../../../assets/img/shapes/contacts.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8 col-12 mx-auto">
              <div class="row " v-if="isVisible === 'pa1'">
                <!--  style="background-color:rgb(245, 248, 250);" -->
                <Spinner v-if="isLoading1"></Spinner>
                <div
                  v-else
                  v-for="item in listniveles"
                  :key="item.id"
                  class="col-sm-3"
                >
                  <br />

                  <div
                    class=" border-radius-md p-3 mole w-90"
                    style="  border: 1px solid #7fd1de; "
                  >
                    <div class="">
                      <div class="text-center position-relative">
                        <a
                          @click="__verLista(item._id, 'm1')"
                          href="javascript:;"
                        >
                          <div class="blur-shadow-image">
                            <img
                              height="100px"
                              class="img  move-on-hover"
                              src="../../../../assets/img/logs/knowledge-base.svg"
                            />
                          </div>
                        </a>
                      </div>
                      <div>
                        <p
                          class="text-xs text-center mt-4 fuente"
                          style="text-transform: none;"
                        >
                          {{ item.nombres }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row " v-if="isVisible === 'pa2'">
                <!--  style="background-color:rgb(245, 248, 250);" -->
                <Spinner v-if="isLoading1"></Spinner>
                <div
                  v-else
                  v-for="item in listniveles2"
                  :key="item.id"
                  class="col-sm-3"
                >
                  <br />

                  <div
                    class=" border-radius-md p-3 mole w-90"
                    style="  border: 1px solid #7fd1de; "
                  >
                    <div class="">
                      <div class="text-center position-relative">
                        <a @click="__verLista(item._id, 'm2')" href="javascript:;">
                          <div class="blur-shadow-image">
                            <img
                              height="100px"
                              class="img  move-on-hover"
                              src="../../../../assets/img/logs/knowledge-base.svg"
                            />
                          </div>
                        </a>
                      </div>
                      <div>
                        <p
                          class="text-xs text-center mt-4 fuente"
                          style="text-transform: none;"
                        >
                          {{ item.nombres }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" v-if="isVisible === 'pa3'">
                <div class="mt-4">
                  <a
                    @click="isVisible = 'pa1'"
                    type="button"
                    class="btn w-20"
                    style="background-color: #ff7a59;
                      border-color: #ff7a59; color: #fff; font-weight: 500; border-radius: 3px;border-style: solid;border-width: 1px;"
                  >
                    Regresar
                  </a>
                </div>
                <Spinner v-if="isTabla"></Spinner>
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
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          # Nombres
                        </th>
                        <th
                          class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          Accion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in infoMat" :key="item.id">
                        <td class="text-sm text-center font-weight-normal">
                          <h6 class="mb-0 text-dark text-sm fuente">
                            {{ item.fkestudiante.fullname }}
                           
                          </h6>
                        </td>
                        <td class="text-sm text-center font-weight-normal">
                            <a @click="get(item._id)" class="px-3 text-dark mb-0">
                    <i class="fas fa-file-pdf text-lg me-1" aria-hidden="true"></i>
                  </a>
                          <!-- <a
                            class="text-primary link text-gradient px-3 mb-0 "
                            style="cursor: pointer;"
                            @click="remove(item._id)"
                            title="Eliminar"
                          >
                            <i class="far fa-trash-alt me-2" aria-hidden="true">
                            </i>
                          </a> -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->
                </div>
              </div>
              <div class="row" v-if="isVisible === 'pa4'" >
                <div class="mt-4">
                  <a
                    @click="isVisible = 'pa3'"
                    type="button"
                    class="btn w-20"
                    style="background-color: #fff;
                      border-color: #ff7a59; color: #ff7a53; font-weight: 500; border-radius: 3px;
    border-style: solid;
    border-width: 1px;"
                  >
                    Regresar
                  </a>&nbsp; &nbsp;
                  <button @click="test()" class="btn btnNaranja w-20"> Descargar</button>
                </div >
                    <Spinner v-if="isdescarga"></Spinner>
                   <div v-else id="root" class="my-sm-5" >
              <div  class="card-header text-center ">
                <div class="row justify-content-between">
                  <div class="col-md-2 text-start">
                    <img class="mb-2 w-80 " src="../../../../assets/img/escudo.png" alt="Logo">
                    
                  </div>
                  <div class="col-md-8">
                    <p class="h6 fuente">Subsistema de Educación Fiscomisional del Ecuador</p>
                    <p style="margin-top:-10px" class="h6 text-center fuente">"Mons. Leonidas Proaño"</p>
                   
                     <p style="margin-top:20px" class="h6 text-center fuente">UNIDAD EDUCATIVA FISCOMISIONAL DEL CARCHI PCEI</p>
                  </div>
                  <div class="col-lg-2  text-md-end ">
                    <img class="mb-2 w-100 h-80" src="../../../../assets/img/aaaa.png" alt="Logo">
                  </div>
                </div>
                <br>
                <div class="row justify-content">
                    <br>
                    <br>
                  <div class="col-12">
                     <p class="h6 fuente"><b>UNIDAD EDUCATIVA FISCOMISIONAL</b></p>
                     <p style="margin-top:-10px" class="h6 fuente"><b>"MONSEÑOR LEONIDAS PROAÑO" PCEI</b></p>
                     <p style="margin-top:-10px" class="h6 pb-0 fuente"><b>Tulcán - Ecuador</b></p>
                    <br>
                    <br>
                    <p class="text-xs fuente"><b>COPIA DE:</b></p>
                    <p class="h4 fuente"><b>MATRICULA</b></p>
                    <p style="margin-top:-10px" class="h6 pb-0 fuente"><b>AÑO ELECTIVO: &nbsp;&nbsp;{{info.academico.nombre}}</b></p>
                    <br>
                    <p  class="h6 pb-0 fuente"><b>CERTIFICO: &nbsp;&nbsp;{{info.fkestudiante.apellidos}} {{info.fkestudiante.nombres}}</b></p>
                    <br>  
                    <p  class="h6 text-dark text-start">&nbsp;&nbsp;&nbsp;&nbsp; Previo los requisitos legales se matriculó en {{info.fknivel.nombres}}</p>
                   <p style="margin-top:-10px" class="h6 text-start">&nbsp;&nbsp;&nbsp;&nbsp; SUPERIOR con Matricula No. {{info.nmatricula}} y Folio No. {{info.folio}} DEL {{info.fecha}}</p>
                    <p style="margin-top:-10px"  class="h6 text-start">&nbsp;&nbsp;&nbsp;&nbsp; Así consta en el libro respectivo del Departamento de Secretaría </p>
                   <br>
                 <br>
                 <br>
                 <br>
                 <p  class="h6 pb-0"><b>__________________________________</b></p>
                  <p  class="h6 pb-0"><b>Msc. Marino Arellano</b></p>
                  <p  class="h6 pb-0"><b>RECTOR-UNEF.C</b></p>
                  <br>
                 <br>
                 <p  class="text-start"><b>Tulcán, {{fechasActual}} </b></p>
                  </div>
                 
                </div>
              </div>
             
            
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Report.js"></script>
<style>
.activado {
  background-color: #e5f5f8;
}
</style>
