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
          <div class="caption">
            {{ selectDay }}&nbsp;{{ mounthCaption(mounthArray, date) }}
          </div>
        </div>
      </aside>
      <header><span class="onHover" @click="goBack()">&lt; Назад</span></header>
      <Day
        :selectDay="selectDay"
        :calendar="generateCalendar(date, dayInMounth)"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import mounthBegin from "../JS/mounthbegin";
import bacziData from "../JS/bacziData";
import dates from "../components/dates";
import ieroglifs from "../components/ieroglifs";
import Day from "../components/Day";

import {
  generateCalendar,
  getBacziYear,
  mounthCaption
} from "../JS/methods/index";

export default {
  name: "calendarDay",
  components: { dates, ieroglifs, Day },
  data: () => ({
    mounthBegin,
    bacziData,
    mounthCaption,
    generateCalendar,
    getBacziYear
  }),
  methods: {
    goBack() {
      history.back();
    }
  },
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
      return this.$store.getters.mounthArrayForDay;
    },
    date() {
      const date = this.$route.params.date.match(/(\d+)-(\d+)/);
      return { year: Number(date[1]), mounth: Number(date[2]) };
    },
    selectDay() {
      return this.$route.params.day;
    }
  }
};
</script>
