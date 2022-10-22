<template>
  <div>
    <div class="contenidotabs">
          <a class="tabss " @click="istabs=1" :class="{ 'tabsActive links': istabs=='1' }">Perfil</a>
          <a class="tabss " @click="istabs=2" :class="{ 'tabsActive links': istabs=='2' }">Información general
          </a>
        </div>
        <hr style="margin-top:-0px;border-top: 1px solid rgb(203, 214, 226); opacity: inherit;" />

      <div class=" row" v-if="istabs=='1'">
          <Spinner v-if="ifcarga"></Spinner>
          <div v-else class="col-lg-5">
            <p class="fuente negros mt-2"><b>Foto de perfil</b></p>
            <div class="d-flex justify-content-between">
              <div class=" position-relative">
                <div @click="open" class="maperr avatar avatar-xl">
                  <img :src="img1 ? img1 : foto" class=" " alt="abc" style="border-radius: 50%;" />
                </div>
              </div>
              <button @click="open" class="btn btnNaranja2 mt-2">
                 Cambiar foto
              </button>
            </div>
            <hr>
            <form @submit.prevent="save" id="pefilD">
                  <span class="parrafo negros">Nombres</span>
                  <CustomInput v-model="model.nombres" />
                  <div class="mb-2 text-sm ">
                    {{ validation.firstError("model.nombres") }}
                  </div>
                  <span class="parrafo negros">Apellidos</span>
                  <CustomInput v-model="model.apellidos" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.apellidos") }}
                  </p>
                  <span class="parrafo negros">Email</span>
                  <CustomInput v-model="model.email" />

              <div class="row mt-2">
                <div class="col-sm-6 ">
                  <span class="parrafo negros">Parroquia</span>
                  <CustomInput v-model="model.fkparroquia" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.fkparroquia") }}
                  </p>
                </div>
                <div class="col-sm-6 ">
                  <span class="parrafo negros">Etnia</span>
                  <CustomInput v-model="model.fketnia" />
                  <p class="mb-2 text-sm text-danger">
                    {{ validation.firstError("model.fketnia") }}
                  </p>
                </div>
              </div>
                  <span class="parrafo negros">Teléfono</span>
                  <CustomInput v-model="model.telefono" />
                  
                  <span class="parrafo mt-2 negros">Género</span>
                  <CustomInput v-model="model.sexo" />
                  <p class="mb-4 text-sm text-danger">
                    {{ validation.firstError("model.sexo") }}
                  </p>
            </form>
            <ButtonLoading v-if="ifLoad" />
            <button v-else type="submit" class=" btn btnNaranja" form="pefilD"  style="background-color: #8b3dff !important;">
              Actualizar Información 
            </button>
            <br> <br> <br>
          </div>
      </div>
      <div class="mt-2 row" v-if="istabs=='2'">
        <NoFound/>
      </div>
      <div v-if="isAvatar">
          <Avatar  @myEventClosed="close" @changeAvatar="changeAvatar"/>
        </div>
  </div>
</template>

<script src="./Perfil.js"></script>


