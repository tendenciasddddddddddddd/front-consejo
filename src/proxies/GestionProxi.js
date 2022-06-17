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

    getAllDistributivo(page, take, mol) {
        return this.axios.get(this.url + `/distributivo?page=${page}&take=${take}&modal=${mol}`);
    }

    removeDistributivo(id) {
        return this.axios.delete(this.url + `/distributivo/${id}`);
    }
    
    getDistributivo(id) {
        return this.axios.get(this.url + `/distributivo/${id}`);
    }

    updateDistributivo(id, params) {
        return this.axios.put(this.url + `/distributivo/${id}`, params);
    }

    updateInfoDocentes(id) {
        return this.axios.get(this.url + `/distributivo/nuedist?id=${id}`);
    }
    //------------------------------------------------------GESTION DE Parroquia--------------------------------------




}