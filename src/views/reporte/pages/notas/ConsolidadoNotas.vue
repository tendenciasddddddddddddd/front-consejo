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
                                    <img style="width: 100%!important" src="../../../../assets/img/ecuador.jpg" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 86%;">
                                    <span style="color:#000;font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p
                                        style="margin-top:-1px;text-align: center!important;font-size: .75rem!important;">
                                        CONCENTRADO DE CALIFICACIONES POR PARALELO
                                    </p>

                                </div>
                            </div>
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div
                                    style="padding-left: 16px;font-size: .75rem!important; flex: 0 0 auto; width: 50%;text-align: left!important;">
                                    <span>{{curso}} - {{ paralelo}} </span>

                                </div>
                               
                            </div>
                            <div v-for="item in info" :key="item.id"> 
                                <div>
                                    <div>
                                        <table
                                            style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead>
                                                <tr>
                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;border-bottom: 0px;border-right: 1px solid #000;">
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;    font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        {{ item.materia }}
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th
                                                        style="padding: 1px 3px;border-bottom: 0px;border-right: 1px solid #000;font-size: .65rem!important;font-weight: 700!important;">
                                                        ESTUDIANTES
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        PRIMER QUIMESTRE
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        SEGUNDO QUIMESTRE
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        FINAL
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style="padding: 2px 3px;border-right: 1px solid #000;border-bottom: 1px solid #000;">
                                                    </th>
                                                    <th
                                                        style="min-width: 145px;padding: 2px 3px;border-bottom: 1px solid #000; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">p1</div>
                                                            <div style=" flex: 1 0 0%;">p2</div>
                                                            <div style=" flex: 1 0 0%;">PROM</div>
                                                            <div style=" flex: 1 0 0%;">(80%) </div>
                                                            <div style=" flex: 1 0 0%;">EXA</div>
                                                            <div style=" flex: 1 0 0%;">(20%)</div>
                                                            <div style=" flex: 1 0 0%;">QUI &nbsp;</div>
                                                        </div>
                                                    </th>
                                                    <th
                                                        style="min-width: 145px;border-bottom: 1px solid #000;padding: 2px 3px; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">p1</div>
                                                            <div style=" flex: 1 0 0%;">p2</div>
                                                            <div style=" flex: 1 0 0%;">PROM</div>
                                                            <div style=" flex: 1 0 0%;">(80%) </div>
                                                            <div style=" flex: 1 0 0%;">EXA</div>
                                                            <div style=" flex: 1 0 0%;">(20%)</div>
                                                            <div style=" flex: 1 0 0%;">QUI</div>
                                                        </div>
                                                    </th>
                                                    <th
                                                        style="padding: 2px 3px;border-bottom: 1px solid #000; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">suple</div>
                                                            <div style=" flex: 1 0 0%;">P ANUAL</div>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="ite in item.data" :key="ite.id">
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;  font-size: .65rem!important;">
                                                        {{ ite.nombre }}</td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000; font-size: .65rem!important;text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.prom1
                                                            }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">{{ ite.prom2
                                                            }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.parcial1 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.equivalPeriodos }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">{{ ite.examen
                                                            }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.exam2_20 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-right: 5px;">
                                                                {{ ite.final }}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.prom11
                                                            }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.prom21 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.parcial2 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.equivalPeriodos1 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.examen1 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.exam21_20 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                {{ ite.final1 }}&nbsp;
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;text-align: center!important;font-size: .65rem!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">
                                                                <b> </b>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;"> {{ ite.anual }}</div>
                                                        </div>
                                                    </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style="page-break-before:always;"></div><br><br>
                            </div>
                            <div v-for="item in proyectoss" :key="item.id">  <br><br>
                                <div>
                                    <div>
                                        <table
                                            style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead>
                                                <tr>
                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;border-bottom: 0px;border-right: 1px solid #000;">
                                                    </th>

                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;    font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: right!important;">
                                                        {{ item.materia }}
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th
                                                        style="padding: 1px 3px;border-bottom: 0px;border-right: 1px solid #000;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        ESTUDIANTES
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        PRIMER QUIMESTRE
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        SEGUNDO QUIMESTRE
                                                    </th>

                                                </tr>
                                                <tr>
                                                    <th
                                                        style="padding: 2px 3px;border-right: 1px solid #000;border-bottom: 1px solid #000;">
                                                    </th>
                                                    <th
                                                        style="min-width: 145px;padding: 2px 3px;border-bottom: 1px solid #000; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">p1</div>
                                                            <div style=" flex: 1 0 0%;">p2</div>
                                                            <div style=" flex: 1 0 0%;">QUI</div>
                                                        </div>
                                                    </th>
                                                    <th
                                                        style="min-width: 145px;border-bottom: 1px solid #000;padding: 2px 3px; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">p1</div>
                                                            <div style=" flex: 1 0 0%;">p2</div>
                                                            <div style=" flex: 1 0 0%;">QUI</div>
                                                        </div>
                                                    </th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="ite in item.data" :key="ite.id">
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;  font-size: .65rem!important;">
                                                        {{ ite.nombre }}</td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000; font-size: .65rem!important;text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p1 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">{{ ite.p2 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.pro }}
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;font-size: .65rem!important;text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p3 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.p4 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.pro2 }}
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> <div style="page-break-before:always;"></div><br><br>
                            </div>
                            <div v-for="item in ccomportamiento" :key="item.id"> <br><br>
                                <div>
                                    <div>
                                        <table
                                            style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead>
                                                <tr>
                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;border-bottom: 0px;border-right: 1px solid #000;">
                                                    </th>

                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;    font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: right!important;">
                                                        {{ item.materia }}
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th
                                                        style="padding: 1px 3px;border-bottom: 0px;border-right: 1px solid #000;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        ESTUDIANTES
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        PRIMER QUIMESTRE
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        SEGUNDO QUIMESTRE
                                                    </th>

                                                </tr>
                                                <tr>
                                                    <th
                                                        style="padding: 2px 3px;border-right: 1px solid #000;border-bottom: 1px solid #000;">
                                                    </th>
                                                    <th
                                                        style="min-width: 145px;padding: 2px 3px;border-bottom: 1px solid #000; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">p1</div>
                                                            <div style=" flex: 1 0 0%;">p2</div>
                                                            <div style=" flex: 1 0 0%;">QUI</div>
                                                        </div>
                                                    </th>
                                                    <th
                                                        style="min-width: 145px;border-bottom: 1px solid #000;padding: 2px 3px; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">p1</div>
                                                            <div style=" flex: 1 0 0%;">p2</div>
                                                            <div style=" flex: 1 0 0%;">QUI</div>
                                                        </div>
                                                    </th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="ite in item.data" :key="ite.id">
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;  font-size: .65rem!important;">
                                                        {{ ite.nombre }}</td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000; font-size: .65rem!important;text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p1 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">{{ ite.p2 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.pro }}
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;font-size: .65rem!important;text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p3 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.p4 }}
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.pro2 }}
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div
                                style="margin-top: 1.5rem!important;display: flex!important;justify-content: space-around!important;">
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
        parcial: Boolean,
        parcial2: Boolean
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
                w.document.write('<style type="text/css" media="print"> @media print{@page { margin-top: 0;margin-bottom: 0;size:landscape;}body  { padding-top: 6px; padding-bottom: 6px ;}} </style>');
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
             //   this.$dialog.alert('<b>HOLA PERROS</b>Por favor permitir siempre ventanas emergentes y redirecciones')
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
                    setTimeout(() => this.printDownload(), 1800);
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
                    let comportamiento = []
                    let proyectos = []
                    let dhi = []
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        let nombre = element.nombre;
                        this.curso = array[0].fknivel? array[0].fknivel.nombre: 'Undefined';
                        this.paralelo = array[0].curso
                        let calificacionesArray = element.calificaciones;
                        for (let j = 0; j < calificacionesArray.length; j++) {
                            const res = calificacionesArray[j];
                            let materia = res.materia;
                            if (res.notas.length > 0) {
                                //----------------------------QUIMESTRE 1 ----------------------
                                let prom1 = this.promedioP1(res.notas[0])
                                let prom1_80 = ((prom1 * 8) / 10).toFixed(2);
                                // SEGUNDO PARCIAL 
                                let prom2 = this.promedioP2(res.notas[0])

                                let prom2_80 = ((prom2 * 8) / 10).toFixed(2);
                                let par = (parseFloat(prom1) + parseFloat(prom2));
                                let parcial1 = (par / 2).toFixed(2);
                                let equivalPeriodos = ((parseFloat(prom1_80) + parseFloat(prom2_80)) / 2).toFixed(2);
                                let examen = res.notas[0].examen;
                                let exam2_20 = ((parseFloat(examen) * 2) / 10).toFixed(2);
                                let final = (parseFloat(equivalPeriodos) + parseFloat(exam2_20)).toFixed(2);
                                //----------------------------QUIMESTRE 2 ----------------------
                                let prom11 = this.promedioP1(res.notas[1])
                                let prom11_80 = ((prom11 * 8) / 10).toFixed(2);
                                // SEGUNDO PARCIAL 
                                let prom21 = this.promedioP2(res.notas[1])
                                let prom21_80 = ((prom21 * 8) / 10).toFixed(2);
                                let par2 = (parseFloat(prom11) + parseFloat(prom21));
                                let parcial2 = (par2 / 2).toFixed(2);
                                let equivalPeriodos1 = ((parseFloat(prom11_80) + parseFloat(prom21_80)) / 2).toFixed(2);
                                let examen1 = res.notas[1].examen;
                                let exam21_20 = ((parseFloat(examen1) * 2) / 10).toFixed(2);
                                let final1 = (parseFloat(equivalPeriodos1) + parseFloat(exam21_20)).toFixed(2);
                                let result = (parseFloat(final1) + parseFloat(final));
                                let anual = (result / 2).toFixed(2);
                                calificaciones.push({
                                    materia: materia,
                                    prom1: prom1,
                                    prom2: prom2,
                                    parcial1: parcial1,
                                    equivalPeriodos: equivalPeriodos,
                                    examen: examen,
                                    exam2_20: exam2_20,
                                    final: final,
                                    prom11: prom11,
                                    prom21: prom21,
                                    equivalPeriodos1: equivalPeriodos1,
                                    examen1: examen1,
                                    exam21_20: exam21_20,
                                    parcial2: parcial2,
                                    final1: final1,
                                    nombre: nombre,
                                    anual: anual
                                })
                            }
                            if (res.comportamiento.length > 0) {
                                let p1 = res.comportamiento[0].p1
                                let p2 = res.comportamiento[0].p2
                                let pro = this.calcularCompo(p1, p2)
                                let p3 = res.comportamiento[1].p1
                                let p4 = res.comportamiento[1].p2
                                let pro2 = this.calcularCompo(p3, p4)
                                comportamiento.push({
                                    materia: materia,
                                    nombre: nombre,
                                    p1: p1,
                                    p2: p2,
                                    pro: pro,
                                    p3: p3,
                                    p4: p4,
                                    pro2: pro2
                                })
                            }
                            if (res.dhi.length > 0) {
                                let p1 = res.dhi[0].p1
                                let p2 = res.dhi[0].p2
                                let pro = this.calcularCompo(p1, p2)
                                let p3 = res.dhi[1].p1
                                let p4 = res.dhi[1].p2
                                let pro2 = this.calcularCompo(p3, p4)
                                dhi.push({
                                    materia: materia,
                                    nombre: nombre,
                                    p1: p1,
                                    p2: p2,
                                    pro: pro,
                                    p3: p3,
                                    p4: p4,
                                    pro2: pro2
                                })
                            }
                            if (res.proyectos.length > 0) {
                                let p1 = res.proyectos[0].p1
                                let p2 = res.proyectos[0].p2
                                let pro = this.calcularProyectos(p1, p2)
                                let p3 = res.proyectos[1].p1
                                let p4 = res.proyectos[1].p2
                                let pro2 = this.calcularProyectos(p3, p4)
                                proyectos.push({
                                    materia: materia,
                                    nombre: nombre,
                                    p1: p1,
                                    p2: p2,
                                    pro: pro,
                                    p3: p3,
                                    p4: p4,
                                    pro2: pro2
                                })
                            }
                        }
                    }
                    this.ifload = false;
                    const distinctIds = [];
                    calificaciones.forEach(entry => {
                        const { materia, nombre, prom1, prom2, parcial1, equivalPeriodos, examen, exam2_20, final,
                            prom11, prom21, parcial2, equivalPeriodos1, examen1, exam21_20, final1, anual } = entry;
                        const exists = distinctIds.find(y => y.materia === entry.materia)
                        if (!exists) {
                            distinctIds.push({
                                materia: materia, data: [{
                                    nombre: nombre, prom1: prom1,
                                    prom2: prom2, parcial1: parcial1, equivalPeriodos: equivalPeriodos, examen: examen, exam2_20: exam2_20,
                                    final: final, prom11: prom11, prom21: prom21, equivalPeriodos1: equivalPeriodos1, parcial2: parcial2,
                                    examen1: examen1, exam21_20: exam21_20, final1: final1, anual: anual
                                }]
                            })
                        } else {
                            exists.data.push({
                                nombre: nombre, prom1: prom1, prom2: prom2, equivalPeriodos: equivalPeriodos,
                                examen: examen, exam2_20: exam2_20, final: final, prom11: prom11, prom21: prom21, parcial2: parcial2, parcial1: parcial1,
                                equivalPeriodos1: equivalPeriodos1, examen1: examen1, exam21_20: exam21_20, final1: final1
                                , anual: anual
                            })
                        }
                    })
                    this.info = distinctIds;
                    const compo = [];
                    comportamiento.forEach(entry => {
                        const { materia, nombre, p1, p2, p3, p4, pro, pro2 } = entry;
                        const exists = compo.find(y => y.materia === entry.materia)
                        if (!exists) {
                            compo.push({
                                materia: materia, data: [{
                                    nombre: nombre, p1: p1, pro: pro,
                                    p2: p2, p3: p3, p4: p4, pro2: pro2
                                }]
                            })
                        } else {
                            exists.data.push({ nombre: nombre, p1: p1, p2: p2, p3: p3, p4: p4, pro: pro, pro2: pro2 })
                        }
                    })
                    this.ccomportamiento = compo
                    const ddhhii = [];
                    dhi.forEach(entry => {
                        const { materia, nombre, p1, p2, p3, p4, pro, pro2 } = entry;
                        const exists = ddhhii.find(y => y.materia === entry.materia)
                        if (!exists) {
                            ddhhii.push({
                                materia: materia, data: [{
                                    nombre: nombre, p1: p1, pro: pro,
                                    p2: p2, p3: p3, p4: p4, pro2: pro2
                                }]
                            })
                        } else {
                            exists.data.push({ nombre: nombre, p1: p1, p2: p2, p3: p3, p4: p4, pro: pro, pro2: pro2 })
                        }
                    })
                    this.ddhi = ddhhii
                    const proyect = [];
                    proyectos.forEach(entry => {
                        const { materia, nombre, p1, p2, p3, p4, pro, pro2 } = entry;
                        const exists = proyect.find(y => y.materia === entry.materia)
                        if (!exists) {
                            proyect.push({
                                materia: materia, data: [{
                                    nombre: nombre, p1: p1, pro: pro,
                                    p2: p2, p3: p3, p4: p4, pro2: pro2
                                }]
                            })
                        } else {
                            exists.data.push({ nombre: nombre, p1: p1, p2: p2, p3: p3, p4: p4, pro: pro, pro2: pro2 })
                        }
                    })
                    this.proyectoss = proyect
                }
            } catch (error) {
                console.log("Error", error);
                this.ifload = false;
            }
        },
        promedioP1(array) {
            let a1 = parseFloat(array.a1)==0? 0.001: parseFloat(array.a1), a2 = parseFloat(array.a2)==0? 0.001: parseFloat(array.a2), 
            a3 = parseFloat(array.a3)==0? 0.001: parseFloat(array.a3), a4 = parseFloat(array.a4)==0? 0.001: parseFloat(array.a4), a5 = parseFloat(array.a5)==0? 0.001: parseFloat(array.a5)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && a5 != '') {
                suma = a1 + a2 + a3 + a4 + a5; aux = 5
            } if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4; aux = 4
            } if (a1 != '' && a2 != '' && a3 != '' && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1; aux = 1
            }
            prom = (suma / aux).toFixed(2)
            return prom;
        },
        promedioP2(array) {
            let a1 = parseFloat(array.b1)==0? 0.001: parseFloat(array.b1), a2 = parseFloat(array.b2)==0? 0.001: parseFloat(array.b2), 
            a3 = parseFloat(array.b3)==0? 0.001: parseFloat(array.b3), a4 = parseFloat(array.b4)==0? 0.001: parseFloat(array.b5), a5 = parseFloat(array.b5)==0? 0.001: parseFloat(array.b5)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && a5 != '') {
                suma = a1 + a2 + a3 + a4 + a5; aux = 5
            } if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4; aux = 4
            } if (a1 != '' && a2 != '' && a3 != '' && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1; aux = 1
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
        calcularCompo(a, b) {
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
        }
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
</script>
  