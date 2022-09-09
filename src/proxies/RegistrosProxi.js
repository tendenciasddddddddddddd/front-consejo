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
        return this.axios.post(this.url + '/estudiantes', params);//alumnosMany
    }

    createMany(role, params) {
        return this.axios.post(this.url + `/estudiantes/alumnosMany?role=${role}`, params);//
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

    async queryEstudiantes(querys) {
        return await this.axios.get(this.url + `/estudiantes/query?querys=${querys}`);
    }

    //----------------------------------GLOBAL SET ------------------childEtnia

    async getNacionalidad() {
        return await this.axios.get(this.url + '/nacionalidad/childnacionalidad');
    }
    async getEtnias() {
        return await this.axios.get(this.url + '/etnias/childEtnia');
    }
    async getParroquia() {
        return await this.axios.get(this.url + '/parroquias');
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
    async getListDocentes() {
        return await this.axios.get(this.url + '/docentes/newdoc');
    }

    async queryDocente(querys) {
        return await this.axios.get(this.url + `/docentes/query?querys=${querys}`);
    }
 




}