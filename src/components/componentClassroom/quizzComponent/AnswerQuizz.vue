<template>
    <ScrimModal @close="close">
        <template v-slot:header> {{ itemQuizz.nombre }}</template>
        <template v-slot:body>
            <div class="flex-containes2" direction="row" wrap="nowrap" style="margin-top: -1rem;">
                <section class="s-column1 croll d-md-block d-none">
                    <p class="negros negros mt-3">DESCIPCIÓN DE EVALIACION</p>
                    <span v-html="itemQuizz.descripcion"> </span>
                </section>
                <section class="s-column2">
                    <div class="exam-question-screen__content-area">
                        <div v-if="finaly" class="text-center mt-6">
                            <img style="width: 180px;" src="../../../assets/img/shapes/success-green.svg" alt="fondo" />
                            <br><span class="h3 negros gordo">Examen completo</span>
                            <br><button href="javascript:;" v-if="!ifLoad" @click="save"
                                class="btn btnNaranja mt-3">Finalizar
                                evaluación</button>
                        </div>
                        <div v-else>
                            <div class="d-flex justify-content-between text-sm negros gordo">
                                <div> <b>Pregunta {{ index + 1 }}</b> de {{ questions.length }}</div>
                                <div><span>Tiempo restante: {{ timerText }}</span></div>
                            </div> <br>
                            <span class="fuente s-font text-center mb-4 mt-2 forma"
                                v-html="questions[index]['question']"></span>
                            <section v-if="[1, 2].includes(questions[index]['tipo'])">
                                <AnswerOne @nextQuestions="pushAnswer($event)" :optins="questions[index]" />
                            </section>
                            <section v-if="questions[index].tipo == 3">
                                <AnswerMany @nextQuestions="pushAnswer($event)" :optins="questions[index]" />
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </template>
        <template v-slot:footer>
            <button href="javascript:;" v-if="!ifLoad" @click="save" class="btn btnNaranja ms-3">Finalizar evaluación</button>
        </template>
    </ScrimModal>
</template>

<script>
import ScrimModal from "../../../shared/ScrimModal"
import AnswerOne from "./component/AnswerOne.vue"
import AnswerMany from "./component/AnswerMany.vue"
export default {
    name: "CreateQuizz",
    props: {
        itemQuizz: Object,
        idQuizzSend : String
    },
    components: {
        ScrimModal,  AnswerOne, AnswerMany
    },
    data() {
        return {
            ifLoad: false,
            isOptionQuizz: 0,
            user: this.$store.state.user,
            checked: '',
            questions: [],
            response: [],
            index: 0,
            contador: 0,
            model: {
                idUser: '',
                responses: [],
                puntage: 0
            },
            // Simple Quiz State
            timer: null,
            timerText: '',
            finaly: false
        }
    },
    methods: {
        close() {
            clearInterval(this.timer);
            this.$emit('EventClose')
        },
        vueInit() {
            if (this.itemQuizz.randomize) {
                let questions = this.itemQuizz.surveys
                questions = shuffle(questions);
                questions.forEach((surveys, index) => {
                surveys.index = index;
                surveys.options = shuffle(surveys.options);
                });
                this.questions = questions;
            } else {
              this.questions = this.itemQuizz.surveys;
            }
            this.startTimer(parseInt(this.itemQuizz.time) * 60)
        },

        pushAnswer(res) {
            this.response.push(res);
            this.contador += parseFloat(res.puntaje)
            if (this.index < this.questions.length - 1) {
                this.index++
            } else {
                this.finaly = true;
            }
        },
        save() { // solveQuiz
            this.model.idUser = this.user.id;
            this.model.responses = this.response;
            this.model.puntage = this.contador
            this.ifLoad = true;
                this.$proxies._aulaProxi
                .solveQuiz(this.itemQuizz._id, this.model) //-----------EDITAR CON AXIOS
                .then(() => {
                    this.getData();
                    this.ifLoad = false;
                    this.close();
                    this.toast('Examen enviado!!');
                    clearInterval(this.timer);
                })
                .catch(() => {
                    this.$dialog.alert("El servidor responde con un codigo de estado 413.");
                    this.ifLoad = false;
                }); 
        },
        getData() {
            this.$emit('getData');
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
        startTimer(duration) {
            this.timer = setInterval(() => {
                let minutes = parseInt(duration / 60, 10);
                let seconds = parseInt(duration % 60, 10);
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                seconds = seconds < 10 ? `0${seconds}` : seconds;
                this.timerText = `${minutes}:${seconds}`;
                duration -= 1;
                if (duration < 0) {
                    duration = 0;
                    this.save()
                    this.$dialog.alert(' :::¡Se acabó el tiempo! Todo ha terminado :::')
                }
            }, 1000);
        },
    },
    created() {//sendQuestions
        this.vueInit()
    },
}
function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
</script>
 <style >
 
 .s-items-quizz {
     margin-top: 12px !important;
     margin-bottom: 12px !important;
     margin-left: 8px !important;
     margin-right: 8px !important;
     background: white;
 }
 
 .forma p {
     font-size: 1.25rem !important;
     line-height: 1.375;
     color: #33475b;
 }
 </style>