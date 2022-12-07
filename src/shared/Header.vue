<template>
  <aside id="sidebar" class="sidebar" >

<ul class="sidebar-nav" id="sidebar-nav">

  <li class="nav-item">
    <router-link to="/" :class="{'actives': $route.name === 'default'}" class="nav-link ">
      <i class="bi bi-grid"></i>
      <span>Inicio</span>
    </router-link>
    
  </li><!-- End Dashboard Nav -->
  <li class="nav-heading">Pages</li>
  <li class="nav-item">
    <a class="nav-link collapsed" data-bs-target="#components-nav" :class="{'activesli': $route.name === 'd1'||$route.name === 'e1'}"
    data-bs-toggle="collapse" href="#">
      <i class="bi bi-menu-button-wide"></i><span>Área personal</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav"  :class="{'show': $route.name === 'd1'||$route.name === 'e1'}">
      <li>
        <a @click="openCuenta()">
          <i class="bi bi-circle"></i><span>Contraseñas</span>
        </a>
      </li>
      <li>
        <router-link :class="{'actives': $route.name === 'd1'}" @click.native="Resize" to="/perfil">
          <i class="bi bi-circle" :class="{'activex': $route.name === 'd1'}"></i><span>Perfil</span>
        </router-link>
      </li>
     
      
    </ul>
  </li><!-- End Components Nav -->

  <li class="nav-item" v-if="user.roles.includes('Admin')">
    <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#" :class="{'activesli': $route.name === '1'||$route.name === '222'||$route.name === '333'}">
      <i class="bi bi-journal-text"></i><span>Registros</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav"  :class="{'show': $route.name === '1'||$route.name === '222'||$route.name === '333'}">
      <li>
        <router-link to="/Users" @click.native="Resize" :class="{'actives': $route.name === '1'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '1'}"></i><span>Usuarios de sistema</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Estudiate" @click.native="Resize" :class="{'actives': $route.name === '222'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '222'}"></i><span>Estudiantes</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Docente" @click.native="Resize" :class="{'actives': $route.name === '333'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '333'}"></i><span>Docentes</span>
        </router-link>
      </li>
     
    </ul>
  </li><!-- End Forms Nav -->

  <li class="nav-item"  v-if="user.roles.includes('Admin')||user.roles.includes('Vicerrector')" id="step_3">
    <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#" 
    :class="{'activesli': $route.name === '1111'||$route.name === '2222'||$route.name === '3333'||$route.name === '1234'||$route.name === '4444'}">
      <i class="bi bi-layout-text-window-reverse"></i><span>Gestión Curso</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav" 
    :class="{'show': $route.name === '1111'||$route.name === '2222'||$route.name === '3333'||$route.name === '1234'||$route.name === '4444'}">
      <li>
        <router-link to="/Cursos" @click.native="Resize" :class="{'actives': $route.name === '1111'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '1111'}"></i><span>Cursos</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Materias" @click.native="Resize" :class="{'actives': $route.name === '1234'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '1234'}"></i><span>Materias</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Distributivo-v1" @click.native="Resize" :class="{'actives': $route.name === '2222'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '2222'}"></i><span>Distributivo</span>
        </router-link>
      </li>
      
      <!-- <li>
        <router-link to="/tutores" @click.native="Resize" :class="{'actives': $route.name === '4444'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '4444'}"></i><span>Tutores</span>
        </router-link>
      </li> -->
      <li>
        <router-link to="/planificacion" @click.native="Resize" :class="{'actives': $route.name === '3333'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '3333'}"></i><span>Planificaciones</span>
        </router-link>
      </li>
    </ul>
  </li><!-- End Tables Nav -->

  <li class="nav-item" v-if="user.roles.includes('Admin')">
    <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#"
    :class="{'activesli': $route.name === '77'||$route.name === 'r2'}">
      <i class="bi bi-bar-chart"></i><span>Matriculas</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav" :class="{'show': $route.name === '77'|| $route.name === 'r2'}">
      <li>
        <router-link to="/Intensivo" @click.native="Resize" :class="{'actives': $route.name === '77'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === '77'}"></i><span>Matricula</span>
        </router-link>
      </li>
      <li>
        <router-link to="/opciones-reportes" @click.native="Resize" :class="{'actives': $route.name === 'r2'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === 'r2'}"></i><span>Reportes</span>
        </router-link>
      </li>
    </ul>
  </li><!-- End Charts Nav -->

  <li class="nav-item" v-if="user.roles.includes('Admin')">
    <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#" :class="{'activesli': $route.name === 's1'}">
      <i class="bi bi-gear"></i><span>Configuración</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav" >
      <li>
        <router-link to="/settings" @click.native="Resize" :class="{'actives': $route.name === 's1'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === 's1'}"></i><span>Setting</span>
        </router-link>
      </li>
      <li>
        <a @click="openApertura" style="cursor:pointer">
          <i class="bi bi-circle"></i><span>Apertura de notas</span>
        </a>
      </li>
     
    </ul>
  </li><!-- End Icons Nav -->

 
  <li class="nav-item" v-if="user.roles.includes('Docente')">
    <a class="nav-link collapsed" data-bs-target="#notas-nav" data-bs-toggle="collapse" href="#"
    :class="{'activesli': $route.name === 'd2'||$route.name === 'dh'||$route.name === 'dr'}">
    <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" class="icons" style="color: rgb(0, 0, 0);"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M7 7h3v9H7z"></path><path d="M14 7h3v5h-3z"></path></svg>
      <span class="ms-2">Módulo notas</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="notas-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav" :class="{'show':
          $route.name === 'd2'||
          $route.name === 'dh'||
          $route.name === 'dr'}">
      <li>
        <router-link to="/opciones-curso" @click.native="Resize" :class="{'actives': $route.name === 'd2'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === 'd2'}"></i><span>Cursos asignados</span>
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/tutoresDocente" @click.native="Resize" :class="{'actives': $route.name === 'dh'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === 'dh'}"></i><span>Reportes</span>
        </router-link>
      </li> -->
      <li>
        <router-link to="/zoom" @click.native="Resize" :class="{'actives': $route.name === 'dr'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === 'dr'}"></i><span>Zoom</span>
        </router-link>
      </li>
    </ul>
  </li>
  <li class="nav-item" v-if="user.roles.includes('Estudiante')">
    <a class="nav-link collapsed" data-bs-target="#notas-nav" data-bs-toggle="collapse" href="#"
    :class="{'actived': $route.name === 'e2'}">
    <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" class="icons" style="color: rgb(0, 0, 0);"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M7 7h3v9H7z"></path><path d="M14 7h3v5h-3z"></path></svg>
      <span class="ms-2">Módulo notas</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="notas-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav" :class="{'show':
          $route.name === 'e2'||
          $route.name === 'e4'}">
      <li>
        <router-link to="/Consultar-nota"  @click.native="Resize" :class="{'actives': $route.name === 'e2'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === 'e2'}"></i><span>Calificaciones</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Historia-estudiante" @click.native="Resize" :class="{'actives': $route.name === 'e4'}">
          <i class="bi bi-circle" :class="{'activex': $route.name === 'e4'}"></i><span>Historial</span>
        </router-link>
      </li>
      
    </ul>
  </li>
  <li class="nav-item" v-if="user.roles.includes('Docente')">
    <router-link class="nav-link collapsed" @click.native="Resize" to="/aulas-lista" :class="{'activesli': $route.name === 'al'}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icons"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 18.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h6.5c.275 0 .5.225.5.5v13.5H4Zm8.5 1.497V20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.5c1.102 0 2 .895 2 2v3.997h2L20 9c1.105 0 2 .892 2 2v7l-1.5-.001V11c0-.278-.222-.5-.5-.5l-3.126-.001-4.374-.002v8l7.5.003a.5.5 0 0 0 .5-.5H22a2 2 0 0 1-2 2l-7.5-.003ZM5 7.497h4.5v-1.5H5v1.5Zm0 3h4.5v-1.5H5v1.5Zm4.5 3H5v-1.5h4.5v1.5Zm-4.5 3h4.5v-1.5H5v1.5Zm11-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Zm3-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Z" fill="currentColor"></path></svg>
      <span class="ms-2">Aulas Virtuales</span>
    </router-link>
   
  </li>
  <li class="nav-item" v-if="user.roles.includes('Estudiante')">
    <router-link class="nav-link collapsed" to="/my-lista"  @click.native="Resize" :class="{'activesli': $route.name === 'es1'}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icons"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 18.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h6.5c.275 0 .5.225.5.5v13.5H4Zm8.5 1.497V20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.5c1.102 0 2 .895 2 2v3.997h2L20 9c1.105 0 2 .892 2 2v7l-1.5-.001V11c0-.278-.222-.5-.5-.5l-3.126-.001-4.374-.002v8l7.5.003a.5.5 0 0 0 .5-.5H22a2 2 0 0 1-2 2l-7.5-.003ZM5 7.497h4.5v-1.5H5v1.5Zm0 3h4.5v-1.5H5v1.5Zm4.5 3H5v-1.5h4.5v1.5Zm-4.5 3h4.5v-1.5H5v1.5Zm11-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Zm3-3h-2v-1.5h2v1.5Zm0 3h-2v-1.5h2v1.5Z" fill="currentColor"></path></svg>
      <span class="ms-2">Aulas Virtuales</span>
    </router-link>
   
  </li>
  <li class="nav-item">
    <router-link class="nav-link collapsed" to="/apps" @click.native="Resize" :class="{'activesli': $route.name === 'app1'}">
      <i class="bi bi-card-list"></i>
      <span>Aplicaciones</span>
    </router-link>
  </li>


  <div v-if="visibl">
          <Password @cerrarCuenta="close" />
        </div>
        <div v-if="ifApertura">
          <Apertura @myEventCloseApertura="close2" />
        </div>
