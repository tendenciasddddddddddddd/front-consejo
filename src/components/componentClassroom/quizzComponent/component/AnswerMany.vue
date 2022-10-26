<template>
    <div>
         <p class="negros gordo text-sm">Seleccione una o varias respuesta.</p>
        <div v-for="survey in optins.options" :key="survey.id">
            <div class=" p-2  noactive s-items-quizz " :class="{ activado: answers.includes(survey.id) }">
                <div @click="selectMany(survey.id)" style="cursor: pointer;">
                    <div class="row">
                        <div class="col-lg-2 ">
                            <div class="form-check my-auto supcheka mt-2 ms-2" @click="selectMany(survey.id)">
                                <input class="form-check-input cheka " type="checkbox" v-model="answers"
                                    :value="survey.id" @click="selectMany(survey.id)" />
                            </div>
                        </div>
                        <div class="col-lg-10 mt-2 mb-2">
                            <span class="negros h6 s-font text-center ">{{ survey.text }} </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="text-end mt-3">
            <button  :disabled="answers.length==0" @click="nextQuestion" class="btn btnNaranja2"> <b>Siguiente pregunta</b> </button>
           
        </div>
    </div>
</template>

<script>

const equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);
export default {
    props: ["optins"],
    data() {
        return {
            answers: [],
        }
    },
    methods: {
        selectMany(ids) {
            if (!this.answers.includes(ids)) {
                this.answers.push(ids);
            } else {
                this.answers.splice(this.answers.indexOf(ids), 1);
            }
            
        },
        nextQuestion() {
            let punt = this.calculateScore();
            this.$emit("nextQuestions", {
                idQuestion: this.optins._id,
                myResponse: this.answers,
                puntaje : punt
            })
            this.answers = [];
        },
        calculateScore() {
            let numOptionsQuestion = this.optins.options.length;
            const porcentage = (1 / numOptionsQuestion) * 1
            let puntucion = 0;
            let contador = 0;
            let a = this.answers.sort();// MIS RESUESTAS
            let b = this.optins.reqq.sort(); // RESUESTAS CORRECTAS
             if (equals(a, b)) {
                puntucion = 1;
            } else {
                let longMyAnswers = a.length;
                let longcorrectAnswer = b.length;
                if (longMyAnswers >= longcorrectAnswer) {
                    for (let i = 0; i < longMyAnswers; i++) {
                        for (let j = 0; j < longcorrectAnswer; j++) {
                            if (a[i] == b[j]) {
                                contador++
                            }
                        }
                    }
                    let valueAswerOne = 1 / longcorrectAnswer;
                    let wrongAnswer = longMyAnswers - contador;
                    let santions = wrongAnswer * porcentage;
                    let correctAnswer = contador * valueAswerOne;
                    puntucion = correctAnswer - santions
                    if (longMyAnswers == numOptionsQuestion) puntucion = 0;
                } else if (longMyAnswers < longcorrectAnswer) {
                    for (let i = 0; i < longcorrectAnswer; i++) {
                        for (let j = 0; j < longMyAnswers; j++) {
                            if (b[i] == a[j]) {
                                contador++
                            }
                        }
                    }
                    let valueAswerOne = 1 / longcorrectAnswer
                    let wrongAnswer = longMyAnswers - contador
                    let santions = wrongAnswer * porcentage;
                    let correctAnswer = contador * valueAswerOne;
                    puntucion = correctAnswer - santions;
                }
            }
            if (puntucion < 0) puntucion = 0;
            puntucion = (Math.round(puntucion * 100) / 100).toFixed(2);
            return puntucion;
        },

    }
}
</script>
