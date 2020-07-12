<template>
  <div class="calendar">
    <div class="header">
      <div class="logo">
        <img src="https://nadezhda-kalinina.com/img/icon/logo.svg" />
      </div>
      <div class="info">
        <h1>Китайский календарь. Выбор дат. Энергии часа, дня, месяца и года.</h1>
        <dates v-model="date" />
      </div>
    </div>

    <div class="wrapper">
      <aside>
        <div class="year white_bg sideMargin">
          <ieroglifs :block="{...getBacziYear(15)}" :ieroglifOnly='true' />
        </div>
        <div class="mounthCaption">
          <div class="caption">{{mounthCaption()}}</div>
        </div>
      </aside>
      <header>
        <span v-for="day in Array.from(daysTitle)" :key="day.index">
          {{
          day.nameRu
          }}
        </span>
      </header>
      <div class="body">
        <div class="item none" v-for="i in weekDay" :key="`${i}_weekDay`"></div>
        <div class="item" v-for="i in generateCalendar()" :key="`${i.dayNum}_day`">
          <span class="time" v-if="i.glif.day.timeOn">{{i.glif.day.timeMounthBegin}}</span>
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
              <span :class="i.naIn.day.color">{{i.naIn.day.caption}}</span>
            </div>
            <div class="mounth">
              <span :class="i.naIn.mounth.color">{{i.naIn.mounth.caption}}</span>
            </div>
            <div class="year">
              <span :class="i.naIn.year.color">{{i.naIn.year.caption}}</span>
            </div>
          </div>
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

const mounth = Number(moment().format("MM"));
const year = Number(moment().format("YYYY"));

