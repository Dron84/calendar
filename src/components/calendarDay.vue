<template>
  <div class="body">
    <div class="item none" v-for="i in weekDay" :key="`${i}_weekDay`"></div>

    <div class="item" v-for="i in calendar" :key="`${i.dayNum}_day`">
      <span class="time" v-if="i.glif.day.timeOn">
        {{
        i.glif.day.timeMounthBegin
        }}
      </span>
      <span class="dayNum">{{ i.dayNum }}</span>
      <div class="glif">
        <div class="day">
          <ieroglifs :block="i.glif.day" />
        </div>
        <div class="mounth">
          <ieroglifs :block="i.glif.mounth" />
        </div>
        <div class="year">
          <ieroglifs :block="i.glif.year" />
        </div>
      </div>
      <div class="naIn">
        <div class="day">
          <span :class="i.naIn.day.color">{{ i.naIn.day.caption }}</span>
        </div>
        <div class="mounth">
          <span :class="i.naIn.mounth.color">{{ i.naIn.mounth.caption }}</span>
        </div>
        <div class="year">
          <span :class="i.naIn.year.color">{{ i.naIn.year.caption }}</span>
        </div>
      </div>
      <div class="fazi">
        <div class="day hoverTitle" :data-title="i.fazi.day">{{i.fazi.day.slice(0,3)}}</div>
        <div class="mounth hoverTitle" :data-title="i.fazi.mounth">{{i.fazi.mounth.slice(0,3)}}</div>
        <div class="year hoverTitle" :data-title="i.fazi.year">{{i.fazi.year.slice(0,3)}}</div>
      </div>
      <div class="caption">
        <ul>
          <li v-for="(cap, index) of i.caption" :key="index">{{ cap }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ieroglifs from "../components/ieroglifs";
export default {
  name: "calendarDay",
  components: { ieroglifs },
  data: () => ({}),
  props: {
    calendar: null,
    weekDay: null
  },
  methods: {},
  computed: {}
};
</script>
<style lang="sass">
@import '../assets/vars.sass'
.body
  grid-area: bodys
  width: 100%
  display: grid
  grid-template-columns: repeat(7, 1fr )
  .item
    height: 100%
    position: relative
    height: auto
    display: grid
    grid-template-areas: 'glif' 'naIn' 'fazi' 'caption'
    grid-template-rows: .33fr .33fr 20px .33fr
    border: 1px solid $accent
    padding: 40px 0 20px 0
    .time
      height: 30px
      position: absolute
      top: 0
      right: 0
      background-color: red
      color: white
      border-radius: 0 0 0 5px
      padding: 5px 10px
      font-size: 1em
    .dayNum
      height: 30px
      position: absolute
      margin: 5px
      grid-area: daynum
      border-top: 1px solid $accent
      border-right: 1px solid $accent
      border-bottom: 1px solid $accent
      border-radius: 0 0 5px 0
      width: 30px
      top: -6px
      left: -5px
      font-size: 1em
      display: flex
      justify-content: center
      align-items: center
    .glif
      grid-area: glif
      display: grid
      grid-template-columns: repeat(auto-fit, 1fr)
      grid-template-areas: 'day mounth year'
      .day
        grid-area: day
      .mounth
        grid-area: mounth
      .year
        grid-area: year
    .naIn,.fazi
      display: grid
      grid-template-columns: repeat(auto-fit, 1fr)
      grid-template-areas: 'day mounth year'
      border-top: 1px dashed $accent
      .day
        grid-area: day
        text-align: center
      .mounth
        grid-area: mounth
        text-align: center
      .year
        grid-area: year
        text-align: center
    .naIn
      grid-area: naIn
      .day, .mounth, .year
        font-size: 2em
    .fazi
      grid-area: fazi
      .day, .mounth, .year
        font-size: .9em
    &:nth-child(7n)
      background-color: rgba($accent,.3)
    &:nth-child(6),&:nth-child(13),&:nth-child(20),&:nth-child(27),&:nth-child(34)
      background-color: rgba($accent,.3)
    &:hover
      background-color: rgba($accent,.1)
    &.none
      background-color: rgba($item_none,.3)
      border: 1px solid transparent
    .caption
      grid-area: caption
      border-top: 1px dashed $accent
      ul
        list-style: none
        padding: 0 20px
</style>
