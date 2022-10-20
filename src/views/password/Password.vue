<template>
  <div>
     <Modal v-show="visible" @close="close">
          <template v-slot:header> Cambiar contraseña</template>
          <template v-slot:body>
             <p class="parrafo">Cambia tu contraseña cuando lo necesites. Por seguridad</p>
             <div class="text-center">
        <img width="220" src="../../assets/img/descarga.svg" alt="">
      </div>
             <div class="text-sm text-danger">{{ MsmError }}</div>
               <div v-if="isContrasenia" class="p-2">
                  <form @submit.prevent="authenticate" id="res1">
                    <span class="parrafo">Contraseña actual</span>
                    <div class="form-group">
                      <input
                        v-model="contraseñaActual.password"
                        class="form-control buscador fuente"
                        type="password"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div v-else class="p-2">
                  <form @submit.prevent="actualizar" id="res2">
                  
                     <span class="parrafo">Nueva Contraseña</span>
                    <div class="form-group">
                      <input

                        class="form-control buscador"
                        type="password"
                        v-model="newContraseña.password"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("newContraseña.password") }}
                      </p>
                    </div>
                  
                     <span class="parrafo">Confirmar contraseña</span>
                    <div class="form-group">
                      <input
                        :class="{ error: validation.hasError('confpass') }"
                        class="form-control buscador"
                        type="password"
                        v-model="confpass"
                      />
                      <p class="mb-0 text-sm text-danger">
                        {{ validation.firstError("confpass") }}
                      </p>
                    </div>
                   
                  </form>
                </div>
          </template>
          <template v-slot:acccion>
      <div v-if="isContrasenia">
        <ButtonLoading v-if="isLoading" />
        <button form="res1" v-else type="submit" class="btn btnNaranja mt-2">
          Verificar Contraseña
        </button>
      </div>
      <div v-else>
        <ButtonLoading v-if="isLoading1" />
        <button form="res2" v-else :disabled="isDisabled" class="btn btnNaranja mt-2">
          Guardar contraseña
        </button>
      </div>
    </template>
        </Modal>
  </div>
</template>
<script src="./Password.js"></script>

