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
      let suple = 0;
      let reme = 0;
      let gracia = 0;
      let pfinal = 0;
      let notas = isVerific[i].calificaciones;
      for (let j = 0; j < notas.length; j++) {
        if (notas[j].materia == materia) {
          let calificar = notas[j].notas;
          let comport = notas[j].comportamiento;
          promedio = notas[j].promediof;
          suple = notas[j].suple;
          reme = notas[j].reme;
          gracia = notas[j].gracia;
          pfinal = notas[j].pfinal;
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
        comportamiento: comp,
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
    let a1 = parseFloat(obj.a1),
      a2 = parseFloat(obj.a2),
      a3 = parseFloat(obj.a3),
      a4 = parseFloat(obj.a4),
      a5 = parseFloat(obj.a5);
    let suma = 0;
    let aux = 0;
    if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && a5 != "") {
      suma = a1 + a2 + a3 + a4 + a5;
      aux = 5;
    }
    if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && isNaN(a5)) {
      suma = a1 + a2 + a3 + a4;
      aux = 4;
    }
    if (a1 != "" && a2 != "" && a3 != "" && isNaN(a4) && isNaN(a5)) {
      suma = a1 + a2 + a3;
      aux = 3;
    }
    if (a1 != "" && a2 != "" && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
      suma = a1 + a2;
      aux = 2;
    }
    if (a1 != "" && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
      suma = a1;
      aux = 1;
    }
    let promedio001 = (suma / aux).toFixed(2);
    let b1 = parseFloat(obj.b1),
      b2 = parseFloat(obj.b2),
      b3 = parseFloat(obj.b3),
      b4 = parseFloat(obj.b4),
      b5 = parseFloat(obj.b5);
    let suma2 = 0;
    let aux2 = 0;
    if (b1 != "" && b2 != "" && b3 != "" && b4 != "" && b5 != "") {
      suma2 = b1 + b2 + b3 + b4 + b5;
      aux2 = 5;
    }
    if (b1 != "" && b2 != "" && b3 != "" && b4 != "" && isNaN(b5)) {
      suma2 = b1 + b2 + b3 + b4;
      aux2 = 4;
    }
    if (b1 != "" && b2 != "" && b3 != "" && isNaN(b4) && isNaN(b5)) {
      suma2 = b1 + b2 + b3;
      aux2 = 3;
    }
    if (b1 != "" && b2 != "" && isNaN(b3) && isNaN(b4) && isNaN(b5)) {
      suma2 = b1 + b2;
      aux2 = 2;
    }
    if (b1 != "" && isNaN(b2) && isNaN(b3) && isNaN(b4) && isNaN(b5)) {
      suma2 = b1;
      aux2 = 1;
    }
    let promedio002 = (suma2 / aux2).toFixed(2);
    let promedio_primer_segundo = (
      (parseFloat(promedio002) + parseFloat(promedio001)) /
      2
    ).toFixed(2);
    let promedio1 = promedio_primer_segundo;
    let promedio1_parcial80 = ((promedio1 * 8) / 10).toFixed(2);
    let examen1 = parseFloat(obj.examenfinal);
    let promedio1_parcial20 = ((examen1 * 2) / 10).toFixed(2);
    let promedioTotal1 =
      parseFloat(promedio1_parcial80) + parseFloat(promedio1_parcial20);

    //-------------------------SEGUNDO PARCIAL --------------------
    let x1 = parseFloat(obj.x1),
      x2 = parseFloat(obj.x2),
      x3 = parseFloat(obj.x3),
      x4 = parseFloat(obj.x4),
      x5 = parseFloat(obj.x5);
    let suma3 = 0;
    let aux3 = 0;
    if (x1 != "" && x2 != "" && x3 != "" && x4 != "" && x5 != "") {
      suma3 = x1 + x2 + x3 + x4 + x5;
      aux3 = 5;
    }
    if (x1 != "" && x2 != "" && x3 != "" && x4 != "" && isNaN(x5)) {
      suma3 = x1 + x2 + x3 + x4;
      aux3 = 4;
    }
    if (x1 != "" && x2 != "" && x3 != "" && isNaN(x4) && isNaN(x5)) {
      suma3 = x1 + x2 + x3;
      aux3 = 3;
    }
    if (x1 != "" && x2 != "" && isNaN(x3) && isNaN(x4) && isNaN(x5)) {
      suma3 = x1 + x2;
      aux3 = 2;
    }
    if (x1 != "" && isNaN(x2) && isNaN(x3) && isNaN(x4) && isNaN(x5)) {
      suma3 = x1;
      aux3 = 1;
    }
    let promedio003 = (suma3 / aux3).toFixed(2);
    let y1 = parseFloat(obj.y1),
      y2 = parseFloat(obj.y2),
      y3 = parseFloat(obj.y3),
      y4 = parseFloat(obj.y4),
      y5 = parseFloat(obj.y5);
    let suma4 = 0;
    let aux4 = 0;
    if (y1 != "" && y2 != "" && y3 != "" && y4 != "" && y5 != "") {
      suma4 = y1 + y2 + y3 + y4 + y5;
      aux4 = 5;
    }
    if (y1 != "" && y2 != "" && y3 != "" && y4 != "" && isNaN(y5)) {
      suma4 = y1 + y2 + y3 + y4;
      aux4 = 4;
    }
    if (y1 != "" && y2 != "" && y3 != "" && isNaN(y4) && isNaN(y5)) {
      suma4 = y1 + y2 + y3;
      aux4 = 3;
    }
    if (y1 != "" && y2 != "" && isNaN(y3) && isNaN(y4) && isNaN(y5)) {
      suma4 = y1 + y2;
      aux4 = 2;
    }
    if (y1 != "" && isNaN(y2) && isNaN(y3) && isNaN(y4) && isNaN(y5)) {
      suma4 = y1;
      aux4 = 1;
    }
    let promedio004 = (suma4 / aux4).toFixed(2);
    let promedio_tercer_cuarto = (
      (parseFloat(promedio003) + parseFloat(promedio004)) /
      2
    ).toFixed(2);

    let promedio2 = promedio_tercer_cuarto;
    let promedio2_parcial80 = ((promedio2 * 8) / 10).toFixed(2);
    let examen2 = parseFloat(obj.examenfinal2).toFixed(2);
    let promedio2_parcial20 = ((examen2 * 2) / 10).toFixed(2);
    let promedioTotal2 =
      parseFloat(promedio2_parcial80) + parseFloat(promedio2_parcial20);
    let result = ((promedioTotal1 + promedioTotal2) / 2).toFixed(2);
    return result;
  }
  calcular_primer_quimestre(obj, numArray) {
    let a1 = parseFloat(obj[numArray].a1),
    a2 = parseFloat(obj[numArray].a2),
    a3 = parseFloat(obj[numArray].a3),
    a4 = parseFloat(obj[numArray].a4),
    a5 = parseFloat(obj[numArray].a5);
  let suma = 0;
  let aux = 0;
  if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && a5 != "") {
    suma = a1 + a2 + a3 + a4 + a5;
    aux = 5;
  }
  if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && isNaN(a5)) {
    suma = a1 + a2 + a3 + a4;
    aux = 4;
  }
  if (a1 != "" && a2 != "" && a3 != "" && isNaN(a4) && isNaN(a5)) {
    suma = a1 + a2 + a3;
    aux = 3;
  }
  if (a1 != "" && a2 != "" && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
    suma = a1 + a2;
    aux = 2;
  }
  if (a1 != "" && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
    suma = a1;
    aux = 1;
  }
  let promedio001 = (suma / aux).toFixed(2);
  let b1 = parseFloat(obj[numArray].b1),
  b2 = parseFloat(obj[numArray].b2),
  b3 = parseFloat(obj[numArray].b3),
  b4 = parseFloat(obj[numArray].b4),
  b5 = parseFloat(obj[numArray].b5);
