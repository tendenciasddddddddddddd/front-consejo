<template>
  <div v-bind:style="{ 'background-image': 'url(' + fondo + ')' }" style="
      background-size: 100% auto;background-position: top;    min-height: calc(100vh - 50px);">
   <div style="    height: 85vh;background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));">
    <div class="container" >
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
              
              <div class="card mb-3" v-if="isVisible == 'logins'"  >
                <div class="card-body pt-2">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">PLATAFORMA</h5>
                    <p class="text-center small">Ingrese su email o cédula y contraseña para iniciar sesión</p>
                  </div>
                  <form @submit.prevent="authenticate">
                    <div class="col-12"> <label for="yourUsername" class="form-label">Cédula o dirección de correo</label>
                      <input v-model="login.email" id="username" type="text" class="form-control buscador fuente"
                            aria-label="Email" required autocomplete="off" />
                    </div>
                    <div class="col-12 mb-2"> <label for="yourPassword" class="form-label">Contraseña
                      <span style="font-size: 17px;cursor: pointer;" class="ms-2">
                        <svg @click="toggleShow" v-if="showPassword" data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color: #000"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        <svg @click="toggleShow" v-else data-testid="geist-icon" fill="none" height="22" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="22" style="color:#000"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path><path d="M1 1l22 22"></path></svg>
                       </span>
                    </label>  <input v-if="showPassword" type="text" class="form-control buscador fuente"
                            v-model="login.password" />
                          <input v-else v-model="login.password" id="password" type="password"
                            class="form-control buscador fuente" aria-label="Password" required />
                    </div>
                    <a @click="isVisible = 'passw'" href="javascript:;" class="tamanio links2 gordo mt-2">
                          <b class="gordo">Olvidé mi contraseña</b>
                        </a>
                   
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
                </div>
              </div>
              <!--  REXUPERAR CONTRASEÑA  -->

              <div v-if="isVisible == 'passw'" class="card mb-3"  style="background: #fff;border-radius: 6px;">
                    <ResetPass @emitGoBackLogin="goBackLogin" @emitCambioPageResset="goRessetPassword"
                      @emitGoUserError="goUserError" />
                  </div>

                  <!--  VEFIFICAR CODE  -->

                  <div v-if="isVisible == 'forgot'" class="card mb-3" style="background: #fff;border-radius: 6px;">

                    <CheckCode :codex="code" @emitGoPageUpdatePassword="goUpdatePassword"
                      @emitGoBackLogin2="goBackLogin"/>

                  </div>

                  <!--  RESET PASS  -->

                  <div v-if="isVisible == 'resett'" class="card mb-3" style="background: #fff;border-radius: 6px;">
                    <Update :email="emailss" @emitGoBackLogin3="goBackLogin"/>
                  </div>

                  <!--  ERROR DE CUENTA  -->

                  <div v-if="isVisible == 'error'" class="card mb-3" style="background: #fff;border-radius: 6px;">
                    <UserError @emitGoBackLogin1="goBackLogin"></UserError>
                  </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
   </div>
   <footer class="footer py-5" style="border-top:0px !important; background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8));">
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

    
  </div>
</template>
<script src="./Login.js"></script>

