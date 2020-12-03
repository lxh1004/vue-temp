<template>
  <div class="login-container">
    <div class="center-group">
      <el-form
        :model="form"
        status-icon
        ref="ruleForm"
        :rules="rules"
        label-position="left"
        label-width="60px"
        class="login-form-group"
        @submit.native.prevent="submitForm('ruleForm')"
      >
        <el-form-item label-width="0">
          <div class="login-title">
            <img src="@/assets/img/logo.png" alt />
          </div>
        </el-form-item>
        <el-form-item prop="account" label-width="0">
          <el-input v-model="form.account" ref="el" placeholder="请输入账号">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" style="min-height: 60px" label-width="0">
          <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"
            show-password
            placeholder="请输入密码"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            :loading="showLoading"
            native-type="submit"
            class="login-button"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {
      disable: false,
      showLoading: false,
      form: {
        account: '',
        password: '',
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.$refs.el.focus()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    goHome() {
      this.$router.push('/home')
    },
    login() {
      this.showLoading = true
      setTimeout(() => {
        this.showLoading = false
        this.goHome()
      }, 1000)
    },
    forgetPassword() {
      this.$message('请联系管理员！')
    },
  },
}
</script>

<style lang="scss">
.login-container {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login_bg_pic.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}
.center-group {
  position: absolute;
  top: 30vw;
  bottom: 0;
  right: 16%;
  width: 28%;
  height: 50%;
  min-width: 28vw;
  min-height: 50vw;
  margin: auto;
  background: url('../../assets/img/login_form_group_bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  /deep/ .el-input--prefix .el-input__inner {
    background: #040e32;
    color: #fff;
  }
}
.login-form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 28vw;
  height: 20vw;
  margin-top: 7vw;
  align-items: center;
  /deep/ .el-form-item__error {
    left: 15%;
  }
}

.el-form-item {
  position: relative;
  width: 100%;
}

.login-title {
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
}
.login-form-group .el-input {
  width: 70%;
  margin-left: 15%;
  height: 40%;
}
.login-button {
  background: $auto_error_color;
  border: none;
  width: 70%;
  margin-left: 15%;
  font-size: 16px;
  color: #fff;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    background: $auto_error_color;
  }
}
</style>