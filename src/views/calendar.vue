<template>
  <div class="calendar">
    <div class="header">
      <div class="logo">
        <img src="https://nadezhda-kalinina.com/img/icon/logo.svg" />
      </div>
      <div class="info">
        <h1>
          Китайский календарь. Выбор дат. Энергии часа, дня, месяца и года.
        </h1>
        <dates v-model="date" />
      </div>
    </div>

    <div class="wrapper">
      <aside>
        <div class="year white_bg sideMargin">
          <ieroglifs
            :block="{ ...getBacziYear(15, date) }"
            :ieroglifOnly="true"
          />
        </div>
        <div class="mounthCaption">
          <div class="caption">{{ mounthCaption(mounthArray, date) }}</div>
        </div>
      </aside>
      <header>
        <span v-for="day in Array.from(daysTitle)" :key="day.index">{{
          day.nameRu
        }}</span>
      </header>

      <calendarDay
        :calendar="generateCalendar(date, dayInMounth)"
        :weekDay="weekDay"
        :date="date"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import dates from "../components/dates";

import ieroglifs from "../components/ieroglifs";
import calendarDay from "../components/calendarDays";
import {
  generateCalendar,
  getBacziYear,
  mounthCaption
} from "../JS/methods/index";

const mounth = Number(moment().format("MM"));
const year = Number(moment().format("YYYY"));

export default {
  name: "calendar",
  components: { dates, calendarDay, ieroglifs },
  data: () => ({
    miss: null,
    date: {
      mounth,
      year
    },
    daysTitle: [
      { nameEng: "Mon", nameRu: "ПН", index: 1 },
      { nameEng: "Tue", nameRu: "ВТ", index: 2 },
      { nameEng: "Wed", nameRu: "СР", index: 3 },
      { nameEng: "Thu", nameRu: "ЧТ", index: 4 },
      { nameEng: "Fri", nameRu: "ПТ", index: 5 },
      { nameEng: "Sat", nameRu: "СБ", index: 6 },
      { nameEng: "Sun", nameRu: "ВС", index: 7 }
    ],

    generateCalendar,
    getBacziYear,
    mounthCaption
  }),
  methods: {},
  computed: {
    dayInMounth() {
      return !this.isEmptyObject(this.date)
        ? moment(
            `${this.date.year}/${this.date.mounth}`,
            "YYYY/MM"
          ).daysInMonth()
        : null;
    },
    mounthArray() {
      return this.$store.getters.mounthArray;
    },
    weekDay() {
      return this.date
        ? moment(`${this.date.year}/${this.date.mounth}/01`).isoWeekday() - 1
        : null;
    },
    formation() {
      return this.$store.getters.formation;
    }
  }
};
</script>

<style lang="sass">
@import ../assets/vars
.accent
  color: $accent
.calendar
  height: 100vh
  color: $text_on_normal
  .header
    display: flex
    align-items: center
    justify-content: center
    .logo
      img
        height: 140px
    .info
      display: grid
      div
        justify-self: center
  .wrapper
    display: grid
    grid-template-areas: 'asids heads' 'asids bodys'
    grid-template-columns: 1fr 10fr
    position: relative
    aside
      position: relative
      top: 0
      left: 0
      height: auto
      background-color: rgba($accent,1)
      grid-area: asids
      height: 100%
      display: grid
      grid-template-rows: 130px 1fr
      align-items: center
      .white_bg
        background-color: white
      .sideMargin
        margin: 0 auto
        padding: 20px
        width: 90px
        position: relative
        top: -30px
        border: 3px solid $accent
      .mounthCaption
        .caption
          transform: rotateZ(-90deg)
          font-size: 5em
          color: white
          text-align: center
          white-space: nowrap
    header
      grid-area: heads
      height: 80px
      background-color: rgba($accent,1)
      display: grid
      grid-template-columns: repeat(7, 1fr )
      align-items: flex-end
      font-size: 1.3em
      color: $text_on_accent
      span
        margin: 20px
.hoverTitle
  position: relative
  &::after
    position: absolute
    width: 150px
    top: 50px
    left: 0px
    content: attr(data-title)
    font-size: 18px
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
</style>
