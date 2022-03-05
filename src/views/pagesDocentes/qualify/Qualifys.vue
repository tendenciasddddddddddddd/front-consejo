<template>
  <div>
    <div class="row">
       <vue-progress-bar  ></vue-progress-bar>
       <ProgressBar v-if="isData"></ProgressBar>
      <div v-else class="col-lg-11 col-12 mx-auto">
        <div class="row mt-1 ">
        <div class="col-md-4 d-flex">
          <a
          href="javascript:;"
            @click="$router.go(-1)"
            class="me-4"
          >
            <img
              height="23px"
              src="../../../assets/img/usados/regresar.png"
            />
          </a>
          <span
            class="col-11 text-truncate d-block"
            style="font-weight: 700;color:#181B32; font-size: 17px;margin-top: -3px;"
          >
            {{ mate }}
          </span>
        </div>
        <div class="col-md-8">
          <div class="d-flex justify-content-end">
             <div>
                <div class="d-flex justify-content-start">
             <div>
                <div class="input-group me-3">
                  <input style="background: white;width: 150px;"
                    type="text"
                    v-model="searchQuery"
                    class="form-control buscador"
                    placeholder="Buscar por nombre"
                  />
                  <span class="input-group-text text-body buscador" style="background: white;"
                    ><i class="fas fa-search colorhs" aria-hidden="true"></i
                  ></span>
                </div>
             </div>
                
                 <a
                 @click="editar()"
                  role="button"
                  class="fuente tamanio ms-3 me-2 isPaginateActive"
                  :class="{ disabled: userIds.length != 1 }"
                  v-tooltip.top-center="
                    userIds.length
                      ? ''
                      : 'Seleccionar una fila para poder registrar la nota'
                  "
                >
                 &nbsp; <i class="fa fa-plus " style="font-size: 17px;" :class="{ links: userIds.length === 1 }"></i>&nbsp;
                 
                </a>
                 
                <a
                  role="button"
                  class="fuente tamanio me-2 isPaginateActive"
                  :class="{ disabled: userIds.length === 0 }"
                  v-on="userIds.length ? { click: () => deleteNote() } : {}"
                   v-tooltip.top-center="
                    userIds.length
                      ? ''
                      : 'Seleccionar una fila o muchas para poder eliminar las notas'
                  "
                >
                &nbsp;  <i class="far fa-trash-alt" style="font-size: 17px;" :class="{ links: userIds.length != 0 }"></i>&nbsp;
                </a>
                <a
                  role="button"
                  class="fuente tamanio  isPaginateActive"
                 :class="{ disabled: userIds.length === 0 }"
                  v-on="userIds.length ? { click: () => confirmNote() } : {}"
                   v-tooltip.top-center="
                    userIds.length
                      ? ''
                      : 'Seleccionar una fila o muchas para poder confirmar los promedios'
                  "
                >
                  &nbsp; <i class="fas fa-pen" style="font-size: 17px;" :class="{ links: userIds.length != 0 }"></i>  &nbsp;
                </a>
                 
            </div>
             </div>
           
            <div class="ms-3" v-if="!$store.state.isAppMobile">
             <div class="dropdown">
                    <a
                      href="javascript:;"
                      class="btn btnNaranja dropdown-toggle "
                      data-bs-toggle="dropdown"
                      id="navbarDropdownMenuLink2" style="background-color: #4B22F4 !important;  box-shadow: 0 0 12px 0 rgb(0 0 0 / 50%);"
                    >
                      Subir archivo
                    </a>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink2"
                      style="border: 1px solid rgb(203, 214, 226);border-radius: 3px;"
                    >
                      <li>
                        <a @click="openNotesMost('p1')" class="dropdown-item fuente" style="color: #33475b;" href="javascript:;">
                          Primer Quimestre
                        </a>
                      </li>
                      <li>
                        <a @click="openNotesMost('p2')" class="dropdown-item fuente" style="color: #33475b;" href="javascript:;">
                          Segundo Quimestre
                        </a>
                      </li>
                    </ul>
                  </div>

            </div>
          </div>
        </div>
      </div>
        <!-- <div
          class="notificacionHeader"
          
        >
          <a
            @click="$router.go(-1)"
            class="badge"
            href="javascript:;"
            style="box-shadow: none"
          >
            <img height="21px" src="../../../assets/img/usados/regresar.png" />
          </a>
          <span class="ms-3 h6" style="font-weight: 700;color: black;">
            Despues de registrar los dos semestres confirme la notas.
          </span>
        </div> -->

       
        
        <div  class="mt-4">
         

          <div class=" px-0 pt-0 pb-2">
            <div v-if="!isVerific.length">
              <div class="row mt-6">
                <div class="col-lg-9 col-12 mx-auto">
                  <div class="text-center">
                    <img
                      class="w-20"
                      src="../../../assets/img/logs/lupa.svg"
                      alt="fondo"
                    />
                    <div class="letra fuente mt-4">
                      Aún no existen estudiantes aquí, consultar a secretaria
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="table-responsive p-0 mt-4">
              <Spinner v-if="!displayedArticles.length"></Spinner>
              <table
                v-else
                class="table align-items-center mb-0"
                style="  border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;"
              >
                <thead>
                  <tr class="cabeza">
                    <th style="background-color: rgb(234, 240, 246); " class="">
                      <div class="d-flex ">
                        <div
                          v-if="!allSelected"
                          class="form-check my-auto"
                          style="min-height: 0rem;"
                        >
                          <input
                            class="form-check-input cheka"
                            type="checkbox"
                            @click="selectAll"
                          />
                        </div>
                        <i
                          @click="deletedSelected"
                          v-else
                          style="border: 2px solid; color: rgb(0, 164, 189); height: 19px; width: 19px; border-radius: 3px; cursor: pointer;"
                          class="fa fa-minus"
                          aria-hidden="true"
                        ></i>
                        <span
                          class="ms-3 text-uppercase text-center text-xxs font-weight-bolder"
                        >
                          Nombres
                        </span>
                      </div>
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Quim 1
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Quim 2
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs "
                    >
                      Promedio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in displayedArticles"
                    :key="item.id"
                    :vars="(aux = 0)"
                  >
                    <td>
                      <div class="d-flex ms-3">
                        <div class="form-check my-auto supcheka">
                          <input
                            class="form-check-input cheka"
                            type="checkbox"
                            v-model="userIds"
                            :value="item.id"
                            @click="selectOne(item.id)"
                          />
                        </div>

                        <a class="mb-0 ms-3 text-sm colorestabla fuente">
                          {{ item.name }}
                        </a>
                      </div>
                    </td>
                    <td class="align-middle text-center fuente">
                      <span v-if="item.par1 != 0" class="text-negro text-sm" >
                        <b>{{ item.par1 }}</b>
                      </span>
                      <span v-else class="text-sm"> {{ item.par1 }} </span>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <span v-if="item.par2 != 0" class="text-negro text-sm">
                        <b>{{ item.par2 }}</b>
                      </span>
                      <span v-else class="text-sm"> {{ item.par2 }} </span>
                    </td>
                    <td class="align-middle text-center text-sm fuente">
                      <div
                          v-if="
                            item.par1 != 0 && item.par2 != 0 && item.promed == 0
                          "
                        >
                          <a
                            v-if="aux < 2"
                          
                            class="fuente tamanio text-azul"
                            >
                            <span
                                class="UIStatusDot-sc-1axnt8y-0 cqKvgt"
                              ></span>
                               Sin confirmar
                          </a>
                        </div>

                        <a v-else class="text-azul" href=""> <b>{{ item.promed }}</b> </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <ul
                class="pagination pagination-dark justify-content-center mt-4"
              >
                <li class="page-item">
                  <a
                    class="fuente tamanio links paginates me-3"
                    :class="{ inactivo: page == 1 }"
                    @click="page--"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      class=""
                      data-icon="left"
                      width="1.2em"
                      height="1.2em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                      ></path>
                    </svg>
                    <b class="ms-2">Anterior</b>
                  </a>
                </li>

                <li class="page-item active">
                  <a class="paginaA">
                    <b> {{ page }}</b></a
                  >
                </li>

                <li class="page-item">
                  <a
                    :class="{ inactivo: page == numPages }"
                    class="fuente tamanio links paginates ms-3"
                    @click="page++"
                  >
                    <b class="me-2">Siguiente</b>
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      class=""
                      data-icon="right"
                      width="1.2em"
                      height="1.2em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
                      ></path>
                    </svg>
                  </a>
                </li>

                <li>
                  <strong class="fuente text-sm ms-3">
                    Total páginas: {{ numPages }}
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab === 'inicios'" class=" altural"></div>

    <div class="fixed-plugin " :class="{ 'show repon ': tab === 'inicios' }">
      <div
        class="card shadow-lg  desplega"
        :class="{ repon: tab === 'inicios' }"
        style="overflow-y: auto; z-index: 9999;"
      >
        <div
          class="cabesa"
          style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;"
        >
          <div class="float-start">
            <h5 style="font-weight: 400;" class="mt-2 mb-0 text-white fuente">
              {{ isAlumno }} 😊
            </h5>
          </div>
          <div class="float-end mt-2">
            <button
              @click="tab = 'init'"
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
          <!-- End Toggle Button -->
        </div>

        <div
          class="card-body pt-sm-3 pt-0"
          style="overflow-y: auto;height: auto;"
        >
          <!-- Sidebar Backgrounds -->
          <div class="row">
            <div class="col-12 col-lg-12 mx-auto my-5">
              <div class="multisteps-form__progress">
                <button
                  :class="{
                    'js-active ':
                      isVisible === 'pane1' ||
                      isVisible === 'pane2' ||
                      isVisible === 'pane3' ||
                      isVisible === 'pane4',
                  }"
                  class="multisteps-form__progress-btn "
                  type="button"
                  title="User Info"
                >
                  <a class="parrafo text-dark">Parcial 1</a>
                </button>
                <button
                  :class="{
                    'js-active ':
                      isVisible === 'pane2' ||
                      isVisible === 'pane3' ||
                      isVisible === 'pane4',
                  }"
                  class="multisteps-form__progress-btn "
                  type="button"
                  title="Address"
                >
                  <a class="parrafo text-dark">Parcial 2</a>
                </button>
                <button
                  :class="{
                    'js-active': isVisible === 'pane3' || isVisible === 'pane4',
                  }"
                  class="multisteps-form__progress-btn "
                  type="button"
                  title="Address"
                >
                  <a class="parrafo text-dark">Parcial 3</a>
                </button>
                <button
                  :class="{ 'js-active': isVisible === 'pane4' }"
                  class="multisteps-form__progress-btn "
                  type="button"
                  title="Address"
                >
                  <a class="parrafo text-dark">Examen</a>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-9 col-12 mx-auto">
              <form @submit.prevent="save" id="notas">
                <div class="row " v-if="isVisible === 'pane1'">
                  <span class="parrafo ">Primer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap11'),
                      }"
                      v-model="notasx.ap11"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap11") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Segundo aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap12'),
                      }"
                      v-model="notasx.ap12"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap12") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Tercer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap13'),
                      }"
                      v-model="notasx.ap13"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap13") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Cuarto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap14'),
                      }"
                      v-model="notasx.ap14"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap14") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Quinto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap15'),
                      }"
                      v-model="notasx.ap15"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap15") }}
                    </p>
                  </div>
                </div>
                <div class="row " v-if="isVisible === 'pane2'">
                  <span class="parrafo ">Primer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap21'),
                      }"
                      v-model="notasx.ap21"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap21") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Segundo aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap22'),
                      }"
                      v-model="notasx.ap22"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap22") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Tercer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap23'),
                      }"
                      v-model="notasx.ap23"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap23") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Cuarto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap24'),
                      }"
                      v-model="notasx.ap24"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap24") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Quinto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap25'),
                      }"
                      v-model="notasx.ap25"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap25") }}
                    </p>
                  </div>
                </div>
                <div class="row " v-if="isVisible === 'pane3'">
                  <span class="parrafo ">Primer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap31'),
                      }"
                      v-model="notasx.ap31"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap31") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Segundo aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap32'),
                      }"
                      v-model="notasx.ap32"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap32") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Tercer aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap33'),
                      }"
                      v-model="notasx.ap33"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap33") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Cuarto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap34'),
                      }"
                      v-model="notasx.ap34"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap34") }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">Quinto aporte</span>
                  <div class="col-12 ">
                    <input
                      :class="{
                        error: validation.hasError('notasx.ap35'),
                      }"
                      v-model="notasx.ap35"
                      class="form-control buscador"
                      type="text"
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{ validation.firstError("notasx.ap35") }}
                    </p>
                  </div>
                </div>
                <div class="row " v-if="isVisible === 'pane4'">
                  <span class="parrafo mt-2">Nota examen</span>
                  <div class="col-12">
                    <input
                      :class="{
                        error: validation.hasError(
                          'model.calificaciones.notas.examen'
                        ),
                      }"
                      v-model="model.calificaciones.notas.examen"
                      class="form-control buscador"
                      type="text"
                      required
                    />
                    <p class="mb-0 text-xs text-danger">
                      {{
                        validation.firstError(
                          "model.calificaciones.notas.examen"
                        )
                      }}
                    </p>
                  </div>
                  <span class="parrafo mt-3">A que Quimestre Pertenece?</span>
                  <div class="col-12 ">
                    <select
                      :class="{
                        error: validation.hasError(
                          'model.notas.calificaciones.quimestre'
                        ),
                      }"
                      v-model="model.calificaciones.notas.quimestre"
                      class="form-control buscador"
                      required
                    >
                      <option value="p1">Primer Quimestre</option>
                      <option value="p2">Segundo Quimestre</option>
                    </select>
                    <p class="mb-0 text-sm text-danger">
                      {{
                        validation.firstError(
                          "model.calificaciones.notas.quimestre"
                        )
                      }}
                    </p>
                  </div>

                  <div v-if="isDoble" class="mt-4">
                    <div class="freemeeting-tip">
                      <p class="text-sm text-dark fuente">
                        Creo que perdiste el rumbo, revisa nuevamente las notas
                        ya que dichas notas no las puedo procesar tal vez te
                        falto un campo o ingresaste mal una nota con decimal.
                        😉😉
                      </p>
                    </div>
                  </div>
                  <div v-if="isDuplicado" class="mt-4">
                    <div class="freemeeting-tip">
                      <p class="text-sm text-dark fuente">
                        Tal parece que este estudiante ya tiene registrado una
                        nota en este quimestre, intenta con otro. 😉😉
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="cord-footer modalFooter">
          <div class="text-end">
            <div v-if="isVisible === 'pane1'">
              <a class="btn btnNaranja " @click="isVisible = 'pane2'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible === 'pane2'">
              <a class="btn btnNaranjaClaro" @click="isVisible = 'pane1'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              &nbsp; &nbsp;
              <a class="btn btnNaranja " @click="isVisible = 'pane3'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible === 'pane3'">
              <a class="btn btnNaranjaClaro" @click="isVisible = 'pane2'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              &nbsp; &nbsp;
              <a class="btn btnNaranja " @click="isVisible = 'pane4'">
                Siguiente &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
            <div v-if="isVisible === 'pane4'">
              <a class="btn btnNaranjaClaro" @click="isVisible = 'pane3'">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              &nbsp; &nbsp;
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
                Trabajando...
              </button>

              <button
                v-else
                type="submit"
                id="addRowButton"
                class="btn btnNaranja"
                form="notas"
              >
                Guardar
              </button>
            </div>
            <div v-if="isVisible === 'pane5'">
              <a class="btn btnNaranja " @click="tab = 'salir'">
                Salir de Aqui &nbsp; <i class="ni ni-bold-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="ifNotasMost">
    <NotesMost :id="idParam" @myEventNotes="closedNotesMost" @saveEvent="updateNotasAll"></NotesMost>
    </div>
  </div>
</template>

<script src="./Qualifys.js" />
