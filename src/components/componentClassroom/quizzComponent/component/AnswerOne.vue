<template>
    <div>
         <div class="text-start">
            <p class="gordo negros text-sm">Seleccione una respuesta.</p>
        </div>
        <div v-for="survey in optins.options" :key="survey.id" >
            <div class=" p-2  noactive s-items-quizz " :class="{ activado: checked === survey.id }">
                <div @click="selectAnswer(survey.id)" :for="survey.id" style="cursor: pointer;">
                    <div class="row">
                        <div class="col-lg-2 ">
                            <div class="form-check mt-2 ms-2">
                                <input  class="form-check-input" v-model="checked" type="radio" 
                                :id="survey.id" :value="survey.id"/>
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
            <button  :disabled="checked===''" @click="nextQuestion" class="btn btnNaranja2"> <b>Siguiente pregunta</b> </button>
             
         </div>
    </div>
</template>

<script>
export default {
    props: ["optins"],
    data() {
        return {
            checked: '',
        }
    },
    methods : {
        selectAnswer(res) {
            this.checked = res;
        },
        nextQuestion() {
            if(this.checked!==''){
               let punt =0
            if(this.optins.reqq == this.checked){
                 punt=1
            }
            this.$emit("nextQuestions", {
                idQuestion: this.optins._id,
                myResponse: [this.checked],
                puntaje : punt
            })
            this.checked= ''
            }
            
        },
    }

}
</script>
