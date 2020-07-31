<template>
  <div class="dayInfo">
    <div class="dayGlif">
      <div class="glif">
        <div class="day">
          <ieroglifs :block="DayInfo[0].glif.day" />
        </div>
        <div class="mounth">
          <ieroglifs :block="DayInfo[0].glif.mounth" />
        </div>
        <div class="year">
          <ieroglifs :block="DayInfo[0].glif.year" />
        </div>
      </div>
      <div class="naIn">
        <div class="day">
          <span :class="DayInfo[0].naIn.day.color">{{ DayInfo[0].naIn.day.caption }}</span>
        </div>
        <div class="mounth">
          <span :class="DayInfo[0].naIn.mounth.color">{{ DayInfo[0].naIn.mounth.caption }}</span>
        </div>
        <div class="year">
          <span :class="DayInfo[0].naIn.year.color">{{ DayInfo[0].naIn.year.caption }}</span>
        </div>
      </div>
      <div class="fazi">
        <div
          class="day hoverTitle"
          :data-title="DayInfo[0].fazi.day"
        >{{DayInfo[0].fazi.day.slice(0,3)}}</div>
        <div
          class="mounth hoverTitle"
          :data-title="DayInfo[0].fazi.mounth"
        >{{DayInfo[0].fazi.mounth.slice(0,3)}}</div>
        <div
          class="year hoverTitle"
          :data-title="DayInfo[0].fazi.year"
        >{{DayInfo[0].fazi.year.slice(0,3)}}</div>
      </div>
    </div>
    <div class="caption">
      <ul>
        <li v-for="(cap, index) of DayInfo[0].caption" :key="index">{{ cap }}</li>
      </ul>
    </div>
    <div class="hours">
      <div
        class="hour"
        v-for="(hour,index) in CalculateHours(DayInfo[0].glif.day)"
        :key="hour.time"
        :class="{'active': selectedDay === index}"
        @click="daySelect(index)"
      >
        <div class="time">{{hour.time}}</div>
        <div class="number">{{hour.number}}</div>
        <div class="sky" :class="hour.sky_color">{{hour.sky}}</div>
        <div class="ground" :class="hour.ground_color">{{hour.ground}}</div>
        <div class="caption">{{hour.timeCaption}}</div>
        <div class="naIn" :class="hour.naIn.color">{{hour.naIn.caption}}</div>
        <div class="fazi hoverTitle" :data-title="hour.fazi">{{hour.fazi.slice(0,3)}}</div>
      </div>
    </div>
    <div class="dayCaptions">
      <div v-for="(item,index) in dayCaptions" :key="index">
        <p class="red">{{item.title}}</p>
        <p>{{item.caption}}</p>
      </div>
      {{dayCaptions}}
    </div>
    <!-- <clock /> -->
  </div>
</template>
<script>
// import clock from "./clock";

import { CalculateHours } from "../JS/methods/calculateHours";
import { notUseHour } from "../JS/methods/notUseHour";
import { collisions } from "../JS/methods/collisions";
import ieroglifs from "../components/ieroglifs";

export default {
  name: "day",
  data: () => ({
    CalculateHours,
    collisions,
    notUseHour,
    selectedDay: null,
    dayCaptions: []
  }),
  props: {
    selectDay: null,
    calendar: { type: Array }
  },
  components: { ieroglifs },
  methods: {
    daySelect(index) {
      this.dayCaptions = [];
      this.selectedDay = index;
      const caption = (title, caption) => ({ title, caption });
      const hours = CalculateHours(this.DayInfo[0].glif.day)[index];
      // (firstGround, secondGround, caption)
      const collision = this.collisions(
        this.DayInfo[0].glif.day.ground,
        hours.ground,
        "true"
      );
      collision &&
        this.dayCaptions.push(
          caption(
            `Разрушитель дня. `,
            `Энергии часа конфликтуют с энергиями дня. Не выбирайте этот час.`
          )
        );

      //(daySky, hourSky)
      console.log(
        ` this.DayInfo[0].glif.day.sky`,
        this.DayInfo[0].glif.day.sky
      );
      console.log(` hours.sky`, hours.sky);
      const notUseHour = this.notUseHour(
        this.DayInfo[0].glif.day.sky,
        hours.sky
      );
      console.log(`notUseHour`, notUseHour);
      notUseHour &&
        this.dayCaptions.push(
          caption(
            `Неиспользуемый час. `,
            `Энергии часа конфликтуют с энергиями дня. Не выбирайте этот час. `
          )
        );
    }
  },
  computed: {
    DayInfo() {
      return this.calendar.filter(item => item.dayNum == this.selectDay);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="sass">
@import '../assets/vars'
.dayInfo
  padding: 30px

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
</style>