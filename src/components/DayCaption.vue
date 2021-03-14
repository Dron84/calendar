<template>
  <div class="day_caption" v-if="caption !== null" v-html="cap"></div>
</template>
<script>
import getCaption from "./plugin/dayCaptions";
export default {
  name: "day_caption",
  components: {},
  data: () => ({
    cap: ``
  }),
  props: {
    caption: { type: Array }
  },
  methods: {
    calculate() {
      const findReg = /(\d+)\.\s/g;
      const num = String(this.caption[0])
        .match(findReg)
        .map(item => Number(item.replace(".", "").replace(/\s/g, "")));
      for (let item of num) {
        this.cap += `<br>${getCaption(item)}`;
      }
    }
  },
  created() {
    this.calculate();
  }
};
</script>
<style lang="sass" scoped></style>
