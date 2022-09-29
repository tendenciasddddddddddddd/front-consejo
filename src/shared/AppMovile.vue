<template>
  <div>
    <div
      class="d-flex justify-content-around s-bg-white bottom-navigation-bar r-top-grey-300 s-row s-nowrap s-fixed s-bottom-0 s-z-fixed s-w-full"
    >
      <router-link
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
       to="/"
        ><i class='bx bx-home-alt s-iconsm'></i> <span class="text s-font-semibold">Inicio</span></router-link
      ><router-link
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none active s-blue-500 undefined"
        to="/opciones-curso"
        > <i class='bx bx-sitemap s-iconsm' ></i>
        <span class="text s-font-semibold">Cursos</span></router-link
      ><router-link
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/aulas-lista"
        > <i class='bx bxs-school s-iconsm' ></i>
        <span class="text s-font-semibold">Aula virtual</span></router-link
      ><router-link
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
        to="/perfil-docente"
        > <i class='bx bx-group s-iconsm' ></i>
        <span class="text s-font-semibold">Perfil</span></router-link
      ><router-link
        class="bottom-navigation-item s-decoration-none text-center s-column s-cross-center s-main-center s-nowrap s-flex-none s-color-grey-600 undefined"
       to="/perfil-docente"
        ><div class="notification-btn s-relative undefined false">
           <i class='bx bxs-calendar-event s-iconsm' ></i>
        </div>
        <span class="text s-font-semibold">Calendario</span></router-link
      >
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
    left:0;
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
    height:3.5rem;
    transition: transform .5s;
    padding-bottom: env(safe-area-inset-bottom);
}
.s-bg-white {
    background: white;
}
.s-border-top-grey-300 {
    border-top: 1px solid #ecf0f3;
}
.s-decoration-none {
    text-decoration: none!important;
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
    color: #687782;
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
    font-weight: 600;
}
.s-iconsm{
    display: block;
    font-size: 22px;
    line-height: 12px;
    padding-top: 8px;
}
</style>
