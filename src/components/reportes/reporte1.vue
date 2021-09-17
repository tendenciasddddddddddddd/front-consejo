<template>
    <div class="row">
        <div class="nav-wrapper position-relative end-0">
  <ul class="nav nav-pills nav-fill p-1" role="tablist">
      <li class="nav-item">
      <a @click="$router.go(-1)" class="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#dashboard-tabs-icons" role="tab" aria-controls="code" aria-selected="false">
        <i class="ni ni-laptop text-sm me-2"></i> Regresar
      </a>
    </li>
    <li class="nav-item">
      <a  @click="test()" class="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" href="#profile-tabs-icons" role="tab" aria-controls="preview" aria-selected="true">
      <i class="ni ni-badge text-sm me-2"></i> Imprimir reporte
      </a>
    </li>
  
  </ul>
</div>
         
        <div v-if="isdescarga">
             Espere un momento por favor....
        </div>
        <div v-else class="col-md-10 col-sm-10 mx-auto">
          <form class="" action="index.html"  method="post">
            <div id="root" class="card my-sm-5">
              <div  class="card-header text-center ">
                <div class="row justify-content-between">
                  <div class="col-md-2 text-start">
                    <img class="mb-2 w-80 " src="../../assets/img/escudo.png" alt="Logo">
                    
                  </div>
                  <div class="col-md-8">
                    <p class="h6">Subsistema de Educación Fiscomisional del Ecuador</p>
                    <p style="margin-top:-10px" class="h6 text-center">"Mons. Leonidas Proaño"</p>
                   
                     <p style="margin-top:20px" class="h6 text-center">UNIDAD EDUCATIVA FISCOMISIONAL DEL CARCHI PCEI</p>
                  </div>
                  <div class="col-lg-2  text-md-end ">
                    <img class="mb-2 w-100 h-80" src="../../assets/img/aaaa.png" alt="Logo">
                  </div>
                </div>
                <br>
                <div class="row justify-content">
                    <br>
                    <br>
                  <div class="col-12">
                     <p class="h6"><b>UNIDAD EDUCATIVA FISCOMISIONAL</b></p>
                     <p style="margin-top:-10px" class="h6"><b>"MONSEÑOR LEONIDAS PROAÑO" PCEI</b></p>
                     <p style="margin-top:-10px" class="h6 pb-0"><b>Tulcán - Ecuador</b></p>
                    <br>
                    <br>
                    <br>
                    <p class="text-xs"><b>COPIA DE:</b></p>
                    <p class="h4"><b>MATRICULA</b></p>
                    <p style="margin-top:-10px" class="h6 pb-0"><b>AÑO ELECTIVO: &nbsp;&nbsp;{{info.academico.nombre}}</b></p>
                    <br>
                    <p  class="h6 pb-0"><b>CERTIFICO: &nbsp;&nbsp;{{info.fkestudiante.apellidos}} {{info.fkestudiante.nombres}}</b></p>
                    <br>  
                    <p  class="h6 text-dark text-start">&nbsp;&nbsp;&nbsp;&nbsp; Previo los requisitos legales se matriculó en {{info.fknivel.nombres}}</p>
                   <p style="margin-top:-10px" class="h6 text-start">&nbsp;&nbsp;&nbsp;&nbsp; SUPERIOR con Matricula No. {{info.nmatricula}} y Folio No. {{info.folio}} DEL {{info.fecha}}</p>
                    <p style="margin-top:-10px"  class="h6 text-start">&nbsp;&nbsp;&nbsp;&nbsp; Así consta en el libro respectivo del Departamento de Secretaría </p>
                   <br>
                 <br>
                 <br>
                 <br>
                 <br>
                 <p  class="h6 pb-0"><b>__________________________________</b></p>
                  <p  class="h6 pb-0"><b>Msc. Marino Arellano</b></p>
                  <p  class="h6 pb-0"><b>RECTOR-UNEF.C</b></p>
                  <br>
                 <br>
                 <p  class="text-start"><b>Tulcán, {{fechasActual}} </b></p>
                  </div>
                 
                </div>
              </div>
             
            
            </div>
          </form>
        </div>
       </div>  
</template>

<script>
import html2pdf from 'html2pdf.js'


export default {
  name: "Reporte1",
  data() {
      return {
        fechasActual: null,
        isdescarga: false,
        rutass: [
        {
          id: "0",
          nombre: "Home",
          url:"/",
        },
        {
            id: "1",
          nombre: "Opciones de Matricula",
          url:"/Opciones-Matricula",
        },
        {
            id: "2",
          nombre: "Intensivo",
          url:"/Matricula-1",
        },
         {
            id: "3",
          nombre: "Lista Matrculas",
          url:"/Lista-Matricula-v1",
        },
      ],
      info:null,
      }
  },

  methods: {
    get() {
      //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
      if (this.$route.params.id) {
        this.isdescarga = true;
        this.$proxies._matriculaProxi
          .getMatricula(this.$route.params.id)
          .then((x) => {
            this.info = x.data;
            this.isdescarga = false;
            console.log(this.info);
          })
          .catch(() => {
            console.log("Error");
            this.isdescarga = false;
          });
      }
    },

     test() {

            var element = document.getElementById('root');

            // Generate the PDF.
            html2pdf().from(element).set({
                margin: 0,
                fontSize : 9,
                filename: 'test.pdf',
                html2canvas: { scale: 4 },
                jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
            }).save();
            
        },
      __calcularfechaActual(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "Agosto", "September", "October", "November", "December"];
        const dateObj = new Date();
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
         const output = month  + '\n'+ day  + ',' + year;
         this.fechasActual = output;
      },
      fechaActual(){
        var date = new Date();
         const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

        const formatDate = (date)=>{
        let formatted_date = date.getDate() + "-" + months[date.getMonth()] + " DEL " + date.getFullYear()
        return formatted_date;
        }
         console.log(formatDate(date));
      }
 
  },

   created() {
   this.__calcularfechaActual();
    this.get();
    this.fechaActual();
  },
}
</script>

