<template>
  <div class="ieroglifs">
    <span class="day">{{ i }}</span>
    <span class="numbers">{{ieroglif.number}}</span>
    <span class="sky" :title="ieroglif.sky_title" :class="ieroglif.sky_color">{{ieroglif.sky}}</span>
    <span
      class="ground"
      :title="ieroglif.ground_title"
      :class="ieroglif.ground_color"
    >{{ieroglif.ground}}</span>
    {{ieroglif.caption}}
  </div>
</template>
<script>
export default {
  name: "ieroglifs",
  props: {
    block: { type: Object }
  },
  computed: {
    ieroglif() {
      return this.block.data.data;
    },
    i() {
      return this.block.index;
    }
  }
};
</script>
<style lang='sass'>
.ieroglifs
  display: grid
  .day
    position: relative
    margin: 30px
  .numbers
    font-size: 1em
  .sky, .ground
    font-size: 2em

.green
  color: green
.brown
  color: brown
.red
  color: red
.gray
  color: gray
.blue
  color: blue
</style>