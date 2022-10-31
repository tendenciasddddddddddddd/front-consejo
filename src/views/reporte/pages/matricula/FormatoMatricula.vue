<template>
  <div>
    <div v-if="ifload">Trabajando...</div>
    <section v-else>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
        :paginate-elements-by-height="1400" :filename="'matricula'" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" :pdf-margin="15" pdf-orientation="portrait" pdf-content-width="800px"
        @progress="onProgress($event)" ref="html2Pdf">
        <section slot="pdf-content">
          <div v-for="item in info" :key="item.id" class="my-sm-5">
            <div class="card-header text-center ">
              <div class="row justify-content-between">
                <div class="col-md-2 text-end">
                  <img class=" w-50 " :src="settings.logo" alt="Logo" />
                </div>
                <div class="col-md-9">
                  <span class="h6 negros">
                    {{settings.unidadeducativa}}
                  </span><br>
                  <span style="margin-top:-10px" class="text-sm text-center negros">
                    Dirección: {{settings.direccion}} Teléf:  {{settings.telefono}} 
                  </span> <br>
                  <span class="text-xs negros"> {{settings.ubicacion}}</span>
                </div>
                <div class="col-lg-1  text-md-end ">
                </div>
              </div>
              <hr style="height: 2px;background: #000;margin-top: -4px;">
              <div class="text-end me-7">
                <span class="negros"> <b>{{ fechasActual }}</b> </span>
              </div> <br><br><br><br>
              <span class="h5 negros ">CERTIFICADO DE MATRICULA</span>
              <div class="d-flex justify-content-around mt-7">
                <div class="text-sm negros">Matrícula No. <b>{{ item.nmatricula }}</b> </div>
                <div class="text-sm negros">Año Lectivo: <b>{{ item.academico.nombre }}</b> </div>
              </div>
              <div class="row">
                <div class="col-lg-9 col-12 mx-auto">
                  <div class="mt-5" style="width: 560px;">
                    <p class="text-justify text-sm negros">
                      Certifico que el(a) Estudiante: <b> {{ item.nombre }}</b>
                      previo los requisitos legales, se matriculó en <b>{{ item.fknivel.nombre }}</b> de la
                      <b>{{settings.unidadeducativa}}</b> en el año lectivo: <br>
                      <b >{{ item.academico.nombre }}</b>
                    </p>
                  </div>
                  <div class="mt-3" style="width: 560px;">
                    <p class="text-justify text-sm negros">
                      Así consta en el Folio No. <b>{{ item.folio }}</b> del respectivo libro de matrícula con el No.
                      <b>{{ item.nmatricula }} </b> y con esta
                      fecha, <b>{{ item.fecha }}</b>

                    </p>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-around mt-5">
                <div class="text-center">
                  <span class="h6 pb-0">
                    <b>__________________________________</b>
                  </span> <br>
                  <p class="negros text-sm">
                    <b>{{settings.rector}}</b><br>
                    RECTOR/A
                  </p>
                  
            
                </div>
                <div>
                  <div class="text-center">
                    <span class="h6 pb-0">
                      <b>__________________________________</b>
                    </span> <br>
                    <p class="negros text-sm">
                    <b>{{settings.secretario}}</b><br>
                    SECRETARIO/A
                  </p>
                  </div>
                </div>
              </div> <br><br>
              <p class="text-start mt-10">
                .
              </p>
            </div>
          </div>
        </section>

      </vue-html2pdf>

    </section>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  components: { VueHtml2pdf },
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
    onProgress(event) {
      this.statusbar = event;
    },
    hasGenerated() {
      alert("PDF generated successfully!");
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
          setTimeout(() => this.generatePDF(), 2000);
        })
        .catch((x) => {
          console.log("Error", x);
          this.ifload = false;
        });
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
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
