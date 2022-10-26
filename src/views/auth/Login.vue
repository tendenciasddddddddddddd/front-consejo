<template>
  <div v-bind:style="{ 'background-image': 'url(' + fondo + ')' }" style="
      background-size: 100% auto;background-position: top;    min-height: calc(100vh - 30px);">
        <main class="main-content main-content-bg mt-0"  >
      <section>
        <div class="page-header ">
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-5 col-md-6  mx-auto" >
                <div class="">
                  <div v-if="isVisible == 'logins'" class="card card-plain  mt-4" style="background: #fff;border-radius: 6px;">
                    <div class="card-header pb-0 text-center" >
                      <h3 class="negros fuente">
                        PLATAFORMA
                      </h3>
                      <p class="parrafo">
                        Ingrese su email o cédula y contraseña para iniciar sesión
                      </p>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="authenticate" class="text-start">
                        <span class="parrafo ">Cédula o dirección de correo </span>
                        <div class="mb-3 mt-1">
                          <input v-model="login.email" id="username" type="text" class="form-control buscador fuente"
                            aria-label="Email" required autocomplete="off" />
                        </div>

                        <span class="parrafo mt-2">Contraseña
                          <span style="font-size: 17px;cursor: pointer;" class="ms-2"><i @click="toggleShow" class="fas"
                              :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i></span>

                        </span>
                        <div class="mb-3 mt-1">
                          <input v-if="showPassword" type="text" class="form-control buscador fuente"
                            v-model="login.password" />
                          <input v-else v-model="login.password" id="password" type="password"
                            class="form-control buscador fuente"  aria-label="Password"
                            required />
                        </div>
                        <a @click="isVisible = 'passw'" href="javascript:;" class="tamanio links2 gordo">
                          <b class="gordo">Olvidé mi contraseña</b>
                        </a>
                        <div class="form-check form-switch mt-2">
                          <input class="form-check-input" type="checkbox" id="rememberMe" />
                          <label class="form-check-label" for="rememberMe">Recordarme</label>
                        </div>
                        <div class="text-center">
                          <button v-if="isLoading" class="btn btnNaranja w-100 mt-4 mb-0" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Cargando...
                          </button>
                          <button v-else class="btn btnNaranja w-100 mt-2 mb-0" style="font-size: 18px;">
                            Iniciar sesión
                          </button>
                          <br>
                          <br>
                          <hr class="mt-1" />

                          <div v-if="!isAuthGoogle" class="google-btn mt-4" @click="loginGoogleAuth()">
                            <div class="google-icon-wrapper">
                              <img class="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />

                            </div>
                            <p class="btn-text fuente text-center">
                              Iniciar sesión con Google
                            </p>
                          </div>
                          <div v-else class="google-btn mt-4">
                            <div class="google-icon-wrapper">
                              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                            <p class="btn-text fuente text-center">
                              Trabajando...
                            </p>
                          </div>
                        </div>
                      </form>
                    </div><br>

                  </div>

                  <!--  REXUPERAR CONTRASEÑA  -->

                  <div v-if="isVisible == 'passw'" class="card card-plain mt-4"  style="background: #fff;border-radius: 6px;">
                    <ResetPass @emitGoBackLogin="goBackLogin" @emitCambioPageResset="goRessetPassword"
                      @emitGoUserError="goUserError" />
                  </div>

                  <!--  VEFIFICAR CODE  -->

                  <div v-if="isVisible == 'forgot'" class="card card-plain mt-3" style="background: #fff;border-radius: 6px;">

                    <CheckCode :codex="code" @emitGoPageUpdatePassword="goUpdatePassword"
                      @emitGoBackLogin2="goBackLogin"/>

                  </div>

                  <!--  RESET PASS  -->

                  <div v-if="isVisible == 'resett'" class="card card-plain mt-3" style="background: #fff;border-radius: 6px;">
                    <Update :email="emailss" @emitGoBackLogin3="goBackLogin"/>
                  </div>

                  <!--  ERROR DE CUENTA  -->

                  <div v-if="isVisible == 'error'" class="card card-plain mt-3" style="background: #fff;border-radius: 6px;">
                    <UserError @emitGoBackLogin1="goBackLogin"></UserError>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>

   
    <!-- -------- style="background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));" ------- -->
    <footer class="footer py-5" >
      <div class="container">
        <div class="row">
          <div class="col-8 mx-auto text-center mt-1">
            <p class="mb-0 text-white">
              Copyright © 2022
            </p>
          </div>
        </div>
      </div>
    </footer>
    <!-- -------- END FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
  </div>
</template>
<script src="./Login.js"></script>

