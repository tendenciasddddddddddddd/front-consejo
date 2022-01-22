<template>
  <div class="fixed-plugin" :class="{ 'show w-100': modalState === true }">
    <a
      @click="tab = 'init1'"
      class="fixed-plugin-button text-dark position-fixed px-3 py-2"
      style="background-color: rgb(14, 114, 237);"
    >
      <i class="fa fa-cog py-2 text-white"> </i>
    </a>
    <div
      class="card shadow-lg desplega"
      :class="{ 'w-100': modalState === true }"
      style="overflow-y: auto; z-index: 9999;"
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
            <h6 style="font-weight: 400;" class="mt-2 mb-0 fuente text-white">
              Importar archivos
            </h6>
          </div>
          <div class="mt-2">
            <button
               @click="$emit('myEventNotes')"
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#ffffff">
                    <path
                      d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        class="card-body pt-sm-3 pt-0"
        style="overflow-y: auto;height: auto;"
      >
        <div class="multisteps-form__progress">
          <button
            :class="{ 'js-active ': modalFace1 === '1' || modalFace1 === '2' || modalFace1 === '3'}"
            class="multisteps-form__progress-btn "
            type="button"
            title="User Info"
          >
            <a class="parrafo text-dark">Cargar</a>
          </button>
          <button
            :class="{ 'js-active ': modalFace1 === '2' || modalFace1 === '3'}"
            class="multisteps-form__progress-btn "
            type="button"
            title="Address"
          >
            <a class="parrafo text-dark">Previsualización</a>
          </button>
          <button
            :class="{ 'js-active': modalFace1 === '3' }"
            class="multisteps-form__progress-btn "
            type="button"
            title="Address"
          >
            <a class="parrafo text-dark">Resultado</a>
          </button>
        </div>
        <Spinner v-if="isData"></Spinner>
        <div v-else class="row">
          <div v-if="modalFace1 == '1'" class="col-lg-10 col-12 mx-auto">
            <div class="d-flex justify-content-center mt-3">
              <section style="    max-width: 600px;">
                <div class="text-center">
                  <p class="fuente h4 mt-2" style="font-weight: 400;">
                    Carga tus archivos
                  </p>
                  <p v-if="!isExcel" class="parrafo">
                    Antes de cargar los archivos a continuación, asegúrate de
                    descargar el archivo con la
                    <b @click="toDownload" class="links"
                      >lista de estudiantes</b
                    >
                    <i
                      class="fa fa-file-excel-o ms-2 iconos"
                      aria-hidden="true"
                    ></i>
                  </p>
                  <div v-else class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p class="parrafo">
                    Aprende cómo procesar un archivo con
                    <b class="links">notas</b>.
                  </p>
                </div>
                <div class="text-start mt-2">
                  <p > <span class="h5">Seleccionar un archivo</span> <span class="fuente text-sm ms-3 text-danger">{{isError}}</span> </p>
                  <vue-dropzone
                    class="mt-4"
                    style="height:200px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
                    ref="dropzone"
                    @vdropzone-success="afterComplete"
                    id="drop1"
                    :options="dropOptions"
                  >
                  </vue-dropzone>
                  <br />
                  <a @click="removeAllFiles" class="tamanio ">
                    <b class="links">Cambiar el archivo</b>
                    <i class="far fa-trash-alt me-2 iconos"></i
                  ></a>

                  <div class="d-flex mt-3">
                    <div class="form-check my-auto" style="min-height: 0rem;">
                      <input
                        class="form-check-input cheka"
                        type="checkbox"
                        checked
                      />
                    </div>

                    <span class="parrafo ">
                      Estas notas serán registradas al
                      <b v-if="quimestre == 'p1'">Primer quimestre</b>
                      <b v-if="quimestre == 'p2'">Segundo quimestre</b>
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div v-if="modalFace1 == '2'" class="col-lg-10 col-12 mx-auto">
            <div class="d-flex justify-content-between mt-4">
              <div>
                <button
                  href="javascript:;"
                  @click="_regresar"
                  class="btn btn-sm"
                  style="box-shadow: none"
                >
                  <img
                    height="20px"
                    src="../../../../assets/img/usados/regresar.png"
                  />
                </button>
              </div>
              <div>
                <span class="fuente h5 mt-2" style="font-weight: 400;"
                  >Previsualización de las notas</span
                >
              </div>
              <div>
                ..
              </div>
            </div>
            <div class="alertdanger mt-3">
              <div class="d-flex">
                <div class="form-check ">
                  <input
                    class="form-check-input cheka"
                    v-model="checked"
                    type="checkbox"
                    id="checkbox"
                    value="1"
                    @click="checked=true"
                  />
                </div>
                <a class="text-sm text-dark fuente mt-1">
                  Marca la casilla si estas de acuerdo en registrar las notas de
                  forma masiva, si ya existia notas estas las van a reeplasar.
                </a>
              </div>
            </div>
            <table
              class="table align-items-center mb-0 mt-3"
              style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
            >
              <thead>
                <tr class="cabeza">
                  <th
                    style="background-color: rgb(234, 240, 246); "
                    class="text-center text-uppercase text-secondary text-xxs"
                  >
                    Nombres
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs "
                  >
                    Aportes / 80 %
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs "
                  >
                    Examen / 20 %
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs "
                  >
                    Promedio
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in metadata" :key="item.id" :vars="(aux = 0)">
                  <td class="text-sm colorestabla colorestabla fuente">
                    {{ item.nombre }}
                  </td>
                  <td class="align-middle text-center fuente text-sm">
                    {{ item.arraysNote }}
                  </td>
                  <td class="align-middle text-center text-sm">
                    {{ item.examen }}
                  </td>
                  <td class="align-middle text-center text-sm fuente">
                    {{ item.promedio }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
           <div v-if="modalFace1 == '3'" class="col-lg-10 col-12 mx-auto">
            <div class="d-flex justify-content-center mt-4">
              
              <div>
               
                <div class="text-center">
                   <p class="fuente h5 mt-2" style="font-weight: 400;"
                  >Notas registradas exitosamente</p
                >
                    <img
                      class="w-50 mt-4"
                      src="../../../../assets/img/shapes/success-green.svg"
                      alt="fondo"
                    /><br>
                   <a  @click="$emit('myEventNotes')" class="btn btnNaranja mt-3">Salir de aqui</a>
                </div>
               
              </div>
             
            </div>
            
          </div>
        </div>
      </div>
      <div class="modalFooter">
        <div class="text-end" v-if="modalFace1 == '1'">
          <a
            @click="$emit('myEventNotes')"
            style="text-decoration: underline;"
            href="javascript:;"
            class="fuente tamanio"
          >
            <b>Cancelar</b>
          </a>
          <a v-if="!ifDocListo" class="btn btnDisabled ms-3">
            Procesar
          </a>
          <template v-else>
            <a v-if="!isProcesDoc" class="btn btnNaranja ms-3" disabled>
              Trabajando
            </a>
            <a
              v-else
              class="btn btnNaranja ms-3"
              @click="ProcessingInstructions"
            >
              Procesar
            </a>
          </template>
        </div>
        <div class="text-end" v-if="modalFace1 == '2'">
          <a
            @click="modalFace1 = '1'"
            style="text-decoration: underline;"
            href="javascript:;"
            class="fuente tamanio"
          >
            <b>Regresar</b>
          </a>
          <a  v-if="!checked" class="btn btnDisabled ms-3">
            Guardar
          </a>
          <template v-else>
            <a v-if="ifsaved" class="btn btnNaranja ms-3">
            Trabajando...
          </a>
          <a v-else @click="save" class="btn btnNaranja ms-3">
            Procesar
          </a>
          </template>
         
        </div>
        <div class="text-end" v-if="modalFace1 == '3'">
          <a
            @click="$emit('myEventNotes')"
            style="text-decoration: underline;"
            href="javascript:;"
            class="fuente tamanio"
          >
            <b>Salir de aqui</b>
          </a>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./NotesMost.js" />