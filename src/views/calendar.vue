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
        <dates @updateChanges="update()" />
      </div>
    </div>

    <div class="wrapper">
      <aside></aside>
      <header>
        <span v-for="day in Array.from(daysTitle)" :key="day.index">{{
          day.nameRu
        }}</span>
      </header>
      <div class="body">
        <div class="item none" v-for="i in miss" :key="i"></div>
        <div class="item"><span class="day">1</span></div>
        <div class="item"><span class="day">2</span></div>
        <div class="item"><span class="day">3</span></div>
        <div class="item"><span class="day">4</span></div>
        <div class="item"><span class="day">5</span></div>
        <div class="item"><span class="day">6</span></div>
        <div class="item"><span class="day">7</span></div>
        <div class="item"><span class="day">8</span></div>
        <div class="item"><span class="day">9</span></div>
        <div class="item"><span class="day">10</span></div>
        <div class="item"><span class="day">11</span></div>
        <div class="item"><span class="day">12</span></div>
        <div class="item"><span class="day">13</span></div>
        <div class="item"><span class="day">14</span></div>
        <div class="item"><span class="day">15</span></div>
        <div class="item"><span class="day">16</span></div>
        <div class="item"><span class="day">17</span></div>
        <div class="item"><span class="day">18</span></div>
        <div class="item"><span class="day">19</span></div>
        <div class="item"><span class="day">20</span></div>
        <div class="item"><span class="day">21</span></div>
        <div class="item"><span class="day">22</span></div>
        <div class="item"><span class="day">23</span></div>
        <div class="item"><span class="day">24</span></div>
        <div class="item"><span class="day">25</span></div>
        <div class="item"><span class="day">26</span></div>
        <div class="item"><span class="day">27</span></div>
        <div class="item"><span class="day">28</span></div>
        <div class="item"><span class="day">29</span></div>
        <div class="item"><span class="day">30</span></div>
        <div class="item"><span class="day">31</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import dates from "../components/dates";

export default {
  name: "calendar",
  components: { dates },
  data: () => ({
    miss: null,
    daysInMounths: null,
    daysTitle: [
      { nameEng: "Mon", nameRu: "ПН", index: 0 },
      { nameEng: "Tue", nameRu: "ВТ", index: 1 },
      { nameEng: "Wed", nameRu: "СР", index: 2 },
      { nameEng: "Thu", nameRu: "ЧТ", index: 3 },
      { nameEng: "Fri", nameRu: "ПТ", index: 4 },
      { nameEng: "Sat", nameRu: "СБ", index: 5 },
      { nameEng: "Sun", nameRu: "ВС", index: 6 }
    ]
  }),
  methods: {
    getIndexByDaysTitle(dayTitle) {
      const find = this.daysTitle.filter(item =>
        item.nameEng === dayTitle ? true : false
      );
      return !this.isEmptyObject(find) && find[0].index;
    },
    update() {
      const dateNew = new Date(
        `${this.date.year}-${this.date.mounth}-01`
      ).toString();
      const reg = /(\w+)\s/gi;
      const begin = dateNew.match(reg)[0].trim();
      this.miss = this.getIndexByDaysTitle(begin);
      // console.log(begin, this.date);
    }
  },
  computed: {
    dayInMounth(date) {
      return moment(`${date.year}-${date.mounth}`, "YYYY-MM").daysInMonth();
    },
    date: {
      get() {
        return this.$store.getters.date;
      },
      set(val) {
        this.commit("date", val);
      }
    }
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
        .day
          position: absolute
          margin: 30px
</style>