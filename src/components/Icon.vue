<template>
  <div class="icon" :class="`icon-${name}`"></div>
</template>
<script>
export default {
  name: "icon",
  data() {
    return {
      svg: ""
    };
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
};
</script>
