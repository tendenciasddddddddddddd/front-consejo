<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0  fixed-start croll " id="sidenav-main"
    style="background-color: white !important; margin-top: 2.2rem!important;overflow-x: hidden;overflow-y: auto;">
    <div class="sidenav-header">


      <a class="navbar-brand m-0" href="javascript:;">
                  <img :src="$store.state.avatar" alt="kal" class="avatar avatar-sm rounded-circle" style="width: 36px!important;"/>
        <span class="sidenav-mini-icon negros ms-2" style="font-size:16px">{{nombre.toString().split(' ')[0]}} </span>
      </a>

    </div>

    <div class="collapse navbar-collapse  w-auto h-auto max-height-vh-100 h-100" id="sidenav-collapse-main"
      style="overflow-x: hidden;overflow-y: hidden;">
      <ul class="navbar-nav">
        <li class="nav-item" id="step_1">
          <a data-bs-toggle="collapse" href="#dashboardsExamples" class="nav-link"
            :class="{'actived': $route.name === 'default'||$route.name === '1'||$route.name === 'd1'||$route.name === 'e1'}"
            aria-controls="dashboardsExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.03 3.327a1.599 1.599 0 0 1 1.94 0l7.384 5.61c.407.31.646.795.646 1.31v9.117c0 .903-.723 1.636-1.615 1.636h-3.762a1.626 1.626 0 0 1-1.615-1.636V15.88A2.015 2.015 0 0 0 12 13.847a2.015 2.015 0 0 0-2.008 2.034v3.483c0 .903-.723 1.636-1.615 1.636H4.615A1.626 1.626 0 0 1 3 19.364v-9.117c0-.515.24-1 .646-1.31l7.385-5.61Zm.908 1.195-7.384 5.61a.144.144 0 0 0-.054.115v9.117c0 .08.056.136.115.136h3.762c.06 0 .115-.057.115-.136V15.88c0-1.953 1.562-3.534 3.508-3.534s3.508 1.581 3.508 3.534v3.483c0 .08.056.136.115.136h3.762c.059 0 .115-.057.115-.136v-9.117a.144.144 0 0 0-.054-.115l-7.384-5.61a.099.099 0 0 0-.124 0Z" fill="currentColor"></path></svg>
             

            </div>
            <span class="nav-link-text ms-1 mt-1">Área personal</span>
          </a>
          <div class="collapse " id="dashboardsExamples"
            :class="{'show': $route.name === 'default'||$route.name === '1'||$route.name === 'd1'||$route.name === 'e1'}">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === 'default'}" class="nav-item">
                <router-link to="/" :class="{'active': $route.name === 'default'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> I </span>
                  <span class="sidenav-normal letras fuente"> &nbsp; Inicio </span>
                </router-link>
              </li>

              <li :class="{'active': $route.name === '1'}" class="nav-item " v-if="user.roles.includes('Admin')">
                <router-link to="/Users" :class="{'active': $route.name === '1'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> U </span>
                  <span class="sidenav-normal letras fuente">Usuarios </span>
                </router-link>
              </li>
              <li class="nav-item ">
                <a @click="openCuenta" href="javascript:;" class="nav-link ">
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal letras fuente">Contraseña </span>
                </a>
              </li>
              <li :class="{'active': $route.name === 'd1'}" class="nav-item "
                v-if="user.roles.includes('Docente')||user.roles.includes('Estudiante')">
                <router-link to="/perfil" :class="{'active': $route.name === 'd1'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> P </span>
                  <span class="sidenav-normal letras fuente">Perfil </span>
                </router-link>
              </li>
            
            </ul>
          </div>
        </li>
        <li class="nav-item mt-3">
          <h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">PAGES</h6>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Admin')">
          <a data-bs-toggle="collapse" href="#pagesExamples" class="nav-link "
            :class="{'actived':$route.name === '222' ||$route.name === '333'}"
            aria-controls="pagesExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm  text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.75 5.25h7.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 1 1 0-1.5zm0 6h7.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 1 1 0-1.5zm0 6h7.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 1 1 0-1.5zM6 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path></svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Registros</span>
          </a>
          <div class="collapse " :class="{'show':
          $route.name === '222'||
          $route.name === '333'}" id="pagesExamples">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === '222'}" class="nav-item ">
                <router-link to="/Estudiate" :class="{'active': $route.name === '222'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> E </span>
                  <span class="sidenav-normal letras fuente">Estudiates </span>
                </router-link>
              </li>
              <li :class="{'active': $route.name === '333'}" class="nav-item ">
                <router-link to="/Docente" :class="{'active': $route.name === '333'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> D </span>
                  <span class="sidenav-normal letras fuente">Docentes </span>
                </router-link>
              </li>

            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Admin')||user.roles.includes('Vicerrector')" id="step_3">
          <a data-bs-toggle="collapse" href="#applicationsExamples" class="nav-link "
            :class="{'actived': $route.name === '1111'||$route.name === '2222'||$route.name === '3333'||$route.name === '1234'}"
            aria-controls="applicationsExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 10V5a.5.5 0 0 0-.5-.5h-4.5V10h5zm0 1.5h-5v8H19a.5.5 0 0 0 .5-.5v-7.5zm-6.5-7H5a.5.5 0 0 0-.5.5v14c0 .28.22.5.5.5h8v-15zM5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2z"></path></svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Gestión Curso</span>
          </a>
          <div class="collapse " :class="{'show':
          $route.name === '1111'||$route.name === '1234'||
          $route.name === '2222' ||$route.name === '3333'||$route.name === '4444'}" id="applicationsExamples">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === '1111'}" class="nav-item " v-if="user.roles.includes('Admin')">
                <router-link to="/Cursos" :class="{'active': $route.name === '1111'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal letras fuente">Cursos </span>
                </router-link>
              </li>
              <li :class="{'active': $route.name === '1234'}" class="nav-item " v-if="user.roles.includes('Admin')">
                <router-link to="/Materias" :class="{'active': $route.name === '1234'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> M </span>
                  <span class="sidenav-normal letras fuente">Materias </span>
                </router-link>
              </li>
              <li :class="{'active': $route.name === '2222'}" class="nav-item "  v-if="user.roles.includes('Admin')">
                <router-link to="/Distributivo-v1" :class="{'active': $route.name === '2222'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> D </span>
                  <span class="sidenav-normal letras fuente">Distributivo </span>
                </router-link>
              </li>
              <!-- <li :class="{'active': $route.name === '4444'}" class="nav-item "  v-if="user.roles.includes('Admin')">
                <router-link to="/tutores" :class="{'active': $route.name === '4444'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> T </span>
                  <span class="sidenav-normal letras fuente">Tutores</span>
                </router-link>
              </li> -->
              <li :class="{'active': $route.name === '3333'}" class="nav-item ">
                <router-link to="/planificacion" :class="{'active': $route.name === '3333'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> P </span>
                  <span class="sidenav-normal letras fuente">Planificaciones </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Admin')" id="step_4">
          <a data-bs-toggle="collapse" href="#ecommerceExamples" class="nav-link "
            :class="{'actived': $route.name === '11'||$route.name === '77'||$route.name === 'r2'}"
            aria-controls="ecommerceExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
             
              <svg class="icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 3h6.558a2 2 0 0 1 1.898 1.368L12 6h7c1.105 0 2 .831 2 1.857V10h-1.5V7.857c0-.171-.2-.357-.5-.357H3c-.3 0-.5.186-.5.357v9.286c0 .171.2.357.5.357h9V19H3c-1.105 0-2-.831-2-1.857V7.857c0-.142.017-.28.05-.413A2.006 2.006 0 0 1 1 7V5a2 2 0 0 1 2-2Zm7.419 3H3c-.173 0-.34.02-.5.059V5a.5.5 0 0 1 .5-.5h6.558a.5.5 0 0 1 .475.342L10.419 6Zm8.711 6a.62.62 0 0 1 .62.62v2.63h2.63a.62.62 0 0 1 .62.62v.26a.62.62 0 0 1-.62.62h-2.63v2.63a.62.62 0 0 1-.62.62h-.26a.62.62 0 0 1-.62-.62v-2.63h-2.63a.62.62 0 0 1-.62-.62v-.26a.62.62 0 0 1 .62-.62h2.63v-2.63a.62.62 0 0 1 .62-.62h.26Z" fill="currentColor"></path></svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Matriculas</span>
          </a>
          <div class="collapse " id="ecommerceExamples" :class="{'show':
                    $route.name === '11'||
                    $route.name === '77'||
          $route.name === 'r2'}">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === '11'}" class="nav-item ">
                <router-link to="/Periodo" :class="{'active': $route.name === '11'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> P </span>
                  <span class="sidenav-normal letras fuente">Periodos </span>
                </router-link>
              </li>
              <li :class="{'active': $route.name === '77'}" class="nav-item ">
                <router-link to="/Intensivo" :class="{'active ': $route.name === '77'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> M </span>
                  <span class="sidenav-normal letras fuente">Matricula </span>
                </router-link>
              </li>


              <li :class="{'active': $route.name === 'r2'}" class="nav-item ">
                <router-link to="/opciones-reportes" :class="{'active': $route.name === 'r2'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> R </span>
                  <span class="sidenav-normal letras fuente">Reportes </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Docente')">
          <a :class="{'actived': $route.name === 'd2'||$route.name === 'dh'||$route.name === 'dr'}"
            data-bs-toggle="collapse" href="#authExamples" class="nav-link " aria-controls="authExamples" role="button"
            aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">

              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: #000;">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M7 7h3v9H7z"></path>
                <path d="M14 7h3v5h-3z"></path>
              </svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Módulo notas</span>
          </a>
          <div class="collapse " id="authExamples" :class="{'show':
          $route.name === 'd2'||
          $route.name === 'dh'||
          $route.name === 'dr'}">
            <ul class="nav ms-4 ps-3">

              <li :class="{'active': $route.name === 'd2'}" class="nav-item ">
                <router-link to="/opciones-curso" :class="{'active': $route.name === 'd2'}"
                  class="nav-link ">
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal letras fuente">Cursos </span>
                </router-link>
              </li>
              <!-- <li :class="{'active': $route.name === 'dh'}" class="nav-item ">
                <router-link to="/tutoresDocente" :class="{'active': $route.name === 'dh'}"
                  class="nav-link ">
                  <span class="sidenav-mini-icon"> L </span>
                  <span class="sidenav-normal letras fuente">Libretas </span>
                </router-link>
              </li> -->

              <li :class="{'active': $route.name === 'dr'}" class="nav-item ">
                <router-link to="/zoom" :class="{'active': $route.name === 'dr'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> Z </span>
                  <span class="sidenav-normal letras fuente">Zoom </span>
                </router-link>
              </li>
            </ul>
          </div>


        </li>
        <li class="nav-item" v-if="user.roles.includes('Docente')">
          <a :class="{'actived': $route.name === 'al'}" data-bs-toggle="collapse" href="#authExamples1"
            class="nav-link " aria-controls="authExamples1" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm   text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 18.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h6.5c.275 0 .5.225.5.5v13.5H4Zm8.5 1.497V20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.5c1.102 0 2 .895 2 2v3.997h2L20 9c1.105 0 2 .892 2 2v7l-1.5-.001V11c0-.278-.222-.5-.5-.5l-3.126-.001-4.374-.002v8l7.5.003a.5.5 0 0 0 .5-.5H22a2 2 0 0 1-2 2l-7.5-.003ZM5 7.497h4.5v-1.5H5v1.5Zm0 3h4.5v-1.5H5v1.5Zm4.5 3H5v-1.5h4.5v1.5Zm-4.5 3h4.5v-1.5H5v1.5Zm11-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Zm3-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Z" fill="currentColor"></path></svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Aulas Virtuales</span>
          </a>
          <div class="collapse " id="authExamples1" :class="{'show':

          $route.name === 'al'}">
            <ul class="nav ms-4 ps-3">


              <li :class="{'active': $route.name === 'al'}" class="nav-item ">
                <router-link to="/aulas-lista" :class="{'active': $route.name === 'al'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> A </span>
                  <span class="sidenav-normal letras fuente">Aulas</span>
                </router-link>
              </li>

              <li :class="{'active': $route.name === 'a2'}" class="nav-item ">
                <router-link to="/" :class="{'active': $route.name === 'a2'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal letras fuente">Chat </span>
                </router-link>
              </li>
            </ul>
          </div>


        </li>
        <li class="nav-item" v-if="user.roles.includes('Estudiante')">
          <a :class="{'actived': $route.name === 'e2'}" data-bs-toggle="collapse" href="#componentsExamples"
            class="nav-link " aria-controls="componentsExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
             
              <svg class="icons" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="25" viewBox="0 0 24 24"><path d="M5.75 12.75a.75.75 0 0 1 0 1.5H4V16a.75.75 0 0 1-1.5 0v-1.75H.75a.75.75 0 0 1 0-1.5H2.5V11A.75.75 0 0 1 4 11v1.75h1.75zm13.6 3.74a.6.6 0 0 0 .13.01h3.02a.8.8 0 0 0-.47-.74l-2.56-1.12a1.5 1.5 0 0 1-.9-1.38v-.51a1.5 1.5 0 0 1 .65-1.24c.96-.66 1.7-2.47 1.7-4.26 0-1.93-.8-2.75-2.44-2.75-.15 0-.3 0-.43.02a5.5 5.5 0 0 0-.7-1.4c.18-.03.8-.12 1.13-.12 2.4 0 3.95 1.41 3.95 4.25 0 1.7-.66 2.68-1.54 4.73l-.82.77v.51l2.56 1.13A2.31 2.31 0 0 1 24 16.5a1.5 1.5 0 0 1-1.5 1.5h-2.35a2.98 2.98 0 0 0-.8-1.5v-.01zm-4.82-1.27 2.73 1.2A2.92 2.92 0 0 1 19 19.1v.4a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-.4c0-1.16.69-2.2 1.75-2.66l2.75-1.18v-1.24C7.92 12.62 7 9.99 7 7.5 7 3.9 8.91 2 11.97 2 15.03 2 17 3.79 17 7.38c0 2.44-.92 5.1-2.47 6.54v1.3zm-1.5-1.3a1.5 1.5 0 0 1 .48-1.1c1.18-1.1 1.99-3.3 1.99-5.44 0-2.66-1.2-3.88-3.53-3.88-2.27 0-3.47 1.29-3.47 4 0 2.18.81 4.36 1.99 5.39a1.5 1.5 0 0 1 .51 1.13v1.24a1.5 1.5 0 0 1-.9 1.38l-2.76 1.18a1.39 1.39 0 0 0-.84 1.28v.4h11v-.4c0-.56-.33-1.07-.84-1.3l-2.74-1.21a1.5 1.5 0 0 1-.89-1.37v-1.3z"></path></svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Módulo notas</span>
          </a>
          <div :class="{'show':
          $route.name === 'e2'||
          $route.name === 'e3'||
          $route.name === 'e4'}" class="collapse " id="componentsExamples">
            <ul class="nav ms-4 ps-3">

              <li :class="{'active': $route.name === 'e2'}" class="nav-item ">
                <router-link to="/Consultar-nota" :class="{'active': $route.name === 'e2'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> N </span>
                  <span class="sidenav-normal letras fuente">Calificaciones </span>
                </router-link>
              </li>
              <li :class="{'active': $route.name === 'e4'}" class="nav-item ">
                <router-link to="/Historia-estudiante" :class="{'active': $route.name === 'e4'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> H </span>
                  <span class="sidenav-normal letras fuente">Historial </span>
                </router-link>
              </li>


            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Estudiante')">
          <a :class="{'actived': $route.name === 'es1'||$route.name === 'es2'}" data-bs-toggle="collapse"
            href="#componentsExamples10" class="nav-link " aria-controls="componentsExamples10" role="button"
            aria-expanded="false">
            <div class="icon-shape icon-sm   text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 18.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h6.5c.275 0 .5.225.5.5v13.5H4Zm8.5 1.497V20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.5c1.102 0 2 .895 2 2v3.997h2L20 9c1.105 0 2 .892 2 2v7l-1.5-.001V11c0-.278-.222-.5-.5-.5l-3.126-.001-4.374-.002v8l7.5.003a.5.5 0 0 0 .5-.5H22a2 2 0 0 1-2 2l-7.5-.003ZM5 7.497h4.5v-1.5H5v1.5Zm0 3h4.5v-1.5H5v1.5Zm4.5 3H5v-1.5h4.5v1.5Zm-4.5 3h4.5v-1.5H5v1.5Zm11-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Zm3-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Z" fill="currentColor"></path></svg>
             
            </div>
            <span class="nav-link-text ms-1 mt-1">Aulas Virtuales</span>
          </a>
          <div :class="{'show':
          $route.name === 'es1'||
          $route.name === 'es2'}" class="collapse " id="componentsExamples10">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === 'es1'}" class="nav-item ">
                <router-link to="/my-lista" :class="{'active': $route.name === 'es1'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal letras fuente">Cursos </span>
                </router-link>
              </li>

              <li :class="{'active': $route.name === 'es2'}" class="nav-item ">
                <router-link to="/all-lista" :class="{'active': $route.name === 'es2'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> T </span>
                  <span class="sidenav-normal letras fuente">Todos Los cursos </span>
                </router-link>
              </li>

            </ul>
          </div>
        </li>
        <li v-if="user.roles.includes('Admin')" class="nav-item" id="step_5">
          <a :class="{'actived': $route.name === 's1'}" data-bs-toggle="collapse" href="#pagePublic" class="nav-link "
            aria-controls="pagePublic" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">

              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: #000;">
                <circle cx="12" cy="12" r="3"></circle>
                <path
                  d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z">
                </path>
              </svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Configuración</span>
          </a>
          <div class="collapse " id="pagePublic">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === 's1'}" class="nav-item ">
                <router-link to="/settings" :class="{'active': $route.name === 's1'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> S </span>
                  <span class="sidenav-normal letras fuente">Setting </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" id="step_5">
          <a :class="{'actived': $route.name === 'app1'}" data-bs-toggle="collapse" href="#pageApps" class="nav-link "
            aria-controls="pageApps" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons" style="color: #000;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6-6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6-6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm0 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zM5 16h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"></path></svg>
              
            </div>
            <span class="nav-link-text ms-1 mt-1">Apps</span>
          </a>
          <div :class="{'show': $route.name === 'app1'}" class="collapse " id="pageApps">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === 'app1'}" class="nav-item ">
                <router-link to="/apps" :class="{'active': $route.name === 'app1'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> A </span>
                  <span class="sidenav-normal letras fuente">Aplicaciones </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item mt-3">
          <h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">OPCION</h6>
        </li>
        <div class="nav-item" id="step_6">
         
          <li>
            <a @click=" logout()" class="nav-link " role="button" aria-expanded="false" style="padding-top: 0px;">
              <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
                <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  viewBox="0 0 24 24" width="20" style="color: #000;">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                  <path d="M16 17l5-5-5-5"></path>
                  <path d="M21 12H9"></path>
                </svg>
              </div>
              <span class="nav-link-text ms-1 mt-1 selectOption">
                <span class="sidenav-mini-icon"> </span>

                Cerrar sesión
              </span>
            </a>
            <!-- <div class="form-check form-switch " style="padding-left: 1.6rem !important;;">
<input class="form-check-input mt-1 ms-auto" type="checkbox" id="navbarMinimize" onclick="navbarMinimize(this)">

</div> -->
          </li>
        </div>
        <div v-if="visibl">
          <Password @cerrarCuenta="close" />
        </div>
      </ul>
    </div>

  </aside>
</template>

<script>
export default {
  name: 'Header',
  components: {//../views/pagesAdmin/cuenta/Cuenta.vue
    Password: () => import( /* webpackChunkName: "Password" */ '../views/password/Password.vue'),
  },
  data() {
    return {
      user: this.$store.state.user,
      isMobile: false,
      visibl: false,
      nombre : false
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
    this.inforUsers()
  },

  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("datos");
      localStorage.removeItem("Xf");
      this.$parent.isLoggedIn = false;
      this.$router.push("/").catch(() => { });
      //window.location.reload(true);
    },
    onResize() {
      this.isMobile = window.innerWidth < 1100
    },
    openCuenta() {
      this.visibl = true;
    },
    close() {
      this.visibl = false;
    },
    inforUsers() {
      const info = JSON.parse(localStorage.getItem('Xf'));
      if (info) this.nombre = info.nombre;
    },
  },
}
</script>