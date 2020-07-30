<template>
  <div class="ieroglifs">
    <span class="numbers" v-if="!ieroglifOnly">{{block.number}}</span>
    <span
      class="sky hoverTitle"
      :data-title="block.sky_title"
      :class="block.sky_color"
    >{{block.sky}}</span>
    <span
      class="ground hoverTitle"
      :data-title="`${block.ground_title} ${block.caption}`"
      :class="block.ground_color"
    >{{block.ground}}</span>
    <span class="numbers" v-if="!ieroglifOnly">{{block.ground_number}}</span>
  </div>
</template>
<script>
export default {
  name: "ieroglifs",
  props: {
    block: { type: Object },
    ieroglifOnly: { type: Boolean, default: false }
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