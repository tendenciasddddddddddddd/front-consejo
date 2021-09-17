<template>
  <nav 
    class="
      navbar navbar-main navbar-expand-lg
      position-sticky
      mt-4
      top-1
      px-0
      mx-4
      border-radius-xl
      z-index-sticky
      blur
      shadow-blur
      left-auto
      mol
    "
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="container-fluid py-1 px-3">
     <h6 class="font-weight-bolder mb-0 fuente">Sistema Hibrido</h6> &nbsp;&nbsp;
      <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none">
        <a href="javascript:;" class="nav-link text-body p-0">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </a>
      </div>
      <div
        class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar"
      >
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
          <div class="input-group">
            <span class="input-group-text text-body"
              ><i class="fas fa-search" aria-hidden="true"></i
            ></span>
            <input
              type="text"
              class="form-control"
              placeholder="Type here..."
            />
          </div>
        </div>

        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="javascript:;"
              class="nav-link text-body p-0"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          <li class="nav-item px-3 d-flex align-items-center">
            <a  class="nav-link text-body p-0 fuente">
            {{nombre}}
            </a>
          </li>
          <li class="nav-item dropdown pe-2 d-flex align-items-center">
            <a
              href="javascript:;"
              class="nav-link text-body p-0"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="avatar me-3 ">
                
                <img
                  :src="foto"
                  alt="kal"
                  class="border-radius-lg shadow "
                />
              </div>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end px-2 py-3  me-sm-n4"
              aria-labelledby="dropdownMenuButton"
            >
            
              <li class="text-center">
                <a style="font-size: 16px"
                  class="fuente text-dark"
                  @click="logout"
                >
               Salir
                 
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
const info = JSON.parse(localStorage.getItem('Xf'));
export default {
  name: "Inicio",
  data() {
    return {
      user: this.$store.state.user,
      foto: info.foto,
      
      nombre: info.nombre,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("datos");
      localStorage.removeItem("Xf");
      this.$parent.isLoggedIn = false;
      this.$router.push("/")
      //window.location.reload(true);
    },
  },
 

};
</script>
