export default class quialifyservice {
  llenar_tabla_notas(isVerific, materia) {
    var inAlumnos = [];
    for (let i = 0; i < isVerific.length; i++) {
      let id = isVerific[i]._id;
      let nombre = isVerific[i].nombre;
      let promedio = 0;
      let foranea = "";
      let quim = [];
      let comp = [];
      let suple= 0;
      let reme= 0;
      let gracia= 0;
      let pfinal= 0;
      let notas = isVerific[i].calificaciones;
      for (let j = 0; j < notas.length; j++) {
        if (notas[j].materia == materia) {
          let calificar = notas[j].notas;
          let comport = notas[j].comportamiento
          promedio = notas[j].promediof;
          suple= notas[j].suple;
          reme= notas[j].reme;
          gracia= notas[j].gracia;
          pfinal= notas[j].pfinal;
          foranea = notas[j]._id;
          for (let k = 0; k < calificar.length; k++) {
            quim.push(calificar[k]);
          }
          for (let h = 0; h < comport.length; h++) {
            comp.push(comport[h]); 
          }
          break;
        }
      }
      inAlumnos.push({
        id: id,
        name: nombre,
        promed: promedio,
        fora: foranea,
        notas: quim,
        suple: suple,
        reme: reme,
        gracia: gracia,
        pfinal: pfinal,
        comportamiento: comp
      });
    }
    return inAlumnos;
  }

  validarNotes(isVerific, materia, quim) {
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

  calcular_promedio(
    n1,
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    n10,
    n11,
    n12,
    n13,
    n14,
    n15,
    examen
  ) {
    let suma =
      parseFloat(n1) +
      parseFloat(n2) +
      parseFloat(n3) +
      parseFloat(n4) +
      parseFloat(n5) +
      parseFloat(n6) +
      parseFloat(n7) +
      parseFloat(n8) +
      parseFloat(n9) +
      parseFloat(n10) +
      parseFloat(n11) +
      parseFloat(n12) +
      parseFloat(n13) +
      parseFloat(n14) +
      parseFloat(n15);

    let promedio = (suma / 15).toFixed(2);
    let proNotas = (promedio * 8) / 10; //EQUIVALENTE A 80 %
    let proExamen = (examen * 2) / 10; //EQUIVALENTE A 20 %
    return (proNotas + proExamen).toFixed(2);
  }
  calcular_promedio_final(obj) {
    let suma_aporte_parcial1 =
      parseFloat(obj.a1) +
      parseFloat(obj.a2) +
      parseFloat(obj.a3) +
      parseFloat(obj.a4) +
      parseFloat(obj.a5) +
      parseFloat(obj.b1) +
      parseFloat(obj.b2) +
      parseFloat(obj.b3) +
      parseFloat(obj.b4) +
      parseFloat(obj.b5);
    let promedio1 = (suma_aporte_parcial1 / 10).toFixed(2);
    let promedio1_parcial80 = ((promedio1 * 8) / 10).toFixed(2);
    let examen1 = parseFloat(obj.examenfinal);
    let promedio1_parcial20 = ((examen1 * 2) / 10).toFixed(2);
    let promedioTotal1 =
      parseFloat(promedio1_parcial80) + parseFloat(promedio1_parcial20);
    let suma_aporte_parcial2 =
      parseFloat(obj.x1) +
      parseFloat(obj.x2) +
      parseFloat(obj.x3) +
      parseFloat(obj.x4) +
      parseFloat(obj.x5) +
      parseFloat(obj.y1) +
      parseFloat(obj.y2) +
      parseFloat(obj.y3) +
      parseFloat(obj.y4) +
      parseFloat(obj.y5);
    let promedio2 = (suma_aporte_parcial2 / 10).toFixed(2);
    let promedio2_parcial80 = ((promedio2 * 8) / 10).toFixed(2);
    let examen2 = parseFloat(obj.examenfinal2).toFixed(2);
    let promedio2_parcial20 = ((examen2 * 2) / 10).toFixed(2);
    let promedioTotal2 =
      parseFloat(promedio2_parcial80) + parseFloat(promedio2_parcial20);
    let result = ((promedioTotal1 + promedioTotal2) / 2).toFixed(2);

    return result;
  }
  calcular_primer_quimestre(obj, numArray){
    let suma_aporte_parcial1 =
      parseFloat(obj[numArray].a1) +
      parseFloat(obj[numArray].a2) +
      parseFloat(obj[numArray].a3) +
      parseFloat(obj[numArray].a4) +
      parseFloat(obj[numArray].a5) +
      parseFloat(obj[numArray].b1) +
      parseFloat(obj[numArray].b2) +
      parseFloat(obj[numArray].b3) +
      parseFloat(obj[numArray].b4) +
      parseFloat(obj[numArray].b5);
    let promedio1 = (suma_aporte_parcial1 / 10).toFixed(2);
    let promedio1_parcial80 = ((promedio1 * 8) / 10).toFixed(2);
    let examen1 = parseFloat(obj[numArray].examen);
    let promedio1_parcial20 = ((examen1 * 2) / 10).toFixed(2);
    let promedioTotal1 = parseFloat(promedio1_parcial80) + parseFloat(promedio1_parcial20);
    return promedioTotal1.toFixed(2);
  }
}
