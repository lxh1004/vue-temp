<template>
  <div class="user-container">
    <el-form :inline="true" :model="userForm" class="user_form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户账号">
            <el-input v-model.trim="userForm.user" clearable placeholder="请输入" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model.trim="userForm.user" clearable size="mini" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户角色">
            <el-select v-model="userForm.region" clearable size="mini" placeholder="请选择">
              <el-option label="管理员" value="shanghai"></el-option>
              <el-option label="项目负责人" value="beijing"></el-option>
              <el-option label="开发" value="shanghai"></el-option>
              <el-option label="产品" value="beijing"></el-option>
              <el-option label="算法" value="beijing"></el-option>
              <el-option label="测试" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="userForm.region" clearable size="mini" placeholder="请选择">
              <el-option label="启用" value="shanghai"></el-option>
              <el-option label="禁用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="-24">
            <el-button type="danger" size="mini" @click="onSubmit">查询</el-button>
            <el-button size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="page-operate-btn-group">
      <el-button
        type="text"
        style="color:#626262"
        icon="el-icon-document-add"
        @click="createUser"
        size="medium"
      >新建用户</el-button>
    </div>
    <auto-table
      :data="tableData"
      :columns="columns"
      :operation="operation"
      @operate="dataOperation"
    ></auto-table>
    <div class="pagination-right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNo"
        :page-size="page.pageSize"
        :page-count="page.totalPage"
        :total="page.totalRecord"
        layout="total,sizes,prev,pager,next"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
    <user-pop-up
      ref="userdialog"
      :title="userPopTitle"
      :form-model="newUserData"
      :open.sync="showDelDialog"
      @add-user="createUserData"
      @edit-user="editUser"
    ></user-pop-up>
  </div>
</template>

<script>
import autoTable from "@/components/AutoTable";
import common from "@/mixins/pagination";
import UserPopUp from "./components/userPopUp";
export default {
  name: "user",
  components: {
    autoTable,
    UserPopUp,
  },
  mixins: [common],
  data() {
    return {
      userForm: {
        user: "",
        region: "",
      },
      columns: [
        {
          attrName: "name",
          label: "用户名",
        },
        {
          attrName: "roleId",
          label: "用户角色",
        },
        {
          attrName: "status",
          label: "用户状态",
          isType: "status",
        },
      ],
      operation: [
        {
          operateName: "编辑",
          opreatetype: "edit",
          icon: "el-icon-edit-outline",
        },
      ],
      tableData: [],
      userPopTitle: "",
      showDelDialog: false,
      newUserData: {
        id: "",
        name: "", //用户名
        account: "", //姓名
        roleId: [], //角色
        taskUserVOs: [], //技能
        phoneNum: "",
        status: "", //状态
        flag: false,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      for (let i = 1; i < 11; i++) {
        let item = {
          projectId: i,
          name: "王二小" + i,
          roleId: "管理员" + i,
          status: 1,
        };
        this.tableData.push(item);
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    // 改变页数
    handleCurrentChange(val) {},
    // 改变条数
    handleSizeChange(val) {},
    createUser() {
      this.userPopTitle = "新建用户";
      this.showDelDialog = true;
    },
    //新建用户
    createUserData(value) {},
    //编辑用户
    editUser(value) {},
    dataOperation(event) {
      if (event.type === "edit") {
        this.userPopTitle = "编辑用户";
        this.showDelDialog = true;
        console.log(event.value, "需要操作的数据");
      }
    },
    clearFormModel() {
      this.newUserData = {
        id: "",
        name: "", //用户名
        account: "", //姓名
        roleId: [], //角色
        phoneNum: "", //手机号
        taskUserVOs: [], //技能
        status: "", //状态
        flag: false,
      };
    },
  },
};
</script>
<style scoped>
.user-container {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 10px 0;
}
.page-operate-btn-group {
  padding: 5px 10px;
  margin: 10px 0;
  height: 30px;
  background: #f4f4f4;
}
.pagination-right {
  padding-top: 5px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>