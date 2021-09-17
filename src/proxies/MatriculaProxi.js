export default class MatriculaProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    /* getAll(){
        return this.axios.get(this.url+'/users') allPeriodos
    } */
    getAll(page, take) {
        return this.axios.get(this.url + `/periodos?page=${page}&take=${take}`);
    }
    getFull() {
        return this.axios.get(this.url + '/periodos/allPeriodos');
    }

    create(params) {
        return this.axios.post(this.url + '/periodos', params);
    }

    get(id) {
        return this.axios.get(this.url + `/periodos/${id}`);
    }

    update(id, params) {
        return this.axios.put(this.url + `/periodos/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/periodos/${id}`);
    }

    //----------------------------------GLOBAL SET MATRICULA ESTUDIANTE ------------------

    getAllEstudiantes(mod) {
        return this.axios.get(this.url + `/estudiantes/newstud?mod=${mod}`);
    }

  
  
    //------------------------------------------------------DOCENTES--------------------------------------
    getAllMatricula(page, take) {
        return this.axios.get(this.url + `/matriculas?page=${page}&take=${take}`);
    }

    createMatricula(params) {
        return this.axios.post(this.url + '/matriculas', params);
    }

    getMatricula(id) {
        return this.axios.get(this.url + `/matriculas/${id}`);
    }

    updateMatricula(id, params) {
        return this.axios.put(this.url + `/matriculas/${id}`, params);
    }

    removeMatricula(id) {
        return this.axios.delete(this.url + `/matriculas/${id}`);
    }

    getMatriculaFolio(modalidad) {
        return this.axios.get(this.url + `/matriculas/consult?v=${modalidad}`);//
    }

    getFullMatricula(modalidad, curso) {
        return this.axios.get(this.url + `/matriculas/fullmatricula?modalidad=${modalidad}&curso=${curso}`);
    }

    getInfoMatricula(v, p) {
        return this.axios.get(this.url + `/matriculas/info?v=${v}&p=${p}`);
    }

    getInfoListv1Matricula(h, m, c) {
        return this.axios.get(this.url + `/matriculas/info?h=${h}&m=${m}&c=${c}`);
    }
    getInfoListReport(m, c) {
        return this.axios.get(this.url + `/matriculas/report?m=${m}&c=${c}`);
    }

    getMatriculas() {
        return this.axios.get(this.url + '/matriculas/');
    }
    //------------------------------------------------------GESTION DE Parroquia--------------------------------------

   

    //------------------------------------------------------GESTION DE Parroquia--------------------------------------




}