</ul>

</aside>
</template>
<style>
.actives{
  color: #8b3dff !important;
}
.activesli{
  background: #eef1f7 !important;
  color: #8b3dff !important;
}
.activex{
  background-color: #8b3dff;
}

</style>
<script>
export default {
  name: 'Header',
  components: {//../views/pagesAdmin/cuenta/Cuenta.vue
    Password: () => import( /* webpackChunkName: "Password" */ '../views/password/Password.vue'),
    Apertura: () => import( /* webpackChunkName: "Apertura" */ '../views/settings/Apertura.vue'),
  },
  data() {
    return {
      user: this.$store.state.user,
      isMobile: false,
      visibl: false,
      nombre : false,
      ifApertura : false,
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
    Resize () {
    let Mobile = window.innerWidth < 1200
    if (Mobile) {
      this.toggleBodyClass()
    }
  },
  toggleBodyClass() {
    const el = document.body;
    el.classList.remove('toggle-sidebar');
  },
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
    openApertura() {
      this.ifApertura = true;
    },
    close() {
      this.visibl = false;
    },
    close2(){
      this.ifApertura = false;
    },
    inforUsers() {
      const info = JSON.parse(localStorage.getItem('Xf'));
      if (info) this.nombre = info.nombre;
    },
  },
}
</script>