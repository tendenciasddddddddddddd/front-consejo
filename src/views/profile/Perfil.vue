<template>
  <div>
    <ul class="nav nav-pills mb-3" role="tablist">

<li class="nav-item" role="presentation">
  <button class="nav-link" data-bs-toggle="tab" @click="istabs=1"  :class="{ 'active': istabs=='1' }"
  data-bs-target="#profile-overview" aria-selected="false" role="tab" tabindex="-1">Visión general</button>
</li>





<li class="nav-item" role="presentation">
  <button @click="open" class="nav-link" data-bs-toggle="tab"
  data-bs-target="#profile-change-password" aria-selected="false" tabindex="-1" role="tab">Cambiar foto</button>
</li>

</ul>

      <div class=" row" v-if="istabs=='1'">
          <Spinner v-if="ifcarga"></Spinner>
          <div v-else class="col-lg-5">
            <p class="fuente negros mt-4"><b>Foto de perfil</b></p>
            <div class="d-flex justify-content-between">
              <div class=" position-relative">
                <div @click="open" class=" avatar avatar-xl">
                  <img :src="img1 ? img1 : foto"  alt="abc" class="rounded-circle"/>
                </div>
              </div>
              <button @click="open" class="btn btnNaranja2 mt-2">
                 Cambiar foto
              </button>
            </div>
            <hr>
            <form @submit.prevent="save" id="pefilD">
              <h6 class="card-title negros">Apellidos Nombres</h6>
                  <CustomInput v-model="model.fullname" />
                  <div class=" text-sm ">
                    {{ validation.firstError("model.fullname") }}
                  </div>
                  <h6 class="card-title negros">Email</h6>
                  <CustomInput v-model="model.email" />

              <div class="row ">
                <div class="col-sm-6 ">
                  <h6 class="card-title negros">Parroquia</h6>
                  <CustomInput v-model="model.fkparroquia" />
                </div>
                <div class="col-sm-6 ">
                  <h6 class="card-title negros">Etnia</h6>
                  <CustomInput v-model="model.fketnia" />
                </div>
              </div>
                  <h6 class="card-title negros">Teléfono</h6>
                  <CustomInput v-model="model.telefono" />
                  
                  <h6 class="card-title negros">Genero</h6>
                  <CustomInput v-model="model.sexo" />
            </form> <br>
            <ButtonLoading v-if="ifLoad" />
            <button v-else type="submit" class=" btn btnNaranja" form="pefilD" >
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


