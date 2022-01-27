<template>
    <div class="row mb-5">
      <div class="col-lg-11 col-12 mx-auto">
        <div class="text-start">
          <span style="font-weight: 700;color:#181B32; font-size: 21px;"
            >Funciones de modalidad extraordinaria</span
          >
          <p class="parrafo mt-2" style="margin:7px; color: #33475b; ">
            Primero registre las matriculas, luego puede divir el curso en los
            paralelos...
          </p>
        </div>
        <hr class="horizontal dark mb-1 d-xl-block d-none">


        <div class="row">
          <section class="flex-containes2 mt-5">
            <div class="">
              <a href="javascript:;" @click="openChildMatricula">
                <div
                  class="cajas foco2 borde1 text-center fadeIn1 fadeInBottom animation-1"
                  style="max-width: 200px;margin-right: 13px!important;"
                >
                  <img
                    class="w-40"
                    src="../../../assets/img/shapes/contacts.svg"
                    alt="fondo"
                  />
                  <p class="cardTitle fuente " style="font-size: 20px;">
                    <img
                      class="w-10 me-2"
                      src="../../../assets/img/icons/CMS-Hub.svg"
                      alt="fondo"
                    />Matricula
                  </p>
                  <hr />
                  <div class="text-start" style="padding-bottom:5px;">
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Nueva matricula
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Periodo activo
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Estudiantes en lsita
                      <br />
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div class="">
              <a @click="openChildRemoveMa2" href="javascript:;">
                <div
                  class="cajas foco2 borde2 text-center fadeIn1 fadeInBottom animation-2"
                  style="max-width: 200px;margin-right: 13px!important;"
                >
                  <img
                    class="w-45 mt-1"
                    src="../../../assets/img/usados/ticket.svg"
                    alt="fondo"
                  />
                  <p class="cardTitle fuente " style="font-size: 20px;">
                    <img
                      class="w-10 me-2"
                      src="../../../assets/img/icons/CMS-Hub.svg"
                      alt="fondo"
                    />Lista Matricula
                  </p>
                  <hr />
                  <div class="text-start" style="padding-bottom:5px;">
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Matricula listas
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Remover matricula
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Detalle matricula
                      <br />
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div class="">
              <div
                class="cajas foco2 borde3 text-center fadeIn1 fadeInBottom animation-3"
                style="max-width: 200px;"
              >
                <a href="javascript:;" @click="openChildParalelo2">
                  <img
                    class="w-35"
                    src="../../../assets/img/usados/multiple-objects.svg"
                    alt="fondo"
                  />
                  <p class="cardTitle fuente mt-2" style="font-size: 20px;">
                    <img
                      class="w-10 me-2"
                      src="../../../assets/img/icons/CMS-Hub.svg"
                      alt="fondo"
                    />
                    Paralelos
                  </p>
                  <hr />
                  <div class="text-start" style="padding-bottom:5px;">
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Asignar Paralelos
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Remover paralelos
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Mostrar lista
                      <br />
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div
                class="cajas foco2 borde4 text-center fadeIn1 fadeInBottom animation-4"
                style="max-width: 200px; "
              >
                <router-link :to="`/507`">
                  <img
                    class="w-35"
                    src="../../../assets/img/logs/documents.svg"
                    alt="fondo"
                  />

                  <p class="cardTitle fuente mt-2" style="font-size: 20px;">
                    <img
                      class="w-10 me-2"
                      src="../../../assets/img/icons/CMS-Hub.svg"
                      alt="fondo"
                    />
                    Respaldo
                  </p>

                  <hr />
                  <div class="text-start" style="padding-bottom:5px;">
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Generar copias
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Data set
                    </span>
                    <br />
                    <span class="parrafo cardSubTitle">
                      <img
                        class="w-8 me-2"
                        src="../../../assets/img/icons/Orange_Checkmark.svg"
                        alt="fondo"
                      />
                      Otros detalles
                      <br />
                    </span>
                  </div>
                </router-link>
              </div>
            </div>

            <p class="parrafo mt-3 fadeIn1 fadeInBottom animation-5">
              Ver lección en video:
              <a
                type="button"
                class="fuente tamanio ms-3"
                v-tooltip.bottom="
                  'Mirar la demostración de el proceso de matriculas y generar los paralelos'
                "
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
                <b class="links ms-2">Ver demostración</b>
              </a>
              (Cómo entender el servicio de asistencia)
            </p>
            <!-- <button v-tooltip.top-center="'msg'">Hover me</button> -->
          </section>
            <div v-if="ifCreateUpdate">
             <CreateMatricula2  @myEventClosedModalMatricula2="closedChildMatricula" ></CreateMatricula2>
         </div>
          <div v-if="ifRemoveMatricula">
             <ListRemoveMatricula2  @myEventClosedModalRemoveM2="closedChildRemoveMa2" ></ListRemoveMatricula2>
         </div>
         <div v-if="ifParalelo2">
             <ParaleloMatricula2  @myEventClosedModalParalelo2="closedChildParalelo2" ></ParaleloMatricula2>
         </div>
        </div>
      </div>
    </div>
</template>

<script src="./Matriculas2.js"></script>
