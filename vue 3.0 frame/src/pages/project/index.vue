<template>
  <div class="user-container">
    <el-form :inline="true" :model="userForm" class="user_form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="项目负责人">
            <el-input
              v-model.trim="userForm.user"
              placeholder="请输入"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目">
            <el-select
              v-model="userForm.region"
              size="mini"
              placeholder="请选择"
            >
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
          <el-form-item label="子项目">
            <el-select
              v-model="userForm.region"
              size="mini"
              placeholder="请选择"
            >
              <el-option label="启用" value="shanghai"></el-option>
              <el-option label="禁用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="project_search">
          <el-form-item>
            <el-button type="danger" size="mini" @click="onSubmit"
              >查询</el-button
            >
            <el-button size="mini">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="page-operate-btn-group">
      <el-button
        type="text"
        style="color: #626262"
        icon="el-icon-document-add"
        @click="createUser"
        size="medium"
        >新建项目</el-button
      >
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
    <project-pop-up
      ref="userdialog"
      :title="userPopTitle"
      :form-model="newUserData"
      :open.sync="showDelDialog"
      @add-user="createUserData"
      @edit-user="editUser"
    ></project-pop-up>
  </div>
</template>

<script>
import autoTable from '@/components/table'
import common from '@/mixins/pagination'
import ProjectPopUp from './components/projectPopUp'
export default {
  name: 'project',
  components: {
    autoTable,
    ProjectPopUp,
  },
  mixins: [common],
  data() {
    return {
      userForm: {
        user: '',
        region: '',
      },
      columns: [
        {
          attrName: 'name',
          label: '项目',
        },
        {
          attrName: 'roleId',
          label: '子项目',
        },
        {
          attrName: 'status',
          label: '项目负责人',
        },
        {
          attrName: 'bug',
          label: 'BUG管理',
        },
      ],
      operation: [
        {
          operateName: '编辑',
          opreatetype: 'edit',
          icon: 'el-icon-edit-outline',
        },
      ],
      tableData: [],
      userPopTitle: '',
      showDelDialog: false,
      newUserData: {
        id: '',
        name: '', //项目
        account: '', //子项目
        roleId: [], //开发
        taskUserVOs: [], //测试
        phoneNum: [], //产品
        status: [], //算法
        description: '',
        flag: false,
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      for (let i = 1; i < 11; i++) {
        let item = {
          projectId: i,
          name: '三现' + i,
          roleId: '6S' + i,
          status: '小王' + i,
          bug: '一堆' + i,
        }
        this.tableData.push(item)
      }
    },
    onSubmit() {
      console.log('submit!')
    },
    // 改变页数
    handleCurrentChange(val) {},
    // 改变条数
    handleSizeChange(val) {},
    createUser() {
      this.userPopTitle = '新建项目'
      this.showDelDialog = true
    },
    //新建用户
    createUserData(value) {},
    //编辑用户
    editUser(value) {},
    dataOperation(event) {
      if (event.type === 'edit') {
        this.userPopTitle = '编辑项目'
        this.showDelDialog = true
        console.log(event.value, '需要操作的数据')
      }
    },
    clearFormModel() {
      this.newUserData = {
        id: '',
        name: '', //用户名
        roleId: [], //开发
        taskUserVOs: [], //测试
        phoneNum: [], //产品
        status: [], //算法
        flag: false,
      }
    },
  },
}
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
.project_search {
  text-align: right;
}
</style>