let suma2 = 0;
let aux2 = 0;
if (b1 != "" && b2 != "" && b3 != "" && b4 != "" && b5 != "") {
  suma2 = b1 + b2 + b3 + b4 + b5;
  aux2 = 5;
}
if (b1 != "" && b2 != "" && b3 != "" && b4 != "" && isNaN(b5)) {
  suma2 = b1 + b2 + b3 + b4;
  aux2 = 4;
}
if (b1 != "" && b2 != "" && b3 != "" && isNaN(b4) && isNaN(b5)) {
  suma2 = b1 + b2 + b3;
  aux2 = 3;
}
if (b1 != "" && b2 != "" && isNaN(b3) && isNaN(b4) && isNaN(b5)) {
  suma2 = b1 + b2;
  aux2 = 2;
}
if (b1 != "" && isNaN(b2) && isNaN(b3) && isNaN(b4) && isNaN(b5)) {
  suma2 = b1;
  aux2 = 1;
}
let promedio002 = (suma2 / aux2).toFixed(2);
let promedio_primer_segundo = ((parseFloat(promedio002) + parseFloat(promedio001)) / 2).toFixed(2);

    let promedio1 = promedio_primer_segundo;
    let promedio1_parcial80 = ((promedio1 * 8) / 10).toFixed(2);
    let examen1 = parseFloat(obj[numArray].examen);
    let promedio1_parcial20 = ((examen1 * 2) / 10).toFixed(2);
    let promedioTotal1 =
      parseFloat(promedio1_parcial80) + parseFloat(promedio1_parcial20);
    return promedioTotal1.toFixed(2);
  }
}
