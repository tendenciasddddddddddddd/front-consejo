<template>
  <header id="header" class="header fixed-top d-flex align-items-center"
    style="background-image: linear-gradient(90deg, rgb(0, 196, 204), rgb(125, 42, 232));">

    <div class="d-flex align-items-center justify-content-between">
      <i class="bi bi-list toggle-sidebar-btn text-white " @click="toggleBodyClass()"></i>
      <span class="logo d-flex align-items-center">
        <span class="d-none d-lg-block text-white">
          <svg style="color: #fbbe28;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16">
              <path fill="currentColor"
                d="M7.51 4.87C7.01 6.27 6.45 6.95 5.94 7c-.57.07-1.07-.18-1.54-.8a.54.54 0 0 0-.1-.1 1 1 0 1 0-.8.4l.01.12.82 3.24A1.5 1.5 0 0 0 5.78 11h4.44a1.5 1.5 0 0 0 1.45-1.14l.82-3.24a.54.54 0 0 0 .01-.12 1 1 0 1 0-.8-.4.54.54 0 0 0-.1.09c-.49.62-1 .87-1.54.81-.5-.05-1.04-.74-1.57-2.13a1 1 0 1 0-.98 0zM11 11.75a.5.5 0 1 1 0 1H5a.5.5 0 1 1 0-1h6z">
              </path>
            </svg>
            U.E Libertad</span>

      </span>
      
    </div><!-- End Logo -->

    <div class="search-bar">
      <div class="search-form d-flex align-items-center" >
        <input v-on:click="greet" v-model="texto" type="text" name="query" placeholder="Empezar a escribir..." >
        <button v-on:click="greet" type="submit" title="Search"><i class="bi bi-search"></i></button>
      </div>
    </div><!-- End Search Bar -->
    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">

        <li class="nav-item d-block d-lg-none">
          <a class="nav-link nav-icon search-bar-toggle " >
            <i class="bi bi-search "></i>
          </a>
        </li><!-- End Search Icon-->

        <li class="nav-item dropdown">
          <svg @click="config" v-tooltip="'Configuración'" class="me-3" data-testid="geist-icon" fill="none"
              height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"
              style="color: #fff; cursor: pointer;">
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z">
              </path>
            </svg>
         

        </li><!-- End Notification Nav -->

        <li class="nav-item dropdown">

          <svg @click="openNotification" v-tooltip="'Notifications'" class="me-3" data-testid="geist-icon" fill="none"
              height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"
              style="color: #fff; cursor: pointer;">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 01-3.46 0"></path>
            </svg>

        </li><!-- End Messages Nav -->
        <button class="btn btnNaranja me-3 d-none d-lg-block"
          style="color: #000 !important; background-color: rgb(255 255 255) !important;font-weight: 600 !important;"
          @click="logout">
          <svg data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color:#000;"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"></path><path d="M10 17l5-5-5-5"></path><path d="M15 12H3"></path></svg>
 &nbsp;
          Cerrar</button>
        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img :src="$store.state.avatar" alt="Profile" class="rounded-circle">
            <span class="d-none d-md-block dropdown-toggle ps-2 text-white">{{ nombre.slice(0, 1) }}.
              {{ nombre.toString().split(' ')[1] }}</span>
          </a><!-- End Profile Iamge Icon -->

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <span>{{ nombre}}</span>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>

              <router-link class="dropdown-item d-flex align-items-center" to="/perfil">
                <i class="bi bi-person"></i>
                <span>Mi Perfil</span>
              </router-link>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <i class="bi bi-question-circle"></i>
                <span>Necesitas ayuda?</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" @click="logout" href="#">
                <i class="bi bi-box-arrow-right"></i>
                <span>Desconectar</span>
              </a>
            </li>

          </ul><!-- End Profile Dropdown Items -->
        </li><!-- End Profile Nav -->

      </ul>
    </nav><!-- End Icons Navigation -->
    <section v-if="ifNotification">
      <FullModal @close="closeNotification">
        <template v-slot:header> Notificaciones</template>
        <template v-slot:body>
          <div class="text-center mt-8">
            <img src="../assets/img/notify.svg" alt=""><br>
            <span class="h5 negros fuente mt-3 " style="font-weight: 400;">No tienes notificaciones</span>
            <p class="parrafo p-5">Pero tan pronto como algo suceda, lo encontrarás aquí mismo.</p>
          </div>
        </template>
      </FullModal>
    </section>
    <section v-if="ifSeach">
      <Seach @CloseSeach="closeSeach" :texto="texto" />
    </section>
  </header>

</template>

<script>

 
export default {
  name: "Inicio",
  data() {
    return {
      user: this.$store.state.user,
      foto: '',
      nombre: '',
      avatar2: 'https://res.cloudinary.com/stebann/image/upload/v1634918496/default-100_namn33.webp',
      ifNotification: false,
      ifSeach: false,
      texto: '',
    };
  },
  components: {
  FullModal: () => import( /* webpackChunkName: "FullModal" */ './FullModal.vue'),
     Seach: () => import( /* webpackChunkName: "Seach" */ './Seach.vue'),
  },
  methods: {
    greet() {
      this.ifSeach = true;
    },
    toggleBodyClass() {
    const el = document.body;
    if (!el.classList.contains('toggle-sidebar')) {
      el.classList.add('toggle-sidebar');
    } else {
      el.classList.remove('toggle-sidebar');
    }
  },
    config() {
      this.$router.push({ path: `/settings` });
    },
    openNotification() {
      this.ifNotification = true;
    },
    closeNotification() {
      this.ifNotification = false;
    },
    openSeach() {
      this.ifSeach = true;
      this.texto = ''
    },
    closeSeach() {
      this.ifSeach = false;
      this.texto = ''
    },
    logout() {
      localStorage.clear();
      this.$parent.isLoggedIn = false;
      this.$router.push("/").catch(() => { });
      //window.location.reload(true);
    },
    inforUsers() {
      const info = JSON.parse(localStorage.getItem('Xf'));
      const avatar = JSON.parse(localStorage.getItem('Avatar'));
      let img = avatar;
      this.$store.commit('agregar2', { img })
      this.nombre = info.nombre;
    },
    isMobile() {
      let estado;
      if (screen.width <= 800) {
        estado = true;
        this.$store.commit('updatepx', { estado })
      }
      else {
        estado = false;
        this.$store.commit('updatepx', { estado })
      }
    },

  },
  created() {
    this.inforUsers();
    this.isMobile();
  }

};
</script>
