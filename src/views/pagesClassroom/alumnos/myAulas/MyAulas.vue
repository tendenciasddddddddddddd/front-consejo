<template>
    <div >
      <vue-progress-bar  style="margin-top:-13px"></vue-progress-bar>
      <ProgressBar v-if="isData"></ProgressBar>
      <div v-else>
       <ActionRowHeader :numPages="numPages"  :page="page" :IfAdd="0" @pagechanged="onPageChange" @changeSearch="changeSearch" ></ActionRowHeader>
            <section class="projects_projects__f_nDO mt-3" v-if="displayedArticles.length" >
            <div v-for="(item, index) in displayedArticles" :key="item.id" class="styles_projectCardWrapper__zSMNk s-mopa animate__animated animate__fadeInUp" :class="[`animations-${index}`]">
              <Cards :object="{ id: item._id,
                         text1: item.materia, 
                         text2: item.icono, 
                         text3: item.nombre ,
                         text4 : item.doc,
                         color: colorsh[index]}"
                         @openModules="dialog"/>
           </div>
        </section>
         <section v-else>
           <NoFound />
        </section>
      </div>
    </div>
</template>

<script src="./MyAulas.js"></script>


