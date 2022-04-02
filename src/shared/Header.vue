<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0  fixed-start " id="sidenav-main" style="background-color: white !important; margin-top: 2.2rem!important;overflow-x: hidden;overflow-y: auto;" >
    <div class="sidenav-header">
     
      
      <a class="navbar-brand m-0" href="javascript:;"  >
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24px" height="24px" class="burger-icon opacity-transition s-absolute s-right-24px s-cursor-pointer s-flex-none s-to-right" fill="var(--text-color)"><path d="M2 8C2 6.89543 2.89543 6 4 6H28C29.1046 6 30 6.89543 30 8C30 9.10457 29.1046 10 28 10H4C2.89543 10 2 9.10457 2 8Z"></path><path d="M2 24C2 22.8954 2.89543 22 4 22H28C29.1046 22 30 22.8954 30 24C30 25.1046 29.1046 26 28 26H4C2.89543 26 2 25.1046 2 24Z"></path><path d="M2 16C2 14.8954 2.89543 14 4 14H28C29.1046 14 30 14.8954 30 16C30 17.1046 29.1046 18 28 18H4C2.89543 18 2 17.1046 2 16Z"></path></svg>
        
         <span class="sidenav-mini-icon" style="font-size:20px"> &nbsp; PCEI Tulcán </span>
      </a>
      
    </div>
    <hr class="horizontal dark mt-0">
    <div class="collapse navbar-collapse  w-auto h-auto max-height-vh-100 h-100" id="sidenav-collapse-main" style="overflow-x: hidden;overflow-y: hidden;">
      <ul class="navbar-nav">
        <li class="nav-item" id="step_1">
          <a data-bs-toggle="collapse" href="#dashboardsExamples" class="nav-link" 
          :class="{'actived': $route.name === 'default'||$route.name === '1'||$route.name === 'd1'||$route.name === 'e1'}" aria-controls="dashboardsExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
             
              <i class='bx bx-home-alt icons'></i>
            </div>
            <span class="nav-link-text ms-1 mt-1">Área personal</span>
          </a>
          <div  class="collapse " id="dashboardsExamples" :class="{'show': $route.name === 'default'||$route.name === '1'||$route.name === 'd1'||$route.name === 'e1'}">
            <ul class="nav ms-4 ps-3">
                <li :class="{'active': $route.name === 'default'}" class="nav-item">
                 <router-link  to="/" :class="{'active': $route.name === 'default'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> I </span>
                    <span class="sidenav-normal letras fuente"> &nbsp; Inicio </span>
                </router-link>
              </li>

               <li :class="{'active': $route.name === '1'}" class="nav-item " v-if="user.roles.includes('Admin')">
                 <router-link  to="/Users" :class="{'active': $route.name === '1'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> U </span>
                    <span class="sidenav-normal letras fuente">Usuarios </span>
                </router-link>
              </li>
                <li  class="nav-item ">
                 <a  @click="openCuenta" href="javascript:;"  class="nav-link ">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal letras fuente">Contraseña </span>
                </a>
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
        <li class="nav-item" v-if="user.roles.includes('Admin')" id="step_2">
          <a data-bs-toggle="collapse" href="#pagesExamples" class="nav-link " 
          :class="{'actived': $route.name === '000'||$route.name === '222' ||$route.name === '333'}"  aria-controls="pagesExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm border-radius-md text-center d-flex align-items-center justify-content-center  me-2">

               <i class='bx bx-edit-alt icons'></i>
            </div>
            <span class="nav-link-text ms-1 mt-1">Registros</span>
          </a>
          <div  class="collapse " :class="{'show':
          $route.name === '000'||
          $route.name === '222'||
          $route.name === '333'}"
           id="pagesExamples">
            <ul class="nav ms-4 ps-3">
                <li :class="{'active': $route.name === '000'}" class="nav-item ">
                 <router-link  to="/option-zonas" :class="{'active': $route.name === '000'}" class="nav-link ">
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
        <li class="nav-item" v-if="user.roles.includes('Admin')"  id="step_3">
          <a data-bs-toggle="collapse" href="#applicationsExamples" class="nav-link "
           :class="{'actived': $route.name === '1111'||$route.name === '2222'||$route.name === '2223'}" 
           aria-controls="applicationsExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
                
                <i class='bx bx-git-repo-forked icons' ></i>
            </div>
            <span class="nav-link-text ms-1 mt-1">Gestión Curso</span>
          </a>
          <div class="collapse " 
           :class="{'show':
          $route.name === '1111'||$route.name === '1234'||
          $route.name === '2222'||$route.name === '2223'}"
          id="applicationsExamples">
            <ul class="nav ms-4 ps-3">
             <li :class="{'active': $route.name === '1111'}" class="nav-item ">
                 <router-link  to="/Nivel" :class="{'active': $route.name === '1111'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal letras fuente">Cursos </span>
                </router-link>
              </li>
              <li :class="{'active': $route.name === '1234'}" class="nav-item ">
                 <router-link  to="/Materias" :class="{'active': $route.name === '1234'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> M </span>
                    <span class="sidenav-normal letras fuente">Materias </span>
                </router-link>
              </li>
              
               <li class="nav-item ">
                <a class="nav-link " :class="{'active': $route.name === '2222'|| $route.name === '2223'}"  data-bs-toggle="collapse" aria-expanded="false" href="#profileExample">
                  <span class="sidenav-mini-icon"> D </span>
                  <span class="sidenav-normal"> Distributivo <b class="caret"></b></span>
                </a>
                <div class="collapse " :class="{'show': $route.name === '2222' || $route.name === '2223'}"  id="profileExample">
                  <ul class="nav nav-sm flex-column">
                    <li :class="{'active': $route.name === '2222'}" class="nav-item ">
                      <router-link  to="/Distributivo-v1" :class="{'active': $route.name === '2222'}" class="nav-link ">
                        <span class="sidenav-mini-icon text-xs"> I </span>
                        <span class="sidenav-normal letras fuente"> Intensivo </span>
                      </router-link >
                    </li>
                    <li :class="{'active': $route.name === '2223'}" class="nav-item">
                       <router-link  to="/Distributivo-v2" :class="{'active': $route.name === '2223'}" class="nav-link ">
                        <span class="sidenav-mini-icon text-xs"> E </span>
                        <span class="sidenav-normal letras fuente"> Extraordinario </span>
                      </router-link >
                    </li>
                  </ul>
                </div>
              </li>
              
            </ul>
          </div>
        </li>
        <li class="nav-item" v-if="user.roles.includes('Admin')" id="step_4">
          <a data-bs-toggle="collapse" href="#ecommerceExamples" class="nav-link " 
           :class="{'actived': $route.name === '11'||$route.name === '77'||$route.name === 'r2'||$route.name === '71'}" aria-controls="ecommerceExamples" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
              
               <i class='bx bxs-copy-alt icons' ></i>
            </div>
            <span  class="nav-link-text ms-1 mt-1">Matriculas</span>
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
                    <span class="sidenav-mini-icon"> I </span>
                    <span class="sidenav-normal letras fuente">Intensivo </span>
                </router-link>
              </li>

                 <li :class="{'active': $route.name === '71'}" class="nav-item ">
                 <router-link  to="/Matricula-2" :class="{'active ': $route.name === '71'}" class="nav-link ">
                    <span class="sidenav-mini-icon"> E </span>
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
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
          
              <i class='bx bxs-group icons'></i>
            </div>
            <span class="nav-link-text ms-1 mt-1">Cursos</span>
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
            <div class="icon-shape icon-sm border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
             
              <i class='bx bxs-school icons' ></i>
            </div>
            <span class="nav-link-text ms-1 mt-1">Aulas Virtuales</span>
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
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
               <i class='bx bxs-graduation icons' ></i>
            </div>
            <span  class="nav-link-text ms-1 mt-1">Estudiante</span>
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
            <div class="icon-shape icon-sm  border-radius-md text-center d-flex align-items-center justify-content-center  me-2">
                <i class='bx bxs-school icons' ></i>
            </div>
            <span  class="nav-link-text ms-1 mt-1">Aulas Virtuales</span>
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
           <li class="nav-item" id="step_5">
          <a 
          data-bs-toggle="collapse" href="#pagePublic" class="nav-link " aria-controls="pagePublic" role="button" aria-expanded="false">
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
          
               <i class='bx bx-dialpad-alt icons' ></i>
            </div>
            <span  class="nav-link-text ms-1 mt-1">Otros</span>
          </a>
          <div  
          class="collapse " id="pagePublic">
            <ul class="nav ms-4 ps-3">
             <li  class="nav-item " >
                 <a target="_blank" href="https://pcei-tulcan.com/" class="nav-link ">
                    <span class="sidenav-mini-icon"> P </span>
                    <span class="sidenav-normal letras fuente">Página pública </span>
                </a>
              </li>
               
        
              
            </ul>
          </div>
        </li>
         <li class="nav-item mt-3">
          <h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">OPCION</h6>
        </li>
        <div class="nav-item" id="step_6">
             <li >
            <a 
           @click="toursMain()" class="nav-link "  role="button" aria-expanded="false" >
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
              <i class='bx bx-help-circle icons' ></i>
              
            </div>
             <span class="sidenav-mini-icon" > </span>
            <span  class="nav-link-text ms-1 mt-1 selectOption">¿Cómo funciona?</span>
            
          </a>
         
        </li>
         <li>
            <a 
           @click=" logout()" class="nav-link " role="button" aria-expanded="false" style="padding-top: 0px;">
            <div class="icon-shape icon-sm  border-radius-md  text-center d-flex align-items-center justify-content-center  me-2">
            
              <i class='bx bx-window-close icons' ></i>
            </div>
            <span  class="nav-link-text ms-1 mt-1 selectOption">
              <span class="sidenav-mini-icon">  </span>
                    
              Cerrar sesión
              </span>
          </a>
         
        </li>
        </div>
        <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour>
        <div v-if="visibl">
           <Cuenta @cerrarCuenta="close"/>
        </div>
      </ul>
    </div>
    
  </aside>
