<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <section id="box">
                <div v-for="item in info" :key="item.id"
                    style="margin-top: 1rem!important; margin-bottom: 1rem!important;">
                    <div style="text-align: center!important;padding: 1.5rem;color:#000;">
                        <div
                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                            <div style="flex: 0 0 auto; width: 18%;text-align: right!important;">
                                <img style="width: 95%!important;" src="../../../../assets/img/ecuador.jpg"
                                    alt="Logo" />
                            </div>
                            <div style="flex: 0 0 auto; width: 62%;">
                                <span style="font-size: .75rem!important;">COORDINACIÓN ZONAL</span><br>
                                <span style="color:#000;font-weight: 600;font-size: 1rem;line-height: 1.375;">
                                    {{ settings.unidadeducativa }}
                                </span><br>
                                <p style="margin-top:-1px;text-align: center!important;font-size: .75rem!important;">
                                    CERTIFICADO ANUAL DE PROMOCIÓN <br>
                                    <span style="font-size: .75rem!important;">AÑO LECTIVO <b>{{ item.academico.nombre
                                    }}</b></span>
                                </p>
                            </div>
                            <div style="width: 10%;text-align: end!important;">
                                <img :src="settings.logo" alt="Logo" style="width: 50%!important;" />
                            </div>
                        </div>
                        <div
                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                            <div
                                style="flex: 0 0 auto; width: 91%;    margin-right: auto!important; margin-left: auto!important;">
                                <div style="width: 670px;">
                                    <p
                                        style="text-align: justify !important;font-size: .875rem!important;line-height: 1.5;">
                                        De conformidad con lo prescrito en el Art. 197 del Reglamento General a la
                                        Ley Orgánica de
                                        Educación Intercultural y demás normativas vigentes, certifica que el/la
                                        estudiante <b>{{ item.nombre }}</b>
                                        del <b>{{ item.fknivel.nombre }} {{ item.curso }}</b> obtuvo las
                                        siguientes calificaciones
                                        durante el presente año lectivo:
                                    </p>
                                </div>
                                <div style="width: 670px;">
                                    <table
                                        style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                        <thead>
                                            <tr style="border-width: 1px 0px 0px;">
                                                <th
                                                    style="border-top: 1px solid #000;border-bottom: 1px solid #000;padding: 8px 10px;font-size: .65rem!important;">
                                                    AREAS
                                                </th>
                                                <th
                                                    style="border-top: 1px solid #000;border-bottom: 1px solid #000;padding: 8px 10px;font-size: .65rem!important;">
                                                    ASIGNATURAS
                                                </th>
                                                <th
                                                    style="border-top: 1px solid #000;border-bottom: 1px solid #000;padding: 8px 10px;font-size: .65rem!important;">
                                                    PROMEDIO (NUMEROS Y LETRAS)
                                                </th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="ite in item.calificaciones" :key="ite.id">
                                                <td v-if="ite.promediof != 0"
                                                    style="border-bottom-width: 0px;border-right: 1px solid #000;padding: 0px 2px;font-size: .65rem!important;margin-bottom: 0!important">
                                                    {{ ite.area }} </td>
                                                <td v-if="ite.promediof != 0"
                                                    style="border-bottom-width: 0px;border-right: 1px solid #000;padding: 0px 2px;font-size: .65rem!important;margin-bottom: 0!important">
                                                    {{ ite.materia
                                                    }}
                                                </td>
                                                <td v-if="ite.promediof != 0"
                                                    style="border-bottom-width: 0px;padding: 0px 2px;font-size: .65rem!important;margin-bottom: 0!important">
                                                    <div>
                                                        {{ ite.promediof }} &nbsp; {{
                                                                trasformnumberToText(ite.promediof)
                                                        }}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border-top: 1px solid #000;border-bottom: 1px solid #000;padding: 1px 2px;font-size: .65rem!important;margin-bottom: 0!important;margin-left: 1rem!important;">
                                                </td>
                                                <td
                                                    style="border-top: 1px solid #000;border-bottom: 1px solid #000;padding: 1px 2px;font-size: .65rem!important;margin-bottom: 0!important;margin-left: 1rem!important;">
                                                    <b>PROMEDIO GENERAL</b>
                                                </td>
                                                <td
                                                    style="border-top: 1px solid #000;border-bottom: 1px solid #000;padding: 1px 2px;font-size: .65rem!important;margin-bottom: 0!important;margin-left: 1rem!important;">
                                                    <b>
                                                        {{ calcularPromedio(item.calificaciones) }}
                                                        {{ trasformnumberToText(calcularPromedio(item.calificaciones))
                                                        }}
                                                    </b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="font-size: .65rem!important;border-right: 1px solid #000;margin-bottom: 0!important;margin-left: 1rem!important;">
                                                    EVA. PROYECTOS EDUCATIVOS</td>
                                                <td
                                                    style="font-size: .65rem!important;border-right: 1px solid #000;margin-bottom: 0!important;margin-left: 1rem!important;">
                                                    PROYECTOS
                                                    ESCOLARES </td>
                                                <td
                                                    style="font-size: .65rem!important;margin-bottom: 0!important;margin-left: 1rem!important;">
                                                    <div>
                                                        {{ calcularPryectos(item.calificaciones) }}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td> </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                                    DESARROLLO
                                                    HUMANO INTEGRAL</td>
                                                <td
                                                    style="border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                                    DESARROLLO
                                                    HUMANO INTEGRAL </td>
                                                <td style="font-size: .65rem!important;">
                                                    <div> <b>{{ calcularDHI(item.calificaciones) }}</b> 
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important; margin-bottom: 0!important;">
                                                    EVALUACION DEL
                                                    COMPORTAMIENTO</td>
                                                <td
                                                    style="border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important; margin-bottom: 0!important;">
                                                    COMPORTAMIENTO
                                                </td>
                                                <td style="font-size: .65rem!important; margin-bottom: 0!important;">
                                                   <b>{{calcularComportamiento(item.calificaciones)}}</b>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                                <div style="width: 670px;margin-top: 1rem!important;">
                                    <p style="text-align: justify !important; color:#000;font-size: .875rem!important;">
                                        Por lo tanto es promovido/a al <b>{{ nextCourse }}.</b> Para certificar
                                        suscriben
                                        en unidad de acto el Rector/a con el/ la Secretario/a General del Plantel.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            style="margin-top: 3rem!important;display: flex!important;justify-content: space-around!important;">
                            <div style="text-align: center!important;">
                                <span>
                                    <b>______________________________</b>
                                </span> <br>
                                <p style=" font-size: .875rem!important;">
                                    <b>{{ settings.rector }}</b><br>
                                    RECTOR/A
                                </p>
                            </div>
                            <div style="text-align: center!important;">
                                <span>
                                    <b>_____________________________</b>
                                </span> <br>
                                <p style="font-size: .875rem!important;">
                                    <b>{{ settings.secretario }}</b><br>
                                    SECRETARIO/A
                                </p>
                            </div>
                        </div>
                        <p style="text-align: right!important;">
                            <b style="font-size: .65rem!important; margin-right: 3rem!important;">{{$store.state.fechaReporter}}{{ fechasActual }}</b>
                        </p>
                        <div style="page-break-before:always;"></div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
  
