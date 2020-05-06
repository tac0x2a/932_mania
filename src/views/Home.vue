<template>
  <div class="home">
    <h1>kusatsumania IIDX</h1>
    <div v-if="showList">
        <b-form-input v-model="query" placeholder="絞り込み"></b-form-input>

        <b-row v-for="entry in showList" :key="entry.title">
          <b-col>
            <router-link :to="{ name: 'Kusatsu', params: { title: entry.title, entry: entry } }">
              {{ entry.title }}
            </router-link>
          </b-col>
        </b-row>

    </div>

    <div v-else>
      <b-spinner variant="success" type="grow" label="Loading..."></b-spinner>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import Kusatsu from "@/api/932.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      query: "",
      // kusatsuList: null
    };
  },
  mounted() {
    Kusatsu.listKusatsu(res => {
      this.$store.commit('kusatsuList', res)
    });
  },
  computed: {
    kusatsuList(){
      return this.$store.state.kusatsuList
    },
    showList(){
      if(!this.kusatsuList) return this.kusatsuList;
      if(this.query.strip === "") return this.kusatsuList;
      return this.kusatsuList.filter(t => t.title.toLowerCase().includes(this.query.toLowerCase()));
    }
  }
};
</script>
