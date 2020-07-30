<template>
  <div class="dayInfo">
    {{DayInfo}}
    <!-- <clock /> -->
  </div>
</template>
<script>
// import clock from "./clock";
export default {
  name: "day",
  data: () => ({}),
  props: {
    selectDay: null,
    calendar: { type: Array }
  },
  // components: { clock },
  methods: {},
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
.dayInfo
  padding: 30px
</style>