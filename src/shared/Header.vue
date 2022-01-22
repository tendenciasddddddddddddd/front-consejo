<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-5 fixed-start " id="sidenav-main" style="background-color: #f5f8fa !important; box-shadow: rgb(81 111 144 / 25%) 1px 0px 3px 0px;" >
    <div class="sidenav-header">
      <a href="javascript:;" onclick="navbarMinimize(this)">
          <i class="fas fa-times p-3 cursor-pointer text-secondary position-absolute end-0 top-0 " aria-hidden="true" id="iconSidenav"></i>
      </a>
      
      <a class="navbar-brand m-0" href="javascript:;"  onclick="navbarMinimize(this)">
        
        
         <h3 class="mb-0 fuente" style="color:black; font-weight: 600;">PCEI<b style="color: #ff7a59">&nbsp; <i class="ni ni-app"></i></b> </h3>
      </a>
    </div>
    <hr class="horizontal dark mt-0">
    <div class="collapse navbar-collapse  w-auto h-auto max-height-vh-100 h-100" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a data-bs-toggle="collapse" href="#dashboardsExamples" class="nav-link " 
          :class="{'actived': $route.name === 'default'||$route.name === '1'||$route.name === '2'||$route.name === 'd1'||$route.name === 'e1'}" aria-controls="dashboardsExamples" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
              <i class="fa fa-home text-dark" style="    font-size: 16px;" aria-hidden="true"></i>
            </div>
            <span class="nav-link-text ms-1">Administracion</span>
          </a>
          <div  class="collapse " id="dashboardsExamples" :class="{'show': $route.name === 'default'||$route.name === '1'||$route.name === '2'||$route.name === 'd1'||$route.name === 'e1'}">
            <ul class="nav ms-4 ps-3">
                <li :class="{'active': $route.name === 'default'}" class="nav-item">
                 <router-link  to="/" :class="{'active': $route.name === 'default'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> I </span>
                    <span class="sidenav-normal letras fuente"> &nbsp; Inicio </span>
                </router-link>
              </li>

               <li :class="{'active': $route.name === '1'}" class="nav-item " v-if="user.roles.includes('Admin')">
                 <router-link  to="/usuarios/Usuario" :class="{'active': $route.name === '1'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> U </span>
                    <span class="sidenav-normal letras fuente">Usuarios </span>
                </router-link>
              </li>
                <li :class="{'active': $route.name === '2'}" class="nav-item ">
                 <router-link  to="/Cuentas-Usuarios" :class="{'active': $route.name === '2'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal letras fuente">Cuenta </span>
                </router-link>
              </li>
                 <li :class="{'active': $route.name === 'd1'}" class="nav-item " v-if="user.roles.includes('Docente')">
                 <router-link  to="/perfil-docente" :class="{'active': $route.name === 'd1'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> P </span>
                    <span class="sidenav-normal letras fuente">Perfil </span>
                </router-link>
              </li> 
               <li :class="{'active': $route.name === 'e1'}" class="nav-item " v-if="user.roles.includes('Estudiante')">
                 <router-link  to="/perfil-estudiante" :class="{'active': $route.name === 'e1'}" class="nav-link ">
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
          :class="{'actived': $route.name === '000'||$route.name === '222' ||$route.name === '333'}"  aria-controls="pagesExamples" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
               <i class="fa fa-registered text-dark" style="font-size:16px" aria-hidden="true"></i>
            </div>
            <span class="nav-link-text ms-1">Registros</span>
          </a>
          <div  class="collapse " :class="{'show':
          $route.name === '000'||
          $route.name === '222'||
          $route.name === '333'}"
           id="pagesExamples">
            <ul class="nav ms-4 ps-3">
                <li :class="{'active': $route.name === '000'}" class="nav-item ">
                 <router-link  to="/MenuZonas" :class="{'active': $route.name === '000'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> Z </span>
                    <span class="sidenav-normal letras fuente">Zonas </span>
                </router-link>
              </li>
              <li :class="{'active': $route.name === '222'}" class="nav-item ">
                 <router-link  to="/List-Estudiate" :class="{'active': $route.name === '222'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> E </span>
                    <span class="sidenav-normal letras fuente">Estudiates </span>
                </router-link>
              </li>
                <li :class="{'active': $route.name === '333'}" class="nav-item ">
                 <router-link  to="/List-Docente" :class="{'active': $route.name === '333'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> D </span>
                    <span class="sidenav-normal letras fuente">Docentes </span>
                </router-link>
              </li>

            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Admin')">
          <a data-bs-toggle="collapse" href="#applicationsExamples" class="nav-link "
           :class="{'actived': $route.name === '1111'||$route.name === '2222'}" 
           aria-controls="applicationsExamples" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                <i class="fa fa-cog text-dark" style="font-size:15px" aria-hidden="true"></i>
            </div>
            <span class="nav-link-text ms-1">Gestión Curso</span>
          </a>
          <div class="collapse " 
           :class="{'show':
          $route.name === '1111'||
          $route.name === '2222'}"
          id="applicationsExamples">
            <ul class="nav ms-4 ps-3">
             <li :class="{'active': $route.name === '1111'}" class="nav-item ">
                 <router-link  to="/MenuGestion" :class="{'active': $route.name === '1111'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> G </span>
                    <span class="sidenav-normal letras fuente">Cursos </span>
                </router-link>
              </li>
               <li :class="{'active': $route.name === '2222'}" class="nav-item ">
                 <router-link  to="/Menu-Distributivo" :class="{'active': $route.name === '2222'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> D </span>
                    <span class="sidenav-normal letras fuente">Distributivo </span>
                </router-link>
              </li>

              
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Admin')">
          <a data-bs-toggle="collapse" href="#ecommerceExamples" class="nav-link "
           :class="{'actived': $route.name === '11'||$route.name === '77'||$route.name === 'r2'}" aria-controls="ecommerceExamples" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
               <i class="fa fa-list-alt text-dark" style="font-size:15px" aria-hidden="true"></i>
            </div>
            <span  class="nav-link-text ms-1 ">Matriculas</span>
          </a>
          <div class="collapse " id="ecommerceExamples"
           :class="{'show':
          $route.name === '11'||
          $route.name === '77'||
          $route.name === '71'||
           $route.name === 'r2'}"
          >
            <ul class="nav ms-4 ps-3">
              <li :class="{'active': $route.name === '11'}" class="nav-item ">
                 <router-link  to="/Periodo" :class="{'active': $route.name === '11'}" class="nav-link ">
                    <span  class="sidenav-mini-icon"> P </span>
                    <span  class="sidenav-normal letras fuente">Periodos </span>
                </router-link>
              </li>
               <li :class="{'active': $route.name === '77'}" class="nav-item ">
                 <router-link  to="/Matricula-1" :class="{'active ': $route.name === '77'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> M </span>
                    <span class="sidenav-normal letras fuente">Intensivo </span>
                </router-link>
              </li>

                 <li :class="{'active': $route.name === '71'}" class="nav-item ">
                 <router-link  to="/Matricula-2" :class="{'active ': $route.name === '71'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> M </span>
                    <span class="sidenav-normal letras fuente">Extraordinario </span>
                </router-link>
              </li>
           
               <li :class="{'active': $route.name === 'r2'}" class="nav-item ">
                 <router-link  to="/opciones-reportes" :class="{'active': $route.name === 'r2'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> R </span>
                    <span class="sidenav-normal letras fuente">Reportes </span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Docente')">
          <a :class="{'actived': $route.name === 'd2'||$route.name === 'd4'||$route.name === 'dr'}"
           data-bs-toggle="collapse" href="#authExamples" class="nav-link " aria-controls="authExamples" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
              <i class="fa fa-users text-dark" style="font-size:15px" aria-hidden="true"></i>
            </div>
            <span class="nav-link-text ms-1">Cursos</span>
          </a>
          <div class="collapse " id="authExamples"
          :class="{'show':
          $route.name === 'd2'||
          $route.name === 'd4'||
          $route.name === 'dr'}">
              <ul class="nav ms-4 ps-3">
          
               <li :class="{'active': $route.name === 'd2'||$route.name === 'd4'}" class="nav-item ">
                 <router-link  to="/opciones-curso" :class="{'active': $route.name === 'd2'||$route.name === 'd4'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal letras fuente">Grupos Cursos </span>
                </router-link>
              </li>
           
           

              <li :class="{'active': $route.name === 'dr'}" class="nav-item ">
                 <router-link  to="/reporte-docente" :class="{'active': $route.name === 'dr'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> R </span>
                    <span class="sidenav-normal letras fuente">Reportes </span>
                </router-link>
              </li>
            </ul>
          </div>
        
      
        </li>
        <li class="nav-item" v-if="user.roles.includes('Docente')">
          <a :class="{'actived': $route.name === 'al'}"
           data-bs-toggle="collapse" href="#authExamples1" class="nav-link " aria-controls="authExamples1" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
              <i class="fa fa-university text-dark" style="font-size:15px" aria-hidden="true"></i>
            </div>
            <span class="nav-link-text ms-1">Aulas Virtuales</span>
          </a>
          <div class="collapse " id="authExamples1"
          :class="{'show':

          $route.name === 'al'}">
              <ul class="nav ms-4 ps-3">
             
           
               <li :class="{'active': $route.name === 'al'}" class="nav-item ">
                 <router-link  to="/aulas-lista" :class="{'active': $route.name === 'al'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> A </span>
                    <span class="sidenav-normal letras fuente">Aulas</span>
                </router-link>
              </li>

              <li :class="{'active': $route.name === 'a2'}" class="nav-item ">
                 <router-link  to="/" :class="{'active': $route.name === 'a2'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> R </span>
                    <span class="sidenav-normal letras fuente">Chat </span>
                </router-link>
              </li>
            </ul>
          </div>
        
      
        </li>
          <li class="nav-item" v-if="user.roles.includes('Estudiante')">
          <a :class="{'actived': $route.name === 'e2'}"
          data-bs-toggle="collapse" href="#componentsExamples" class="nav-link " aria-controls="componentsExamples" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
              <svg width="12px" height="12px" viewBox="0 0 46 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>customer-support</title>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-1717.000000, -291.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g transform="translate(1716.000000, 291.000000)">
                      <g transform="translate(1.000000, 0.000000)">
                        <path class="color-background" d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z" opacity="0.59858631"></path>
                        <path class="color-foreground" d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z"></path>
                        <path class="color-foreground" d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <span  class="nav-link-text ms-1">Estudiante</span>
          </a>
          <div  :class="{'show':
          $route.name === 'e2'||
          $route.name === 'e3'||
          $route.name === 'e4'}"
          class="collapse " id="componentsExamples">
            <ul class="nav ms-4 ps-3">
             
               <li :class="{'active': $route.name === 'e2'}" class="nav-item ">
                 <router-link  to="/Consultar-nota" :class="{'active': $route.name === 'e2'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> N </span>
                    <span class="sidenav-normal letras fuente">Notas </span>
                </router-link>
              </li>
               <li :class="{'active': $route.name === 'e3'}" class="nav-item ">
                 <router-link  to="/Repote-estudiante" :class="{'active': $route.name === 'e3'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> R </span>
                    <span class="sidenav-normal letras fuente">Reportes </span>
                </router-link>
              </li>
               <li :class="{'active': $route.name === 'e4'}" class="nav-item ">
                 <router-link  to="/Historia-estudiante" :class="{'active': $route.name === 'e4'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> H </span>
                    <span class="sidenav-normal letras fuente">Historial </span>
                </router-link>
              </li>
              
              
            </ul>
          </div>
        </li>
         <li class="nav-item" v-if="user.roles.includes('Estudiante')">
          <a :class="{'actived': $route.name === 'es1'||$route.name === 'es2'}"
          data-bs-toggle="collapse" href="#componentsExamples10" class="nav-link " aria-controls="componentsExamples10" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
               <i class="fa fa-university text-dark" style="font-size:15px" aria-hidden="true"></i>
            </div>
            <span  class="nav-link-text ms-1">Aulas Virtuales</span>
          </a>
          <div  :class="{'show':
          $route.name === 'es1'||
          $route.name === 'es2'}"
          class="collapse " id="componentsExamples10">
            <ul class="nav ms-4 ps-3">
               <li :class="{'active': $route.name === 'es1'}" class="nav-item ">
                 <router-link  to="/my-lista" :class="{'active': $route.name === 'es1'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> P </span>
                    <span class="sidenav-normal letras fuente">Mi Aula </span>
                </router-link>
              </li>
               
              <li :class="{'active': $route.name === 'es2'}" class="nav-item ">
                 <router-link  to="/all-lista" :class="{'active': $route.name === 'es2'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> P </span>
                    <span class="sidenav-normal letras fuente">Todos Los cursos </span>
                </router-link>
              </li>
              
            </ul>
          </div>
        </li>
           <li class="nav-item" >
          <a 
          data-bs-toggle="collapse" href="#pagePublic" class="nav-link " aria-controls="pagePublic" role="button" aria-expanded="false">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
               <i class="fa fa-external-link-square text-dark" style="font-size:15px" aria-hidden="true"></i>
            </div>
            <span  class="nav-link-text ms-1">Otros</span>
          </a>
          <div  
          class="collapse " id="pagePublic">
            <ul class="nav ms-4 ps-3">
             <li  class="nav-item " >
                 <a target="_blank" href="https://pcei-tulcan.com/" class="nav-link ">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal letras fuente">Página pública </span>
                </a>
              </li>
               
              <li  class="nav-item " >
                 <a  @click="logout" href="javascript:;" class="nav-link ">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal letras fuente">Cerrar sesión </span>
                </a>
              </li>
              
            </ul>
          </div>
        </li>
      </ul>
    </div>
    
  </aside>
</template>

<script>
 export default {
     name: 'Header',
     data() {
       return {
         user: this.$store.state.user,
       }
     },
    methods: {
      logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("datos");
      localStorage.removeItem("Xf");
      this.$parent.isLoggedIn = false;
      this.$router.push("/").catch(()=>{});
      //window.location.reload(true);
    },
    },
 }
</script>
