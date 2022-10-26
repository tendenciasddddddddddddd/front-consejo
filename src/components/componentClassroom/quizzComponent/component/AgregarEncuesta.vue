<template>
    <div>
        <span class="h5 fuente s-font text-center mb-4">Pregunta de seleccione uno</span>
        <div class="text-start">
            <p class="negros text-sm text-sm">Texto de la pregunta.</p>
        </div>
        <Editor v-model="question" @click="add = true" />

        <p class="mt-3 negros text-sm text-sm text-start">Ingrese las opciones y seleccione la respuesta correcta.</p>
        <div class="text-start">
            <div class="" v-for="option in options" :key="option.id">
                <div class="form-check ">
                    <input class="form-check-input" v-model="checked" type="radio" :id="option.id" :value="option.id" />
                    <input type="text" class="s-input form-control buscador mt-2"
                        :placeholder="`Opción ${option.id + 1}`" v-model="option.text" :key="option.id" />
                </div>
            </div>
        </div>
        <div class=" mt-3">
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
            <button v-on="isComplete ? { click: () => addSurvey() } : {}" class="btn btnNaranja btn-sm mt-3">
                <svg data-testid="geist-icon" fill="none" height="20" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="20" style="color: currentcolor;">
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                </svg>
                Agregar pregunta</button>
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
    props: {
        arrayEdit: Array,
    },
    components: { Editor },
    data() {
        return {
            add: false,
            question: "",
            options: defaultOption(),
            checked: '',
            ifEdit: false
        };
    },
    created() {
        if (this.arrayEdit.length > 0) {
            this.question = this.arrayEdit[0].question;
            this.options = this.arrayEdit[0].options;
            let res = this.arrayEdit[0].reqq
            this.checked = res[0];
            this.ifEdit = true
        }
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
        addSurvey() {
            if (this.replyText()) return;
            if (this.checked === '') return;
            if (this.ifEdit) {
                this.$emit("editSurvey", {
                id: this.arrayEdit[0].id,
                question: this.question,
                options: this.options,
                reqq: [this.checked],
                tipo: 2
            });
            } else {
                this.$emit("addSurvey", {
                id: Math.random().toString(),
                question: this.question,
                options: this.options,
                reqq: [this.checked],
                tipo: 2
            });
            }
            this.question = "";
            this.checked = '';
            this.options = defaultOption();
        },
        replyText() {
            let voids = false
            const options = this.options.filter((x) => x.text == "");
            if (options.length > 0) voids = true;
            return voids;
        },
    },
    computed: {
        isComplete() {
            return this.question;
        }
    },
};
</script>

