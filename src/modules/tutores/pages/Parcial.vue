<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <section id="box">
                <div style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 1.5rem!important;">
                    <div style="padding: 1rem;">
                        <div style="text-align: center!important;">
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div style="flex: 0 0 auto;width: 12%;text-align: center!important;">
                                    <img style="width: 80%!important" :src="settings.logo"
                                        alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 86%;">
                                    <span style="color:#000;font-weight: 700;font-size: .80rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p
                                        style="margin-top:-1px;font-weight: 700;text-align: center!important;font-size: .80rem!important;">
                                        CONCENTRADO DE CALIFICACIONES POR PARALELO <br>
                                        <span>{{numQuimestre ? "SEGUNDO QUIMESTRE": "PRIMER QUIMESTRE"}}</span>
                                        <span v-if="(parcial==3)"> - PRIMERA PARCIAL</span>
                                        <span v-else> - SEGUNDA PARCIAL</span>
                                    </p>

                                </div>
                            </div>
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div
                                    style="padding-left: 16px;font-size: .75rem!important; flex: 0 0 auto; width: 50%;text-align: left!important;">
                                    <span>{{ curso }} - {{ paralelo }} </span>

                                </div>
                                <div
                                    style="padding-left: 16px;font-size: .75rem!important; flex: 0 0 auto; width: 40%;text-align: left!important;">
                                    <span>PERIODO - {{ periodo }} </span>

                                </div>
                            </div>
                            <div>
                                <div>
                                    <table
                                        style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;border-top: 1px solid #000;">
                                        <thead>

                                            <tr>
                                                <th
                                                    style="padding: 1px 3px;border-bottom: 0px;font-size: .60rem!important;font-weight: 700!important;border-bottom: 1px solid #000;">
                                                    APELLIDOS Y NOMBRES
                                                </th>
                                                <th v-for="item in materiass" :key="item.id"
                                                    style="writing-mode: vertical-lr; transform: rotate(180deg);padding: 1px 3px;border-bottom: 0px;border-right: 1px solid #000;border-top: 1px solid #000;font-size: .60rem!important;font-weight: 700!important;">
                                                    {{ item.materia.slice(0, 25) }}
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>
                                            <tr v-for="item in info" :key="item.id">
                                                <td
                                                    style="padding: 2px 3px;border-bottom-width: 0px;  font-size: .60rem!important;">
                                                    {{ item.nombre }}</td>
                                                <td v-for="ite in item.data" :key="ite.id"
                                                    style="padding: 2px 3px;border-bottom-width: 0px;border-left: 1px solid #000; font-size: .65rem!important;text-align: center!important;">
                                                    <span v-if="ite.prom1 != 'NaN'">
                                                    <span v-bind:style= "ite.prom1<7 ? 'color:red !important' : ''">{{ ite.prom1 }}</span>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="padding: 2px 3px;border-bottom-width: 0px;  font-size: .60rem!important;border-top: 1px solid #000;">
                                                    PROMEDIO</td>
                                                <td v-for="it in finales" :key="it.id"
                                                    style="padding: 2px 3px;border-bottom-width: 0px;border-left: 1px solid #000;border-top: 1px solid #000; font-size: .65rem!important;text-align: center!important;">
                                                    <span v-if="it != 'NaN'">{{ it }}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div
                                style="margin-top: 1.5rem!important;display: flex!important;justify-content: space-around!important;">

                                <div style="text-align: center!important;">
                                    <span>
                                        <b>_____________________________</b>
                                    </span> <br>
                                    <p style="font-size: .875rem!important;">

                                        TUTOR/A
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div style="page-break-before:always;"></div> -->
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
        numQuimestre: Number,
        settings: Object,
        parcial: Number,
    },
    data() {
        return {
            info: [],
            ccomportamiento: [],
            ddhi: [],
            proyectoss: [],
            ifload: false,
            statusbar: '',
            fechasActual: '',
            texto: '',
            resultado: '',
            prom1: '',
            prom2: '',
            equi1: 0,
            equi2: 0,
            equi80: 0,
            equi20: 0,
            total: 0,
            aux: 0,
            curso: 'None',
            paralelo: 'None',
            parciales: 1,
            materiass: [],
            periodo: 'None',
            finales: []
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
                let w = window.open('', '_blank', 'height=600,width=950,top=150,left= 400');
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
                this.statusbar = 500;
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
                    const result = x.data;
                    this.ifload = false;
                    this.FormData(result)
                    this.ifload = false;
                    setTimeout(() => this.printDownload(), 1500);
                })
                .catch((x) => {
                    console.log("Error", x);
                    this.ifload = false;
                });
        },
        FormData(array) {
            try {
                if (array.length > 0) {
                    let calificaciones = []
                    let proyectos = []
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        this.curso = array[0].fknivel ? array[0].fknivel.nombre : 'Undefined';
                        this.paralelo = array[0].curso
                        let nombre = element.nombre;
                        this.periodo = element.academico ? element.academico.nombre : 'Undefined';
                        let calificacionesArray = element.calificaciones;
                        for (let j = 0; j < calificacionesArray.length; j++) {
                            this.aux = this.aux + 1
                            const res = calificacionesArray[j];
                            let materia = res.materia;
                            if (res.proyectos.length > 0) {
                                let pro = 0
                                if (this.parcial ==3) {
                                    pro = res.proyectos[this.numQuimestre].p1
                                } else if (this.parcial ==4){
                                    pro = res.proyectos[this.numQuimestre].p2
                                } 
                                proyectos.push({
                                    nombre: nombre,
                                    materia: materia,
                                    prom1: pro,
                                })
                            }
                            if (res.notas.length > 0) {
                                let  prom1 = 1
                                if (this.parcial ==3) {
                                    prom1 = this.promedioP1(res.notas[this.numQuimestre])
                                }else if(this.parcial ==4){
                                    prom1 = this.promedioP2(res.notas[this.numQuimestre])
                                }
                                calificaciones.push({
                                    nombre: nombre,
                                    materia: materia,
                                    prom1: prom1,

                                })
                            }
                        }
                    }
                    const array3 = calificaciones.concat(proyectos);
                    const resultado = [];
                    array3.forEach(entry => {
                        const { nombre, prom1, } = entry;
                        const exists = resultado.find(y => y.nombre === entry.nombre)
                        if (!exists) {
                            resultado.push({
                                nombre: nombre, data: [{
                                    prom1: prom1,
                                }]
                            })
                        } else {
                            exists.data.push({
                                prom1: prom1,
                            })
                        }
                    })
                    array3.forEach(entry => {
                        const { materia, prom1 } = entry;
                        const exists = this.materiass.find(y => y.materia === entry.materia)
                        if (!exists) {
                            this.materiass.push({
                                materia: materia, data: [{
                                    prom1: prom1,
                                }]
                            })
                        } else {
                            exists.data.push({
                                prom1: prom1,
                            })
                        }
                    })
                    this.info = resultado
                    this.ifload = false;
                    for (let h = 0; h < this.materiass.length; h++) {
                        const elemento = this.materiass[h].data;
                        let contador = 0
                        let aux = 0
                        for (let j = 0; j < elemento.length; j++) {
                            if (elemento[j].prom1 != 'NaN') {
                                contador = contador + parseFloat(elemento[j].prom1)
                                aux += 1
                            }
                        }
                        let sum = (contador / aux).toFixed(2)
                        this.finales.push(sum)
                    }
                    this.ifload = false;
                }
            } catch (error) {
                console.log("Error", error);
                this.ifload = false;
            }


        },
        calcularProyectos(a, b) {
            let aux = 0;
            let aux2 = 0;
            let p1 = a
            let p2 = b
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

            var result = parseInt((aux + aux2) / 2)
            var letra = 'E'
            switch (result) {
                case 5: letra = 'EX';
                    break;
                case 4: letra = 'MB';
                    break;
                case 3: letra = 'B';
                    break;
                case 2: letra = 'R';
                    break;
                default:
                    break;
            }
            return `${letra}`;
        },
        promedioP1(array) {
            let a1 = parseFloat(array.a1), a2 = parseFloat(array.a2), a3 = parseFloat(array.a3)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '') {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && a3 != '') {
                suma = a1 + a3; aux = 2
            } if (isNaN(a1) && a2 != '' && a3 != '') {
                suma = a2 + a3; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3)) {
                suma = a1; aux = 1
            } if (isNaN(a1) && isNaN(a2) && a3 != '') {
                suma = a3; aux = 1
            }
            prom = (suma / aux).toFixed(2);
            return prom;
        },
        promedioP2(array) {
            let a1 = parseFloat(array.b1), a2 = parseFloat(array.b2), a3 = parseFloat(array.b3)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '') {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && a3 != '') {
                suma = a1 + a3; aux = 2
            } if (isNaN(a1) && a2 != '' && a3 != '') {
                suma = a2 + a3; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3)) {
                suma = a1; aux = 1
            } if (isNaN(a1) && isNaN(a2) && a3 != '') {
                suma = a3; aux = 1
            }
            prom = (suma / aux).toFixed(2);
            return prom;
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



        totalesLetras(total) {
            let num = parseFloat(total);
            let result = ''
            if (num <= 10 && num >= 9) {
                result = 'DA'
            } else if (num <= 8.99 && num >= 7) {
                result = 'AA'
            } else if (num <= 6.99 && num >= 4.01) {
                result = 'PA'
            } else if (num <= 4 && num >= 1) {
                result = 'NA'
            } else {
                result = 'NA'
            }
            return result;
        },
        calcularComportamiento(aa1, bb2) {
            let aux = 0;
            let aux2 = 0;
            var letra = 'NO'
            let p1 = aa1
            let p2 = bb2
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

            var result = parseInt((aux + aux2) / 2)
            switch (result) {
                case 5: letra = 'A Muy Satisfactorio';
                    break;
                case 4: letra = 'B Satisfactorio';
                    break;
                case 3: letra = 'C Poco Satisfactorio';
                    break;
                case 2: letra = 'D Mejorable o Falla';
                    break;
                case 1: letra = 'E Insatisfactorio';
                    break;
                default:
                    break;
            }

            return letra;
        },
        calcularPryectos(p11, p22) {
            let aux = 0;
            let aux2 = 0;
            var letra = 'NO'
            let p1 = p11
            let p2 = p22
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

            var result = parseInt((aux + aux2) / 2)
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

            return letra;
        },
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
</script>
  