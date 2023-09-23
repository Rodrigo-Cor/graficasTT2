<template>
  <form @submit.prevent="submitForm">
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        id="checkAnswerInitialFinal"
        name="formGraph"
        value="answerInitialFinal"
        v-model="answerTypeGraph"
        :disabled="stateDisabled"
      />
      <label class="form-check-label" for="checkAnswerInitialFinal">
        Comparativa entre respuestas iniciales y finales
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        id="answerAllIndividual"
        name="formGraph"
        value="answerAllIndividual"
        v-model="answerTypeGraph"
        :disabled="stateDisabled"
      />
      <label class="form-check-label" for="answerAllIndividual">
        Comparativa individual de las respuestas
      </label>
    </div>
    <select
      class="form-select"
      v-model="localSelectedOption"
      :disabled="stateDisabled"
      v-if="answerTypeGraph === 'answerInitialFinal'"
    >
      <option value="" disabled>Selecciona una opción</option>
      <template v-for="option in options">
        <option :value="option">Pregunta: {{ option + 1 }}</option>
      </template>
    </select>

    <button type="submit" class="btn btn-info" v-if="answerTypeGraph !== ''">
      {{
        stateDisabled
          ? "Generando..."
          : answerTypeGraph === "answerInitialFinal"
          ? "Generar graficas"
          : "Generar tabla"
      }}
    </button>
  </form>

  <div v-if="showGraph && answerTypeGraph === 'answerInitialFinal'" class="row">
    <div class="col-6">
      <Doughnut
        class="chart-container"
        :data="chartDataInitial"
        :options="chartOptions"
        :key="idGraphInitial"
      />
    </div>
    <div class="col-6">
      <Doughnut
        class="chart-container"
        :data="chartDataFinal"
        :options="chartOptions"
        :key="idGraphFinal"
      />
    </div>
  </div>
  <ResultTable
    v-if="answerTypeGraph === 'answerAllIndividual' && showTable"
    :resultsAnswers="resultsNumberQuestion"
  />
</template>

<script>
const { v4: uuidv4 } = require("uuid");
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);

import ResultTable from "@/components/ResultTable.vue";
import { genericAlert } from "@/globalFunctions.js";

export default {
  name: "ResultForm",
  components: { Doughnut, ResultTable },
  created() {
    this.options = this.generateOptions(6);
  },
  data() {
    return {
      answerTypeGraph: "",
      options: [],
      localSelectedOption: "",
      resultsNumberQuestion: [],

      stateDisabled: false,

      idGraphInitial: "",
      chartDataInitial: {
        labels: [],
        datasets: [],
      },

      idGraphFinal: "",
      chartDataFinal: {
        labels: [],
        datasets: [],
      },

      chartOptions: {
        responsive: true,
      },
      showGraph: false,
      showTable: false,
    };
  },
  methods: {
    generateOptions(numberQuestions) {
      const options = [];
      for (let index = 0; index <= numberQuestions; index++) {
        options.push(index);
      }
      return options;
    },
    async getResults(numberQuestion) {
      const response = await axios.post(
        "http://localhost:7071/api/GetResultsQuestion",
        {
          numberQuestion: numberQuestion,
        }
      );
      this.resultsNumberQuestion = await response.data;
    },
    async methodAnswerInitialFinal() {
      await this.getResults(this.localSelectedOption);
      this.idGraphInitial = this.generateDataGraph(
        "initialAnswer",
        this.chartDataInitial
      );

      this.idGraphFinal = this.generateDataGraph(
        "finalAnswer",
        this.chartDataFinal
      );
      this.showGraph = true;
    },
    getDataChart(typeChart) {
      const occurrences = {};
      this.resultsNumberQuestion.forEach((element) => {
        const dataChartAnswer = element[typeChart]["option"];

        if (occurrences.hasOwnProperty(dataChartAnswer)) {
          occurrences[dataChartAnswer].value++;
        } else {
          occurrences[dataChartAnswer] = {
            option: dataChartAnswer,
            value: 1,
          };
        }
      });
      return occurrences;
    },
    generateDataGraph(typeQuestion, chartData) {
      const idGraph = uuidv4();
      const objetValuesOcurrences = this.getDataChart(typeQuestion);
      const optionValues = Object.values(objetValuesOcurrences).map(
        (item) => item.value
      );
      chartData["datasets"] = [
        {
          data: optionValues,
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
        },
      ];
      chartData["labels"] = Object.keys(objetValuesOcurrences);
      return idGraph;
    },
    async submitForm() {
      try {
        this.stateDisabled = true;
        this.answerTypeGraph === "answerInitialFinal"
          ? await this.methodAnswerInitialFinal()
          : (await this.getResults(""), (this.showTable = true));
      } catch (error) {
        genericAlert(error.message, "error");
        this.showTable = false;
      } finally {
        this.stateDisabled = false;
      }
    },
  },
  watch: {
    answerTypeGraph() {
      this.showGraph = false;
      this.showTable = false;
    },
    localSelectedOption() {
      this.showGraph = false;
      this.showTable = false;
    },
  },
};
</script>

<style scoped>
.chart-container {
  max-width: 400px;
  max-height: 400px;
  margin: 0 auto;
}
</style>
