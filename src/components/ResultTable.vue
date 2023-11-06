<template>
  <div class="row mt-3">
    <div class="col-6 text-center fs-5">
      <span>
        {{
          numberQuestion === 3
            ? options[4 - Math.floor(average["initialAnswer"])]
            : options[Math.floor(average["initialAnswer"])]
        }}
      </span>
      <span>
        {{ " < Promedio inicial:" }}
        {{ getAverage("initialAnswer").toFixed(2) }}
        {{ " < " }}
      </span>
      <span>
        {{
          numberQuestion === 3
            ? options[4 - Math.ceil(average["initialAnswer"])]
            : options[Math.ceil(average["initialAnswer"])]
        }}
      </span>
    </div>
    <div class="col-6 text-center fs-5">
      <span>
        {{ options[Math.floor(average["finalAnswer"])] }}
      </span>
      <span>
        {{ " < Promedio final:" }} {{ getAverage("finalAnswer").toFixed(2) }}
        {{ " < " }}
      </span>
      <span>
        {{ options[Math.ceil(average["finalAnswer"])] }}
      </span>
    </div>
    <div class="col-6 text-center fs-5">
      Desviación estandar inicial:
      {{ getStandardDesviation("initialAnswer").toFixed(2) }}
    </div>
    <div class="col-6 text-center fs-5">
      Desviación estandar final:
      {{ getStandardDesviation("finalAnswer").toFixed(2) }}
    </div>
  </div>
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
</template>

<script>
export default {
  name: "ResultTable",
  props: {
    resultsAnswers: {
      type: Array,
      required: true,
    },
    numberQuestion: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      average: {
        initialAnswer: 0,
        finalAnswer: 0,
      },
      options: ["Nada", "Un poco", "Algo", "Moderadamente", "Extremadamente"],
    };
  },
  methods: {
    getAverage(typeAnswer) {
      let sumaValues = 0;
      this.resultsAnswers.map((result) => {
        let value = parseInt(result[typeAnswer]["value"]);
        sumaValues += value;
      });

      this.average[typeAnswer] = sumaValues / this.resultsAnswers.length;
      return this.average[typeAnswer];
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
