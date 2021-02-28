<template>
  <div class="dates">
    <span class="btn onHover" @click="minus">&lt;</span>
    <select class="mounth onHover" type="text" v-model="values.mounth">
      <option :value="item.id" v-for="item in mounthArray" :key="item.id">{{
        item.name
      }}</option>
    </select>
    <select class="year onHover" type="text" v-model="values.year">
      <option :value="year" v-for="year in yearsArray" :key="year">{{
        year
      }}</option>
    </select>
    <span class="btn onHover" @click="plus">&gt;</span>
  </div>
</template>
<script>
export default {
  name: "dates",
  data: () => ({
    mounth: 1,
    year: 0
  }),
  props: {
    value: { type: Object }
  },
  methods: {
    minus() {
      const minusYear = () => {
        this.values.mounth = 12;
        this.values.year--;
      };
      this.values.mounth > 1 ? this.values.mounth-- : minusYear();
    },
    plus() {
      const plusYear = () => {
        this.values.mounth = 1;
        this.values.year++;
      };
      this.values.mounth == 12 ? plusYear() : this.values.mounth++;
    }
  },
  computed: {
    values: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", { mounth: val.mounth, year: val.year });
      }
    },
    yearsArray() {
      return this.$store.getters.yearsArray;
    },
    mounthArray() {
      return this.$store.getters.mounthArray;
    }
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
