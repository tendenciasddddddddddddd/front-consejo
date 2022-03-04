import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user : null,
    avatar: 'https://res.cloudinary.com/stebann/image/upload/v1634918496/default-100_namn33.webp',
    isAppMobile: false,
}
export default new Vuex.Store({
    state,
    mutations:{
        agregar2: function (state,{img}) {
            state.avatar = img;
        },
        updatepx: function (state,{estado}){
           state.isAppMobile = estado;
        }
    }
});