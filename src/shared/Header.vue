<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0  fixed-start croll" id="sidenav-main"
    style="background-color: white !important; margin-top: 2.2rem!important;overflow-x: hidden;overflow-y: auto;">
    <div class="sidenav-header">


      <a class="navbar-brand m-0" href="javascript:;">
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
          class="burger-icon opacity-transition s-absolute s-right-24px s-cursor-pointer s-flex-none s-to-right"
          style="width: 28px; height: 28px;">
          <g class="style-scope yt-icon">
            <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z" class="style-scope yt-icon"></path>
          </g>
        </svg>

        <span class="sidenav-mini-icon negros" style="font-size:20px"> &nbsp; Sistema</span>
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
              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: #000">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                <path d="M9 22V12h6v10"></path>
              </svg>

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
        <li class="nav-item" v-if="user.roles.includes('Admin')" id="step_2">
          <a data-bs-toggle="collapse" href="#pagesExamples" class="nav-link "
            :class="{'actived': $route.name === '000'||$route.name === '222' ||$route.name === '333'}"
            aria-controls="pagesExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm  text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: #000;">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>

            </div>
            <span class="nav-link-text ms-1 mt-1">Registros</span>
          </a>
          <div class="collapse " :class="{'show':
          $route.name === '000'||
          $route.name === '222'||
          $route.name === '333'}" id="pagesExamples">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === '000'}" class="nav-item ">
                <router-link to="/option-zonas" :class="{'active': $route.name === '000'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> Z </span>
                  <span class="sidenav-normal letras fuente">Zonas </span>
                </router-link>
              </li>
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
            :class="{'actived': $route.name === '1111'||$route.name === '2222'||$route.name === '1234'}"
            aria-controls="applicationsExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: #000;">
                <path d="M6 3v12"></path>
                <circle cx="18" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M18 9a9 9 0 01-9 9"></path>
              </svg>

            </div>
            <span class="nav-link-text ms-1 mt-1">Gestión Curso</span>
          </a>
          <div class="collapse " :class="{'show':
          $route.name === '1111'||$route.name === '1234'||
          $route.name === '2222'}" id="applicationsExamples">
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
              <li :class="{'active': $route.name === '2222'}" class="nav-item ">
                <router-link to="/Distributivo-v1" :class="{'active': $route.name === '2222'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> D </span>
                  <span class="sidenav-normal letras fuente">Distributivo </span>
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
              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: #000;">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>

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
          <a :class="{'actived': $route.name === 'd2'||$route.name === 'd4'||$route.name === 'dr'}"
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
            <span class="nav-link-text ms-1 mt-1">Cursos</span>
          </a>
          <div class="collapse " id="authExamples" :class="{'show':
          $route.name === 'd2'||
          $route.name === 'd4'||
          $route.name === 'dr'}">
            <ul class="nav ms-4 ps-3">

              <li :class="{'active': $route.name === 'd2'||$route.name === 'd4'}" class="nav-item ">
                <router-link to="/opciones-curso" :class="{'active': $route.name === 'd2'||$route.name === 'd4'}"
                  class="nav-link ">
                  <span class="sidenav-mini-icon"> C </span>
                  <span class="sidenav-normal letras fuente">Grupos Cursos </span>
                </router-link>
              </li>



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
              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: #000">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>

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

              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color:#000">
                <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z"></path>
                <path d="M16 8L2 22"></path>
                <path d="M17.5 15H9"></path>
              </svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Notas</span>
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
              <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color:#000">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"></path>
              </svg>
            </div>
            <span class="nav-link-text ms-1 mt-1">Aulas Virtuales</span>
          </a>
          <div :class="{'show':
          $route.name === 'es1'||
          $route.name === 'es2'}" class="collapse " id="componentsExamples10">
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === 'es1'}" class="nav-item ">
                <router-link to="/my-lista" :class="{'active': $route.name === 'es1'}" class="nav-link ">
                  <span class="sidenav-mini-icon"> M </span>
                  <span class="sidenav-normal letras fuente">Mi Aula </span>
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
        <li class="nav-item mt-3">
          <h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">OPCION</h6>
        </li>
        <div class="nav-item" id="step_6">
          <li>
            <a class="nav-link " role="button" aria-expanded="false">
              <div class="icon-shape icon-sm    text-center d-flex align-items-center justify-content-center  me-2">
                <svg class="icons" data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  viewBox="0 0 24 24" width="20" style="color: #000;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <span class="sidenav-mini-icon"> </span>
              <span class="nav-link-text ms-1 mt-1 selectOption">¿Cómo funciona?</span>

            </a>

          </li>
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
      this.isMobile = window.innerWidth < 600
    },
    openCuenta() {
      this.visibl = true;
    },
    close() {
      this.visibl = false;
    },
  },
}
</script>