export default {
  name: "calendar",
  components: { dates, ieroglifs },
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
    bacziData,
    mounthBegin
  }),
  methods: {
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
    getBacziMount(i){
      const getMountCorrection = (yearDate,mounthDate,February=false, yearCorection = null) => {
        const year = yearCorection !== null ? yearDate - yearCorection : yearDate
        const beginMounth = Number(this.mounthBegin[year][mounthDate].begin_date.match(/(\d+)\.\d+/)[1])
        return i<beginMounth ? Number((February ? this.mounthBegin[year-1][12] : this.mounthBegin[year][mounthDate - 1]).mounth_correction) : Number(this.mounthBegin[year][mounthDate].mounth_correction)
      }
      
      const MounthBegin = this.date.mounth ===1 ? this.mounthBegin[this.date.year-1][12].begin_date : this.mounthBegin[this.date.year][this.date.mounth-1].begin_date
      return {...this.bacziData.filter(item=>Number(item.id)===(this.date.mounth === 1 ? getMountCorrection(this.date.year,12,false,1) : this.date.mounth === 2 ? getMountCorrection(this.date.year,this.date.mounth-1,true) : getMountCorrection(this.date.year,this.date.mounth - 1)))[0].data, MounthBegin}
    },
    getBacziDays(){
      const getCorrectionNumber = num =>
        num > 60 ? num - 60 : num < 0 ? 60 + num : num;
      const getBacziInRange = (first, second) =>
        this.bacziData.filter(item => item.id >= first && item.id <= second);
      const getBacziArr = (firstDay, countOfDays) => 60 - countOfDays > firstDay ? getBacziInRange(firstDay, firstDay + countOfDays) : [...getBacziInRange(firstDay, 60), ...getBacziInRange(0, getCorrectionNumber(this.findDayFirstDayInMounth() + this.dayInMounth))]
      return getBacziArr(this.findDayFirstDayInMounth(), this.dayInMounth).map(item=> item.data)
    },
    getBacziYear(i) {
      const yearBegin = this.mounthBegin[this.date.year][1].begin_date.match(/(\d+)\.(\d+)/)
      const correction = this.date.mounth === Number(yearBegin[2]) ? i < Number(yearBegin[1]) ? Number(this.mounthBegin[this.date.year-1].correction) : Number(this.mounthBegin[this.date.year].correction) : this.date.mounth < Number(yearBegin[2]) ? Number(this.mounthBegin[this.date.year-1].correction) : Number(this.mounthBegin[this.date.year].correction)
      return this.bacziData.filter(item=>Number(item.id)===correction)[0].data
    },
    mounthCaption(){
      return this.$store.getters.mounthArray.filter(item=>Number(item.id)===this.date.mounth)[0].name
    },
    naIn(stolp){
      if(stolp.sky ==='戊' && stolp.ground === '子' ||
      stolp.sky ==='己' && stolp.ground === '丑' ||
      stolp.sky ==='丙' && stolp.ground === '寅' ||
      stolp.sky ==='丁' && stolp.ground === '卯' ||
      stolp.sky ==='甲' && stolp.ground === '辰' ||
      stolp.sky ==='乙' && stolp.ground === '巳' ||
      stolp.sky ==='戊' && stolp.ground === '午' ||
      stolp.sky ==='己' && stolp.ground === '未' ||
      stolp.sky ==='丙' && stolp.ground === '申' ||
      stolp.sky ==='丁' && stolp.ground === '酉' ||
      stolp.sky ==='甲' && stolp.ground === '戌' ||
      stolp.sky ==='乙' && stolp.ground === '亥' ){
        return {caption: '火', color: 'red'}
      }else if(stolp.sky ==='庚' && stolp.ground === '子' ||
      stolp.sky ==='辛' && stolp.ground === '丑' ||
      stolp.sky ==='庚' && stolp.ground === '子' ||
      stolp.sky ==='辛' && stolp.ground === '丑' ||
      stolp.sky ==='丙' && stolp.ground === '辰' ||
      stolp.sky ==='丁' && stolp.ground === '巳' ||
      stolp.sky ==='庚' && stolp.ground === '午' ||
      stolp.sky ==='辛' && stolp.ground === '未' ||
      stolp.sky ==='戊' && stolp.ground === '申' ||
      stolp.sky ==='己' && stolp.ground === '酉' ||
      stolp.sky ==='丙' && stolp.ground === '戌' ||
      stolp.sky ==='丁' && stolp.ground === '亥' ){
        return {caption: '土', color: 'brown'}
      }else if(stolp.sky ==='丙' && stolp.ground === '子' ||
      stolp.sky ==='丁' && stolp.ground === '丑' ||
      stolp.sky ==='壬' && stolp.ground === '寅' ||
      stolp.sky ==='癸' && stolp.ground === '卯' ||
      stolp.sky ==='庚' && stolp.ground === '辰' ||
      stolp.sky ==='辛' && stolp.ground === '巳' ||
      stolp.sky ==='甲' && stolp.ground === '午' ||
      stolp.sky ==='乙' && stolp.ground === '未' ||
      stolp.sky ==='壬' && stolp.ground === '申' ||
      stolp.sky ==='癸' && stolp.ground === '酉' ||
      stolp.sky ==='庚' && stolp.ground === '戌' ||
      stolp.sky ==='辛' && stolp.ground === '亥' ){
        return {caption: '金', color: 'gray'}
      }else if(stolp.sky ==='丙' && stolp.ground === '子' ||
      stolp.sky ==='丁' && stolp.ground === '丑' ||
      stolp.sky ==='甲' && stolp.ground === '寅' ||
      stolp.sky ==='乙' && stolp.ground === '卯' ||
      stolp.sky ==='壬' && stolp.ground === '辰' ||
      stolp.sky ==='癸' && stolp.ground === '巳' ||
      stolp.sky ==='丙' && stolp.ground === '午' ||
      stolp.sky ==='丁' && stolp.ground === '未' ||
      stolp.sky ==='甲' && stolp.ground === '申' ||
      stolp.sky ==='乙' && stolp.ground === '酉' ||
      stolp.sky ==='壬' && stolp.ground === '戌' ||
      stolp.sky ==='癸' && stolp.ground === '亥' ){
        return {caption: '水', color: 'blue'}
      }else if(stolp.sky ==='壬' && stolp.ground === '子' ||
      stolp.sky ==='癸' && stolp.ground === '丑' ||
      stolp.sky ==='庚' && stolp.ground === '寅' ||
      stolp.sky ==='辛' && stolp.ground === '卯' ||
      stolp.sky ==='戊' && stolp.ground === '辰' ||
      stolp.sky ==='己' && stolp.ground === '巳' ||
      stolp.sky ==='壬' && stolp.ground === '午' ||
      stolp.sky ==='癸' && stolp.ground === '未' ||
      stolp.sky ==='庚' && stolp.ground === '申' ||
      stolp.sky ==='辛' && stolp.ground === '酉' ||
      stolp.sky ==='戊' && stolp.ground === '戌' ||
      stolp.sky ==='己' && stolp.ground === '亥' ){
        return {caption: '木', color: 'green'}
      }
    },
    generateCalendar(){
      const calendar = []
      for(let i=1; i < this.dayInMounth; i++){
        const mounth = {...this.getBacziMount(i)}
        const MounthBegin = mounth.MounthBegin
        const timeMounthBegin = MounthBegin.match(/\d+:\d+/)[0]
        const dateMounthBegin = Number(MounthBegin.match(/(\d+)\.\d+/)[1])
        const timeOn = i === dateMounthBegin
        const day = {...this.getBacziDays()[i],timeOn,timeMounthBegin}
        const year = {...this.getBacziYear(i)}
        const naIn_day = this.naIn(day)
        const naIn_mounth = this.naIn(mounth)
        const naIn_year = this.naIn(year)
        calendar.push({
          dayNum: i,
          glif: {
            day,
            mounth,
            year
          },
          naIn: {
            day: {...naIn_day},
            mounth: {...naIn_mounth},
            year: {...naIn_year}
          }
        })
      }
      return calendar
    }

  },
  computed: {
    dayInMounth() {
      return !this.isEmptyObject(this.date) ? moment(`${this.date.year}/${this.date.mounth}`,"YYYY/MM").daysInMonth() : null
    },
    weekDay() {
      return this.date
        ? moment(`${this.date.year}/${this.date.mounth}/01`).isoWeekday() - 1
        : null;
    },
    formation(){return this.$store.getters.formation},
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
        height: auto
        display: grid
        grid-template-areas: 'glif' 'naIn'
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
        .naIn
          display: grid
          grid-area: naIn
          grid-template-columns: repeat(auto-fit, 1fr)
          grid-template-areas: 'day mounth year'
          border-top: 1px dashed $accent
          .day
            grid-area: day
            text-align: center
            font-size: 2em
          .mounth
            grid-area: mounth
            text-align: center
            font-size: 2em
          .year
            grid-area: year
            text-align: center
            font-size: 2em
        &:nth-child(7n)
          background-color: rgba($accent,.3)
        &:nth-child(6),&:nth-child(13),&:nth-child(20),&:nth-child(27),&:nth-child(34)
          background-color: rgba($accent,.3)
        &:hover
          background-color: rgba($accent,.1)
        &.none
          background-color: rgba($item_none,.3)
          border: 1px solid transparent
</style>