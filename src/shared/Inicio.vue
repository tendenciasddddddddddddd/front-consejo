<template>
  <div>
    <nav style="box-shadow: none !important;  "
    class="
      navbar navbar-main navbar-expand-lg
      position-sticky
      top-1
      px-0
      mx-4
      border-radius-xl
      z-index-sticky
      blur
      shadow-blur
      left-auto
      step_7
    "
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="container-fluid py-1 px-1" >
     
     <svg  v-if="!$store.state.isAppMobile" aria-label="Vercel Logo" fill="#000" viewBox="0 0 75 65" width="20"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>
     <div  v-if="!$store.state.isAppMobile">
        
         <span class="ms-3 s-title-page">
        {{$store.state.first_text}}
        <svg data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color:#000"><path d="M16.88 3.549L7.12 20.451"></path></svg>
       
       {{$store.state.last_text}}</span
      >
     </div>
      <div
        class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar" 
      >
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
         <svg @click="openSeach" v-tooltip="'Buscar..'" class="me-3" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color: #000; cursor: pointer;"><path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path><path d="M16 16l4.5 4.5"></path></svg>
         <svg @click="config" v-tooltip="'Configuración'" class="me-3" data-testid="geist-icon" fill="none" height="21" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="21" style="color: #000; cursor: pointer;"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>
        <svg @click="openNotification" v-tooltip="'Notifications'" class="me-3" data-testid="geist-icon" fill="none" height="21" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="21" style="color: #000; cursor: pointer;"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 01-3.46 0"></path></svg>
        <svg v-tooltip="'Cerrar sesión'"  @click="logout" data-testid="geist-icon" fill="none" height="21" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="21" style="color: #000; cursor: pointer;"><path d="M18.36 6.64a9 9 0 11-12.73 0"></path><path d="M12 2v10"></path></svg>
        
        </div>

        <ul class="navbar-nav justify-content-end">
         
          <li class="nav-item dropdown  d-flex align-items-end">
            <a
              href="javascript:;"
              class="nav-link text-body p-0"
            >
              <div class="avatar me-3 ">
                
                <img
                  :src="$store.state.avatar"
                  alt="kal"
                  class="avatar avatar-sm rounded-circle"
                />
              </div>
            </a>
          </li>
        </ul>
      </div>
     
    </div>
   
  </nav>
  <section v-if="ifNotification">
        <FullModal @close="closeNotification">
            <template v-slot:header> Notificaciones</template>
            <template v-slot:body>
                <div class="text-center mt-8">
                  <img src="https://static.hsappstatic.net/ui-images/static-2.437/optimized/success.svg" alt=""><br>
                  <span class="h5 negros fuente mt-3 " style="font-weight: 400;">No tienes notificaciones</span>
                  <p class="parrafo p-5">Pero tan pronto como algo suceda, lo encontrarás aquí mismo.</p>
                </div>
            </template>
        </FullModal>
      </section>
      <section v-if="ifSeach">
        <Seach @CloseSeach="closeSeach"/>
      </section>
  </div>
  
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
    };
  },
  components: { 
    FullModal: () => import( /* webpackChunkName: "FullModal" */ './FullModal.vue'),
    Seach: () => import( /* webpackChunkName: "Seach" */ './Seach.vue'),
  },
  methods: {
    config(){
      this.$router.push({ path: `/settings` });
    },
    openNotification(){
      this.ifNotification = true;
    },
    closeNotification(){
      this.ifNotification = false;
    },
    openSeach(){
      this.ifSeach = true;
    },
    closeSeach(){
      this.ifSeach = false;
    },
    logout() {
      localStorage.clear();
      this.$parent.isLoggedIn = false;
      this.$router.push("/").catch(()=>{});
      //window.location.reload(true);
    },
    inforUsers(){
      const info = JSON.parse(localStorage.getItem('Xf'));
      const avatar = JSON.parse(localStorage.getItem('Avatar'));
      let img= avatar;
      this.$store.commit('agregar2',{img})
      this.nombre= info.nombre;
    },
     isMobile() {
       let estado;
                if( screen.width <= 760 ) {
                  estado = true;
                    this.$store.commit('updatepx',{estado})
                }
                else {
                  estado = false;
                  this.$store.commit('updatepx',{estado})
                }
            },
     
  },
  created() {
    this.inforUsers();
    this.isMobile();
  }
  
};
</script>
