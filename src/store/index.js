import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user : null,
    avatar: 'https://res.cloudinary.com/dbtlyhhcm/image/upload/v1669214496/avatar_zdsxb4.webp',
    isAppMobile: false,
    first_text: 'Pages',
    last_text: 'Inicio',
    imgs: 'https://res.cloudinary.com/dbtlyhhcm/image/upload/v1669214496/avatar_zdsxb4.webp',
    fechaReporter:'La Libertad, ', //El Ángel //La Libertad //Garcia Moreno
}
export default new Vuex.Store({
    state,
    mutations:{
        agregar2: function (state,{img}) {
            state.avatar = img;
        },
        updatepx: function (state,{estado}){
           state.isAppMobile = estado;
        },
        updateHeader : function (state,{text_1, text_2}){
           state.first_text = text_1;
           state.last_text = text_2;
        },
    }
});