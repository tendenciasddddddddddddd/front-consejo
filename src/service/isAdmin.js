
export default class RestResource {
    
    admin(role) {
        if (role==='Admin') {
            return true;
        }
        else {
            return false;
        }
    }
    docente(role) {
        if (role==='Docente') {
            return true;
        }
        else {
            return false;
        }
    }
    estudiante(role) {
        if (role==='Estudiante') {
            return true;
        }
        else {
            return false;
        }
    }
  }