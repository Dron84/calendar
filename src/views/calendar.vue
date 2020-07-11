<template>
  <div class="calendar">
    <div class="header">
      <div class="logo">
        <img src="https://nadezhda-kalinina.com/img/icon/logo.svg" />
      </div>
      <div class="info">
        <h1>Китайский календарь. Выбор дат. Энергии часа, дня, месяца и года.</h1>
        <dates @updateChanges="update()" />
      </div>
    </div>

    <div class="wrapper">
      <aside></aside>
      <header>
        <span v-for="day in Array.from(daysTitle)" :key="day.index">
          {{
          day.nameRu
          }}
        </span>
      </header>
      <div class="body">
        <div class="item none" v-for="i in miss" :key="i"></div>
        <div class="item" v-for="i in dayInMounth" :key="i + dayInMounth">
          <ieroglifs :block="{data: {...getBasi()[i]}, index: i}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import dates from "../components/dates";
import bacziData from "../JS/bacziData";
import ieroglifs from "../components/ieroglifs";

export default {
  name: "calendar",
  components: { dates, ieroglifs },
  data: () => ({
    miss: null,
    daysTitle: [
      { nameEng: "Mon", nameRu: "ПН", index: 0 },
      { nameEng: "Tue", nameRu: "ВТ", index: 1 },
      { nameEng: "Wed", nameRu: "СР", index: 2 },
      { nameEng: "Thu", nameRu: "ЧТ", index: 3 },
      { nameEng: "Fri", nameRu: "ПТ", index: 4 },
      { nameEng: "Sat", nameRu: "СБ", index: 5 },
      { nameEng: "Sun", nameRu: "ВС", index: 6 }
    ],
    bacziData
  }),
  methods: {
    getBasi() {
      const firstDayMouth = this.findDayFirstDayInMounth();
      const getCorrectionNumber = num =>
        num > 60 ? num - 60 : num < 0 ? 60 + num : num;
      const getBacziInRange = (first, second) =>
        this.bacziData.filter(item => item.id >= first && item.id <= second);

      const getBacziArr = (firstDay, countOfDays) => {
        if (60 - countOfDays > firstDay) {
          return getBacziInRange(firstDay, firstDay + countOfDays);
        } else {
          const secondMax = getCorrectionNumber(
            firstDayMouth + this.dayInMounth
          );
          const firstArr = getBacziInRange(firstDay, 60);
          const lastArr = getBacziInRange(0, secondMax);
          return [...firstArr, ...lastArr];
        }
      };
      return getBacziArr(firstDayMouth, this.dayInMounth);
    },
    findDayFirstDayInMounth() {
      const dayCalibration = 17;
      const oneDayMsec = 24 * 3600;
      const oneD = moment("1970/01/01").unix();
      const TwoD = moment(`${this.date.year}/${this.date.mounth}/01`).unix();
      let day = (Number(TwoD) - Number(oneD)) / Number(oneDayMsec);
      let operand;
      let days;
      if (day < 0) {
        operand = "-";
        day = day * -1;
      } else {
        operand = "+";
      }
      let step = day / 60;

      for (let i = 0; i < Math.floor(step); i++) {
        day = day - 60;
      }
      if (operand == "-") {
        days = dayCalibration - day;
        if (days < 0) {
          days = 60 + days;
        }
      } else if (operand == "+") {
        days = dayCalibration + day;
        if (days > 59) {
          days = days - 60;
        }
      }
      return days;
    },
    getIndexByDaysTitle(dayTitle) {
      const find = this.daysTitle.filter(item =>
        item.nameEng === dayTitle ? true : false
      );
      return !this.isEmptyObject(find) && find[0].index;
    },
    update() {
      if (!this.isEmptyObject(this.date)) {
        const dateNew = new Date(
          `${this.date.year}-${this.date.mounth}-01`
        ).toString();
        const reg = /(\w+)\s/gi;
        const begin = dateNew.match(reg)[0].trim();
        this.miss = this.getIndexByDaysTitle(begin);
        this.getBasi();
        // this.findDayFirstDayInMounth();
      }
    }
  },
  computed: {
    dayInMounth() {
      if (!this.isEmptyObject(this.date)) {
        return moment(
          `${this.date.year}-${this.date.mounth}`,
          "YYYY-MM"
        ).daysInMonth();
      } else {
        return null;
      }
    },
    date: {
      get() {
        return this.$store.getters.date;
      },
      set(val) {
        this.commit("date", val);
      }
    }
  },
  mounted() {
    this.update();
  }
};
</script>

<style lang="sass">
@import ../assets/vars
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
    .body
      grid-area: bodys
      width: 100%
      display: grid
      grid-template-columns: repeat(7, 1fr )
      .item
        height: 100%
        position: relative
        height: 250px
        &:nth-child(7n)
          background-color: rgba($accent,.3)
        &:nth-child(6),&:nth-child(13),&:nth-child(20),&:nth-child(27),&:nth-child(34)
          background-color: rgba($accent,.3)
        &:hover
          background-color: rgba($accent,.1)
        &.none
          background-color: rgba($item_none,.3)
</style>