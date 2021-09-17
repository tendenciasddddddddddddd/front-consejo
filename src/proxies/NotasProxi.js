export default class NotasProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    /* getAll(){
        return this.axios.get(this.url+'/users') asistencia
    } */
    getAll(curso, paralelo, modalidad) {
        return this.axios.get(this.url + `/notas/list?curso=${curso}&paralelo=${paralelo}&modalidad=${modalidad}`);
    }
    
    getAsistencias(curso, paralelo) {
        return this.axios.get(this.url + `/notas/asistencia?curso=${curso}&paralelo=${paralelo}`);
    }

    update(id, params) {
        return this.axios.put(this.url + `/notas/${id}`, params);
    }
    confirm(id, params) {
        return this.axios.put(this.url + `/notas/confirm/${id}`, params);
    }
   //nota estudiantes
    get(id) {
    return this.axios.get(this.url + `/notas/nota/${id}`);
}
}