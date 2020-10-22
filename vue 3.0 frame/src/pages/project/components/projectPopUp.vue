<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="36%"
      :before-close="syncCloss"
      @closed="cancelCreateTeam('newUserForm')"
      custom-class="project_mask_pop"
    >
      <el-form
        ref="newUserForm"
        :model="formModel"
        label-width="120px"
        :rules="rules"
        @submit.native.prevent="createUserData('newUserForm')"
      >
        <el-form-item label="项目：" prop="name">
          <el-input v-model.trim="formModel.name" :disabled="formModel.flag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="子项目：" prop="account">
          <el-input v-model.trim="formModel.account" :disabled="formModel.flag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开发成员：" prop="roleId">
          <el-select
            v-model="formModel.roleId"
            multiple
            class="project_popup_sel"
            :popper-append-to-body="false"
            placeholder="请选择"
          >
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="项目负责人" value="beijing"></el-option>
            <el-option label="开发" value="shanghai1"></el-option>
            <el-option label="开发1" value="shanghai2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试成员：" prop="taskUserVOs">
          <el-select
            v-model="formModel.taskUserVOs"
            multiple
            class="project_popup_sel"
            :popper-append-to-body="false"
            placeholder="请选择"
          >
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="项目负责人" value="beijing"></el-option>
            <el-option label="开发" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品成员：" prop="phoneNum">
          <el-select
            v-model="formModel.phoneNum"
            multiple
            class="project_popup_sel"
            :popper-append-to-body="false"
            placeholder="请选择"
          >
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="项目负责人" value="beijing"></el-option>
            <el-option label="开发" value="shanghai1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="算法成员：" prop="status">
          <el-select
            v-model="formModel.status"
            multiple
            class="project_popup_sel"
            :popper-append-to-body="false"
            placeholder="请选择"
          >
            <el-option label="管理员" value="shanghai"></el-option>
            <el-option label="项目负责人" value="beijing"></el-option>
            <el-option label="开发" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input type="textarea" v-model="formModel.description" placeholder="请输入项目描述"></el-input>
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

<style  lang="scss" >
.project_mask_pop .el-dialog__header {
  padding: 16px 10px;
  border-bottom: 1px solid #e4e4e4;
}
.project_mask_pop .el-dialog__header .el-dialog__title {
  color: #8d8d8d;
  font-size: 16px;
  font-weight: 600;
}
.project_mask_pop .el-dialog__footer {
  background-color: #e3e3e3;
}
.project_mask_pop .el-dialog__footer .user-save {
  color: #fff;
  background-color: #e50012;
  border-radius: 2px;
  border: none;
}
.project_popup_sel {
  width: 100%;
}
</style>
