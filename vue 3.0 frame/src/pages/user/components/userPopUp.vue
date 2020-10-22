<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="36%"
      :before-close="syncCloss"
      @closed="cancelCreateTeam('newUserForm')"
      custom-class="user-mask"
    >
      <el-form
        ref="newUserForm"
        :model="formModel"
        label-width="120px"
        :rules="rules"
        @submit.native.prevent="createUserData('newUserForm')"
      >
        <el-form-item label="用户名：" prop="name">
          <el-input v-model.trim="formModel.name" :disabled="formModel.flag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="account">
          <el-input v-model.trim="formModel.account" :disabled="formModel.flag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phoneNum">
          <el-input v-model.trim="formModel.phoneNum" :disabled="formModel.flag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="域账号：" prop="account">
          <el-input v-model.trim="formModel.account" :disabled="formModel.flag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="phoneNum">
          <el-input v-model.trim="formModel.phoneNum" :disabled="formModel.flag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-checkbox-group v-model="formModel.roleId">
            <el-checkbox :label="1" name="roleId">管理员</el-checkbox>
            <el-checkbox :label="2" name="roleId">项目负责人</el-checkbox>
            <el-checkbox :label="3" name="roleId">开发</el-checkbox>
            <el-checkbox :label="4" name="roleId">产品</el-checkbox>
            <el-checkbox :label="5" name="roleId">算法</el-checkbox>
            <el-checkbox :label="6" name="roleId">测试</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="formModel.status" style="line-height:36px">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" class="user-save" @click="createUserData('newUserForm')">保存</el-button>
        <el-button @click="cancelCreateTeam('newUserForm')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "createuserdialog",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      rules: {
        name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { pattern: /^[\u4E00-\u9FA5]{2,8}$/, message: "只能输入汉字，2-8位" },
        ],
        account: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          {
            pattern: /^[a-zA-z]\w{2,15}$/,
            message: "字母、数字、下划线组成，字母开头，3-16位",
          },
        ],
        phoneNum: [{ required: true, validator: checkPhone, trigger: "blur" }],
        roleId: [
          { required: true, message: "选择用户角色", trigger: "change" },
        ],
      },
    };
  },
  //
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    defaultKeys: {
      type: Array,
      default: () => [],
    },
    formModel: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  methods: {
    /**
     * 同步父组件中showDialog值
     */
    syncCloss() {
      this.$emit("update:open", false);
    },
    /**
     * 关闭弹窗并清楚数据
     */
    cancelCreateTeam(formName) {
      this.syncCloss();
      this.$nextTick(() => {
        this.$parent.clearFormModel();
        this.$refs[formName].resetFields();
      });
    },

    createUserData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formModel.id) {
            this.editUserData(this.formModel);
          } else {
            this.addUserData(this.formModel);
          }
          // this.syncCloss();
        } else {
          return false;
        }
      });
    },
    addUserData(value) {
      this.$emit("add-user", value);
    },
    editUserData(value) {
      this.$emit("edit-user", value);
    },
  },
};
</script>

<style  lang="scss">
.user-mask .el-dialog__header {
  padding: 16px 10px;
  border-bottom: 1px solid #e4e4e4;
}
.user-mask .el-dialog__header .el-dialog__title {
  color: #8d8d8d;
  font-size: 16px;
  font-weight: 600;
}
.user-mask .el-dialog__footer {
  background-color: #e3e3e3;
}
.user-mask .el-dialog__footer .user-save {
  color: #fff;
  background-color: #e50012;
  border-radius: 2px;
  border: none;
}
</style>