</template>

<script>
 export default {
     name: 'Header',
     components: {//../views/pagesAdmin/cuenta/Cuenta.vue
       Cuenta : () => import( /* webpackChunkName: "Cuenta" */ '../views/pagesAdmin/cuenta/Cuenta.vue'),
     },
     data() {
       return {
         user: this.$store.state.user,
         isMobile: false,
         visibl: false,
          myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: "Salir",
          buttonPrevious: "Anterior",
          buttonNext: "Siguiente",
          buttonStop: "¡Entendido!",
        },
      },
      steps: [
        {
          target: "#step_1", // We're using document.querySelector() under the hood
          header: {
            title: "Área personal",
          },
          content: `Aquí no solo encontrarás el home, sino tambien opción para cambiar contraseña y perfil.`,
          params: {
           highlight: true,
           placement: 'right'
          }
        },
        {
          target: "#step_2",
          header: {
            title: "Registros",
          },
          content: "Puedes registrar las zonas, estudiantes y docentes",
          params: {
           highlight: true,
           placement: 'right'
          }
        },
        {
          target: "#step_3",
           header: {
            title: "Gestión de los cursos",
          },
          content: "Puedes crear cursos, asignaturas y registrar el distributivo",
          params: {
           highlight: true,
           placement: 'right'
          }
        },
        {
          target: "#step_4", header: {
            title: "Matriculas",
          },
          content: "Encuentra en esta sección todas la matriculas de lad 2 modalidades y imprimir un reporte.",
           params: {
           highlight: true,
           placement: 'right'
          }
        },
        {
          target: "#step_5",
           header: {
            title: "Otros",
          },
          content: "Ubica aquí la página pública de la PCEI",
           params: {
           highlight: true,
           placement: 'right'
          }
        },
         {
          target: "#step_6",
           header: {
            title: "Mas Opciones",
          },
          content: "Si aún tienes dudas sobre como funciona la plataforma, con mucho gusto te podemos ayudar",
           params: {
           highlight: true,
           placement: 'right'
          }
        },
        {
          target: ".step_7",
           header: {
            title: "Herramientas",
          },
          content: "Puedes configurar esta pagina y recivir las notificaciones en tiempo real de la plataforma",
           params: {
           highlight: true,
           placement: 'bottom'
          }
        },
      ],
       }
     },
      beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
   mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
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
    onResize () {
      this.isMobile = window.innerWidth < 600
    },
    toursMain(){
       this.$tours["myTour"].start();
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
<style >
.v-tour__target--highlighted {
  box-shadow: 0 0 0 3px #7fd1de,  0 0 42px 0 rgb(0 163 189/ 70%) !important;
   z-index: 99999 !important;
   background: white !important;
}
.v-step[data-v-54f9a632]{
  position: fixed !important;
   box-shadow: 0 0 0 99999px rgba(0, 19, 51, 0.64) !important;
   background: white !important;
  color: black !important;
  padding: 0.75em;
  font-size: 13px;
    line-height: 20px;
      
}
.v-step__header[data-v-54f9a632] {

    background-color: #ffffff !important;
    font-weight: 700;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}
.v-step__button[data-v-54f9a632] {
 color: #4b22f4 !important;
  font-weight: 700;
  font-size: 16px !important;
}
.v-step__arrow--dark[data-v-54f9a632]:before {
    background: #ffffff !important;
}


</style>