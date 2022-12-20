<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <section id="box">
                <div style="margin-right: .2rem!important;margin-left: .2rem!important;margin-top: 1rem!important;">
                    <div style="padding: .2rem;">
                        <div style="text-align: center!important;" v-for="item in info" :key="item.id">
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;">
                                <div style="flex: 0 0 auto;width: 12%;text-align: center!important;">
                                    <img style="width: 70%!important" :src="settings.logo" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 86%;">
                                    <span style="color:#000;font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p
                                        style="margin-top:-1px;text-align: center!important;font-size: .75rem!important;">
                                        Dirección: {{ settings.direccion }} Teléf: {{ settings.telefono }} <br>
                                        {{ settings.ubicacion }}
                                    </p>

                                </div>
                            </div>
                            <hr>
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div
                                    style="padding-left: 16px;font-size: .75rem!important; flex: 0 0 auto; width: 50%;text-align: left!important;">
                                    <p>Curso : {{curso}} - {{ paralelo}}  <br>
                                     Asignatura : {{ item.materia }} <br>
                                     Profesor(a) : {{ item.docente }}</p>
                                </div>
                                <div
                                    style="font-size: .75rem!important; flex: 0 0 auto; width: 47%;text-align: right!important;">
                                    <span>PERIODO: <b>2022-2023</b></span><br>
                                    <span>FECHA: {{ fechasActual }}</span>
                                </div>
                            </div>
                            <div > 
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
                                                        <span v-if="numQuimestre == 0">PRIMER QUIMESTRE</span>
                                                        <span v-else>SEGUNDO QUIMESTRE</span>
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
                                                        PARCIAL 1
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        PARCIAL 2
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
                                                        style="min-width: 145px;padding: 2px 3px;border-bottom: 1px solid #000; font-size: .65rem!important;font-weight: 700!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">Ins.1</div>
                                                            <div style=" flex: 1 0 0%;">Ins.2</div>
                                                            <div style=" flex: 1 0 0%;">Ins.3</div>
                                                            <div style=" flex: 1 0 0%;">Ins.4 </div>
                                                            <div style=" flex: 1 0 0%;">Ins.5</div>
                                                            <div style=" flex: 1 0 0%;">PRO &nbsp;</div>
                                                        </div>
                                                    </th>
                                                    <th
                                                        style="min-width: 145px;border-bottom: 1px solid #000;padding: 2px 3px; font-size: .65rem!important;font-weight: 700!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">Ins.1</div>
                                                            <div style=" flex: 1 0 0%;">Ins.2</div>
                                                            <div style=" flex: 1 0 0%;">Ins.3</div>
                                                            <div style=" flex: 1 0 0%;">Ins.4 </div>
                                                            <div style=" flex: 1 0 0%;">Ins.5</div>
                                                            <div style=" flex: 1 0 0%;">PRO &nbsp; </div>

                                                        </div>
                                                    </th>
                                                    <th
                                                        style="padding: 2px 3px;border-bottom: 1px solid #000; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">EX</div>
                                                            <div style=" flex: 1 0 0%;">EQ</div>
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
                                                        <div v-if="parcial"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">
                                                                <span v-if="(ite.a1 != 'NaN')"> {{ ite.a1}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a2 != 'NaN')"> {{ ite.a2}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a3 != 'NaN')"> {{ ite.a3}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a4 != 'NaN')"> {{ ite.a4}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a5 != 'NaN')"> {{ ite.a5}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.prom1 != 'NaN')"> {{ ite.prom1}}</span>
                                                            </div>
                                                            
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;text-align: center!important;">
                                                        <div v-if="parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">
                                                                <span v-if="(ite.b1 != 'NaN')"> {{ ite.b1}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.b2 != 'NaN')"> {{ ite.b2}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.b3 != 'NaN')"> {{ ite.b3}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.b4 != 'NaN')"> {{ ite.b4}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.b5 != 'NaN')"> {{ ite.b5}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.prom2 != 'NaN')"> {{ ite.prom2}}</span>
                                                            </div>
                                                            
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;text-align: center!important;font-size: .65rem!important;">
                                                        <div v-if="parcial && parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">
                                                                <span v-if="(ite.examen != 'NaN')&& (ite.examen != '1')"> {{ ite.examen}}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;"> {{ ite.exam2_20 }}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .60rem!important;">
                                                       <b>PROMEDIO</b> </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: right !important;">
                                                        <span v-if="parcial"> <b>{{promdioParcial(item.data)}}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: right !important;">
                                                        <span v-if="parcial2"> <b>{{promdioParcial2(item.data)}}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: center !important;">
                                                        <span ></span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div style="display: flex!important;">
                                            <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>DA</th>
                                                <th>AA</th>
                                                <th>PA</th>
                                                <th>NA</th>
                                            </thead>
                                            <tbody>
                                                <tr  style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaParcialDA(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaParcialAA(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaParcialPA(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaParcialNA(item.data)}}</span> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>DA</th>
                                                <th>AA</th>
                                                <th>PA</th>
                                                <th>NA</th>
                                            </thead>
                                            <tbody>
                                                <tr style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaParcialDA2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaParcialAA2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaParcialPA2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaParcialNA2(item.data)}}</span> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>DA</th>
                                                <th>AA</th>
                                                <th>PA</th>
                                                <th>NA</th>
                                            </thead>
                                            <tbody>
                                                <tr style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div style=" margin-top: 10px;   font-size: 12px;">
                                            _________________________ <br>
                                           <b>FIRMA TUTOR</b> 
                                        </div> 
                                        </div>
                                    <div  style="margin-top: 8px;font-size: .75rem; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                        9,10.DA=Domina Aprend. &nbsp;&nbsp; 7,8.AA=Alcanza Aprend.&nbsp;&nbsp; 5,6.PA=Próximo Alcanzar &nbsp;&nbsp; 1,2,3,4.NA=No Alcanza.&nbsp;&nbsp;
                                       A=Muy Satisfactorio &nbsp;&nbsp; B=Satisfactorio&nbsp;&nbsp; C=Poco Satisfactorio&nbsp;&nbsp; D=Mejorable&nbsp;&nbsp; E=Insatisfactorio
                                    </div>
                                    </div>
                                </div>
                                <div style="page-break-before:always;"></div> <br> <br>
                            </div>
                        </div>
                        <div style="text-align: center!important;" v-for="item in proyectoss" :key="item.id">
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;">
                                <div style="flex: 0 0 auto;width: 12%;text-align: center!important;">
                                    <img style="width: 70%!important" :src="settings.logo" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 86%;">
                                    <span style="color:#000;font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p
                                        style="margin-top:-1px;text-align: center!important;font-size: .75rem!important;">
                                        Dirección: {{ settings.direccion }} Teléf: {{ settings.telefono }} <br>
                                        {{ settings.ubicacion }}
                                    </p>

                                </div>
                            </div>
                            <hr>
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div
                                    style="padding-left: 16px;font-size: .75rem!important; flex: 0 0 auto; width: 50%;text-align: left!important;">
                                    <p>Curso : {{curso}} - {{ paralelo}}  <br>
                                     Asignatura : {{ item.materia }} <br>
                                     Profesor(a) : {{ item.docente }}</p>
                                </div>
                                <div
                                    style="font-size: .75rem!important; flex: 0 0 auto; width: 47%;text-align: right!important;">
                                    <span>PERIODO: <b>2022-2023</b></span><br>
                                    <span>FECHA: {{ fechasActual }}</span>
                                </div>
                            </div>
                            <div > 
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
                                                        style="padding: 0px 2px;border-top: 1px solid #000;    font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: right!important;">
                                                        <span v-if="numQuimestre == 0">PRIMER QUIMESTRE</span>
                                                        <span v-else>SEGUNDO QUIMESTRE</span>
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th
                                                        style="padding: 1px 3px;border-bottom: 1px solid #000;border-right: 1px solid #000;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        ESTUDIANTES
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-bottom: 1px solid #000;font-weight: 700!important;  text-align: center!important;">
                                                        PARCIAL 1
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-bottom: 1px solid #000;font-weight: 700!important;  text-align: center!important;">
                                                        PARCIAL 2
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-bottom: 1px solid #000;font-weight: 700!important;  text-align: center!important;">
                                                        PROMEDIO
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
                                                        <div v-if="parcial"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p1 }}
                                                            </div>
                                                            
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;text-align: center!important;">
                                                        <div v-if="parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p2 }}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;font-size: .65rem!important;text-align: center!important;">
                                                        <div v-if="parcial && parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.pro }}
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .60rem!important;">
                                                       <b>PROMEDIO</b> </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: center !important;">
                                                        <span v-if="parcial"> <b>{{promdioParcialLetras(item.data)}}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: center !important;">
                                                        <span v-if="parcial2"> <b>{{promdioParcialLetras2(item.data)}}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: center !important;">
                                                        <span ></span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div style="display: flex!important;">
                                            <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>EX</th>
                                                <th>MB</th>
                                                <th>B</th>
                                                <th>R</th>
                                            </thead>
                                            <tbody>
                                                <tr  style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasEX(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasMB(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasB(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasR(item.data)}}</span> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>EX</th>
                                                <th>MB</th>
                                                <th>B</th>
                                                <th>R</th>
                                            </thead>
                                            <tbody>
                                                <tr style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasEX2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasMB2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasB2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasR2(item.data)}}</span> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>EX</th>
                                                <th>MB</th>
                                                <th>B</th>
                                                <th>R</th>
                                            </thead>
                                            <tbody>
                                                <tr style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div style=" margin-top: 10px;   font-size: 12px;">
                                            _________________________ <br>
                                           <b>FIRMA TUTOR</b> 
                                        </div> 
                                        </div>
                                    <div  style="margin-top: 8px;font-size: .75rem; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                        9,10.DA=Domina Aprend. &nbsp;&nbsp; 7,8.AA=Alcanza Aprend.&nbsp;&nbsp; 5,6.PA=Próximo Alcanzar &nbsp;&nbsp; 1,2,3,4.NA=No Alcanza.&nbsp;&nbsp;
                                       A=Muy Satisfactorio &nbsp;&nbsp; B=Satisfactorio&nbsp;&nbsp; C=Poco Satisfactorio&nbsp;&nbsp; D=Mejorable&nbsp;&nbsp; E=Insatisfactorio
                                    </div>
                                </div>
                                <div style="page-break-before:always;"></div> <br> <br>
                            </div>
                         
                        </div>

 <!-- ------     COMPORTAMIENTO                   -->
                        <div style="text-align: center!important;" v-for="item in ccomportamiento" :key="item.id">
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;">
                                <div style="flex: 0 0 auto;width: 12%;text-align: center!important;">
                                    <img style="width: 70%!important" :src="settings.logo" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 86%;">
                                    <span style="color:#000;font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p
                                        style="margin-top:-1px;text-align: center!important;font-size: .75rem!important;">
                                        Dirección: {{ settings.direccion }} Teléf: {{ settings.telefono }} <br>
                                        {{ settings.ubicacion }}
                                    </p>

                                </div>
                            </div>
                            <hr>
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div
                                    style="padding-left: 16px;font-size: .75rem!important; flex: 0 0 auto; width: 50%;text-align: left!important;">
                                    <p>Curso : {{curso}} - {{ paralelo}}  <br>
                                     Asignatura : {{ item.materia }} <br>
                                     Profesor(a) : {{ item.docente }}</p>
                                </div>
                                <div
                                    style="font-size: .75rem!important; flex: 0 0 auto; width: 47%;text-align: right!important;">
                                    <span>PERIODO: <b>2022-2023</b></span><br>
                                    <span>FECHA: {{ fechasActual }}</span>
                                </div>
                            </div>
                            <div > 
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
                                                        style="padding: 0px 2px;border-top: 1px solid #000;    font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: right!important;">
                                                        <span v-if="numQuimestre == 0">PRIMER QUIMESTRE</span>
                                                        <span v-else>SEGUNDO QUIMESTRE</span>
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th
                                                        style="padding: 1px 3px;border-bottom: 1px solid #000;border-right: 1px solid #000;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        ESTUDIANTES
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-bottom: 1px solid #000;font-weight: 700!important;  text-align: center!important;">
                                                        PARCIAL 1
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-bottom: 1px solid #000;font-weight: 700!important;  text-align: center!important;">
                                                        PARCIAL 2
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-bottom: 1px solid #000;font-weight: 700!important;  text-align: center!important;">
                                                        PROMEDIO
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
                                                        <div v-if="parcial"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p1 }}
                                                            </div>
                                                            
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;text-align: center!important;">
                                                        <div v-if="parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">{{ ite.p2 }}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;font-size: .65rem!important;text-align: center!important;">
                                                        <div v-if="parcial && parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                {{ ite.pro }}
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .60rem!important;">
                                                       <b>PROMEDIO</b> </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: center !important;">
                                                        <span v-if="parcial"> <b>{{promdioComportamientoLetras(item.data)}}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: center !important;">
                                                        <span v-if="parcial2"> <b>{{promdioComportamientoLetras2(item.data)}}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: center !important;">
                                                        <span ></span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div style="display: flex!important;">
                                            <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>A</th>
                                                <th>B</th>
                                                <th>C</th>
                                                <th>D</th>
                                                <th>E</th>
                                            </thead>
                                            <tbody>
                                                <tr  style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasA(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasBB(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasC(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasD(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial">{{mediaLetrasE(item.data)}}</span> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>A</th>
                                                <th>B</th>
                                                <th>C</th>
                                                <th>D</th>
                                                <th>E</th>
                                            </thead>
                                            <tbody>
                                                <tr style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasA2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasBB2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasC2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasD2(item.data)}}</span> </td>
                                                    <td style="border-top: 1px solid #000;"><span v-if="parcial2">{{mediaLetrasE2(item.data)}}</span> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="margin-top: 8px; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead style="font-size: .65rem!important;text-align: center!important;">
                                                <th></th>
                                                <th>A</th>
                                                <th>B</th>
                                                <th>C</th>
                                                <th>D</th>
                                                <th>E</th>
                                            </thead>
                                            <tbody>
                                                <tr style="font-size: .65rem!important;text-align: center!important;">
                                                    <td style="border-top: 1px solid #000;"> <b>Ʃ</b> </td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                    <td style="border-top: 1px solid #000;"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div style=" margin-top: 10px;   font-size: 12px;">
                                            _________________________ <br>
                                           <b>FIRMA TUTOR</b> 
                                        </div> 
                                        </div>
                                    <div  style="margin-top: 8px;font-size: .75rem; border-color: #000;border-style: solid;border-width: 1px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                        9,10.DA=Domina Aprend. &nbsp;&nbsp; 7,8.AA=Alcanza Aprend.&nbsp;&nbsp; 5,6.PA=Próximo Alcanzar &nbsp;&nbsp; 1,2,3,4.NA=No Alcanza.&nbsp;&nbsp;
                                       A=Muy Satisfactorio &nbsp;&nbsp; B=Satisfactorio&nbsp;&nbsp; C=Poco Satisfactorio&nbsp;&nbsp; D=Mejorable&nbsp;&nbsp; E=Insatisfactorio
                                    </div>
                                </div>
                                <div style="page-break-before:always;"></div>
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
        ifDecimal(num){
            if (num != '') {
                var partes = num.toString().split('.'); 
                var re = /^-?[0-9]+$/;
                if (re.test(num)) {
                    return num + ".00";
                } else if (partes[1]?.length ==1) {
                    return num + "0";
                } else {
                    return num
                }
            } else {
                return '';
            }
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
                            let docente = res.docente;
                            if (res.notas.length > 0) {
                                //----------------------------QUIMESTRE 1 2----------------------
                                let a1 = this.ifDecimal(res.notas[this.numQuimestre].a1.trim());
                                let a2 = this.ifDecimal(res.notas[this.numQuimestre].a2.trim());
                                let a3 = this.ifDecimal(res.notas[this.numQuimestre].a3.trim());
                                let a4 = this.ifDecimal(res.notas[this.numQuimestre].a4.trim());
                                let a5 = this.ifDecimal(res.notas[this.numQuimestre].a5.trim());
                                let prom1 = this.promedioP1(res.notas[this.numQuimestre])
                                let prom1_80 = ((prom1 * 8) / 10).toFixed(2);

                                // SEGUNDO PARCIAL 
                                let b1 = this.ifDecimal(res.notas[this.numQuimestre].b1.trim());
                                let b2 = this.ifDecimal(res.notas[this.numQuimestre].b2.trim());
                                let b3 = this.ifDecimal(res.notas[this.numQuimestre].b3.trim());
                                let b4 = this.ifDecimal(res.notas[this.numQuimestre].b4.trim());
                                let b5 = this.ifDecimal(res.notas[this.numQuimestre].b5.trim());
                                let prom2 = this.promedioP2(res.notas[this.numQuimestre])
                                let prom2_80 = ((prom2 * 8) / 10).toFixed(2);
                                let par = (parseFloat(prom1) + parseFloat(prom2));
                                let parcial1 = (par / 2).toFixed(2);
                                let equivalPeriodos = ((parseFloat(prom1_80) + parseFloat(prom2_80)) / 2).toFixed(2);
                                let examen = res.notas[this.numQuimestre].examen.trim();
                                let exam2_20 = ((parseFloat(examen) * 2) / 10).toFixed(2);
                                let final = (parseFloat(equivalPeriodos) + parseFloat(exam2_20)).toFixed(2);
                                //----------------------------QUIMESTRE 2 ----------------------
                                let anual = 0;
                                calificaciones.push({
                                    materia: materia,
                                    docente : docente,
                                    a1: a1,
                                    a2: a2,
                                    a3: a3,
                                    a4: a4,
                                    a5: a5,
                                    prom1: prom1,
                                    b1: b1,
                                    b2: b2,
                                    b3: b3,
                                    b4: b4,
                                    b5: b5,
                                    prom2: prom2,
                                    parcial1: parcial1,
                                    equivalPeriodos: equivalPeriodos,
                                    examen: this.ifDecimal(examen),
                                    exam2_20: exam2_20,
                                    final: final,
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
                                    docente : docente,
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
                                    docente : docente,
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
                                let p1 = res.proyectos[this.numQuimestre].p1
                                let p2 = res.proyectos[this.numQuimestre].p2
                                let pro = this.calcularProyectos(p1, p2)
                                
                                proyectos.push({
                                    materia: materia,
                                    docente : docente,
                                    nombre: nombre,
                                    p1: p1,
                                    p2: p2,
                                    pro: pro,
                                })
                            }
                        }
                    }
                    this.ifload = false;
                    const distinctIds = [];
                    calificaciones.forEach(entry => {
                        const { materia, docente, nombre, prom1, prom2, parcial1, equivalPeriodos, examen, exam2_20, final,
                            a1,a2,a3,a4,a5,b1,b2,b3,b4,b5, anual } = entry;
                        const exists = distinctIds.find(y => y.materia === entry.materia)
                        if (!exists) {
                            distinctIds.push({
                                materia: materia, docente : docente, data: [{
                                    nombre: nombre, prom1: prom1,a1: a1,a2: a2,a3: a3,a4: a4,a5: a5,b1: b1,b2: b2,b3: b3,b4: b4,b5: b5,
                                    prom2: prom2, parcial1: parcial1, equivalPeriodos: equivalPeriodos, examen: examen, exam2_20: exam2_20,
                                    final: final,anual: anual
                                }]
                            })
                        } else {
                            exists.data.push({
                                nombre: nombre, prom1: prom1, prom2: prom2, equivalPeriodos: equivalPeriodos,a1: a1,a2: a2,a3: a3,a4: a4,a5: a5,b1: b1,b2: b2,b3: b3,b4: b4,b5: b5,
                                examen: examen, exam2_20: exam2_20, final: final, parcial1: parcial1
                                , anual: anual
                            })
                        }
                    })
                    this.info = distinctIds;
                    const compo = [];
                    comportamiento.forEach(entry => {
                        const { materia, nombre,docente, p1, p2, p3, p4, pro, pro2 } = entry;
                        const exists = compo.find(y => y.materia === entry.materia)
                        if (!exists) {
                            compo.push({
                                materia: materia,docente : docente, data: [{
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
                        const { materia,docente, nombre, p1, p2, p3, p4, pro, pro2 } = entry;
                        const exists = ddhhii.find(y => y.materia === entry.materia)
                        if (!exists) {
                            ddhhii.push({
                                materia: materia, docente : docente,data: [{
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
                        const { materia,docente, nombre, p1, p2, pro } = entry;
                        const exists = proyect.find(y => y.materia === entry.materia)
                        if (!exists) {
                            proyect.push({
                                materia: materia,docente : docente, data: [{
                                    nombre: nombre, p1: p1, pro: pro,
                                    p2: p2,
                                }]
                            })
                        } else {
                            exists.data.push({ nombre: nombre, p1: p1, p2: p2, pro: pro })
                        }
                    })
                    this.proyectoss = proyect
                }
            } catch (error) {
                console.log("Error", error);
                this.ifload = false;
            }
        },
        promdioParcial(array){
            let sum = 0
            let result = 0
            let cont = 0;
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    const element = array[i].prom1;
                    const num = parseFloat(element)==0? 0.001: parseFloat(element);
                    if (num <= 10 && num >= 0) {
                        sum = sum + num
                        cont += 1
                    }
                }
                let pro = (sum / cont);
                 result = trunc(pro,2)
            }
             return this.ifDecimal(result)
        },
        mediaParcialDA(array){
        let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom1;
                const num = parseFloat(element);
                if (num <= 10 && num > 8.99) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaParcialAA(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom1;
                const num = parseFloat(element);
                if (num < 9 && num >= 7) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaParcialPA(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom1;
                const num = parseFloat(element);
                if (num < 7 && num >= 5) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaParcialNA(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom1;
                const num = parseFloat(element);
                if (num < 5 && num >= 0) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        //------------------------------------------------------------
        promdioParcial2(array){
            let sum = 0
            let result = 0
            let cont = 0;
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    const element = array[i].prom2;
                    const num = parseFloat(element)==0? 0.001: parseFloat(element);
                    if (num <= 10 && num >= 0) {
                        sum = sum + num
                        cont += 1
                    }
                }
                let pro = (sum / cont);
                 result = trunc(pro,2)
            }
             return this.ifDecimal(result)
        },
        mediaParcialDA2(array){
        let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom2;
                const num = parseFloat(element);
                if (num <= 10 && num > 8.99) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaParcialAA2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom2;
                const num = parseFloat(element);
                if (num < 9 && num >= 7) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaParcialPA2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom2;
                const num = parseFloat(element);
                if (num < 7 && num >= 5) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaParcialNA2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].prom2;
                const num = parseFloat(element);
                if (num < 5 && num >= 0) {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasEX(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='EX') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasMB(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='MB') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasB(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='B') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasR(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='R') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasEX2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p2;
                if (element =='EX') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasMB2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p2;
                if (element =='MB') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasB2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p2;
                if (element =='B') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasR2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p2;
                if (element =='R') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        promdioParcialLetras(array){
            let aux2 = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let aux = 0;
                const element = array[i].p1;
                switch (element) {
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
            aux2 = aux2 +aux;
            }
           
          }
          var result = parseInt((aux2) / array.length)
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
         promdioParcialLetras2(array){
            let aux2 = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let aux = 0;
                const element = array[i].p2;
                switch (element) {
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
            aux2 = aux2 +aux;
            }
           
          }
          var result = parseInt((aux2) / array.length)
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
        ///---------------------------PARA COMPORTAMIENTO---------------------------
        promdioComportamientoLetras(array){
            let aux2 = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let aux = 0;
                const element = array[i].p1;
                switch (element) {
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
            aux2 = aux2 +aux;
            }
           
          }
          var result = parseInt((aux2) / array.length)
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
        promdioComportamientoLetras2(array){
            let aux2 = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let aux = 0;
                const element = array[i].p2;
                switch (element) {
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
            aux2 = aux2 +aux;
            }
           
          }
          var result = parseInt((aux2) / array.length)
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
        mediaLetrasA(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='A') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasBB(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='B') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasC(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='C') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasD(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='D') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasE(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='E') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasA2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='A') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasBB2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='B') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasC2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='C') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasD2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='D') {
                    cont += 1 
                }
            }
          }
          return cont
        },
        mediaLetrasE2(array){
            let cont = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i].p1;
                if (element =='E') {
                    cont += 1 
                }
            }
          }
          return cont
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
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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
function trunc (x, posiciones = 0) {
  var s = x.toString()
  var decimalLength = s.indexOf('.') + 1
  var numStr = s.substr(0, decimalLength + posiciones)
  return Number(numStr)
}
</script>
  