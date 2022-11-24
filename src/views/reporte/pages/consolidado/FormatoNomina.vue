<template>
    <div>
        <section id="box">
            <section style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 1.5rem!important;">
                <div style="padding: 1rem;">
                    <div v-for="rows in resultado" :key="rows.id"
                        style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                        <div style="text-align: center!important;">
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div style="flex: 0 0 auto; width: 10%;text-align: right!important;">
                                    <img style="width: 55%!important;" :src="settings.logo" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 88%;">
                                    <span style="color:#000;font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <span style="margin-top:-10px;text-align: center!important;">
                                        Dirección: {{ settings.direccion }} Teléf: {{ settings.telefono }}
                                    </span> <br>
                                    <span style="font-size: .75rem!important;color:#000;">
                                        El Ángel {{ settings.ubicacion }}</span>
                                </div>

                            </div>
                        </div>
                        <hr style="height: 1px;background: #000;">
                        <div
                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                            <div
                                style="padding-left: 15px;font-size: .75rem!important; flex: 0 0 auto; width: 48%;text-align: left!important;">
                                <span>CURSO : <b>{{ rows.cursos }} </b></span> <br>
                                <span>Asignatura : ____________________</span><br>
                                <span>Profesor(a) : ____________________</span>
                            </div>

                            <div
                                style="font-size: .75rem!important; flex: 0 0 auto; width: 48%;text-align: right!important;">
                                <span>PERIODO: <b>2022-2023</b></span><br>
                                <span>FECHA: {{ $store.state.fechaReporter }}{{ fechasActual }}</span>
                            </div>
                        </div><br>
                        <table
                            style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                            <thead>
                                <tr>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #000;font-size: .65rem!important;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                            <div style="flex: 0 0 auto; width: 10%;padding-left: 7px; ">Núm.</div>
                                            <div style="flex: 0 0 auto; width: 20%;">COD.</div>
                                            <div style="flex: 0 0 auto; width: 68%;">APELLIDOS y NOMBRES</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in rows.data" :key="item.id">
                                    <td
                                        style="border-top: 1px solid #000;padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000; font-size: .65rem!important;text-align: left!important;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                            <div style="flex: 0 0 auto; width: 10%;padding-left: 7px;border-right: 1px solid #000;">
                                                &nbsp;{{ index + 1 }}
                                            </div>
                                            <div style="flex: 0 0 auto; width: 20%;padding-left: 5px;border-right: 1px solid #000;">
                                                {{ item.nmatricula }}
                                            </div>
                                            <div style="flex: 0 0 auto; width: 65%;padding-left: 5px;">{{ item.nombre }}
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                        <div style="page-break-before:always;"></div>
                    </div>
                </div>
            </section>

        </section>
    </div>
</template>
<script >
export default {
    name: 'Consolidado',
    props: {
        settings: Object,
    },
    data() {
        return {
            modals: true,
            ifview: '1',
            ifLoad: true,
            infoMat: {},
            isTodo: false,
            intensivos: null,
            resultado: [],
            statusbar: "",
            fechasActual: ''
        }
    },
    created() {
        this.getData()
        this.__calcularfechaActual()
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
                let w = window.open('', '_blank', 'height=600,width=900,top=150,left= 400');
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
        close() {
            this.$emit('myEventClosedModalConsolidado')
        },
        getData() {
            this.$Progress.start();
            this.ifLoad = true;
            this.$proxies._matriculaProxi
                .getMatriculas()
                .then((x) => {
                    this.infoMat = x.data;
                    this.formData(this.infoMat)
                    this.ifLoad = false;
                    setTimeout(() => this.printDownload(), 2000);
                    this.$Progress.finish();
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.ifLoad = false;
                    this.$Progress.fail();
                });
        },
        formData(data) {
            if (data.length > 0) {
                try {
                    const result = []
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        let nombre = element.fkestudiante ? element.fkestudiante.fullname : 'Sin Nombre'
                        let paralelo = element.curso
                        let curso = element.fknivel ? element.fknivel.nombre : 'Sin curso';
                        let cursos = curso + ' ' + paralelo
                        let num = element.fknivel ? element.fknivel.num : 0;
                        result.push({
                            nmatricula: element.nmatricula,
                            nombre: nombre,
                            cursos: cursos,
                            num: num,
                        })
                    }
                    const order = result.sort(function (a, b) {
                        var nameA = a.nombre.toLowerCase(), nameB = b.nombre.toLowerCase();
                        if (nameA < nameB)
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0;
                    });
                    const distinctIds = [];
                    order.forEach(entry => {
                        const { cursos, nombre, nmatricula, num } = entry;
                        const exists = distinctIds.find(y => y.cursos === entry.cursos)
                        if (!exists) {
                            distinctIds.push({
                                cursos: cursos, num: num, data: [{
                                    nombre: nombre, nmatricula: nmatricula,
                                }]
                            })
                        } else {
                            exists.data.push({
                                nombre: nombre, nmatricula: nmatricula,
                            })
                        }
                    })
                    
                    this.resultado = distinctIds.sort((a, b) => parseFloat(a.num) - parseFloat(b.num));
                    console.log(this.resultado)
                } catch (error) {
                    console.log(error);
                }
            }
        },
        __calcularfechaActual() {
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];
            const dateObj = new Date();
            const month = monthNames[dateObj.getMonth()];
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();
            const output = day + " de " + month + '\n' + ' del ' + year;
            this.fechasActual = output;
        },
    },

}
</script>
  