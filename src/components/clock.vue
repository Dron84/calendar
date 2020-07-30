/* eslint-disable prettier/prettier */
<template>
  <div class="clock">
    <canvas ref="clock" class="canvas"></canvas>
    <div class="pies">
      <div class="pie c1">asdasd</div>
      <div class="pie c1-3">asdasd</div>
      <div class="pie c3-5">asdasd</div>
      <div class="pie c5-7">asdasdasd</div>
      <div class="pie c7-9">asdasd</div>
      <div class="pie c9-11"></div>
      <div class="pie c11-13"></div>
      <div class="pie c13-15"></div>
      <div class="pie c15-17"></div>
      <div class="pie c17-19"></div>
      <div class="pie c19-21"></div>
      <div class="pie c21-23"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "clock",
  data: () => ({}),
  components: {},
  methods: {
    draw() {
      const diametr = 250;
      const canvas = this.$refs.clock;
      canvas.width = diametr * 2 + 10;
      canvas.height = diametr * 2 + 10;
      const ctx = canvas.getContext("2d");
      const colors = ["transparent"];
      const angles = [
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655,
        Math.PI * 0.16655
      ];
      const offset = 0;
      let beginAngle = -16.5;
      let endAngle = -16.5;
      let offsetX, offsetY, medianAngle;

      for (let i = 0; i < angles.length; i = i + 1) {
        beginAngle = endAngle;
        endAngle = endAngle + angles[i];
        medianAngle = (endAngle + beginAngle) / 2;
        offsetX = Math.cos(medianAngle) * offset;
        offsetY = Math.sin(medianAngle) * offset;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(diametr + offsetX, diametr + offsetY);
        ctx.arc(
          diametr + offsetX + 5,
          diametr + offsetY + 5,
          diametr,
          beginAngle,
          endAngle
        );
        ctx.lineTo(diametr + offsetX, diametr + offsetY);
        ctx.stroke();
        ctx.fill();
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    // this.draw();
  }
};
</script>
<style lang='sass'>
@import '../assets/vars.sass'

.clock
  position: relative
  .canvas
    position: absolute
    top: 0
    left: 0
  .pies
    position: absolute
    top: 250px
    left: 176px
    z-index: 10000
    .c1
      transform: rotate(180deg)
    .c1-3
      transform: rotate(210deg)
    .c3-5
      transform: rotate(240deg)
    .c5-7
      transform: rotate(270deg)
    .c7-9
      transform: rotate(300deg)
    .c9-11
      transform: rotate(330deg)
    .c11-13
      transform: rotate(360deg)
    .c13-15
      transform: rotate(390deg)
    .c15-17
      transform: rotate(420deg)
    .c17-19
      transform: rotate(450deg)
    .c19-21
      transform: rotate(480deg)
    .c21-23
      transform: rotate(510deg)
    .pie
      width: 0
      height: 0
      border-left: 75px solid transparent
      border-right: 75px solid transparent
      border-bottom: 250px solid transparent
      border-radius: 18%
      transform-origin: top
      position: absolute
      &:hover
        border-bottom: 250px solid $accent
        z-index: 9999
</style>