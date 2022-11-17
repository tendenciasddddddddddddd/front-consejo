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
                            <div style="flex: 0 0 auto; width: 16.666667%;text-align: center!important;">
                                <img style="width: 65%!important;" :src="settings.logo" alt="Logo" />
                            </div>
                            <div style="flex: 0 0 auto; width: 75%;">
                                <span style="color:#000;font-weight: 600;font-size: 1rem;line-height: 1.375;">
                                    {{ settings.unidadeducativa }}
                                </span><br>
                                <span style="text-align: center!important;font-size: .75rem!important;">
                                    Dirección: {{ settings.direccion }} Teléf: {{ settings.telefono }}
                                </span> <br>
                                <span style="font-size: .65rem!important;"> {{ settings.ubicacion }}</span>
                            </div>

                        </div>
                        <div
                            style="font-size: .75rem!important; --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                            <div style="flex: 0 0 auto; width: 60%;  text-align: left!important;">
                                <div
                                    style="margin-left: 20px; --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                    <div style="flex: 0 0 auto;width: 20%;">
                                        CURSO : <br>
                                        ALUMNO:
                                    </div>
                                    <div style="flex: 0 0 auto;width: 80%;">
                                        <b>{{ item.fknivel.nombre }}{{ item.curso }}</b> <br>
                                        <b>{{ item.nombre }}</b>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 0 0 auto; width: 40%;  text-align: right!important;">
                                <div
                                    style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                    <div style=" flex: 1 0 0%;">
                                        PERIODO : <br>
                                        FECHA : <br>
                                        CÓDIGO :
                                    </div>
                                    <div style=" flex: 1 0 0%;">
                                        <b>{{ item.academico.nombre }}</b> <br>
                                        <b>{{ fechasActual }}</b> <br>
                                        <b>344</b>
                                    </div>
                                </div>
                            </div>
                        </div><br>
                        <span style="font-weight: 400;font-size: 1rem!important; margin-top: 0.5rem!important;">LIBRO
                            QUIMESTRAL DE APRENDIZAJES
                            Y
                            COMPORTAMIENTO</span>
                        <div
                            style="margin-top: 0.5rem !important; --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                            <div
                                style="flex: 0 0 auto; width: 91%;    margin-right: auto!important; margin-left: auto!important;">
                                <div style="width: 670px;">
                                    <table
                                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                        <thead>
                                            <tr>
                                                <th
                                                    style="border-top: 1px solid #d9d9d9;padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                                    ASIGNATURAS
                                                </th>
                                                <th
                                                    style="border-top: 1px solid #d9d9d9;padding: 4px 5px;font-size: .65rem!important;">
                                                    QUIMESTRE 1
                                                </th>
                                                <th
                                                    style="border-top: 1px solid #d9d9d9;padding: 4px 5px;font-size: .65rem!important;">
                                                    QUIMESTRE 2
                                                </th>
                                                <th
                                                    style="border-top: 1px solid #d9d9d9;padding: 4px 5px;font-size: .65rem!important;">
                                                    RESULTADOS
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);">
                                                </th>
                                                <th
                                                    style="padding: 4px 5px;font-size: .65rem!important;text-transform: uppercase!important;">
                                                    <div
                                                        style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                        <div style=" flex: 1 0 0%;">a1</div>
                                                        <div style=" flex: 1 0 0%;">a2</div>
                                                        <div style=" flex: 1 0 0%;">pr</div>

                                                    </div>
                                                </th>
                                                <th
                                                    style="padding: 4px 5px;font-size: .65rem!important;text-transform: uppercase!important;">
                                                    <div
                                                        style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                        <div style=" flex: 1 0 0%;">b1</div>
                                                        <div style=" flex: 1 0 0%;">b2</div>
                                                        <div style=" flex: 1 0 0%;">pr</div>

                                                    </div>
                                                </th>
                                                <th
                                                    style="padding: 4px 5px;font-size: .65rem!important;text-transform: uppercase!important;">
                                                    <div>promedio</div>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="ite in item.calificaciones" :key="ite.id">
                                                <td v-if="ite.comportamiento.length > 0"
                                                    style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;text-align: center!important;">
                                                    {{ ite.materia }}</td>
                                                <td v-if="ite.comportamiento.length > 0"
                                                    style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;text-align: center!important;">
                                                    <div
                                                        style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                        <div style=" flex: 1 0 0%;">{{ ite.comportamiento[0].p1 }}</div>
                                                        <div style=" flex: 1 0 0%;">{{ ite.comportamiento[0].p2 }}</div>
                                                        <div style=" flex: 1 0 0%;">
                                                            {{ calcularPromedio(ite.comportamiento[0].p1,
                                                                    ite.comportamiento[0].p2)
                                                            }}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td v-if="ite.comportamiento.length > 0"
                                                    style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;text-align: center!important;">
                                                    <div
                                                        style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                        <div style=" flex: 1 0 0%;">{{ ite.comportamiento[1].p1 }}</div>
                                                        <div style=" flex: 1 0 0%;">{{ ite.comportamiento[1].p2 }}</div>
                                                        <div style=" flex: 1 0 0%;">
                                                            {{ calcularPromedio(ite.comportamiento[1].p1,
                                                                    ite.comportamiento[1].p2)
                                                            }}
                                                        </div>

                                                    </div>
                                                </td>
                                                <td v-if="ite.comportamiento.length > 0"
                                                    style="padding: 4px 5px;border-bottom-width: 0px;font-size: .65rem!important;text-align: center!important;">
                                                    {{ calcularPromedio80(
                                                            ite.comportamiento[0].p1, ite.comportamiento[0].p2,
                                                            ite.comportamiento[1].p1, ite.comportamiento[1].p2
                                                        )
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);">
                                                </td>
                                                <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);">
                                                </td>
                                                <td
                                                    style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                                    PROMEDIOS </td>
                                                <td
                                                    style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                                    {{ total(item.calificaciones) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table
                                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">

                                                    COMPORTAMIENTO
                                                </td>
                                                <td style="border-bottom-width: 0px;font-size: .65rem!important;">

                                                    <b>{{ total(item.calificaciones) }}</b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
        numQuimestre: Number,
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
                    // console.log(this.info)
                    setTimeout(() => this.printDownload(), 1500);
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
        calcularPromedio: function (a, b) {
            let aux = 0;
            let aux2 = 0;
            let p1 = a
            let p2 = b
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
            var letra = 'E'
            switch (result) {
                case 5: letra = 'A';
                    break;
                case 4: letra = 'B';
                    break;
                case 3: letra = 'C';
                    break;
                case 2: letra = 'D';
                    break;
                case 1: letra = 'E';
                    break;
                default:
                    break;
            }
            return `${letra}`;
        },

        calcularPromedio80: function (a, b, c, d) {
            let aux = 0;
            let aux2 = 0;
            let aux3 = 0;
            let aux4 = 0;
            let p1 = a
            let p2 = b
            let p3 = c
            let p4 = d
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
            var letra = 'E'
            switch (result) {
                case 5: letra = 'A';
                    break;
                case 4: letra = 'B';
                    break;
                case 3: letra = 'C';
                    break;
                case 2: letra = 'D';
                    break;
                case 1: letra = 'E';
                    break;
                default:
                    break;
            }
            return `${letra}`;
        },

        total(array) {
            let auxH = 0
            let constador = 0
            for (let i = 0; i < array.length; i++) {
                const element = array[i].comportamiento;
                if (element.length > 0) {
                    let aux = 0;
                    let aux2 = 0;
                    let aux3 = 0;
                    let aux4 = 0;
                    let p1 = element[0].p1
                    let p2 = element[0].p2
                    let p3 = element[1].p1
                    let p4 = element[1].p2
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
                    let prom = parseInt((aux + aux2 + aux3 + aux4) / 4)
                    auxH = auxH + prom
                    constador += constador
                }

            }
            let result = parseInt(auxH / constador);
            var letra = 'E'
            switch (result) {
                case 5: letra = 'A';
                    break;
                case 4: letra = 'B';
                    break;
                case 3: letra = 'C';
                    break;
                case 2: letra = 'D';
                    break;
                case 1: letra = 'E';
                    break;
                default:
                    break;
            }
            return `${letra}`;
        },
        totalEquivalente(array) {
            let aux = 0
            for (let i = 0; i < array.length; i++) {
                const element = array[i].comportamiento;
                let result = parseFloat(element[0].p1) + parseFloat(element[0].p2) + parseFloat(element[1].p1) + parseFloat(element[1].p2)
                let prom = result / 4
                aux = aux + prom
            }
            let num = (aux / array.length).toFixed(2);
            let result = ''
            if (num <= 10 && num >= 9) {
                result = 'A'
            } else if (num <= 8.99 && num >= 7) {
                result = 'B'
            } else if (num <= 6.99 && num >= 4.01) {
                result = 'C'
            } else if (num <= 4 && num >= 1) {
                result = 'D'
            } else {
                result = 'NA'
            }
            return `${result}`;
        }
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
</script>
  