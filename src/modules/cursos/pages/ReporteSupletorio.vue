<template>
    <div>     
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="1400" :filename="'supletorio-'+data.nivel" :pdf-quality="1.5"
            :manual-pagination="false" pdf-format="a4" :pdf-margin="10" pdf-orientation="landscape"
            pdf-content-width="1128px" @progress="onProgress($event)" ref="html2Pdf">
            <section slot="pdf-content">
                <section class="mt-sm-4 mx-md-3">
                    <div class="card-header">
                       <div class="py-3 px-3">
                        <div class="d-flex justify-content-between">
                        <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                        <div class="text-center">
                            <span class="h6 negros">
                                UNIDAD EDUCATIVA DEL MILENIO "ALFONSO HERRERA"
                            </span><br>
                            <p class="text-xs text-center negros">
                                REPORTE DE SUPLETORIOS
                            </p>
                            <span class="negros text-xs"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} -
                                {{data.paralelo}}</span>  <span class="negros text-xs">{{data.materia}}</span> 
                        </div>
                        <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/alfonso/alfonso.jpg"
                                alt="Logo" /></div>
                    </div>
                    <table class="dataTable-table table s-table-flush "
                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                        <thead>
                            <tr>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);"
                                class="text-uppercase text-start negros text-xxs font-weight-bolder"> Estudiantes
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 QUIM 1</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 QUIM 2</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 P ANUAL</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 supletorio</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 remedial</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 gracia</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 p final</th>
                                 
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                   estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in rowData.slice(0,15)" :key="item.id">
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 text-start ms-3 text-xxs negros fuente">{{item.nombres}}</td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.quim1}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.quim2}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente font-weight-bolder">
                                    {{item.promed}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.suple}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.reme}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.gracia}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente font-weight-bolder">
                                    {{item.pfinal}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{getEstado(item.pfinal)}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-around mt-6">
                        <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>RECTOR/A</b></span>
                        </div>
                        <div>
                            <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>DOCENTE TUTOR</b></span>
                        </div>
                        </div>
                    </div>
                     </div>
                </div>
                 
                </section>
                <div v-if="rowData.length >= 16" style="page-break-before:always;"></div>
                <section v-if="rowData.length >= 16">
                    <div class="mt-sm-4 mx-md-3">
                        <div class="py-3 px-3">
                            <div class="card-header">
                        <div class="d-flex justify-content-between">
                        <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                        <div class="text-center">
                            <span class="h6 negros">
                                UNIDAD EDUCATIVA DEL MILENIO "ALFONSO HERRERA"
                            </span><br>
                            <p class="text-xs text-center negros">
                                REPORTE DE SUPLETORIOS
                            </p>
                            <span class="negros text-xs"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} -
                                {{data.paralelo}}</span>  <span class="negros text-xs">{{data.materia}}</span> 
                        </div>
                        <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/alfonso/alfonso.jpg"
                                alt="Logo" /></div>
                    </div>
                    <table class="dataTable-table table s-table-flush "
                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                        <thead>
                            <tr>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);"
                                class="text-uppercase text-start negros text-xxs font-weight-bolder"> Estudiantes
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 QUIM 1</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 QUIM 2</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 P ANUAL</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 supletorio</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 remedial</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 gracia</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 p final</th>
                                 
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                   estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in rowData.slice(15,30)" :key="item.id">
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 text-start ms-3 text-xxs negros fuente">{{item.nombres}}</td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.quim1}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.quim2}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente font-weight-bolder">
                                    {{item.promed}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.suple}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.reme}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.gracia}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente font-weight-bolder">
                                    {{item.pfinal}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{getEstado(item.pfinal)}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-around mt-6">
                        <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>RECTOR/A</b></span>
                        </div>
                        <div>
                            <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>DOCENTE TUTOR</b></span>
                        </div>
                        </div>
                    </div>
                     </div>
                        </div>
                       
                </div>
                 
                </section>
                <div v-if="rowData.length >= 31" style="page-break-before:always;"></div>
                <section v-if="rowData.length >= 31">
                    <div class="mt-sm-4 mx-md-3">
                        <div class="py-3 px-3">
                            <div class="card-header">
                        <div class="d-flex justify-content-between">
                        <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                        <div class="text-center">
                            <span class="h6 negros">
                                UNIDAD EDUCATIVA DEL MILENIO "ALFONSO HERRERA"
                            </span><br>
                            <p class="text-xs text-center negros">
                                REPORTE DE SUPLETORIOS
                            </p>
                            <span class="negros text-xs"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} -
                                {{data.paralelo}}</span>  <span class="negros text-xs">{{data.materia}}</span> 
                        </div>
                        <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/alfonso/alfonso.jpg"
                                alt="Logo" /></div>
                    </div>
                    <table class="dataTable-table table s-table-flush "
                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                        <thead>
                            <tr>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);"
                                class="text-uppercase text-start negros text-xxs font-weight-bolder"> Estudiantes
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 QUIM 1</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 QUIM 2</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 P ANUAL</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 supletorio</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 remedial</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 gracia</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                 p final</th>
                                 
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                   estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in rowData.slice(30,45)" :key="item.id">
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 text-start ms-3 text-xxs negros fuente">{{item.nombres}}</td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.quim1}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.quim2}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente font-weight-bolder">
                                    {{item.promed}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.suple}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.reme}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{item.gracia}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente font-weight-bolder">
                                    {{item.pfinal}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;"
                                    class="mb-0 ms-3 text-center text-xxs negros fuente">
                                    {{getEstado(item.pfinal)}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-around mt-6">
                        <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>RECTOR/A</b></span>
                        </div>
                        <div>
                            <div class="text-center">
                            <span class="h6 pb-0">
                            <b>__________________________________</b>
                            </span> <br>
                          <span class="negros text-sm"><b>DOCENTE TUTOR</b></span>
                        </div>
                        </div>
                    </div>
                     </div>
                        </div>
                       
                </div>
                 
                </section>
            </section>
        </vue-html2pdf>
        
    </div>
</template>
<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
    name: 'AddNota',
    components: { VueHtml2pdf },
    props: {
        rowData: Array
    },
    data() {
        return {
            isprint: false,
            statusbar: "",
            data : ''
        }
    },
    watch: {
        statusbar: function (value) {
            this.$emit("changeStatus", value);
        }
    },
    methods: {
        initiaSetap(){
            this.data = JSON.parse(localStorage.getItem("myCourse"));
        },
        close() {
            this.$emit('EventClosed')
        },
        getData() {
            this.$emit('getData');
        },
        onProgress(event) {
            this.statusbar = event;
        },
        hasGenerated() {
            alert("PDF generated successfully!");
        },
        generatePDF() {
            this.$refs.html2Pdf.generatePdf();
        },
        getEstado(num){
            let suple = parseFloat(num)
            if (suple >= 0 && suple < 7) {
              return 'Reprobado';
            } else if (suple >= 7 && suple <= 10) {
              return 'Aprobado';
            } else{
              return 'Error';
            }
        }
    },
    mounted() {
        this.rowSelection = 'multiple';
        this.initiaSetap()
        setTimeout(() => this.generatePDF(), 1000);
    },

}
</script>
