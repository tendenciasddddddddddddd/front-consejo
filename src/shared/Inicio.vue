<template>
  <nav style="box-shadow: none !important;  "
    class="
      navbar navbar-main navbar-expand-lg
      position-sticky
      mt-1
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
     <h6 class="font-weight-bolder mb-0 "> <b style="color: #ff7a59;font-size: 32px;"><i class='bx bxs-cube'></i></b> <span></span>  </h6> 
     <div >
        
            
       <h6 class="ms-3" style="color:#273b49" v-if="!$store.state.isAppMobile"> Hola, {{nombre}}</h6>
       <h6 class="ms-3 me-3" style="color:#273b49" v-else>  {{nombre.slice(0,11)}}...</h6>
     </div>
      <div
        class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar" 
      >
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
         
         <i style="color: black;font-size:26px;" class="bx bx-search me-3" aria-hidden="true"></i>
         <i style="color: black;font-size:26px;" class="bx bx-cog me-3" aria-hidden="true"></i>
         
           <i style="color: black;font-size:26px;" class='bx bx-bell' aria-hidden="true"></i>
        </div>

        <ul class="navbar-nav justify-content-end">
         
          <!-- <li class="nav-item px-3 d-flex align-items-center">
            
            <template v-if="isOnline"></template>
            <template v-else>
              <div>
                 <div  class="loadingg">
                  <div class="inn ">
                    <i class='bx bx-wifi-off' style="font-size:150px"></i>
                
                            <p class="parrafo text-dark">En este momento no tienes conexión a internet.</p>
                  </div>

                </div>
              </div>
            </template>
           
          </li> -->
          <li class="nav-item dropdown pe-2 d-flex align-items-end">
            <a
              href="javascript:;"
              class="nav-link text-body p-0"
              @click="activar"
            >
              <div class="avatar me-3 ">
                
                <img
                  :src="$store.state.avatar"
                  alt="kal"
                  class="avatar avatar-sm rounded-circle"
                />
              </div>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end px-2 py-3  me-sm-n4"
              
              :class="{ 'show': isActive === true }"
            >
 
              <li class="mb-2 text-center">
                
                <a style="font-size: 16px"
                  class="fuente text-sm "
                  @click="logout"
                >
                <b class="links">Cerrar sesión</b>
               
                 
                </a>
              </li>
            </ul>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
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
      isActive: false,
    };
  },
  methods: {
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
    activar(){
      if (this.isActive) {
        this.isActive=false;
      }else{
        this.isActive=true;
      }
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
            }
  },
  created() {
    this.inforUsers();
    this.isMobile();
  }
  
};
</script>
