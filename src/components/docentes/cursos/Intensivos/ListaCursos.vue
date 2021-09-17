<template>
<div>
  <div class="row">
   
      <div class="col-lg-9 col-12 mx-auto" >
          <Navss

            :actualText="'Gestión del curso'"
            :rutas="rutass"
          ></Navss>
   
        
      </div>
      
    </div>
  <div class="row ">
    
    <div class="col-lg-9 col-12 mx-auto">
      
      <div class="card ">
        <Skeleton v-if="isData"></Skeleton>
        <div v-else class="card-body p-3 position-relative " >
            <div class="row">
                 <div class="col-sm-12 text-start">
                     <h3 class=" fuente" style="font-weight: 400;"> {{info.fnivel.nombres}} - {{info.paralelo}} </h3>
                     <hr>
                          <div style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;">
         
        <p class="parrafo" style="margin:7px; ">
         <b>{{info.fmateria.nombre}}</b> <mark><b>{{info.nombre}}</b>.</mark>
          </p>
        </div>
                 </div>
            </div>
         <div class="row mt-4">
               <div class="col-lg-12">

                  <div class="row mt-3">
                    <div class="col-md-4 col-12">
                      <div class="card card-plain text-center w-90">
                        <router-link :to="{
                            name: 'd3', 
                            params:{id:info.fnivel._id, paralelo: info.paralelo, nombre:info.nombre, materia: info.fmateria.nombre},
                            props: { paralelo: info.paralelo, nombre:info.nombre, materia: info.fmateria.nombre }}" href="javascript:;">
                           <div class="card-body foco">
                             <img class="w-75" src="../../../../assets/img/shapes/diagrama.svg" alt="fondo">
                          <h6 class="fuente mt-2">1. Notas</h6>
                        </div>
                        </router-link>
                       
                      </div>
                    </div>
                    <div class="col-md-4 col-12">
                      <div class="card card-plain text-center w-90">
                        <router-link :to="{
                            name: 'asistencia', 
                            params:{id:info.fnivel._id, paralelo: info.paralelo, nombre:info.nombre, materia: info.fmateria.nombre},
                            props: { paralelo: info.paralelo, nombre:info.nombre, materia: info.fmateria.nombre }}" href="javascript:;">
                             <div class="card-body foco" >
                              <img class="w-50" src="../../../../assets/img/logs/events.svg" alt="fondo">
                           <h6 class="fuente mt-2">2.  Asistencia</h6>
                        </div>
                        </router-link>
                        
                      </div>
                    </div>
                    <div class="col-md-4 col-12">
                      <div class="card card-plain text-center w-90">
                        <div class="card-body foco" >
                          <router-link :to="`/507`">
                               <img class="w-55" src="../../../../assets/img/logs/integrations.svg" alt="fondo">
                            <h6 class="fuente mt-2">3.  Supletorios</h6>
                          </router-link>
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12 mt-4">
                   <h6 class="mb-0">Icono de Curso</h6>
                   <br>
                  <div class="border-dashed border-1 border-secondary border-radius-md p-3">
                    
                    <p class="text-xs mb-3"><span class="font-weight-bolder">(CAMBIE EL ICONO DEL CURSO PARA IDENTIFICARLO)</span></p>
                    <div class="d-flex align-items-center">
                     
                           <div class="form-group w-70">
                            <form @submit.prevent="save" id="form">
                                <div class="input-group bg-gray-200">
                              
                            <input class="form-control form-control-sm" v-model="model.icono" type="text" disabled="" onfocus="focused(this)" onfocusout="defocused(this)">
                            <span class="input-group-text bg-transparent" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Referral code expires in 24 hours" aria-label="Referral code expires in 24 hours"><i class="ni ni-key-25"></i></span>
                        </div>
                            </form>
                            
                      </div>
                      
                      <button v-if="isEdit && file" type="submit" form="form" class="btn btn-primary btn-sm ms-2 px-3" >Guardar</button>
                      <a v-else @click="mostrarFormulario()" href="javascript:;" class="btn btn-sm btnNaranja w-20 ms-2 px-3">Editar</a>
                    </div>
                     <div v-if="isEdit">
                       
                            
                             <input disabled class="form" type="file" ref="file" v-on:change="onChangeFileUpload()" accept="image/*"  id="file"/><br><br>
                               <label for="file">Selecione una Imagen</label>
                        
                     </div>
                    <p class="text-xs mb-1">Para mejor rendimiento la imagen es de 200 x 200.</p>
                   
                  </div>
                </div>
               
              </div>

        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script src="./ListaCursos.js">
</script>
<style>
.mole {
  background-color: white;
  transition: background-color 0.5s;
}

.mole:hover {
  background-color: #f5f5f5;
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

.bd-example {
  position: relative;
  padding: 2rem;
  border: 3px solid #eee;
}


.foco{
  border: 1px solid #7fd1de;     border-radius: 3px;
    border-style: solid;
    border-width: 1px;

}
.foco:hover{
  border-color: #00a4bd;

  background-color: #e5f5f8;
}

</style>
