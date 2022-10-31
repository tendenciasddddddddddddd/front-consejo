<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
                :paginate-elements-by-height="1400" :filename="'promocion'" :pdf-quality="1.5" :manual-pagination="false"
                pdf-format="a4" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="800px"
                @progress="onProgress($event)" ref="html2Pdf">
                <section slot="pdf-content">
                    <div v-for="item in info" :key="item.id" class="my-sm-5">
                        <div class="card-header text-center ">
                            <div class="row justify-content-between">
                                <div class="col-md-2 text-start">
                                    <img class=" w-90 ms-3" src="../../../../assets/img/ecuador.png" alt="Logo" />
                                </div>
                                <div class="col-md-8">
                                    <span class="text-xs negros">COORDINACIÓN ZONAL</span><br>
                                    <span class="h6 negros">
                                        {{settings.unidadeducativa}}
                                    </span><br>
                                    <p style="margin-top:-10px" class="text-sm text-center negros">
                                        CERTIFICADO ANUAL DE PROMOCIÓN <br>
                                        <span class="text-xs negros">AÑO LECTIVO <b>{{ item.academico.nombre
                                    }}</b></span>
                                    </p> 
                                    
                                   
                                </div>
                                <div class="col-lg-2  text-md-end ">
                                    <img class=" w-50 me-5" :src="settings.logo" alt="Logo" />
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-lg-11 col-12 mx-auto">
                                    <div class="" style="width: 670px;">
                                        <p class="text-justify text-xs negros">
                                            De conformidad con lo prescrito en el Art. 197 del Reglamento General a la
                                            Ley Orgánica de
                                            Educación Intercultural y demás normativas vigentes, certifica que el/la
                                            estudiante <b>{{ item.nombre }}</b>
                                            del <b>{{ item.fknivel.nombre }} {{ item.curso }}</b>  obtuvo las
                                            siguientes calificaciones
                                            durante el presente año lectivo:
                                        </p>
                                    </div>
                                    <div class="" style="width: 670px;">
                                        <table class="dataTable-table table s-table-flush "
                                            style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                                            <thead>
                                                <tr style="border-width: 1px 0px 0px;">
                                                    <th  class="text-uppercase text-center text-dark text-xxs font-weight-bolder">
                                                        AREAS
                                                    </th>
                                                    <th  class="text-uppercase text-center text-dark text-xxs font-weight-bolder">
                                                        ASIGNATURAS
                                                    </th>
                                                    <th class="text-uppercase text-center text-dark text-xxs font-weight-bolder">
                                                        PROMEDIO (NUMEROS Y LETRAS)
                                                    </th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="ite in item.calificaciones" :key="ite.id">
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);padding: 0px 2px;" class="mb-0 text-start ms-3 text-xxs negros fuente">
                                                        {{ite.area}} </td>
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);padding: 0px 2px;" class="mb-0 text-start ms-3 text-xxs negros fuente">{{ite.materia}}</td>
                                                    <td style="border-bottom-width: 0px;padding: 0px 2px;" class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <div>
                                                            {{ite.promediof}} &nbsp; {{trasformnumberToText(ite.promediof)}}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td style="border-top: 1px solid rgb(223 227 235);padding: 1px 2px;" class="mb-0 ms-3 text-xs negros fuente"></td>
                                                    <td style="border-top: 1px solid rgb(223 227 235);padding: 1px 2px;" class="mb-0 ms-3 text-start text-xxs negros "><b>PROMEDIO GENERAL</b></td>
                                                    <td style="border-top: 1px solid rgb(223 227 235);padding: 1px 2px;" class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <b>
                                                            {{calcularPromedio(item.calificaciones)}} {{trasformnumberToText(calcularPromedio(item.calificaciones))}}
                                                        </b>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td class="mb-0 ms-3 text-start text-xxs negros fuente">EVA. PROYECTOS EDUCATIVOS</td>
                                                    <td class="mb-0 ms-3 text-start text-xxs negros fuente">PROYECTOS ESCOLARES </td>
                                                    <td class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <div>
                                                            EX Demuestra destacado desempeño
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td ></td>
                                                    <td > </td>
                                                    <td ></td>
                                                </tr>
                                                <tr >
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xxs negros fuente">DESARROLLO HUMANO INTEGRAL</td>
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xxs negros fuente">DESARROLLO HUMANO INTEGRA </td>
                                                    <td class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <div>
                                                            A Lidera el cumplimiento de los <br> compromisos establecidos para la <br> sana
                                                             convivencia social
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xxs negros fuente">EVALUACION DEL COMPORTAMIENTO</td>
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xxs negros fuente">COMPORTAMIENTO </td>
                                                    <td class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        
                                                            A Lidera el cumplimiento de los <br> compromisos establecidos para la <br> sana
                                                             convivencia social
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                    <div class="mt-3" style="width: 670px;">
                                        <p class="text-justify text-xxs negros">
                                            Por lo tanto es promovido/a al <b>{{nextCourse}}.</b>  Para certificar suscriben
                                             en unidad de acto el Rector/a con el/ la Secretario/a General del Plantel.
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
                            </div> <br>
                            <p class="text-end ">
                                <b class="me-7 text-xxs negros">CUBA, {{ fechasActual }} </b>
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
        nextCourse: String,
        settings: Object,
    },
    data() {
        return {
            info: [],
            ifload: false,
            statusbar: '',
            fechasActual: '',
            texto: '',
            resultado: '',
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
                    console.log(this.info)
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
                   // console.log(this.info);
                    setTimeout(() => this.generatePDF(), 3000);
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
        trasformnumberToText(num){
            let result = parseFloat(num);
            return NumeroALetras(result)
        },
        calcularPromedio(dataObj){
            let aux= 0;
            for (let i = 0; i < dataObj.length; i++) {
                const element = parseFloat(dataObj[i].promediof);
                aux = aux + element;
            }
            let result = aux/dataObj.length;
           return result.toFixed(2);
        }
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
function Unidades(num){

switch(num)
{
    case 1: return "uno";
    case 2: return "dos";
    case 3: return "tres";
    case 4: return "cuatro";
    case 5: return "cinco";
    case 6: return "seis";
    case 7: return "siete";
    case 8: return "ocho";
    case 9: return "nueve";
}

return "";
}//Unidades()

function Decenas(num){

let decena = Math.floor(num/10);
let unidad = num - (decena * 10);

switch(decena)
{
    case 1:
        switch(unidad)
        {
            case 0: return "diez";
            case 1: return "once";
            case 2: return "doce";
            case 3: return "trece";
            case 4: return "catorce";
            case 5: return "quince";
            default: return "dieci" + Unidades(unidad);
        }
    case 2:
        switch(unidad)
        {
            case 0: return "veinte";
            default: return "veinti" + Unidades(unidad);
        }
    case 3: return DecenasY("treinta", unidad);
    case 4: return DecenasY("cuarenta", unidad);
    case 5: return DecenasY("cincuenta", unidad);
    case 6: return DecenasY("sesenta", unidad);
    case 7: return DecenasY("setenta", unidad);
    case 8: return DecenasY("ochenta", unidad);
    case 9: return DecenasY("noventa", unidad);
    case 0: return Unidades(unidad);
}
}//Unidades()

function DecenasY(strSin, numUnidades) {
if (numUnidades > 0)
return strSin + " y " + Unidades(numUnidades)

return strSin;
}//DecenasY()

function Centenas(num) {
let centenas = Math.floor(num / 100);
let decenas = num - (centenas * 100);

switch(centenas)
{
    case 1:
        if (decenas > 0)
            return "CIENTO " + Decenas(decenas);
        return "CIEN";
    case 2: return "DOSCIENTOS " + Decenas(decenas);
    case 3: return "TRESCIENTOS " + Decenas(decenas);
    case 4: return "CUATROCIENTOS " + Decenas(decenas);
    case 5: return "QUINIENTOS " + Decenas(decenas);
    case 6: return "SEISCIENTOS " + Decenas(decenas);
    case 7: return "SETECIENTOS " + Decenas(decenas);
    case 8: return "OCHOCIENTOS " + Decenas(decenas);
    case 9: return "NOVECIENTOS " + Decenas(decenas);
}

return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
let cientos = Math.floor(num / divisor)
let resto = num - (cientos * divisor)

let letras = "";

if (cientos > 0)
    if (cientos > 1)
        letras = Centenas(cientos) + " " + strPlural;
    else
        letras = strSingular;

if (resto > 0)
    letras += "";

return letras;
}//Seccion()

function Miles(num) {
let divisor = 1000;
let cientos = Math.floor(num / divisor)
let resto = num - (cientos * divisor)

let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
let strCentenas = Centenas(resto);

if(strMiles == "")
    return strCentenas;

return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
let divisor = 1000000;
let cientos = Math.floor(num / divisor)
let resto = num - (cientos * divisor)

let strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
let strMiles = Miles(resto);

if(strMillones == "")
    return strMiles;

return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
    letrasCentavos: "",

};

if (data.centavos > 0) {
    data.letrasCentavos = "punto " + (function (){
        if (data.centavos == 1)
            return Millones(data.centavos);
        else
            return Millones(data.centavos); 
        })();
}

if(data.enteros == 0)
    return "cero " + data.letrasCentavos;
if (data.enteros == 1)
    return Millones(data.enteros)  + data.letrasCentavos;
else
    return Millones(data.enteros) + " " + data.letrasCentavos;
}//NumeroALetras()
</script>
  