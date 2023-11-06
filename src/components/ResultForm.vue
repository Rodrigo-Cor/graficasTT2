<template>
  <section>
    <p>Elegir la pregunta</p>
    <select
      class="form-select"
      v-model="localSelectedOption"
      :disabled="stateDisabled"
      name="question"
    >
      <option value="" disabled>Selecciona una opción</option>
      <template v-for="option in options">
        <option :value="option">Pregunta: {{ option + 1 }}</option>
      </template>
    </select>

    <template v-if="resultsNumberQuestion.length !== 0">
      <div class="row">
        <div class="col-6">
          <div class="d-flex align-items-center flex-column text-center">
            <p class="fsw-bold">
              Pregunta inicio:
              {{ questions[localSelectedOption].start.question }}
            </p>
            <ListQuestion
              :options="questions[localSelectedOption].start.options"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex align-items-center flex-column text-center">
            <p class="fsw-bold">
              Pregunta final:
              {{ questions[localSelectedOption].final.question }}
            </p>
            <ListQuestion
              :options="questions[localSelectedOption].final.options"
            />
          </div>
        </div>
      </div>
      <ContainerGraph
        :resultsAnswers="resultsNumberQuestion"
      />
      <ResultTable :resultsAnswers="resultsNumberQuestion" :numberQuestion="localSelectedOption"/>
    </template>
  </section>
</template>

<script>
import axios from "axios";

import ListQuestion from "@/components/ListQuestion.vue";
import ContainerGraph from "@/components/ContainerGraph.vue";
import ResultTable from "@/components/ResultTable.vue";
import { genericAlert } from "@/globalFunctions.js";

export default {
  name: "ResultForm",
  components: { ListQuestion, ContainerGraph, ResultTable },
  created() {
    this.options = this.generateOptions(7);
  },
  data() {
    return {
      options: [],
      localSelectedOption: "",
      resultsNumberQuestion: [],
      stateDisabled: false,
      messageNoData: "No hay datos sobre la pregunta ",
      questions: [
        {
          start: {
            question: '¿Has escuchado el término "microplásticos"?',
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
          final: {
            question:
              "¿Qué tan frecuentemente has escuchado este término de microplásticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
        {
          start: {
            question:
              "¿Cuál es el nivel de prioridad para difundir información sobre el impacto de microplásticos en ecosistemas acuáticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
          final: {
            question:
              "¿Cómo ha cambiado tu nivel de prioridad sobre el impacto de estas partículas sobre ecosistemas acuáticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
        {
          start: {
            question:
              "¿Te preocupa que los seres vivos acuáticos sufran a causa de la contaminación por microplásticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
          final: {
            question:
              "¿Qué nivel de preocupación consideras los efectos que pueden producir los microplásticos en los seres acuáticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
        {
          start: {
            question:
              "¿Con qué nivel de frecuencia compra productos de plástico?",
            options: [
              { option: "Extemadamente", value: 0 },
              { option: "Moderamente", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Un poco", value: 3 },
              { option: "Nada", value: 4 },
            ],
          },
          final: {
            question:
              "¿En qué nivel has reducido tu frecuencia en la compra de productos de plástico?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
        {
          start: {
            question:
              "¿Qué tan consciente estás de la contaminación por microplásticos en México?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
          final: {
            question:
              "¿Qué tanto cambio tu nivel de conciencia sobre la contaminación por microplásticos en México?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
        {
          start: {
            question:
              "¿Te has dado cuenta de que es muy probable que hayas ingerido microplásticos? ",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
          final: {
            question: "¿Ya te disté cuenta de que consumiste microplásticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
        {
          start: {
            question:
              "¿Has escuchado sobre alguna técnica de limpieza de microplásticos en el agua?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
          final: {
            question:
              "¿Identificaste alguna técnica de limpieza de microplásticos en el agua?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
        {
          start: {
            question:
              "¿Tienes información sobre el cambio de hábitos para eliminar el consumo de productos plásticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
          final: {
            question:
              "¿La información te sirvió para crearte hábitos de reducción de consumo de productos plásticos?",
            options: [
              { option: "Nada", value: 0 },
              { option: "Un poco", value: 1 },
              { option: "Algo", value: 2 },
              { option: "Moderadamente", value: 3 },
              { option: "Extremadamente", value: 4 },
            ],
          },
        },
      ],
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
        "https://microplasticosapi.azurewebsites.net/api/GetResultsQuestion?code=A6NuHq3gDUKSXOac0_7ZW0UA02q6DpKQmvDbcNQABWPbAzFuPaIS7w==",
        {
          numberQuestion: numberQuestion,
        }
      );
      this.resultsNumberQuestion = await response.data;
      (await response.data.length) === 0
        ? (genericAlert(this.messageNoData + (numberQuestion + 1), "warning"),
          (this.localSelectedOption = ""))
        : null;
    },
    async getAnswer(newOption) {
      try {
        this.stateDisabled = true;
        await this.getResults(newOption);
      } catch (error) {
        genericAlert(error.message, "error");
      } finally {
        this.stateDisabled = false;
      }
    },
  },
  watch: {
    localSelectedOption(newOption) {
      if (newOption !== "") {
        this.resultsNumberQuestion = [];
        this.getAnswer(newOption);
      }
    },
  },
};
</script>
