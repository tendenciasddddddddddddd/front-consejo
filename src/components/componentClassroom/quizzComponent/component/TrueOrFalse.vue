<template>
    <div>
        <span class="h5 fuente s-font text-center mb-4">Pregunta de verdaded o faso</span>
        <div class="text-start">
            <p class="text-dark fuente text-sm">Texto de la pregunta.</p>
        </div>
        <Editor v-model="question" @click="add = true" />

        <p class="mt-3 text-dark fuente text-sm text-start">Selecciones la respuesta correcta.</p>
        <div class=" text-start" v-for="option in options" :key="option.id">
            <div class="form-check ">
                <input class="form-check-input" v-model="checked" type="radio" :id="option.id" :value="option.id" />
                <label class="parrafo text-sm" :for="option.id"><b>{{ option.text }}</b> </label>
            </div>
           
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
    { id: 0, text: "Falso" },
    { id: 1, text: "Verdad" }
];
export default {
    components: { Editor },
    data() {
        return {
            add: false,
            question: "",
            options: defaultOption(),
            checked: ''
        };
    },
    methods: {
        addSurvey() {
            if (this.checked === '') return;
            this.$emit("addSurvey", {
                id: Math.random().toString(),
                question: this.question,
                options: this.options,
                reqq: [this.checked],
                tipo: 1
            });
            this.question = "";
            this.checked = '';
            this.options = defaultOption();
        },
    },
    computed: {
        isComplete() {
            return this.question;
        }
    },
};
</script>

