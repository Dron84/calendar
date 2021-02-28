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
    <div class="dayCaptions">
      <div v-for="(item, index) in dayCaptions" :key="index">
        <p :class="[item.type === 'bad' ? 'red' : 'accent']">
          {{ item.title }}
        </p>
        <p>{{ item.caption }}</p>
      </div>
      <!-- {{dayCaptions}} -->
    </div>
    <!-- <clock /> -->
  </div>
</template>
<script>
// import clock from "./clock";

import { CalculateHours } from "../JS/methods/calculateHours";
import { notUseHour } from "../JS/methods/notUseHour";
import { collisions } from "../JS/methods/collisions";
import { emptiness, roadEmptiness } from "../JS/methods/emptiness";
import punishments from "../JS/methods/punishments";
import { marginBranches, harmBranches } from "../JS/methods/marginBranches";
import { nobleMan } from "../JS/methods/nobleMan";
import ieroglifs from "../components/ieroglifs";

export default {
  name: "day",
  data: () => ({
    CalculateHours,
    collisions,
    notUseHour,
    emptiness,

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
      const caption = (title, caption, type = "bad") => ({
        title,
        caption,
        type
      });
      const day = this.DayInfo[0].glif.day;
      const hour = CalculateHours(day)[index];
      const mounth = this.DayInfo[0].glif.mounth;

      // (firstGround, secondGround, caption)
      const collision = this.collisions(day.ground, hour.ground, "true");
      collision &&
        this.dayCaptions.push(
          caption(
            `Разрушитель дня. `,
            `Энергии часа конфликтуют с энергиями дня. Не выбирайте этот час.`
          )
        );

      //(daySky, hourSky)
      this.notUseHour(day.sky, hour.sky) &&
        this.dayCaptions.push(
          caption(
            `Неиспользуемый час. `,
            `Энергии часа конфликтуют с энергиями дня. Не выбирайте этот час. `
          )
        );
      // (firstSky, firstGround, secondGround)
      this.emptiness(day.sky, day.ground, hour.ground) &&
        this.dayCaptions.push(
          caption(
            `Пустой час. `,
            `Энергии в этом часе отсутствуют. Желаемого результата не будет. `
          )
        );

      punishments.notLove(hour.ground, day.ground) &&
        this.dayCaptions.push(
          caption(
            `Наказание нелюбви. `,
            `Не стоит использовать этот час для встреч, свиданий.`
          )
        );

      punishments.self(hour.ground, day.ground) &&
        this.dayCaptions.push(
          caption(
            `Самонаказание. `,
            `Человек сам себя наказывает, необдуманные поступки.`
          )
        );
      punishments.fire(hour.ground, day.ground, mounth.ground) &&
        this.dayCaptions.push(
          caption(
            `Огненное наказание. `,
            `Излишняя активность, приносящая ошибки. Осторожно за рулем!`
          )
        );

      punishments.ground(hour.ground, day.ground, mounth.ground) &&
        this.dayCaptions.push(
          caption(
            `Земное наказание. `,
            `Депрессивность, самокопание. Осторожно за рулём!`
          )
        );

      marginBranches(hour.ground, day.ground) &&
        this.dayCaptions.push(
          caption(
            `Слияние ветвей. `,
            `Энергия часа способствует налаживанию отношений, переговорам.  `,
            "good"
          )
        );
      harmBranches(hour.ground, day.ground) &&
        this.dayCaptions.push(
          caption(`Вред ветвей. `, `Сложности, препятствия, возможен обман.`)
        );
      roadEmptiness(hour.sky) &&
        this.dayCaptions.push(
          caption(
            `Пустота дорог. `,
            `Неблагоприятный час для выхода из дома, особенно для путешествий. `
          )
        );
      nobleMan(day.sky, hour.ground) &&
        this.dayCaptions.push(
          caption(
            `Благородный Помощник. `,
            `Поддержка небес, дополнительная защита и помощь.`,
            "good"
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
