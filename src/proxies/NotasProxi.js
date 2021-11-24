export default class NotasProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

 
    getAll(curso) { //-----------RUTA LISTA DE ESTUDIANTES A CALIFICAR--  IMPRIMIR LISTA
        return this.axios.get(this.url + `/notas/list?curso=${curso}`);
    }
    
    getAsistencias(curso, paralelo) {
        return this.axios.get(this.url + `/notas/asistencia?curso=${curso}&paralelo=${paralelo}`);
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
        return this.axios.put(this.url + `/notas/ref3/${id}`, params); //RUTA ARBOL 2
    }

    confirm(id, params) {
        return this.axios.put(this.url + `/notas/confirm/${id}`, params);
    }
   //nota estudiantes
    get(id) {
    return this.axios.get(this.url + `/notas/nota/${id}`);
}
}