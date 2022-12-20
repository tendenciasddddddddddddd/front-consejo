import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user : null,
    avatar: 'https://res.cloudinary.com/ds7xbwpoo/image/upload/v1668542101/avatar_lmylxp.webp',
    isAppMobile: false,
    first_text: 'Pages',
    last_text: 'Inicio',
    imgs: 'https://res.cloudinary.com/ds7xbwpoo/image/upload/v1668542101/avatar_lmylxp.webp',
    fechaReporter:'Huaca, ', //El Ángel //La Libertad //Garcia Moreno //Tulcán
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