<template>
    <div>
        <span class="h5 fuente s-font text-start mb-4">Pregunta de seleccione muchos</span>
        <div class="text-start">
            <p class="text-dark fuente text-sm">Texto de la pregunta.</p>
        </div>
        <Editor v-model="question" @click="add = true" />
          <p class="mt-3 text-dark fuente text-sm text-start">Ingrese las opciones y seleccione las respuestas correctas.</p>
            <div class="text-start" v-for="option in options" :key="option.id">

                <div class="form-check " style="min-height: 0rem;margin-bottom: 0rem;">
                    <input @click="selectOne(option.id)"  v-model="resOption" :value="option.id" class="form-check-input cheka" type="checkbox" style="margin-top: 8px !important;"/>
                    <input type="text" class="s-input form-control buscador mt-2 ms-2 s-input" :placeholder="`Opción ${option.id + 1}`"
                        v-model="option.text" :key="option.id" />
                </div>
            </div>

        <div class="mt-3" >
            <span class="button-less" @click="addOption()"> Añadir &nbsp;
                <svg data-testid="geist-icon" fill="none" height="16" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="16" style="color:currentColor">
                    <path d="M6 9l6 6 6-6"></path>
                </svg>
            </span>
            <span class=" button-less ms-3" @click="removeOption()">Quitar &nbsp;
                <svg data-testid="geist-icon" fill="none" height="16" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="16" style="color:currentColor; transform: rotate(180deg);">
                    <path d="M6 9l6 6 6-6"></path>
                </svg>
            </span>
        </div>
        <div class=" text-start">
           <a v-on="isComplete ? { click: () => addSurvey() } : {}" class="btn btnTrasparente btn-sm mt-3">
            <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                viewBox="0 0 24 24" width="20" style="color: currentcolor;">
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
            </svg>
            Agregar pregunta</a>
        </div>
    </div>
</template>

<script>
import Editor from "../../../../shared/Editor.vue";
const defaultOption = () => [
    { id: 0, text: "" },
    { id: 1, text: "" }
];
export default {
    components: { Editor },
    data() {
        return {
            add: false,
            question: "",
            options: defaultOption(),
            resOption: []
        };
    },
    methods: {
        addOption() {
            this.options.push({
                id: this.options.length,
                text: "",
            });
        },
        removeOption() {
            this.options.pop();
        },
        selectOne(id) {
            if (!this.resOption.includes(id)) {
                this.resOption.push(id);
            } else {
                this.resOption.splice(this.resOption.indexOf(id), 1);
            }
        },
        addSurvey() {
            if(this.replyText()) return;
            if(!this.correctAnswer()) return;
            this.$emit("addSurvey", {
                id: Math.random().toString(),
                question: this.question,
                options: this.options,
                reqq: this.resOption,
                tipo: 3
            });
            this.question = "";
            this.resOption= [];
            this.options = defaultOption();
        },
        replyText(){
            let voids = false
            const options = this.options.filter((x)=> x.text=="");
            if (options.length > 0) voids = true;
            return voids;
        },
        correctAnswer(){
            let voids = false
            if (this.resOption.length > 0) voids = true;
            return voids;
        }
    },
     computed: {
      isComplete () {
        return this.question;
      }
    },
};
</script>

