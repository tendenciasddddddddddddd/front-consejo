<template>
    <ScrimModal @close="closeD">
        <template v-slot:header> Examen ({{ surveys.length }} Preguntas)</template>
        <template v-slot:body>
            <div class="flex-containes2" direction="row" wrap="nowrap" style="margin-top: -1rem;">
                <section class="s-column1 croll mt-2" >
                    <NoFound2 v-if="surveys.length == 0" />
                    <Encuesta v-else v-for="survey in surveys" :key="survey.id" :survey="survey"
                        @removeQuiz="removeQuiz" @editQuizz="editQuizz" />
                </section>
                <section class="s-column2" style="background: #f6f9ff;">
                    <Spinner v-if="ifCambio" />
                    <div v-else class="exam-question-screen__content-area croll " style="overflow-y: auto;">
                        <div v-if="isOptionQuizz == 0" class="mt-7">
                            <OptionQuizz @clickOption="clickOption" />
                        </div>
                        <div v-if="isOptionQuizz == 1" class="text-center ">
                            <TrueOrFalse @addSurvey="pushSurvey($event)" @editSurvey="editSurvey($event)"
                                :arrayEdit="arrayEdit" />
                        </div>
                        <div v-if="isOptionQuizz == 2" class="text-center ">
                            <AgregarEncuesta @addSurvey="pushSurvey($event)" :arrayEdit="arrayEdit"
                            @editSurvey="editSurvey($event)"/>
                        </div>
                        <div v-if="isOptionQuizz == 3" class="text-center">
                            <SelectMany @addSurvey="pushSurvey($event)" :arrayEdit="arrayEdit" @editSurvey="editSurvey($event)"/>
                        </div>
                    </div>
                </section>
            </div>
        </template>
        <template v-slot:footer>
            <button href="javascript:;" @click="clickOption(0)" class="btn btnNaranja2">Cambiar tipo de pregunta</button>
            <button href="javascript:;" @click="save" class="btn btnNaranja ms-3">Finalizar con
                ({{ surveys.length }}) preguntas</button>
        </template>
    </ScrimModal>
</template>

<script>
import ScrimModal from "../../../shared/ScrimModal"
import AgregarEncuesta from "./component/AgregarEncuesta";
import Encuesta from "./component/Encuesta";
import OptionQuizz from "./component/OptionQuizz.vue";
import TrueOrFalse from "./component/TrueOrFalse.vue";
import SelectMany from "./component/SelectMany.vue";
import NoFound2 from "../../../shared/NoFound"
import Spinner from "../../../shared/Spinner"
export default {
    name: "CreateQuizz",
    props: {
        id: String,
        preguntas : Object
    },
    components: {
        ScrimModal, AgregarEncuesta, Encuesta, OptionQuizz, TrueOrFalse, SelectMany, NoFound2, Spinner
    },
    data() {
        return {
            surveys: [],
            ifLoad: false,
            isOptionQuizz: 0,
            model: {
                question: '',
                option: [{ text: '' }],
                reqq: [],
                tipo: 0,
                id : 0
            },
            arrayEdit: [],
            ifCambio: false,
        }
    },
    methods: {
        initialSetup(){
            if (this.preguntas._id) {
                this.surveys = this.preguntas.surveys
            }
        },
        close() {
            this.$emit('EventClose')
        },
        closeD() {
            this.$dialog.alert(' :::PARA SALIR DE CLICK EN EL BOTON FINALIZAR CON (X) PREGUNTAS:::')
        },
        vueInit() {

        },
        clickOption(option) {
            switch (option) {
                case 0:
                    this.isOptionQuizz = 0;
                    break;
                case 1:
                    this.arrayEdit = []
                    this.isOptionQuizz = 1;
                    break;
                case 2:
                    this.arrayEdit = []
                    this.isOptionQuizz = 2;
                    break;
                case 3:
                    this.arrayEdit = []
                    this.isOptionQuizz = 3;
                    break;
                default:
                    this.isOptionQuizz = 4;
            }
        },
        pushSurvey(survey) {
            this.surveys.push(survey);
            this.clickOption(0);
        },
        editSurvey(obj) {
            for (var i in this.surveys) {
                if (this.surveys[i].id == obj.id) {
                    this.surveys[i] = obj;
                    break; 
                }
            }
            this.clickOption(0);
        },
        removeQuiz(id) {
            this.surveys = removeFunction(this.surveys, "id", id)
        },
        editQuizz(array) {
            this.ifCambio = true;
            this.isOptionQuizz = 0;
            this.arrayEdit = []
            this.arrayEdit = this.surveys.filter((x) => x.id == array)
            if (this.arrayEdit.length > 0) {
                if (this.arrayEdit[0].tipo==1) setTimeout(() => this.openTrueOfFalse(), 300);
                if (this.arrayEdit[0].tipo==2) setTimeout(() => this.openSelectOne(), 300);
                if (this.arrayEdit[0].tipo==3) setTimeout(() => this.openMany(), 300);
            }
        },
        openTrueOfFalse: function() {
            this.isOptionQuizz = 1
            this.ifCambio = false;
        },
        openSelectOne: function() {
            this.isOptionQuizz = 2
            this.ifCambio = false;
        },
        openMany: function() {
            this.isOptionQuizz = 3
            this.ifCambio = false;
        },
        getData() {
            this.$emit('getData');
        },
        save() {
            this.model = this.surveys;
            if (this.surveys.length == 0) {
                this.$dialog.alert('❌ :::El examen tiene que tener minimo una pregunta:::') 
                return
            }
            if ( this.preguntas._id){
                this.ifLoad = true;
                this.$proxies._aulaProxi
                    .sendQuestions2(this.id, this.model) //-----------EDITAR CON AXIOS
                    .then(() => {
                        this.ifLoad = false;
                        this.getData();
                        this.toast('Las preguntas fueron registradas!!');
                        this.close();
                    })
                    .catch(() => {
                        this.clickOption(0);
                        this.$dialog.alert(':::No podemos procesar la solicitud, Intente otra vez:::')
                        this.ifLoad = false;
                    });
            } else {
                this.ifLoad = true;
                this.$proxies._aulaProxi
                    .sendQuestions(this.id, this.model) //-----------EDITAR CON AXIOS
                    .then(() => {
                        this.ifLoad = false;
                        this.getData();
                        this.toast('Las preguntas fueron registradas!!');
                        this.close();
                    })
                    .catch(() => {
                        this.clickOption(0);
                        this.$dialog.alert(':::No podemos procesar la solicitud, Intente otra vez:::')
                        this.ifLoad = false;
                    });
            }
        },
        toast(message) {
            this.$toasted.info(message, {
                duration: 2600,
                position: 'top-center',
                icon: "check-circle",
                theme: "toasted-primary",
                action: {
                    text: 'CERRAR',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                }
            });
        },
    },
    created() {//sendQuestions
      this.initialSetup() 
    },
}
function removeFunction(myObjects, prop, valu) {
    return myObjects.filter(function (val) {
        return val[prop] !== valu;
    });
}

</script>