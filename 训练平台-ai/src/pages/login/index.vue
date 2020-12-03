<template>
  <div class="login-container">
    <div class="center-group">
      <el-form
        :model="loginData"
        status-icon
        ref="ruleForm"
        label-position="left"
        label-width="60px"
        class="login-form-group"
        @submit.native.prevent="submitForm('ruleForm')"
      >
        <el-form-item label-width="0">
          <div class="login-title">
            <span style="color:#e50012">SANY</span>
            三一可视化AI训练平台
          </div>
        </el-form-item>
        <el-form-item prop="username" label-width="0">
          <el-input v-model="loginData.username" placeholder="请输入账号">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" style="min-height:60px" label-width="0">
          <el-input
            type="password"
            v-model="loginData.password"
            auto-complete="off"
            show-password
            placeholder="请输入密码"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
          <div class="forget-password" @click="forgetPassword">忘记密码？</div>
        </el-form-item>

        <el-form-item label-width="0">
          <el-button :loading="showLoading" native-type="submit" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  computed: {},
  data() {
    return {
      showLoading: false,
      loginData: {
        password: "",
        username: ""
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },

    goHome() {
      this.$router.push("/home");
    },
    login() {
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;
        this.goHome();
      }, 1000);
    },
    forgetPassword(){
      this.$message('请联系管理员！');
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login_bg.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}
.center-group {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16%;
  width: 28%;
  height: 50%;
  min-width: 328px;
  min-height: 382px;
  margin: auto;
  background: url("../../assets/img/login_form_group_bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.login-form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 60%;
  margin-top: 30%;
  align-items: center;
}
.el-form-item {
  position: relative;
  width: 100%;
}
.forget-password {
  cursor: pointer;
  position: absolute;
  color: #eee;
  right: 15%;
}
.login-title {
  font-size: 24px;
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  color: #fff;
}
.login-form-group .el-input {
  width: 70%;
  margin-left: 15%;
}
.login-button {
  background: $auto_danger_color;
  border: none;
  width: 70%;
  margin-left: 15%;
  font-size: 16px;
  color: #fff;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    background: $auto_danger_color;
  }
}

.login-form-group .el-input__inner {
  background-color: #03143a;
  border-color: #4a90e2;
  &::placeholder {
    color: #757f94;
  }
  &:focus {
    color: #ffffff;
  }

  &::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: #757f94;
  }

  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    color: #757f94;
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    color: #757f94;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    color: #757f94;
  }
}
</style>