<template>
  <div >
    <vue-progress-bar  style="margin-top:-23px"></vue-progress-bar>
      <ProgressBar v-if="isData"></ProgressBar>
      <div v-else >
        <ActionRowHeader :FirstText="'Gestión'" :LastText="' Aulas virtuales'" :numPages="numPages"  :page="page" :IfAdd="1" @pagechanged="onPageChange" @changeSearch="changeSearch" @openCreateCourse="openChildNew"></ActionRowHeader>
        <section class="projects_projects__f_nDO mt-3" v-if="displayedArticles.length" >
            <div v-for="(item, index) in displayedArticles" :key="item.id" class="styles_projectCardWrapper__zSMNk s-mopa animate__animated animate__fadeInUp" :class="[`animations-${index}`]">
              <Cards :object="{ id: item._id,
                         text1: item.materia, 
                         text2: item.icono, 
                         text3: item.nombre,
                         text4 : item.fecha,
                         color: colorsh[index]}"
                         @openModules="openModules"/>
           </div>
        </section>
         <section v-else>
          <NoFound />
        </section>
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