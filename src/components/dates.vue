<template>
  <div class="dates">
    <span class="btn onHover" @click="minus">&lt;</span>
    <select class="mounth onHover" type="text" v-model="mounth" @change="emit">
      <option :value="item.id" v-for="item in mounthArray" :key="item.id">{{
        item.name
      }}</option>
    </select>
    <select class="year onHover" type="text" v-model="year" @change="emit">
      <option :value="year" v-for="year in yearsArray" :key="year">{{
        year
      }}</option>
    </select>
    <span class="btn onHover" @click="plus">&gt;</span>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "dates",
  data: () => ({
    mounth: 1,
    year: 0
  }),
  methods: {
    minus() {
      const minusYear = () => {
        this.mounth = 12;
        this.year--;
      };
      this.mounth > 1 ? this.mounth-- : minusYear();
      this.emit();
    },
    plus() {
      const plusYear = () => {
        this.mounth = 1;
        this.year++;
      };
      this.mounth == 12 ? plusYear() : this.mounth++;
      this.emit();
    },
    emit() {
      this.$emit("updateChanges");
      this.$store.commit("date", { mounth: this.mounth, year: this.year });
    }
  },
  computed: {
    yearsArray() {
      const arr = [];
      for (let i = 2030; i >= 1900; i--) {
        arr.push(i);
      }
      return arr;
    },
    mounthArray() {
      return [
        { id: 1, name: "Январь" },
        { id: 2, name: "Февраль" },
        { id: 3, name: "Март" },
        { id: 4, name: "Апрель" },
        { id: 5, name: "Май" },
        { id: 6, name: "Июнь" },
        { id: 7, name: "Июль" },
        { id: 8, name: "Август" },
        { id: 9, name: "Сентябрь" },
        { id: 10, name: "Октябрь" },
        { id: 11, name: "Ноябрь" },
        { id: 12, name: "Декабрь" }
      ];
    }
  },
  created() {
    this.mounth = Number(moment().format("MM"));
    this.year = moment().format("YYYY");
    this.emit();
  }
};
</script>
<style scoped lang="sass">
@import ../assets/vars
.btn
  color: $accent
  font-size: 2em
input,select,button
  margin: 0 5px
  border: 1px solid $accent
  border-radius: 8px
  height: 40px
  outline: none
  color: $accent
  font-size: 1em
  padding: 0 10px
.mounth
  width: 140px
.year
  width: 90px
</style>