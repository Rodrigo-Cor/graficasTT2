<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Número de pregunta</th>
          <th scope="col">Respuesta inicial</th>
          <th scope="col">Respuesta final</th>
        </tr>
      </thead>
      <tbody v-for="(resultUser, index) in resultsAnswers" :key="resultUser.id">
        <tr
          v-bind:class="{
            'table-success':
              resultUser.initialAnswer['value'] <
              resultUser.finalAnswer['value'],
            'table-danger':
              resultUser.initialAnswer['value'] >
              resultUser.finalAnswer['value'],
            'table-warning':
              resultUser.initialAnswer['value'] ===
              resultUser.finalAnswer['value'],
          }"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ resultUser.numberQuestion }}</td>
          <td>{{ resultUser.initialAnswer["option"] }}</td>
          <td>{{ resultUser.finalAnswer["option"] }}</td>
        </tr>
      </tbody>
    </table>
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
};
</script>
