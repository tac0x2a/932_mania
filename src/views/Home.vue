<template>
  <div class="home">
    <h1>kusatsumania IIDX</h1>
    <div v-if="kusatsuList">
      <ul>
        <li v-for="entry in kusatsuList" :key="entry.title">
          <router-link :to="{name: 'Kusatsu', params: {title: entry.title, entry: entry}}">{{ entry.title }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import Kusatsu from "@/api/932.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      kusatsuList: null
    };
  },
  mounted() {
    Kusatsu.listKusatsu(res => {
      this.kusatsuList = res;
    });
  }
};
</script>
