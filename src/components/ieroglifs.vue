<template>
  <div class="ieroglifs">
    <span class="numbers" v-if="!ieroglifOnly">{{ieroglif.number}}</span>
    <span
      class="sky hoverTitle"
      :data-title="ieroglif.sky_title"
      :class="ieroglif.sky_color"
    >{{ieroglif.sky}}</span>
    <span
      class="ground hoverTitle"
      :data-title="`${ieroglif.ground_title} ${ieroglif.caption}`"
      :class="ieroglif.ground_color"
    >{{ieroglif.ground}}</span>
    <span class="numbers" v-if="!ieroglifOnly">{{ieroglif.ground_number}}</span>
  </div>
</template>
<script>
export default {
  name: "ieroglifs",
  props: {
    block: { type: Object },
    ieroglifOnly: { type: Boolean, default: false }
  },
  computed: {
    ieroglif() {
      return this.block;
    }
  }
};
</script>
<style lang="sass">
.ieroglifs
  display: grid
  position: relative
  .numbers, .caption
    font-size: 1em
    text-align: center
  .sky, .ground
    text-align: center
    font-size: 2em
    position: relative
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