<template>
  <div>
    <div
      class="d-flex justify-content-around s-bg-white bottom-navigation-bar s-border-top-grey-300 s-row s-nowrap s-fixed s-bottom-0 s-z-fixed s-w-full">

        <router-link v-if="user.roles.includes('Estudiante')"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none  s-blue-500 s-color-grey-600 undefined"
        to="/Consultar-nota"> <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        <p class="text s-font-semibold">Notas</p>
      </router-link>
      <router-link v-if="user.roles.includes('Estudiante')"  :class="{'s-actives': $route.name === 'es2'}"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/all-lista"><svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        <p class="text s-font-semibold">Cursos</p>
      </router-link>
      <router-link v-if="user.roles.includes('Estudiante')"  :class="{'s-actives': $route.name === 'es1'}"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/my-lista"> <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955 0h10.932M4 19.05h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v13.05a2 2 0 002 2z"></path></svg>
        <p class="text s-font-semibold">Mis cursos</p>
      </router-link>


      <router-link v-if="user.roles.includes('Docente')"  :class="{'s-actives': $route.name === 'd2'||$route.name === 'd4'}"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/opciones-curso"> <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        <p class="text s-font-semibold">Cursos</p>
      </router-link>
      <router-link v-if="user.roles.includes('Docente')"  :class="{'s-actives': $route.name === 'al'}"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/aulas-lista"> <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955 0h10.932M4 19.05h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v13.05a2 2 0 002 2z"></path></svg>
        <p class="text s-font-semibold">Aula virtual</p>
      </router-link>
      <router-link v-if="user.roles.includes('Docente')"  :class="{'s-actives': $route.name === 'dr'}"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/zoom"><svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
        <p class="text s-font-semibold">Zoom</p>
      </router-link>

      <router-link v-if="user.roles.includes('Docente')||user.roles.includes('Estudiante')"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/perfil"><svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M17 11l2 2 4-4"></path></svg>
        <p class="text s-font-semibold">Perfil</p>
      </router-link>
      
      <router-link v-if="user.roles.includes('Docente')||user.roles.includes('Estudiante')"
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/perfil-docen">
        <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="20" ><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path></svg>
        <p class="text s-font-semibold">Calendario</p>
      </router-link>
      <router-link v-if="user.roles.includes('Admin')"
        class="text-xs s-color-grey-600 undefined"
        to="/">
       
        <span class="text s-font-semibold">EL ADMINISTRADOR NO TIENE CONFIGURACION MOVIL</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
    }
  },
};
</script>

<style>
.bottom-navigation-bar.show {
  transform: none;
}
.s-bottom-0 {
  bottom: 0;
  left: 0;
}
.s-nowrap {
  flex-wrap: nowrap;
}
.s-w-full {
  width: 100%;
}
.s-z-fixed {
  z-index: 9999;
}
.s-fixed {
  position: fixed;
}
.bottom-navigation-bar {
  height: 3.5rem;
  transition: transform .5s;
  padding-bottom: env(safe-area-inset-bottom);
}
.s-bg-white {
  background: white;
}
.s-border-top-grey-300 {
  border-top: 1px solid #ecf0f3;
}
a:hover {
    color: #019df4 !important;
}
.s-decoration-none {
  text-decoration: none !important;
}
.s-nowrap {
  flex-wrap: nowrap;
}
.s-flex-none {
  flex: none;
}
.bottom-navigation-item {
  width: 20%;
  margin-bottom: 0;
}
.s-color-grey-600 {
  color: rgb(94 94 96);
}
.s-cross-center {
  align-items: center;
  align-content: center;
}
.s-main-center {
  justify-content: center;
}
.s-column {
  flex-direction: column;
}
.bottom-navigation-item .text {
  font-size: .625rem;
}
.s-font-semibold {
  font-weight: 700;
}
.s-iconsm {
  display: block;
  font-size: 15px;
  line-height: 12px;
  padding-top: 8px;
}
.s-actives {
  color: #019df4 !important;
}
</style>