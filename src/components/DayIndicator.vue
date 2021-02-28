<template>
  <div class="DayIndicator">
    <div class="good">
      <Icon :name="item" v-for="(item, index) in good" :key="index" />
    </div>
    <div class="bad">
      <Icon :name="item" v-for="(item, index) in bad" :key="index" />
    </div>
  </div>
</template>
<script>
import calculation from "./plugin/dayIndicator";
import Icon from "./Icon";
export default {
  name: "DayIndicator",
  components: { Icon },
  data: () => ({
    indicator: null,
    good: null,
    bad: null
  }),
  props: {
    caption: { type: Array }
  },
  methods: {},
  mounted() {
    console.log("this.caption[0]", this.caption[0]);
    const findReg = /(\d+)\.\s/g;
    this.indicator = String(this.caption[0])
      .match(findReg)
      .map(item => Number(item.replace(".", "").replace(/\s/g, "")));
    console.log("this.indicator", this.indicator);
    const calc = calculation(this.indicator);
    this.good = calc.good;
    this.bad = calc.bad;
    console.log("calc.good", calc.good, "calc.bad", calc.bad);
  }
};
</script>
<style lang="sass">
@import '../assets/vars'
.good,.bad
  display: flex
  padding: 0 20px
.good
  .icon
    color: $accent
.bad
  .icon
    color: $selectDay
</style>
