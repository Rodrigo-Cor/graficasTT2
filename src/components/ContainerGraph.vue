<template>
  <div class="row">
    <div class="col-6">
      <Doughnut
        class="chart-container"
        :data="chartData('initialAnswer')"
        :options="chartOptions"
      />
    </div>
    <div class="col-6">
      <Doughnut
        class="chart-container"
        :data="chartData('finalAnswer')"
        :options="chartOptions"
      />
    </div>
    <div class="col-6 text-center">
      {{
        trend.initialAnswer.length === 1
          ? "Moda inicial: " + trend.initialAnswer[0]
          : "Modas iniciales: " + trend.initialAnswer.join(",")
      }}
    </div>
    <div class="col-6 text-center">
      {{
        trend.initialAnswer.length === 1
          ? "Moda final: " + trend.finalAnswer[0]
          : "Modas finales: " + trend.finalAnswer.join(",")
      }}
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "ContainerGraph",
  props: {
    resultsAnswers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
      trend: {
        initialAnswer: [],
        finalAnswer: [],
      },
    };
  },
  components: { Doughnut },
  methods: {
    getDataChart(typeChart) {
      const occurrences = {};
      this.resultsAnswers.forEach((element) => {
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

      let valorModal = -1;
      let moda = [];

      moda = Object.keys(occurrences).reduce((result, option) => {
        const value = occurrences[option].value;
        if (value > valorModal) {
          valorModal = value;
          return [occurrences[option].option];
        } else if (value === valorModal) {
          result.push(occurrences[option].option);
        }
        return result;
      }, moda);
      this.trend[typeChart] = moda;

      return occurrences;
    },
    generateDataGraph(typeQuestion) {
      const chartData = {
        labels: [],
        datasets: [],
      };
      const objetValuesOcurrences = this.getDataChart(typeQuestion);
      const optionValues = Object.values(objetValuesOcurrences).map(
        (item) => item.value
      );
      chartData["datasets"] = [
        {
          data: optionValues,
          backgroundColor: ["#86A789", "#A9A9A9", "#FECDA6", "#FF9130", "#FF5B22"],
        },
      ];
      chartData["labels"] = Object.keys(objetValuesOcurrences);
      return chartData;
    },
    chartData(typeQuestion) {
      return this.generateDataGraph(typeQuestion);
    },
  },
};
</script>

<style scoped>
.chart-container {
  max-width: 300px;
  max-height: 300px;
  margin: 0 auto;
}
</style>
