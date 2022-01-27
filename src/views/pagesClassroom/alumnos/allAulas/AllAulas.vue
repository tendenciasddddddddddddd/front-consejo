<template>
  <div>
    <div class="cLLkJw ">
      <div class="ifjUET">
         <vue-progress-bar  style="margin-top:-13px"></vue-progress-bar>
        <ProgressBar v-if="isData"></ProgressBar>
        <div v-else>
          <!-- <span class="fuente h5 " style="font-weight: 400;"
          >Gestión de aulas virtuales</span
        > -->
          <div class="row mt-2">
            <div class="col-md-5">
              <span
                class=""
                style="font-weight: 700;color:#181B32; font-size: 21px;"
                >Cusos de aulas virtuales</span
              >
            </div>
            <div class="col-md-7">
              <div class="d-flex justify-content-center">
                <div>
                  <div class="input-group ">
                    <input
                      style="background: white;"
                      type="text"
                      v-model="searchQuery"
                      class="form-control buscador"
                      placeholder="Buscar por materia"
                    />
                    <span
                      class="input-group-text text-body buscador"
                      style="background: white;"
                      ><i class="fas fa-search colorhs" aria-hidden="true"></i
                    ></span>
                  </div>
                </div>

                <div class="mt-2">
                  <span class="ms-4" style="color:#181B32; font-size: 18px;"
                    ><b style="font-weight: 700;">0{{ page }}</b
                    >/ 0{{ numPages }}</span
                  >
                </div>
                <div>
                  <ul
                    class="pagination pagination-dark justify-content-center mt-2"
                  >
                    <li class="page-item">
                      <a
                        class="fuente tamanio links paginates ms-3 me-2  isPaginateh isPaginateActive"
                        :class="{ 'inactivo isNoActive': page == 1 }"
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
                      </a>
                    </li>

                    <li class="page-item">
                      <a
                        :class="{
                          'inactivo isNoActive':
                            page == numPages || numPages == 0,
                        }"
                        class="fuente tamanio links paginates isPaginateh isPaginateActive"
                        @click="page++"
                      >
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
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div v-if="displayedArticles.length" class="mt-2">
            <section class="flex-containes2 mt-3">
              <div
                v-for="(item, index) in displayedArticles"
                :key="item.id"
              >
              <div  class="carde fadeIn1 fadeInBottom "
                :class="[`animation-${index}`]">
                    <div class="card-header1">
                  <span
                    style="height: 130px;"
                    class="mask bg-gradient-dark"
                  ></span>
                  <div class="mosText text-center text-white">
                    <a class="mt-5" @click="dialog(item)" href="javascript:;"
                      ><b style="color:white;" class="fuente"
                        ><i class="fa fa-eye" aria-hidden="true"></i> &nbsp;
                        Matricularse ya!
                      </b>
                    </a>
                  </div>
                  <img
                    src="../../../../assets/img/icons/criar-cursos.jpg"
                    alt="rover"
                  />
                </div>

                <div class="card-bodys ">
                  <span class="cardTitle fuente" style="font-size: 17px;">
                    {{ item.nombre }}
                  </span>
                  <p
                    class="text-xs  fuente mt-2"
                    style="color: #516f90 !important;"
                  >
                    {{ item.materia }} / {{ item.doc }}
                  </p>
                  <span class="tag fuente tag-purple"> Curso Activo</span>
                </div>
              </div>
              
              </div>
            </section>
          </div>
          <section v-else>
            <div class="d-flex justify-content-center mt-8">
              <div class="text-center">
                <img
                  style="width: 120px;"
                  src="../../../../assets/img/icons/descarga.svg"
                  alt="fondo"
                />
                <div class=" mt-4 letra fuente">
                  No hay datos que mostrar, sin cursos
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./AllAulas.js"></script>
