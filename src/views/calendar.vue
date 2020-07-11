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
        <div class="item none" v-for="i in weekDay" :key="i"></div>
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
import mounthBegin from "../JS/mounthbegin";

export default {
  name: "calendar",
  components: { dates, ieroglifs },
  data: () => ({
    miss: null,
    daysTitle: [
      { nameEng: "Mon", nameRu: "ПН", index: 1 },
      { nameEng: "Tue", nameRu: "ВТ", index: 2 },
      { nameEng: "Wed", nameRu: "СР", index: 3 },
      { nameEng: "Thu", nameRu: "ЧТ", index: 4 },
      { nameEng: "Fri", nameRu: "ПТ", index: 5 },
      { nameEng: "Sat", nameRu: "СБ", index: 6 },
      { nameEng: "Sun", nameRu: "ВС", index: 7 }
    ],
    bacziData,
    mounthBegin
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
    update() {
      if (!this.isEmptyObject(this.date)) {
        this.getBasi();
        this.findMounthAndYear();
        // this.findDayFirstDayInMounth();
      }
    },
    findMounthAndYear(timestamp, dateTime) {
      console.log(timestamp, dateTime);
      const year = this.date.year;
      const yearBegin = this.mounthBegin[this.date.year][this.date.mounth - 1];
      console.log("yearBegin", yearBegin, year);
      // $yearCorrection = $yearBegin['correction'];
      // $yearBegin = $yearBegin['1'];
      // $yearBegin = $yearBegin['begin_date'];
      // $yearBegin = explode(' ', $yearBegin);
      // $yearBegin = $yearBegin[0] . '.' . $year . ' ' . $yearBegin[1];
      // $yearBegin = strtotime($yearBegin);
      // //	 echo '$yearBegin='.$yearBegin;
      // $yearEnd = mounthData();
      // $yearEnd = $yearEnd[(int)($year + 1)];
      // $yearEnd = $yearEnd['1'];
      // $yearEnd = $yearEnd['begin_date'];
      // $yearEnd = explode(' ', $yearEnd);
      // $yearEnd = $yearEnd[0] . '.' . (int)($year + 1) . ' ' . $yearEnd[1];
      // $yearEnd = strtotime($yearEnd);
      // $yearEnd = (int)($yearEnd - 1);
      // //	 echo '$yearEnd='.$yearEnd;
      // if ($timestamp < $yearBegin) {
      // $lastYear =	mounthData();
      // $ly = (int)($year - 1);
      // $lastYear = $lastYear[$ly];
      // // echo '$ly='.$ly;
      // $january = $lastYear['11'];
      // $january = $january['begin_date'];
      // // echo '$january='.$january;
      // $january = explode(' ', $january);
      // // showArray($january);
      // $january = '' . $january[0] . '.' . $ly . ' ' . $january[1];
      // // echo '$january[0].$ly.$january[1];='.$january;
      // $january = strtotime($january);
      // $february = $lastYear['12'];
      // $february = $february['begin_date'];
      // // echo '$february='.$february;
      // $february = explode(' ', $february);
      // //		 showArray($february);
      // $february = '' . $february[0] . '.' . $year . ' ' . $february[1];
      // // echo ' $february[0].$ly.$february[1];='.$february;
      // $february = strtotime($february);
      // if ($timestamp <= $february) {
      // $mounthCorrection = $lastYear['11']['mounth_correction'];
      // $result[0] = correction($mounthCorrection);
      // $result[1] = correction($lastYear['correction']);
      // //			 showArray($result);
      // //			 echo '<br>yanuary';
      // } else if (($timestamp > $february) && ($timestamp <= $yearBegin)) {
      // $mounthCorrection = $lastYear['12']['mounth_correction'];
      // $result[0] = correction($mounthCorrection);
      // $result[1] = correction($lastYear['correction']);
      // //			 showArray($mounth);
      // // echo '<br>february';
      // }
      // $result['china_real_year'] = $ly;
      // } else if (($timestamp > $yearBegin) && ($timestamp < $yearEnd)) {
      // $mounth = mounthData();
      // $mounth = $mounth[$year];
      // //		 showArray($mounth);
      // $dateTime = explode(' ', $dateTime);
      // $date = explode('.', $dateTime[0]);
      // //		echo $date[1];
      // $afterMounth = $mounth[(int)($date[1])];
      // //		echo '<br>$afterMounth='.showArray($afterMounth);
      // $mounth = $mounth[(int)($date[1] - 1)];
      // //		 showArray($afterMounth);showArray($mounth);
      // $mounthCorrection = $mounth['mounth_correction'];
      // $mounth = $mounth['begin_date'];
      // //		showArray($mounth);
      // $mounth = explode(' ', $mounth);
      // $mounth = '' . $mounth[0] . '.' . $year . ' ' . $mounth[1];
      // //		 echo '<br>$mounth='.$mounth;
      // $mounth = strtotime($mounth);
      // //		 echo '<br>$mounth='.$mounth;
      // $afterMounthCorrection = $afterMounth['mounth_correction'];
      // $afterMounth = $afterMounth['begin_date'];
      // $afterMounth = explode(' ', $afterMounth);
      // $afterMounth = '' . $afterMounth[0] . '.' . $year . ' ' . $afterMounth[1];
      // // echo '<br>$afterMounth='.$afterMounth;
      // $afterMounth = strtotime($afterMounth);
      // // echo '<br>$afterMounth='.$afterMounth;
      // if (($timestamp > $mounth) && ($timestamp < $afterMounth)) {
      // $result[0] = correction($mounthCorrection);
      // $result[1] = correction($yearCorrection);
      // //			 print_r($result);
      // } else if ($timestamp > $afterMounth) {
      // $result[0] = correctionPlus($afterMounthCorrection - 2);
      // $result[1] = correction($yearCorrection);
      // //			 print_r($result);
      // }
      // else if ($timestamp <= $mounth) {
      // $result[0] = correction($mounthCorrection - 1);
      // $result[1] = correction($yearCorrection);
      // //					 print_r($result);
      // //			 echo '<br>mounth2';
      // }
      // $result['china_real_year'] = $year;
      // }
      // // showArray( $result);
      // return $result;
    }
  },
  computed: {
    dayInMounth() {
      if (!this.isEmptyObject(this.date)) {
        return moment(
          `${this.date.year}/${this.date.mounth}`,
          "YYYY/MM"
        ).daysInMonth();
      } else {
        return null;
      }
    },
    weekDay() {
      return this.date
        ? moment(`${this.date.year}/${this.date.mounth}/01`).isoWeekday() - 1
        : null;
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