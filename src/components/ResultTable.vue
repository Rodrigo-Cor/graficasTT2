<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Respuesta inicial</th>
        <th scope="col">Respuesta final</th>
      </tr>
    </thead>
    <tbody v-for="(resultUser, index) in resultsAnswers" :key="resultUser.id">
      <tr
        v-bind:class="{
          'table-success':
            resultUser.initialAnswer['value'] < resultUser.finalAnswer['value'],
          'table-danger':
            resultUser.initialAnswer['value'] > resultUser.finalAnswer['value'],
          'table-warning':
            resultUser.initialAnswer['value'] ===
            resultUser.finalAnswer['value'],
        }"
      >
        <th scope="row">{{ index + 1 }}</th>
        <td>
          {{ resultUser.initialAnswer["option"] }}
        </td>
        <td>
          {{ resultUser.finalAnswer["option"] }}
        </td>
      </tr>
    </tbody>
  </table>

  <div class="row">
    <div class="col-6 text-center">
      Promedio inicial: {{ getAverage("initialAnswer").toFixed(2) }}
    </div>
    <div class="col-6 text-center">
      Promedio final: {{ getAverage("finalAnswer").toFixed(2) }}
    </div>
    <div class="col-6 text-center">
      Desviación estandar inicial:
      {{ getStandardDesviation("initialAnswer").toFixed(2) }}
    </div>
    <div class="col-6 text-center">
      Desviación estandar final:
      {{ getStandardDesviation("finalAnswer").toFixed(2) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultTable",
  props: {
    resultsAnswers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      average: {
        initialAnswer: 0,
        finalAnswer: 0,
      },
    };
  },
  methods: {
    getAverage(typeAnswer) {
      let sumaValues = 0;
      this.resultsAnswers.map((result) => {
        sumaValues += result[typeAnswer]["value"];
      });

      this.average[typeAnswer] = sumaValues / this.resultsAnswers.length;
      return sumaValues / this.resultsAnswers.length;
    },
    getStandardDesviation(typeAnswer) {
      let sumaValues = 0;
      this.resultsAnswers.map((result) => {
        sumaValues += Math.pow(
          result[typeAnswer]["value"] - this.average[typeAnswer],
          2
        );
      });
      return Math.sqrt(sumaValues / this.resultsAnswers.length);
    },
  },
};
</script>
