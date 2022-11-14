<template>
  <div>
    <div v-if="ifload">Trabajando...</div>
    <section v-else>
        <section id="box">

          <div v-for="item in info" :key="item.id" style="margin-top: 1rem!important; margin-bottom: 3rem!important;">
            <div  style="text-align: center!important;padding: 1.5rem;color:#000;">
              <div  style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                <div  style="flex: 0 0 auto; width: 16.666667%;text-align: right!important;">
                  <img style="width: 40%!important;" :src="settings.logo" alt="Logo" />
                </div>
                <div  style="flex: 0 0 auto; width: 75%;">
                  <span style="color:#000;font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                    {{settings.unidadeducativa}}
                  </span><br>
                  <span style="margin-top:-10px;text-align: center!important;" >
                    Dirección: {{settings.direccion}} Teléf:  {{settings.telefono}} 
                  </span> <br>
                  <span  style="font-size: .75rem!important;color:#000;">
                    El Ángel {{settings.ubicacion}}</span>
                </div>
                
              </div>
              <hr style="height: 1px;background: #000;">
              <div style="text-align: right!important;margin-right: 5rem!important;">
                <span > <b>{{ fechasActual }}</b> </span>
              </div> <br><br><br><br>
              <span  style="font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                CERTIFICADO DE MATRICULA</span>
              <div c style="margin-top: 6rem!important;display: flex!important;justify-content: space-around!important;">
                <div >Matrícula No. <b>{{ item.nmatricula }}</b> </div>
                <div >Año Lectivo: <b>{{ item.academico.nombre }}</b> </div>
              </div>
              <div  style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                <div  style="flex: 0 0 auto; width: 75%;    margin-right: auto!important; margin-left: auto!important;">
                  <div style="width: 560px;margin-top: 3rem!important;">
                    <p  style="text-align: justify !important;font-size: .875rem!important;line-height: 1.5;">
                      Certifico que el(a) Estudiante: <b> {{ item.nombre }}</b>
                      previo los requisitos legales, se matriculó en <b>{{ item.fknivel.nombre }}</b> de la
                      <b>{{settings.unidadeducativa}}</b> en el Año Lectivo: <br>
                      <b >{{ item.academico.nombre }}</b>
                    </p>
                  </div>
                  <div  style="width: 560px;margin-top: 1rem!important;">
                    <p  style="text-align: justify !important; color:#000;font-size: .875rem!important;">
                      Así consta en el Folio No. <b>{{ item.folio }}</b> del respectivo libro de matrícula con el No.
                      <b>{{ item.nmatricula }} </b> y con esta
                      fecha, <b style="text-transform: lowercase;">{{ item.fecha}}</b>

                    </p>
                  </div>
                </div>
              </div>

              <div style="margin-top: 3rem!important;display: flex!important;justify-content: space-around!important;">
                <div style="text-align: center!important;">
                  <span >
                    <b>______________________________</b>
                  </span> <br>
                  <p  style=" font-size: .875rem!important;">
                    <b>{{settings.rector}}</b><br>
                    RECTOR/A
                  </p>
                  
            
                </div>
                <div  style="text-align: center!important;">
                    <span >
                      <b>_____________________________</b>
                    </span> <br>
                    <p style="font-size: .875rem!important;">
                    <b>{{settings.secretario}}</b><br>
                    SECRETARIO/A
                  </p>
                </div>
              </div> 
              <div style="page-break-before:always;"></div>
            </div>
          </div>
        </section>

    </section>
  </div>
</template>

<script>
//import VueHtml2pdf from "vue-html2pdf";
export default {
 // components: { VueHtml2pdf },
  props: {
    rowData: Array,
    settings: Object,
  },
  data() {
    return {
      info: [],
      ifload: false,
      statusbar: '',
      fechasActual: '',
    }
  },
  watch: {
    statusbar: function (value) {
      this.$emit("changeStatus", value);
    }
  },
  methods: {
    printDownload() {
            try {
                const box = document.getElementById('box').innerHTML;
            let w = window.open('', '_blank', 'height=600,width=800,top=150,left= 400');
            w.document.write('<html><head><title></title>');
            w.document.write('<style type="text/css" media="print"> @media print{@page { margin-top: 0;margin-bottom: 0;}body  { padding-top: 6px; padding-bottom: 6px ;}} </style>');
            w.document.write('</head><body >');
            w.document.write(box);
            w.document.write('</body></html>');
            w.document.close()
            w.setTimeout(function () {
                w.print()
            }, 1000)
            this.statusbar = 100;
            } catch (error) {
                this.statusbar = 100; 
                this.$dialog.alert('Por favor permitir siempre ventanas emergentes y redirecciones')
            }
        },
    onProgress(event) {
      this.statusbar = event;
    },
    getData(ids) {
      this.ifload = true;
      this.$proxies._matriculaProxi
        .getMatricula(ids)
        .then((x) => {
          this.info = x.data;
          this.ifload = false;
        })
        .catch(() => {
          console.log("Error");
          this.ifload = false;
        });
    },
    initialSetup() {
      let array = this.rowData;
      this.ifload = true;
      this.$proxies._matriculaProxi
        .getMatriculaReporte(array)
        .then((x) => {
          this.info = x.data;
          this.ifload = false;
        setTimeout(() => this.printDownload(), 1000);
        })
        .catch((x) => {
          console.log("Error", x);
          this.ifload = false;
        });
    },
    __calcularfechaActual() {
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];
      const dateObj = new Date();
      const month = monthNames[dateObj.getMonth()];
      const day = String(dateObj.getDate()).padStart(2, '0');
      const year = dateObj.getFullYear();
      const output = month + '\n' + day + ',' + year;
      this.fechasActual = output;
    },
    fechaActual() {
      var date = new Date();
      const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

      const formatDate = (date) => {
        let formatted_date = date.getDate() + "-" + months[date.getMonth()] + " DEL " + date.getFullYear()
        return formatted_date;
      }
      formatDate(date);
    }
  },
  mounted() {
    this.initialSetup()
    this.__calcularfechaActual()
  }
}
</script>
