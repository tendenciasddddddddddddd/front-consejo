<template>
    <ScrimModal @close="close">
        <template v-slot:header> Examen ({{ surveys.length }} Preguntas)</template>
        <template v-slot:body>
            <div class="flex-containes2" direction="row" wrap="nowrap" style="margin-top: -1rem;">
                <section class="s-column1 croll">
                    <NoFound2 v-if="surveys.length == 0" />
                    <Encuesta v-else v-for="survey in surveys" :key="survey.id" :survey="survey"
                        @removeQuiz="removeQuiz" />
                </section>
                <section class="s-column2">
                    <div class="exam-question-screen__content-area">
                        <div v-if="isOptionQuizz == 0" class="mt-7">
                            <OptionQuizz @clickOption="clickOption" />
                        </div>
                        <div v-if="isOptionQuizz == 1" class="text-center ">
                            <TrueOrFalse @addSurvey="pushSurvey($event)" />
                        </div>
                        <div v-if="isOptionQuizz == 2" class="text-center ">
                            <AgregarEncuesta @addSurvey="pushSurvey($event)" />
                        </div>
                        <div v-if="isOptionQuizz == 3" class="text-center">
                            <SelectMany @addSurvey="pushSurvey($event)" />
                        </div>
                    </div>
                </section>
            </div>
        </template>
         <template v-slot:footer>
           <a href="javascript:;" @click="clickOption(0)" class="btn btn-vercel-white">Cambiar pregunta</a>
                        <a href="javascript:;" @click="save" class="btn btn-vercel ms-3">Finalizar con
                            ({{ surveys.length }}) preguntas</a>
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
import NoFound2 from "../../../shared/NoFound2"
export default {
    name: "CreateQuizz",
    props: {
        id: String,
    },
    components: {
        ScrimModal, AgregarEncuesta, Encuesta, OptionQuizz, TrueOrFalse, SelectMany, NoFound2
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
                tipo: 0
            },
        }
    },
    methods: {
        close() {
            this.$emit('EventClose')
        },
        vueInit() {

        },
        clickOption(option) {
            switch (option) {
                case 0:
                    this.isOptionQuizz = 0;
                    break;
                case 1:
                    this.isOptionQuizz = 1;
                    break;
                case 2:
                    this.isOptionQuizz = 2;
                    break;
                case 3:
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
        removeQuiz(id) {
            this.surveys = removeFunction(this.surveys, "id", id)
        },
        getData() {
            this.$emit('getData');
        },
        save() {
            this.model = this.surveys;
            if (this.surveys.length > 0) {
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
            } else {
                this.$dialog.alert('❌ :::El examen tiene que tener minimo una pregunta:::')
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

    },
}
function removeFunction(myObjects, prop, valu) {
    return myObjects.filter(function (val) {
        return val[prop] !== valu;
    });
}

</script>
 <style >
 .s-column1 {
     /* background-color: rgb(245, 248, 250); */
     border-right: 1px solid rgb(203, 214, 226);
     max-width: 300px;
     min-width: 300px;
     height: calc(100vh - 126px);
     flex: 1 1 0%;
     overflow-y: auto;
 }
 
 .s-column2 {
     flex: 1 1 0%;
     min-width: 320px;
 }
 
 .exam-question-screen__content-area {
     padding: 21px 42px;
     background-color: #eaf0f6;
     min-height: 476.875px;
 }
 
 .s-font {
     font-weight: 400 !important;
 }
 
 .s-icon {
     font-size: 30px !important;
 }
 

 
 .s-input {
     background-color: #fff !important;
 }
 </style>