<template>
  <ul class="list-group" v-for="option in options">
    <li class="list-group-item list-group-item-light">{{ option.option }} : {{ option.value }}</li>
  </ul>

</template>

<script>
export default {
  name: "ListQuestion",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>
