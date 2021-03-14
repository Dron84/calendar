<template>
  <div class="hourCaptions">
    <div class="glif">
      <div class="hour">
        <Ieroglifs :block="hour" />
      </div>
      <div class="day">
        <Ieroglifs :block="day" />
      </div>
      <div class="mounth">
        <Ieroglifs :block="mounth" />
      </div>
      <div class="year">
        <Ieroglifs :block="year" />
      </div>
    </div>
    <div class="caption">
      <div v-for="(item, index) in hourCaptions" :key="index">
        <p :class="[item.type === 'bad' ? 'red' : 'accent']">
          {{ item.title }}
        </p>
        <p>{{ item.caption }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Ieroglifs from "../components/ieroglifs";
import punishments from "../JS/methods/punishments";
import { emptiness, roadEmptiness } from "../JS/methods/emptiness";
import { collisions } from "../JS/methods/collisions";
import { marginBranches, harmBranches } from "../JS/methods/marginBranches";
import { nobleMan } from "../JS/methods/nobleMan";
import { notUseHour } from "../JS/methods/notUseHour";
// import { CalculateHours } from "../JS/methods/calculateHours";

export default {
  name: "hour_captions",
  components: { Ieroglifs },
  data: () => ({
    hourCaptions: []
  }),
  props: {
    day: { type: Object },
    hour: { type: Object },
    mounth: { type: Object },
    year: { type: Object }
  },
  methods: {
    getData() {
      const caption = (title, caption, type = "bad") => ({
        title,
        caption,
        type
      });
      this.hourCaptions = [];
      // (firstGround, secondGround, caption)
      const collision = collisions(this.day.ground, this.hour.ground, "true");
      collision &&
        this.hourCaptions.push(
          caption(
            `Разрушитель дня. `,
            `Энергии часа конфликтуют с энергиями дня. Не выбирайте этот час.`
          )
        );

      //(daySky, hourSky)
      notUseHour(this.day.sky, this.hour.sky) &&
        this.hourCaptions.push(
          caption(
            `Неиспользуемый час. `,
            `Энергии часа конфликтуют с энергиями дня. Не выбирайте этот час. `
          )
        );
      // (firstSky, firstGround, secondGround)
      emptiness(this.day.sky, this.day.ground, this.hour.ground) &&
        this.hourCaptions.push(
          caption(
            `Пустой час. `,
            `Энергии в этом часе отсутствуют. Желаемого результата не будет. `
          )
        );

      punishments.notLove(this.hour.ground, this.day.ground) &&
        this.hourCaptions.push(
          caption(
            `Наказание нелюбви. `,
            `Не стоит использовать этот час для встреч, свиданий.`
          )
        );

      punishments.self(this.hour.ground, this.day.ground) &&
        this.hourCaptions.push(
          caption(
            `Самонаказание. `,
            `Человек сам себя наказывает, необдуманные поступки.`
          )
        );
      punishments.fire(this.hour.ground, this.day.ground, this.mounth.ground) &&
        this.hourCaptions.push(
          caption(
            `Огненное наказание. `,
            `Излишняя активность, приносящая ошибки. Осторожно за рулем!`
          )
        );

      punishments.ground(
        this.hour.ground,
        this.day.ground,
        this.mounth.ground
      ) &&
        this.hourCaptions.push(
          caption(
            `Земное наказание. `,
            `Депрессивность, самокопание. Осторожно за рулём!`
          )
        );

      marginBranches(this.hour.ground, this.day.ground) &&
        this.hourCaptions.push(
          caption(
            `Слияние ветвей. `,
            `Энергия часа способствует налаживанию отношений, переговорам.  `,
            "good"
          )
        );
      harmBranches(this.hour.ground, this.day.ground) &&
        this.hourCaptions.push(
          caption(`Вред ветвей. `, `Сложности, препятствия, возможен обман.`)
        );
      roadEmptiness(this.hour.sky) &&
        this.hourCaptions.push(
          caption(
            `Пустота дорог. `,
            `Неблагоприятный час для выхода из дома, особенно для путешествий. `
          )
        );
      nobleMan(this.day.sky, this.hour.ground) &&
        this.hourCaptions.push(
          caption(
            `Благородный Помощник. `,
            `Поддержка небес, дополнительная защита и помощь.`,
            "good"
          )
        );
    }
  },
  watch: {
    hour() {
      this.getData();
    }
  }
};
</script>
<style lang="sass" scoped>
@import '../assets/vars'
.hourCaptions
    display: flex
.glif
    display: inline-grid
    border: 1px solid $accent
    grid-template-columns: repeat(4, auto)
    grid-template-areas: 'hour day mounth year'
    padding: 15px 5px
    .hour,.day,.mounth,.year
      width: 70px
.caption
    display: grid
</style>
