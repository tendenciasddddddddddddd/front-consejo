
export default class RestResource {
    
    admin(role) {
        role.includes('Admin')
        if (role.includes('Admin')) return true
        return false;
    }
    docente(role) {
        role.includes('Docente')
        if (role.includes('Docente')) return true
        return false;
    }
    estudiante(role) {
        role.includes('Estudiante')
        if (role.includes('Estudiante')) return true
        return false;
    }
    Inspector(role) {
        role.includes('Inspector')
        if (role.includes('Inspector')) return true
        return false;
    }
  }