<template>
  <div>
    
    <div class="cLLkJw">
      <div class="ifjUET" >
       
         <vue-progress-bar ></vue-progress-bar>
        
        <ProgressBar v-if="isData"></ProgressBar>
        <div v-else >
         
                 <div class="row mt-2">
              <div class="col-md-5">
                  <span
              class="ms-2"
              style="font-weight: 700;color:#181B32; font-size: 21px;"
              >Todos los cursos asignados</span
            >
              </div>
              <div class="col-md-7">
                 <div class="d-flex justify-content-center">
              <div>
                <div class="input-group ">
                  <input style="background: white;"
                    type="text"
                    v-model="searchQuery"
                    class="form-control buscador"
                    placeholder="Buscar por materia"
                  />
                  <span class="input-group-text text-body buscador" style="background: white;"
                    ><i class="fas fa-search colorhs" aria-hidden="true"></i
                  ></span>
                </div>
              </div>
             
              <div class="mt-2">
                <span class="ms-4" style="color:#181B32; font-size: 18px;"><b style="font-weight: 700;">0{{ page }}</b>/ 0{{ numPages }}</span>
               
              </div>
              <div>
                 <ul class="pagination pagination-dark justify-content-center mt-2">
            <li class="page-item">
              <a
                class="fuente tamanio links paginates ms-3 me-2 isPaginateh isPaginateActive"
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
                :class="{ 'inactivo isNoActive': page == numPages || numPages == 0 }"
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
         

          <div v-if="displayedArticles.length">
            <section class="flex-containes2 mt-3">
              <div
                class="carde fadeIn1 fadeInBottom " :class="[`animation-${index}`]"
                v-for="(item, index) in displayedArticles"
                :key="item.id"
              >
                <div class="card-header1">
                    <span style="height: 130px;" class="mask bg-gradient-dark"></span>
                   <div class="mosText text-center text-white">
                     <a class="mt-5" @click="openModal(item)"
                  href="javascript:;" ><b style="color:white;" class="fuente"><i class="fa fa-eye" aria-hidden="true"></i> &nbsp; Ver Curso</b>
                  </a>
                   
                  </div>
                   
                  <img
                    src="../../../assets/img/icons/Mascot-CursosenGrupo.png"
                    alt="rover"
                  />
                </div>
                <!-- socialmedia.svg -->
                <div class="card-bodys ">
                
                  <span class="tag fuente" v-bind:class="[item.nombre == 'Extraordinaria'? 'tag-purple' : '', 'tag-teal']"> {{ item.nombre }}</span>
                 
                  <span class="cardTitle fuente" style="font-size: 17px;">
                    {{ item.fnivel.nombres }}
                  </span>
                  <p class="text-xs  fuente mt-2" style="color: #516f90 !important;">
                     {{ item.fmateria.nombre }} / Paralelo {{ item.paralelo }}
                  </p>
                   
                </div>
              </div>
             
            </section>

           
          </div>
          <section v-else>
            <div class="d-flex justify-content-center mt-8">
              <div class="text-center">
                <img
                  style="width: 120px;"
                  src="../../../assets/img/icons/descarga.svg"
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
     
        <div class=" fdYSBu">
          <div class="itemActive w-100">
            <span class=" text-dark">
              Modalidades
            </span>
          </div>

          <div class="d-flex ms-3 mt-4">
            <div class="form-check my-auto supcheka">
              <input class="form-check-input cheka" checked type="checkbox" />
            </div>

            <a class="mb-0 ms-3 text-sm colorestabla fuente">
              Todo
            </a>
          </div>
          <div class="d-flex ms-3 mt-3">
            <div class="form-check my-auto supcheka">
              <input class="form-check-input cheka" type="checkbox" />
            </div>

            <a class="mb-0 ms-3 text-sm colorestabla fuente">
              Intensivo
            </a>
          </div>
          <div class="d-flex ms-3 mt-3">
            <div class="form-check my-auto supcheka">
              <input class="form-check-input cheka" type="checkbox" />
            </div>

            <a class="mb-0 ms-3 text-sm colorestabla fuente">
              Extraordinario
            </a>
          </div>
          <div class="itemActive w-100 mt-5">
            <span class=" text-dark">
              Otros
            </span>
          </div>
          <div class="d-flex ms-3 mt-2">
            <a class="tamanio links fuente"> <b>Solicitar nuevo</b> </a>
          </div>
        </div>
       <div
      class="modal fade "
      :class="{ 'show ': modals === true }"
      :style="[modals === true ? { display: 'block' } : {}]"
      style="overflow-y: auto;   z-index: 9999;"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content ">
          <div class="modalheader">
            <p class="h5 fuente text-white mt-3 ms-3" style="font-weight:400;">
              Selecionar uno de estos items
            </p>
            <button
              @click="cerrarModal"
              class="btn btn-link text-white fuente"
              style="margin-top: -100px; margin-right: -20px;"
            >
              CERRAR &nbsp; <i style="font-size: 12px" class="fa fa-close"></i>
            </button>
          </div>
          <div class="modal-body">
            <section class="flex-containes2 mt-1">
              <div class="">
                <a @click="nextPage" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde6 text-center ">
                    <img
                      class="w-35 mt-1"
                      src="../../../assets/img/usados/playbooks.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Notas
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="">
                <a href="javascript:;">
                  <div class="min-caja cajas targetas1 borde1 text-center ">
                    <img
                      class="w-35 mt-2"
                      src="../../../assets/img/logs/events.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Asistencia
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="">
                <router-link :to="`/507`" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde2 text-center ">
                    <img
                      class="w-35 mt-2"
                      src="../../../assets/img/logs/integrations.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Supletorios
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="">
                <router-link :to="`/507`" href="javascript:;">
                  <div class="min-caja cajas targetas1 borde3 text-center ">
                    <img
                      class="w-40 "
                      src="../../../assets/img/logs/add-on-transactional-email.svg"
                      alt="fondo"
                    />
                    <div class="p-1">
                      <p class="cardTitle fuente mt-1 fadeIn1 fadeInBottom animation-1" style="font-size: 17px;">
                        Correos
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </section>
          </div>
           <!-- :to="{
                  name: 'asistencia',
                  params: {
                    id: info.fnivel._id,
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                  props: {
                    paralelo: info.paralelo,
                    nombre: info.nombre,
                    materia: info.fmateria.nombre,
                  },
                }" -->
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script src="./MenuCursos.js"></script>
<style>
.carde {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  
  overflow: hidden;
  width: 240px;
}
.mosText{
    position:absolute;
  overflow:hidden;
  width: 240px;
  border-top-left-radius: 10px;
  height: 130px;
  background-color: rgba(81,111,144,.85);
  opacity:0;
  
}
.carde:hover  {
  
    box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px, rgb(9 30 66 / 31%) 0px 0px 1px;
}
.card-header1 img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  cursor: pointer;
}
.card-header1:hover .mosText {
  opacity:1;
  color:rgb(255, 255, 255);
  cursor: pointer;
  padding-top: 20%;
  text-decoration: none;
}
.card-bodys {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 160px;
     background-color: #F6F7F9;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
}
.tag-teal {
  background-color: #00bda5;
}
.tag-purple {
  background-color: #00a4bd;
  
}
.tag-pink {
  background-color: #cd5b9f;
}


