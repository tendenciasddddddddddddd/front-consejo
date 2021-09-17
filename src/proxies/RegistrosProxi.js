export default class ZonasProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    /* getAll(){
        return this.axios.get(this.url+'/users')
    } */
    getAll(page, take) {
        return this.axios.get(this.url + `/estudiantes?page=${page}&take=${take}`);
    }

    create(params) {
        return this.axios.post(this.url + '/estudiantes', params);
    }

    get(id) {
        return this.axios.get(this.url + `/estudiantes/${id}`);
    }

    update(id, params) {
        return this.axios.put(this.url + `/estudiantes/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/estudiantes/${id}`);
    }

    //----------------------------------GLOBAL SET ------------------

    getNacionalidad() {
        return this.axios.get(this.url + '/nacionalidad');
    }
    getEtnias() {
        return this.axios.get(this.url + '/etnias');
    }
    getParroquia() {
        return this.axios.get(this.url + '/parroquias');
    }
    //------------------------------------------------------DOCENTES--------------------------------------
    getAllDocentes(page, take) {
        return this.axios.get(this.url + `/docentes?page=${page}&take=${take}`);
    }

    createDocentes(params) {
        return this.axios.post(this.url + '/docentes', params);
    }

    getDocentes(id) {
        return this.axios.get(this.url + `/docentes/${id}`);
    }

    updateDocentes(id, params) {
        return this.axios.put(this.url + `/docentes/${id}`, params);
    }

    removeDocentes(id) {
        return this.axios.delete(this.url + `/docentes/${id}`);
    }
    //coleccion con solo nombre apellido foto id cedula  del
    getListDocentes() {
        return this.axios.get(this.url + '/docentes/newdoc');
    }
    //------------------------------------------------------GESTION DE Parroquia--------------------------------------



    //------------------------------------------------------GESTION DE Parroquia--------------------------------------




}