export default class NotasProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

 
    getAll(curso) { //-----------RUTA LISTA DE ESTUDIANTES A CALIFICAR--  IMPRIMIR LISTA
        return this.axios.get(this.url + `/notas/list?curso=${curso}`);
    }
    
    getAsistencias(curso) {
        return this.axios.get(this.url + `/notas/asistencia?curso=${curso}`);
    }

    update(id, params) {
        return this.axios.put(this.url + `/notas/${id}`, params);
    }

    updateReforma(id, params) {
        return this.axios.put(this.url + `/notas/reform/${id}`, params); //RUTA ARBOL 1
    }

    updateReforma2(id, params) {
        return this.axios.put(this.url + `/notas/ref2/${id}`, params); //RUTA ARBOL 2
    }

    updateReforma3(id, params) {
        return this.axios.put(this.url + `/notas/ref3/${id}`, params); //RUTA ARBOL 2 createfullnote
    }

    updateFullNote(id, params) {
        return this.axios.put(this.url + `/notas/createfullnote/${id}`, params); //deleteallnote
    }

    updateSupletorios(id, params) {
        return this.axios.put(this.url + `/notas/createSupletorios/${id}`, params); //deleteallnote
    }

    updateComportamiento(id, params) {
        return this.axios.put(this.url + `/notas/createComportamiento/${id}`, params); //GUARADRA NOTA DE COMPORTAMIENTO
    }

    updateProyectos(id, params) {
        return this.axios.put(this.url + `/notas/createProyectos/${id}`, params); //GUARADRA NOTA DE COMPORTAMIENTO
    }

    deleteAllNote(id, params) {
        return this.axios.put(this.url + `/notas/deleteallnote/${id}`, params); //confirmfullnote
    }

    confirmfullnote(id, params) {
        return this.axios.put(this.url + `/notas/confirmfullnote/${id}`, params); //
    }

    confirm(id, params) {
        return this.axios.put(this.url + `/notas/confirm/${id}`, params);
    }
   //nota estudiantes
    get(id) {
    return this.axios.get(this.url + `/notas/nota/${id}`);
}
}