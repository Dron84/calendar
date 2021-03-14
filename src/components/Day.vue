<template>
  <div class="dayInfo">
    <div class="top">
      <div class="dayGlif">
        <div class="glif">
          <div class="day">
            <Ieroglifs :block="DayInfo[0].glif.day" />
          </div>
          <div class="mounth">
            <Ieroglifs :block="DayInfo[0].glif.mounth" />
          </div>
          <div class="year">
            <Ieroglifs :block="DayInfo[0].glif.year" />
          </div>
        </div>
        <div class="naIn">
          <div class="day">
            <span :class="DayInfo[0].naIn.day.color">{{
              DayInfo[0].naIn.day.caption
            }}</span>
          </div>
          <div class="mounth">
            <span :class="DayInfo[0].naIn.mounth.color">{{
              DayInfo[0].naIn.mounth.caption
            }}</span>
          </div>
          <div class="year">
            <span :class="DayInfo[0].naIn.year.color">{{
              DayInfo[0].naIn.year.caption
            }}</span>
          </div>
        </div>
        <div class="fazi">
          <div class="day hoverTitle" :data-title="DayInfo[0].fazi.day">
            {{ DayInfo[0].fazi.day.slice(0, 3) }}
          </div>
          <div class="mounth hoverTitle" :data-title="DayInfo[0].fazi.mounth">
            {{ DayInfo[0].fazi.mounth.slice(0, 3) }}
          </div>
          <div class="year hoverTitle" :data-title="DayInfo[0].fazi.year">
            {{ DayInfo[0].fazi.year.slice(0, 3) }}
          </div>
        </div>
      </div>
      <div class="caption">
        <ul>
          <li v-for="(cap, index) of DayInfo[0].caption" :key="index">
            {{ cap }}
          </li>
        </ul>
        <DayIndicator :caption="DayInfo[0].caption" />
        <DayCaption :caption="DayInfo[0].caption" />
      </div>
    </div>

    <div class="hours">
      <div
        class="hour"
        v-for="(hour, index) in CalculateHours(DayInfo[0].glif.day)"
        :key="hour.time"
        :class="{ active: selectedDay === index }"
        @click="daySelect(index)"
      >
        <div class="time">{{ hour.time }}</div>
        <div class="number">{{ hour.number }}</div>
        <div class="sky" :class="hour.sky_color">{{ hour.sky }}</div>
        <div class="ground" :class="hour.ground_color">{{ hour.ground }}</div>
        <div class="caption">{{ hour.timeCaption }}</div>
        <div class="naIn" :class="hour.naIn.color">{{ hour.naIn.caption }}</div>
        <div class="fazi hoverTitle" :data-title="hour.fazi">
          {{ hour.fazi.slice(0, 3) }}
        </div>
      </div>
    </div>
    <HourCaptions
      v-if="day !== null && hour !== null && mounth !== null && year !== null"
      :day="day"
      :hour="hour"
      :mounth="mounth"
      :year="year"
    />
    <!-- <clock /> -->
  </div>
</template>
<script>
// import clock from "./clock";

import { CalculateHours } from "../JS/methods/calculateHours";
import Ieroglifs from "../components/ieroglifs";
import DayIndicator from "../components/DayIndicator";
import DayCaption from "../components/DayCaption";
import HourCaptions from "../components/HourCaptions";

export default {
  name: "day",
  data: () => ({
    CalculateHours,
    selectedDay: null,
    day: null,
    hour: null,
    mounth: null,
    year: null
  }),
  props: {
    selectDay: null,
    calendar: { type: Array }
  },
  components: { Ieroglifs, DayIndicator, DayCaption, HourCaptions },
  methods: {
    daySelect(index) {
      this.selectedDay = index;
      this.day = this.DayInfo[0].glif.day;
      this.hour = this.CalculateHours(this.day)[index];
      this.mounth = this.DayInfo[0].glif.mounth;
      this.year = this.DayInfo[0].glif.year;
    }
  },
  computed: {
    DayInfo() {
      return this.calendar.filter(item => item.dayNum == this.selectDay);
    }
  }
};
</script>
<style lang="sass">
@import '../assets/vars'
.dayInfo
  padding: 30px
  .top
    display: flex
.hours
  margin: 20px
  display: grid
  grid-template-columns: repeat(13,1fr)
  .hour
    padding: 10px 0
    border: 1px solid $accent
    display: grid
    justify-content: center
    align-items: center
    text-align: center
    transition: all .2s linear
    box-sizing: border-box
    .time
      font-size: .8em
    .sky,.ground
      font-size: 2.2em
    &:hover
      cursor: pointer
      background-color: white
      transform: scale(1.1)
    &.active
      border: 2px solid $selectDay
      z-index: 1000
.dayGlif
  display: inline-grid
  margin: 20px
  padding: 10px 0
  width: 210px
  grid-template-areas: 'glif' 'naIn' 'fazi' 'caption'
  grid-template-columns: 1fr 11fr
  border: 1px solid $accent
  .glif
    display: grid
    grid-area: glif
    grid-template-columns: repeat(auto-fit, 1fr)
    grid-template-areas: 'day mounth year'
    .day
      width: 70px
      grid-area: day
    .mounth
      width: 70px
      grid-area: mounth
    .year
      width: 70px
      grid-area: year
  .naIn,.fazi
    display: grid
    grid-template-columns: repeat(auto-fit, 1fr)
    grid-template-areas: 'day mounth year'
    border-top: 1px dashed $accent
    .day
      width: 70px
      grid-area: day
      text-align: center
    .mounth
      width: 70px
      grid-area: mounth
      text-align: center
    .year
      width: 70px
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
.caption
  padding: 10px
  display: inline-flex
  ul
    list-style: none
  div
    d
</style>
