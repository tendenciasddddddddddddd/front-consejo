<template>
  <div
    class="fixed-plugin"
    :class="{ 'show w-100': panelAsistencias === 'open' }"
  >
    <div
      class="card shadow-lg blur desplega"
      :class="{ 'w-100': panelAsistencias === 'open' }"
      style="overflow-y: auto; z-index: 9999; "
    >
      <div
        class=""
        style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
      >
        <div class="d-flex justify-content-between">
          <div class="h5 text-white">
            ...
          </div>
          <div>
            <h5 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
              Registrar la asistencia
            </h5>
          </div>
          <div class="mt-2">
            <button
              @click="$router.go(-1)"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <i style="font-size: 35px;" class="fa fa-close text-white"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        class="card-body pt-sm-3 pt-0"
        style="overflow-y: auto;height: auto;"
      >
        <!-- Sidebar Backgrounds -->

        <div class="row">
          <Refresh v-if="isData"></Refresh>
          <div v-else class="col-lg-10 col-12 mx-auto">
            <div class="row mt-4" v-if="ispanel === 'open1'">
              <div class="fjrDCGRR_tab">
                 <a @click="number_tabss='1'" class="fuente inn_tab" href="javascript:;">Lista estudiantes
                   <span   :class="{ 'eeEHPkk': number_tabss == '1' }"></span>
                 </a>
                   <a @click="number_tabss='2'" class="fuente inn_tab" href="javascript:;">Lista de asistencia
                     <span   :class="{ 'eeEHPkk': number_tabss == '2' }"></span>
                   </a>
              </div>
             <section v-if="number_tabss=='1'">
                 <div class="mt-2">
                <div class=" mb-4">
                  <div class="card-body px-0 pt-0 pb-2">
                    <div v-if="!info.length">
                     
                      <div class="row mt-5">
                        <div class="col-lg-9 col-12 mx-auto">
                          <div class="text-center">
                            <img
                              class="w-15"
                              src="../../../assets/img/jira/search-error.svg"
                              alt="fondo"
                            />
                            <div class=" mt-3 letra fuente">
                              Hemos buscado en todas partes, pero no tenemos
                              <br />
                              nada que mostrarte...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else >
                      <section class="flex-containes ">
                        <div class="" v-for="item in inAlumnos" :key="item.id">
                          <div
                            class="cajas targetas1  text-center"
                            style="min-width: 180px!important;width: 180px!important;margin-right: 15px!important;min-height: 190px;"
                          >
                            <div class="form-check my-auto">
                  <input
                    class="form-check-input cheka"
                    type="checkbox"
                    style="float: right; right: 10px; top: 10px;"
                    @click="selectUser(item._id)"
                  />
                </div>
                            <div
                              class="avatar avatar-xl position-relative mt-1"
                              v-bind:style="{ 'background-color': item.colors }"
                              style="border-radius: 100%;"
                            >
                              <p
                                class="text-white h3"
                                style="font-weight: 600;"
                              >
                                {{ item.img }}
                              </p>
                            </div>

                            <p class="cardSubTitle fuente mt-3">
                              {{ item.name }}
                            </p>
                           
                          </div>
                        </div>
                      </section>
                    
                    </div>
                  </div>
                </div>
              </div>
             </section>
              <section v-if="number_tabss=='2'">
                 hola
             </section>
             
            </div>
          </div>
        </div>
      </div>
      <div class="modalFooter">
        <div class="text-end">
          <a class="btn btnNaranjaClaro" @click="$router.go(-1)">
            <i class="ni ni-bold-left"></i> &nbsp; Vulver
          </a>

          <button
            type="submit"
            id="addRowButton"
            class="btn btnNaranja ms-3"
            @click="$router.go(-1)"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./Asiste.js"></script>
