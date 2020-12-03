<template>
  <div class="notfound_container">
    <div class="back_home_btn"
         @click="goHome">返回首页>></div>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  data() {
    return {}
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    },
  },
}
</script>

<style lang="scss" scoped>
.notfound_container {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../assets/img/notfound_bg_icon.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.back_home_btn {
  position: absolute;
  height: 35px;
  width: 140px;
  bottom: 40px;
  right: 10px;
  font-size: 25px;
  color: $auto_primary_color;
  cursor: pointer;
}
</style>>
