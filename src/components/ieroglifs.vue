<template>
  <div class="ieroglifs">
    <span class="numbers" v-if="!ieroglifOnly">{{ieroglif.number}}</span>
    <span class="sky" :data-title="ieroglif.sky_title" :class="ieroglif.sky_color">{{ieroglif.sky}}</span>
    <span
      class="ground"
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
    ieroglifOnly: {type: Boolean , default: false}
  },
  computed: {
    ieroglif() {
      return this.block;
    },
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
  .ground, .sky
    &::after
      position: absolute
      width: 150px
      top: 50px
      left: 0px
      content: attr(data-title)
      font-size: .5em
      color: black
      background-color: white
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
      visibility: hidden
      opacity: 0
      z-index: 99999
      border-radius: 5px 
    &:hover
      &::after
        visibility: visible
        opacity: 1

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