export default class GestionProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    /* getAll(){
        return this.axios.get(this.url+'/users')
    } */
    getAll(page, take) {
        return this.axios.get(this.url + `/niveles?page=${page}&take=${take}`);
    }

    create(params) {
        return this.axios.post(this.url + '/niveles', params);
    }

    get(id) {
        return this.axios.get(this.url + `/niveles/${id}`);
    }

    update(id, params) {
        return this.axios.put(this.url + `/niveles/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/niveles/${id}`);
    }

    getNiveles() {
        return this.axios.get(this.url + '/niveles/level');
    }

    activateNivel(id, state) {
        return this.axios.put(this.url + `/niveles/activate/${id}?state=${state}`);
    }


    //------------------------------------------------------materias--------------------------------------
    getAllMaterias(page, take) {
        return this.axios.get(this.url + `/materias?page=${page}&take=${take}`);
    }

    createMaterias(params) {
        return this.axios.post(this.url + '/materias', params);
    }

    getMaterias(id) {
        return this.axios.get(this.url + `/materias/${id}`);
    }

    updateMaterias(id, params) {
        return this.axios.put(this.url + `/materias/${id}`, params);
    }

    removeMaterias(id) {
        return this.axios.delete(this.url + `/materias/${id}`);
    }
    //PARA LOS FILTER_CHOICES
    getListMaterias() {
        return this.axios.get(this.url + '/materias/newmat');
    }

    activateMaterial(id, state) {
        return this.axios.put(this.url + `/materias/activate/${id}?state=${state}`);
    }

    //------------------------------------------------------GESTION DE Parroquia--------------------------------------

    createDistributivo(params) {
        return this.axios.post(this.url + '/distributivo', params);
    }

    createArrayDistributivo(params) {
        return this.axios.post(this.url + '/distributivo/many/', params);
    }

    getAllDistributivo(page, take) {
        return this.axios.get(this.url + `/distributivo?page=${page}&take=${take}`);
    }

    getAllGrid() {
        return this.axios.get(this.url + `/distributivo/fulldistributivo`);
    }

    removeDistributivo(id, params) {
        return this.axios.put(this.url + `/distributivo/${id}`, params);
    }
    
    getDistributivo(id) {
        return this.axios.get(this.url + `/distributivo/${id}`);
    }

    getPlanificacion(id) {
        return this.axios.get(this.url + `/distributivo/planificacio/${id}`);
    }

    updateDistributivo(id, params) {
        return this.axios.put(this.url + `/distributivo/${id}`, params);
    }

    updatePlanificacion(id, params) {
        return this.axios.put(this.url + `/distributivo/planificacion/${id}`, params);
    }

    async updateInfoDocentes(id) {
        return await this.axios.get(this.url + `/distributivo/nuedist?id=${id}`);
    }
    //------------------------------------------------------GESTION DE Parroquia--------------------------------------

    getAllGridTutor() {
        return this.axios.get(this.url + `/tutores/fulltutor`);
    }
    
    createArrayTutor(params) {
        return this.axios.post(this.url + '/tutores/many/', params);
    }

    async getTutorDocentes(id) {
        return await this.axios.get(this.url + `/tutores/nuedist?id=${id}`);
    }
}