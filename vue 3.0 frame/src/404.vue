<template>
  <div class="notfound_container">
    <div class="notfound_content">
      <div class="back_home_btn" @click="goHome">返回首页>></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'404',
  data(){
    return{}
  },
  methods:{
    goHome(){
      this.$router.push('/home');
    }
  }
};
</script>

<style lang="scss" scoped>
.notfound_container {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.notfound_content {
  position: absolute;
  height: 400px;
  width: 650px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("./assets/img/notfound_bg_icon.jpg");
}
.back_home_btn {
  position: absolute;
  height: 35px;
  width: 140px;
  bottom: -40px;
  right: 10px;
  font-size: 25px;
  color: $auto_primary_color;
  cursor: pointer;
}
</style>>
