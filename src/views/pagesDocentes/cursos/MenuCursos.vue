<template>
    <div class="cLLkJw">
      <div class="ifjUET" >
        <vue-progress-bar ></vue-progress-bar>
        <ProgressBar v-if="isData"></ProgressBar>
        <div v-else >
           <ActionRowHeader :FirstText="'Cursos'" :LastText="' Cursos asignados'" :numPages="numPages"  :page="page" :total="displayedArticles.length" @pagechanged="onPageChange" @changeSearch="changeSearch"></ActionRowHeader>
          <div v-if="displayedArticles.length">
            <section class="flex-containes2 mt-3">
              <div
                class="carde s-bajo-capo s-header-cards animate__animated animate__fadeInUp" :class="[`animations-${index}`]"
                v-for="(item, index) in displayedArticles"
                :key="item.id">
                <div class=" text-center "  v-bind:style="{'background':colorsh[index]}">
                   <div class="d-flex justify-content-center">
                       <img class="w-20 s-header-img"  src="../../../assets/img/new/tareas.png" alt="rover"/>
                  <span class="text-white mt-4 ms-3 fuente s-texo-description" > {{ item.fmateria.nombre.split(' ')[0] }} {{ item.fmateria.nombre.split(' ')[1] }}
                    <br/> {{ item.fmateria.nombre.split(' ')[2] }}</span>
                   </div>
                   <span class="s-focal">
                      <a href="javascript:;" @click="optionsViewNota(item)" class="btn btn-sm btnTrasparente w-70 mt-4">Notas</a> <br/>
                       <a href="javascript:;" class="btn btn-sm btnTrasparente w-70 mt-2">Asistencia</a><br/>
                        <a href="javascript:;" class="btn btn-sm  btnTrasparente w-70 mt-2">Supletorios</a>
                   </span>
                </div>
                <div class="card-bodys ">
                  <!-- <span class="tag fuente" v-bind:class="[item.nombre == 'Extraordinaria'? 'tag-purple' : '', 'tag-teal']"> {{ item.nombre }}</span> -->
                  <span class="tag fuente tag-purple"> {{ item.nombre }}</span>
                  <span class="cardTitle fuente mt-2" style="font-size: 17px;">
                    {{ item.fnivel.nombre }}
                  </span>
                  <span class="text-xs  fuente mt-1" style="color: #516f90 !important;">
                     {{ item.fmateria.nombre }} /  {{ item.paralelo }}
                  </span>
                </div>
              </div>
            </section>  
          </div>
          <section v-else>
            <NoFound />
          </section>
        </div>
      </div>
    </div>
</template>
<script src="./MenuCursos.js"></script>