<template>
  <div class="DayIndicator">
    <div class="good">
      <Icon
        class="hoverTitle"
        :name="item"
        v-for="(item, index) in good"
        :key="index"
        :data-title="getTitle(item)"
      />
    </div>
    <div class="bad">
      <Icon
        class="hoverTitle"
        :name="item"
        v-for="(item, index) in bad"
        :key="index"
        :data-title="getTitle(item)"
      />
    </div>
  </div>
</template>
<script>
import calculation from "./plugin/dayIndicator";
import Icon from "./Icon";
export default {
  name: "DayIndicator",
  components: { Icon },
  data: () => ({
    indicator: null,
    good: null,
    bad: null
  }),
  props: {
    caption: { type: Array }
  },
  methods: {
    getTitle(title) {
      switch (title) {
        case "pokupka_doma":
          return "Покупка дома";
        case "investirovanie":
          return "Инвестирование";
        case "poluchenie_nagrad":
          return "Получение наград";
        case "vse_dela":
          return "Все дела";
        case "otdich":
          return "Отдых";
        case "razrushenie_postroek":
          return "Разрушение построек";
        case "razdel_imuchestva":
          return "Разделение имущества";
        case "sudebni_process":
          return "Судебный процесс";
        case "pereezd":
          return "Переезд";
        case "duhovnie_praktiki":
          return "Духовние практики";
        case "dalnie_putushestviya":
          return "Деланее путешествие";
        case "otkritie_busnesa":
          return "Открытие бизнеса";
        case "remont":
          return "Ремонт";
        case "planirovanie":
          return "Планирование";
        case "svidaniya":
          return "Свидания";
        case "vstuplenie_vdoljnost":
          return "Вступление в должность";
        case "peregovori":
          return "Переговоры";
        case "podpisanie_dogovora":
          return "Подписание договора";
        case "nachalo_obucheniya":
          return "Начало обучения";
        case "nachalo_stroitelstva":
          return "Начало строительства";
        case "nachalo_lecheniya":
          return "Начало лечения";
        case "nachalo_novogo_proekta":
          return "Начало нового проекта";
        case "obrachenie_za_medpomochiu":
          return "Обращение за медецинской помощью";
        case "zakladka_fundamenta":
          return "Закладка фундамента";
        case "svadiba":
          return "Свадьба";
        case "posechenie_kladbicha":
          return "Посещения кладбища";
        case "zemelnie_raboti":
          return "Земельные работы";
        case "uborka":
          return "Уборка";
        case "rastovanie":
          return "Растование";
        case "nachalo_dieti":
          return "Начало диеты";
      }
    },
    getIndicator() {
      // console.log("this.caption[0]", this.caption[0]);
      const findReg = /(\d+)\.\s/g;
      this.indicator = String(this.caption[0])
        .match(findReg)
        .map(item => Number(item.replace(".", "").replace(/\s/g, "")));
      console.log("this.indicator", this.indicator);
      const calc = calculation(this.indicator);
      this.good = calc.good;
      this.bad = calc.bad;
      // console.log("calc.good", calc.good, "calc.bad", calc.bad);
    }
  },
  created() {
    this.getIndicator();
  }
};
</script>
<style lang="sass">
@import '../assets/vars'
.good,.bad
  min-width: 330px
  display: grid
  padding: 0 20px
  grid-template-columns: repeat(6,1fr)
.good
  .icon
    color: $accent
.bad
  .icon
    color: $selectDay
</style>
