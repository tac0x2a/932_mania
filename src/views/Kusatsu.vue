<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="detail">
      <img :src="detail.img" />
      <p>{{detail.head}}</p>

      <a :href="'https://ja.wikipedia.org' + entry.link" target="_blank">出典: Wikipedia: {{detail.title}}</a>

    </div>


    <p v-else>Loading ... {{ entry.link }}</p>
  </div>
</template>

<script>
import Kusatsu from "@/api/932.js";

export default {
  props: ["title", "entry"],
  data() {
    return {
      detail: null
    };
  },

  watch: {
    entry: {
      handler() {
        Kusatsu.detailKusatsu(this.entry.link, res => {
          console.log(res);
          this.detail = res;
        });
      },
      immediate: true
    }
  }
};
</script>
