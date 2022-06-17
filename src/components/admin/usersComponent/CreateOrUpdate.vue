<template>
     <FullModal @close="close">
         <template v-slot:header> Registro de Usuario</template>
          <template v-slot:body>
            <Spinner v-if="isedit"></Spinner>
            <div v-else >
              <form @submit.prevent="save" id="usuarios">
                <div class="p-3 border-radius-xl bg-white js-active" data-animation="FadeIn" >
                        <span class="parrafo">Número de Cédula</span>
                         <CustomInput v-model="model.cedula" />
                        <p class="mb-3 text-xs text-danger">
                          {{ validation.firstError("model.cedula") }}
                        </p>
                        <span class="parrafo">Correo Electrónico</span>
                         <CustomInput v-model="model.email" />
                        <p class="mb-3 text-xs text-danger">
                          {{ validation.firstError("model.email") }}
                        </p>
                        <span class="parrafo">Nombres Completos</span>
                        <CustomInput v-model="model.nombres" />
                        <p class="mb-3 text-xs text-danger">
                          {{ validation.firstError("model.nombres") }}
                        </p>                   
                        <span class="parrafo">Apellidos Completos</span>
                         <CustomInput v-model="model.apellidos" />
                        <p class="mb-3 text-xs text-danger">
                          {{ validation.firstError("model.apellidos") }}
                        </p>
                        <span class="parrafo">Numero de teléfono</span>
                        <CustomInput v-model="model.telefono" />
                        <p class="mb-3 text-xs text-danger">
                          {{ validation.firstError("model.telefono") }}
                        </p>                     
                       <span class="parrafo">Rol</span>
                        <div  v-for="ite in listRol" :key="ite._id">
                        <div class="form-check mb-1">
                          <input
                            class="form-check-input"
                            v-model="checked"
                            type="radio"
                            name="ite._id"
                            :id="ite._id"
                            :value="ite._id"
                          />
                          <a class="parrafo " for="ite._id"> {{ ite.name }}</a>
                        </div>
                      </div>
                </div>
              </form>
            </div>
          </template>
          <template v-slot:footer>
            <a class="btn btnNaranjaClaro me-3" @click="$emit('myEventClosedMOdalUser')">
                <i class="ni ni-bold-left"></i> &nbsp; Vulver
              </a>
              <ButtonLoading v-if="ifLoad"/>
                <button v-else
                type="submit"
                class="btn btnNaranja"
                form="usuarios"
              >{{model._id ? " Actualizar" : "Guardar" }}
              </button>
          </template>
     </FullModal>
</template>
<script src="./CreateOrUpdate.js"></script>
