
export default class quialifyservice {

    llenar_tabla_notas(isVerific, materia){
        var inAlumnos = [];
        for (let i = 0; i < isVerific.length; i++) {
          let id = isVerific[i]._id;
          let nombre = isVerific[i].nombre;
          let parcial1 = 0;
          let parcial2 = 0;
          let promedio = 0;
          let foranea = "";
          let notas = isVerific[i].calificaciones;
          for (let j = 0; j < notas.length; j++) {
            if (notas[j].materia == materia) {
              let calificar = notas[j].notas;
              promedio = notas[j].promediof;
              foranea = notas[j]._id;
              if (promedio == null) {
                promedio = 0;
              }
              for (let k = 0; k < calificar.length; k++) {
                if (calificar[k].quimestre == "p1") {
                  parcial1 = calificar[k].promedio;
                }
                if (calificar[k].quimestre == "p2") {
                  parcial2 = calificar[k].promedio;
                }
              }
              
              break;
            }
          }
  
          inAlumnos.push({
            id: id,
            name: nombre,
            par1: parcial1,
            par2: parcial2,
            promed: promedio,
            fora: foranea,
          });
        }
        return inAlumnos;
    }

    validarNotes(isVerific, materia, quim){
      var inAlumnos = [];
        for (let i = 0; i < isVerific.length; i++) {
          let id = isVerific[i]._id;
          let nombre = isVerific[i].nombre;
          let foranea = "";
          let isNext = false;
          let notas = isVerific[i].calificaciones;
          for (let j = 0; j < notas.length; j++) {
            if (notas[j].materia == materia) {
              let calificar = notas[j].notas;
              foranea = notas[j]._id;
              for (let k = 0; k < calificar.length; k++) {
                if (calificar[k].quimestre == quim) {
                  if (calificar[k].promedio) {
                    isNext = true;
                    break;
                  }
                }
              }
              break;
            }
          }
          if (isNext) {
            continue;
          }
          inAlumnos.push({
            id: id,
            name: nombre,
            fora: foranea,
          });
        }
        return inAlumnos;
    }

    calcular_promedio(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15, examen){
        let suma = parseFloat(n1) + parseFloat(n2) + parseFloat(n3) + parseFloat(n4)+ parseFloat(n5) +
                   parseFloat(n6) + parseFloat(n7) + parseFloat(n8) + parseFloat(n9) + parseFloat(n10) +
                   parseFloat(n11) + parseFloat(n12) + parseFloat(n13) + parseFloat(n14) + parseFloat(n15);
        
        let promedio = (suma / 15).toFixed(2);
        let proNotas = (promedio * 8) / 10; //EQUIVALENTE A 80 %
        let proExamen = (examen * 2) / 10;  //EQUIVALENTE A 20 %
        return (proNotas + proExamen).toFixed(2);
    }
}