<script>
export default {
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
        initialSetup() {
            let array = this.rowData;
            this.ifload = true;
            this.$proxies._matriculaProxi
                .getMatriculaReporte(array)
                .then((x) => {
                    this.info = x.data;
                    this.ifload = false;
                    setTimeout(() => this.printDownload(), 2500);
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
      const output = day+" de "+ month + '\n' + ' del ' + year;
      this.fechasActual = output;
        },
        trasformnumberToText(num) {
            let result = parseFloat(num);
            return NumeroALetras(result)
        },
        calcularPromedio(dataObj) {
            let aux = 0;
            let contador = 0
            for (let i = 0; i < dataObj.length; i++) {
                const element = parseFloat(dataObj[i].promediof);
                if (element != 0) {
                    aux = aux + element;
                    contador = contador + 1;
                }
            }
            let result = aux / contador;
            return result.toFixed(2);
        },
        calcularPryectos(dataObj) {
            let aux = 0;
            let aux2 = 0;
            let aux3 = 0;
            let aux4 = 0;
            var letra = 'NO'
            for (let i = 0; i < dataObj.length; i++) {
                const element = dataObj[i].materia;
                const proyectos = dataObj[i].proyectos
                if (element == 'PROYECTOS ESCOLARES') {
                    let p1 = proyectos[0].p1
                    let p2 = proyectos[0].p2
                    let p3 = proyectos[1].p1
                    let p4 = proyectos[1].p2
                    switch (p1) {
                        case "EX": aux = 5;
                            break;
                        case "MB": aux = 4;
                            break;
                        case "B": aux = 3;
                            break;
                        case "R": aux = 2;
                            break;
                        default:
                            break;
                    }
                    switch (p2) {
                        case "EX": aux2 = 5;
                            break;
                        case "MB": aux2 = 4;
                            break;
                        case "B": aux2 = 3;
                            break;
                        case "R": aux2 = 2;
                            break;
                        default:
                            break;
                    }
                    switch (p3) {
                        case "EX": aux3 = 5;
                            break;
                        case "MB": aux3 = 4;
                            break;
                        case "B": aux3 = 3;
                            break;
                        case "R": aux3 = 2;
                            break;
                        default:
                            break;
                    }
                    switch (p4) {
                        case "EX": aux4 = 5;
                            break;
                        case "MB": aux4 = 4;
                            break;
                        case "B": aux4 = 3;
                            break;
                        case "R": aux4 = 2;
                            break;
                        default:
                            break;
                    }
                    var result = parseInt((aux + aux2 + aux3 + aux4) / 4)
                    switch (result) {
                        case 5: letra = 'EX Excelente';
                            break;
                        case 4: letra = 'MB Muy Buena';
                            break;
                        case 3: letra = 'B Buena';
                            break;
                        case 2: letra = 'R Regular';
                            break;
                        default:
                            break;
                    }

                }
            }

            return letra;
        },
        calcularDHI(dataObj) {
            let aux = 0;
            let aux2 = 0;
            let aux3 = 0;
            let aux4 = 0;
            var letra = 'NO'
            for (let i = 0; i < dataObj.length; i++) {
                const element = dataObj[i].materia;
                const proyectos = dataObj[i].dhi
                if (element == 'DESARROLLO HUMANO INTEGRAL') {
                    let p1 = proyectos[0].p1
                    let p2 = proyectos[0].p2
                    let p3 = proyectos[1].p1
                    let p4 = proyectos[1].p2
                    switch (p1) {
                        case "A": aux = 5;
                            break;
                        case "B": aux = 4;
                            break;
                        case "C": aux = 3;
                            break;
                        case "D": aux = 2;
                            break;
                        case "E": aux = 1;
                            break;
                        default:
                            break;
                    }
                    switch (p2) {
                        case "A": aux2 = 5;
                            break;
                        case "B": aux2 = 4;
                            break;
                        case "C": aux2 = 3;
                            break;
                        case "D": aux2 = 2;
                            break;
                        case "E": aux2 = 1;
                            break;
                        default:
                            break;
                    }
                    switch (p3) {
                        case "A": aux3 = 5;
                            break;
                        case "B": aux3 = 4;
                            break;
                        case "C": aux3 = 3;
                            break;
                        case "D": aux3 = 2;
                            break;
                        case "E": aux3 = 1;
                            break;
                        default:
                            break;
                    }
                    switch (p4) {
                        case "A": aux4 = 5;
                            break;
                        case "B": aux4 = 4;
                            break;
                        case "C": aux4 = 3;
                            break;
                        case "D": aux4 = 2;
                            break;
                        case "E": aux4 = 1;
                            break;
                        default:
                            break;
                    }
                    var result = parseInt((aux + aux2 + aux3 + aux4) / 4)
                    switch (result) {
                        case 5: letra = 'A Muy Satisfactorio o Lidera el cumplimiento compromisos establecidos';
                            break;
                        case 4: letra = 'B Satisfactorio o Cumple con los compromisos establecidos';
                            break;
                        case 3: letra = 'C Poco Satisfactorio o Falla ocasionalmente compromisos establecidos';
                            break;
                        case 2: letra = 'D Mejorable o Falla reiteradamente los compromisos establecidos';
                            break;
                        case 1: letra = 'E Insatisfactorio o No cumple los compromisos establecidos';
                            break;
                        default:
                            break;
                    }
                }
            }

            return letra;
        },
        calcularComportamiento(dataObj) {
            let aux = 0;
            let aux2 = 0;
            let aux3 = 0;
            let aux4 = 0;
            var letra = 'NO'
            for (let i = 0; i < dataObj.length; i++) {
                const element = dataObj[i].materia;
                const proyectos = dataObj[i].dhi
                if (element == 'DESARROLLO HUMANO INTEGRAL') {
                    let p1 = proyectos[0].p1
                    let p2 = proyectos[0].p2
                    let p3 = proyectos[1].p1
                    let p4 = proyectos[1].p2
                    switch (p1) {
                        case "A": aux = 5;
                            break;
                        case "B": aux = 4;
                            break;
                        case "C": aux = 3;
                            break;
                        case "D": aux = 2;
                            break;
                        case "E": aux = 1;
                            break;
                        default:
                            break;
                    }
                    switch (p2) {
                        case "A": aux2 = 5;
                            break;
                        case "B": aux2 = 4;
                            break;
                        case "C": aux2 = 3;
                            break;
                        case "D": aux2 = 2;
                            break;
                        case "E": aux2 = 1;
                            break;
                        default:
                            break;
                    }
                    switch (p3) {
                        case "A": aux3 = 5;
                            break;
                        case "B": aux3 = 4;
                            break;
                        case "C": aux3 = 3;
                            break;
                        case "D": aux3 = 2;
                            break;
                        case "E": aux3 = 1;
                            break;
                        default:
                            break;
                    }
                    switch (p4) {
                        case "A": aux4 = 5;
                            break;
                        case "B": aux4 = 4;
                            break;
                        case "C": aux4 = 3;
                            break;
                        case "D": aux4 = 2;
                            break;
                        case "E": aux4 = 1;
                            break;
                        default:
                            break;
                    }
                    var result = parseInt((aux + aux2 + aux3 + aux4) / 4)
                    switch (result) {
                        case 5: letra = 'A Muy Satisfactorio o Lidera el cumplimiento compromisos establecidos';
                            break;
                        case 4: letra = 'B Satisfactorio o Cumple con los compromisos establecidos';
                            break;
                        case 3: letra = 'C Poco Satisfactorio o Falla ocasionalmente compromisos establecidos';
                            break;
                        case 2: letra = 'D Mejorable o Falla reiteradamente los compromisos establecidos';
                            break;
                        case 1: letra = 'E Insatisfactorio o No cumple los compromisos establecidos';
                            break;
                        default:
                            break;
                    }
                }
            }

            return letra;
        },
    },

    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
function Unidades(num) {

    switch (num) {
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

function Decenas(num) {

    let decena = Math.floor(num / 10);
    let unidad = num - (decena * 10);

    switch (decena) {
        case 1:
            switch (unidad) {
                case 0: return "diez";
                case 1: return "once";
                case 2: return "doce";
                case 3: return "trece";
                case 4: return "catorce";
                case 5: return "quince";
                default: return "dieci" + Unidades(unidad);
            }
        case 2:
            switch (unidad) {
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

    switch (centenas) {
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

    if (strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    let strMiles = Miles(resto);

    if (strMillones == "")
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
        data.letrasCentavos = "punto " + (function () {
            if (data.centavos == 1)
                return Millones(data.centavos);
            else
                return Millones(data.centavos);
        })();
    }

    if (data.enteros == 0)
        return "cero " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasCentavos;
}//NumeroALetras()
</script>
  