.user {
  display: flex;
  margin-top: auto;
}

.user img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.user-info h5 {
  margin: 0;
}
.user-info small {
  color: #545d7a;
}
.animation-0 {
    animation-delay: .0s;
}
.animation-1 {
    animation-delay: .2s;
}
.animation-2 {
    animation-delay: .4s;
}
.animation-3 {
    animation-delay: .6s;
}
.animation-4 {
    animation-delay: .8s;
}
.animation-5 {
    animation-delay: 1s;
}
.animation-6 {
    animation-delay: 1.2s;
}
.animation-7 {
    animation-delay: 1.4s;
}
.animation-8 {
    animation-delay: 1.6s;
}
.animation-9 {
    animation-delay: 1.8s;
}
.animation-10 {
    animation-delay: 2s;
}
.animation-11 {
    animation-delay: 2s;
}
.animation-12 {
    animation-delay: 2s;
}
.animation-13 {
    animation-delay: 2s;
}
.animation-14 {
    animation-delay: 2s;
}
body.modal-open {
  overflow: hidden;
}
.min-caja{
  min-width: 120px!important;
  min-height: 120px!important;
  max-width: 120px!important;
  margin-right: 15px!important;
  padding: 5px;
}
.bg-gradient-dark {
    background-image: none !important;
    background: linear-gradient( 
0deg, rgb(24, 27, 50) 0%, rgba(24, 27, 50, 0) 100%) 0% 0% repeat scroll rgba(0, 0, 0, 0) !important;
}
.isPaginateActive{
  border-width: 2px;
    border-style: solid;
    border-color: #E8EAF0;
        border-radius: 5px;
       padding-left: 7px;
    padding-right: 7px;
    padding-top: 5px;
    padding-bottom: 5px;
}
.isPaginateh{
  padding-bottom: 8px !important;
}
.isNoActive{
  border-width: 0px !important;
    border-style: none;
    border-color: #E8EAF0;
    border-radius: 5px;
    padding: 8px !important;
}
.fadeIn1 {
    -webkit-animation-duration: 0.2s !important;
    animation-duration: 0.2s !important;
}
.notificacionHeader{
    background-color: rgb(229, 245, 248);
    background-color: rgba(135,143,184,0.16);
    padding: 12px;
    text-align: left;
}
</style>
