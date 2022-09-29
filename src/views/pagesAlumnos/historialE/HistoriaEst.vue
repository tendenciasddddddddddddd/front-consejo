<template>
    <div >
      <h5 class="mt-1 fuente" style="font-weight: 400;"> Historial Académico</h5>
            <div class="table-responsive p-0 mt-3">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr class="cabeza">
                    <th
                      style="background-color: rgb(234, 240, 246);"
                      class="text-center "
                    >
                      <p style="color: red; font-weight: 600;" class="h5 negros">
                       Base de datos
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      class="text-center"
                      style="height: 72px; padding: 16px 24px;    "
                    >
                      <p class="h5 fuente">No hay recursos</p>
                      <p class="parrafo">
                        Puedes mirar todo el historial académico de matriculas
                         <br />
                        notas asistencia
                      </p>
                      <a style="javascript:;"
                        class="btn btn-vercel btn-sm mt-4 w-40"
                      >
                        Ver Historial
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br>
               <br>
            </div>
    </div>
</template>
<script >
  export default {
    name: 'HistoriaEst',
    components :{},
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        
    },
  }
</script>