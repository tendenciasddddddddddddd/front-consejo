<template>
    <div>
        <a href="javascript:;" @click="removeQuizz(survey.id)" class="s-remove-array">
            <button type="button" class="btn btn-github s-oly-btn rounded-circle">
              <span class="btn-inner--icon">
                <svg data-testid="geist-icon" fill="none" height="16" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="16" style="color: currentcolor;">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                </svg>
              </span>
            </button>
        </a>
        <h5 class="fuente text-dark" v-html="survey.question" style="font-weight: 400;">
           
        </h5>
        <div>
            <ul>
                <li v-for="(option) in survey.options" :key="option.id" >
                    <span v-if="survey.reqq[0] == option.id" class="text-dark text-sm fuente">
                        <del>{{ option.text }}</del>
                    </span>
                    <span v-else class="text-dark text-sm fuente">
                        {{ option.text }}
                    </span>
                </li>
            </ul>
        </div>
        <hr />
    </div>
</template>

<script>
export default {
    props: ["survey"],

    methods: {
        removeQuizz(id) {
            this.$emit("removeQuiz", id)
        }
    }
};
</script>
<style>
.s-remove-array {
    position: relative;
    top: 10px;
    float: right;
    right: 10px;
}
.s-oly-btn{
    width: 1.675rem !important;
    height: 1.675rem !important;
    padding: 0.3rem ;
}
</style>