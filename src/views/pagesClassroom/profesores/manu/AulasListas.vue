<template>
  <div class="cLLkJw ">
    <vue-progress-bar  style="margin-top:-23px"></vue-progress-bar>
    <div class="ifjUET">
      <ProgressBar v-if="isData"></ProgressBar>
      <div v-else>
        <ActionRowHeader :FirstText="'Gestión'" :LastText="' Aulas virtuales'" :numPages="numPages"  :page="page" :IfAdd="1" @pagechanged="onPageChange" @changeSearch="changeSearch" @openCreateCourse="openChildNew"></ActionRowHeader>
        <div v-if="displayedArticles.length" class="mt-2">
          <section class="flex-containes2 mt-3">
            <div
               class="carde s-bajo-capo s-header-cards animate__animated animate__fadeInUp" :class="[`animations-${index}`]"
              v-for="(item, index) in displayedArticles" :key="item.id">
             <div class=" text-center "  v-bind:style="{'background':colorsh[index]}">
                   <div class="d-flex justify-content-center">
                       <img class="w-20 s-header-img" src="https://repost.aws/static/icons/common/answer.svg" alt="rover"/>
                  <span class="text-white mt-4 ms-3 fuente s-texo-description" > {{ item.nombre.split(' ')[0] }} {{ item.nombre.split(' ')[1] }}
                    <br/> {{ item.nombre.split(' ')[2] }}</span>
                   </div>
                   <span class="s-focal">
                      <a href="javascript:;" @click="openTask(item._id)" class="btn btn-sm btnTrasparente w-70 mt-4">Tareas</a> <br/>
                      <a href="javascript:;" @click="openChildGruopen(item._id)" class="btn btn-sm btnTrasparente w-70 mt-2">Evaluaciones</a><br/>
                      <a href="javascript:;" @click="openChildGruopen(item._id)" class="btn btn-sm  btnTrasparente w-70 mt-2">Estudiantes</a>
                      <a href="javascript:;"  class="btn btn-sm  btnTrasparente w-70 mt-2">Configurar</a>
                   </span>
                </div>
              <div class="card-bodys ">
                 <span class="tag fuente tag-purple"> {{ item.icono }}</span>
                <span class="cardTitle fuente" style="font-size: 17px;">
                  {{ item.materia }} 
                </span>
                <span
                  class="text-xs  fuente mt-2"
                  style="color: #516f90 !important;"
                >
                  {{ item.nombre }}
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
    <div v-if="ifChildGroup">
      <ListAllEstudiantes :idGet="key" @myEvent="closedChildGruopen"></ListAllEstudiantes>
    </div>
    <div v-if="ifChildNew">
      <CreateCurso @myEvent2="closedChildNew" @clickSave="refresh"></CreateCurso>
    </div>
  </div>
</template>
<script src="./AulasListas.js"></script>