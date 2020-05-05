<template>
  <div>
    <div v-if="detail">
      <b-card
        img-top
        :title="title"
        :img-src="detail.img"
        :img-alt="title"
        tag="article"
        class="mb-2"
        align="left"
      >
        <b-card-text>{{detail.head}}</b-card-text>

        <b-button
          :href="'https://ja.wikipedia.org' + entry.link"
          target="_blank"
          variant="primary"
        >Wikipediaで開く</b-button>
      </b-card>
    </div>

    <div v-else>
      <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
      <p>Loading ... {{title}}</p>
    </div>
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
