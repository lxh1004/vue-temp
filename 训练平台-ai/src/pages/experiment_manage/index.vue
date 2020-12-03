<template>
  <div class="project-container">
    <div class="project-list-group">
      <project-list
        ref="experimentListRef"
        :list-data="listData"
        @clickItem="projectDetail"
        @load="loadExperiment"
      ></project-list>
    </div>
    <div class="project-search-content">
      <el-button
        type="primary"
        @click="dialogVisible = true"
        style="margin-bottom: 15px"
        >新建实验</el-button
      >
      <el-form label-position="top" label-width="80px" :model="checkContent">
        <el-form-item label-width="0" prop="expName">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="checkContent.expName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="expPattern" label="实验模式:">
          <el-radio-group v-model="checkContent.expPattern">
            <el-radio :label="null">全部</el-radio>
            <template v-for="item in patternData">
              <el-radio :label="item.expPattern" :key="item.expPattern">{{
                item.patternName
              }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="新建实验"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      @close="closeDialog"
    >
      <el-form
        v-loading="showLoading"
        ref="createForm"
        label-width="80px"
        :model="projectContent"
        :rules="rules"
        @submit.native.prevent="submitProjectInfo"
      >
        <el-form-item prop="expName" label="实验名称">
          <el-input
            placeholder="请输入实验名称"
            maxlength="32"
            v-model="projectContent.expName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="expPattern" label="实验模式">
          <el-select v-model="projectContent.expPattern" placeholder="请选择">
            <el-option
              v-for="item in patternData"
              :key="item.expPattern"
              :label="item.patternName"
              :value="item.expPattern"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="learnType" label="学习类型">
          <el-radio-group v-model="projectContent.learnType">
            <template v-for="item in this.learnTypeData">
              <el-radio
                :label="item.learnType"
                :disabled="item.learnType === 2"
                :key="item.learnType"
                >{{ item.typeName }}</el-radio
              >
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="frameId" label="实验框架">
          <el-select v-model="projectContent.frameId" placeholder="请选择">
            <el-option
              v-for="item in frameworkData"
              :key="item.frameId"
              :label="item.frameName"
              :value="item.frameId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="实验描述">
          <el-input
            type="textarea"
            :maxlength="120"
            placeholder="实验描述长度不超过120"
            v-model="projectContent.description"
          ></el-input>
        </el-form-item>
        <el-button style="display: none" native-type="submit"></el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitProjectInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { projectList, projectAdd } from "@/api/experiment";
import ProjectList from "./components/ProjectList";
import { mapGetters } from "vuex";

export default {
  name: "project-manage",
  watch: {
    checkContent: {
      handler() {
        this.searchProject();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters([
      "patternData",
      "learnTypeData",
      "frameworkDeepData",
      "frameworkRobotData",
    ]),
    frameworkData() {
      let data = [];
      if (this.projectContent.learnType === 1) {
        data = this.frameworkRobotData;
      } else if (this.projectContent.learnType === 2) {
        data = this.frameworkDeepData;
      }
      return data;
    },
  },
  data() {
    return {
      showLoading: false,
      dialogVisible: false,
      checkContent: {
        expName: "",
        expPattern: null,
        expStatus: null,
      },
      listData: [],
      searchTime: null,
      projectContent: {
        expName: "",
        learnType: 1,
        expPattern: null,
        frameId: null,
        description: "",
      },
      page: 0,
      limit: 10,
      rules: {
        expName: [
          { required: true, message: "请输入实验名称", trigger: "blur" },
        ],
        learnType: [
          { required: true, message: "请选择学习类型", trigger: "change" },
        ],
        expPattern: [
          { required: true, message: "请选择实验模式", trigger: "change" },
        ],
        frameId: [
          { required: true, message: "请选择实验框架", trigger: "change" },
        ],
      },
    };
  },
  components: {
    ProjectList,
  },
  mounted() {
    this.loadExperiment();
  },
  methods: {
    closeDialog() {
      this.$refs["createForm"].resetFields();
    },
    projectDetail(value) {
      this.$router.push({
        path: "/home/experiment_detail",
        query: { id: value.expId },
      });
    },

    searchProject() {
      if (this.searchTime !== null) {
        clearTimeout(this.searchTime);
        this.searchTime = null;
      }
      this.searchTime = setTimeout(() => {
        this.refreshProject();
      }, 1000);
    },
    refreshProject() {
      this.page = 0;
      this.listData = [];
      this.loadExperiment();
    },
    submitProjectInfo() {
      this.$refs["createForm"].validate((valid) => {
        if (valid) {
          this.createProject(this.projectContent);
        }
      });
    },
    /***************接口调用***************** */
    async loadExperiment() {
      this.page++;
      try {
        this.$refs.experimentListRef.noMore = false;
        this.$refs.experimentListRef.loading = true;
        let params = {
          expName: this.checkContent.expName,
          expPattern: this.checkContent.expPattern,
          expStatus: this.checkContent.expStatus,
          page: this.page,
          limit: this.limit,
        };
        let result = await projectList(params);
        if (result.status === 200) {
          if (result.obj.data.length > 0) {
            this.listData = this.listData.concat(result.obj.data);
          } else {
            this.$refs.experimentListRef.noMore = true;
          }
        } else {
          this.$refs.experimentListRef.noMore = true;
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        this.$refs.experimentListRef.noMore = true;
        this.$message({ type: "error", message: "网络连接超时" });
        console.log("load project list error :", error);
      }
      this.$refs.experimentListRef.loading = false;
    },

    async createProject(params) {
      this.showLoading = true;
      try {
        let result = await projectAdd(params);
        if (result.status === 200) {
          this.dialogVisible = false;
          this.$message({ type: "success", message: "创建实验成功" });
          this.refreshProject();
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
        console.log("create project error:", error);
      }
      this.showLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.project-container {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 50px);
}
.project-list-group {
  position: relative;
  height: 100%;
  width: 78%;
  border-radius: 10px;
}
.project-search-content {
  position: relative;
  width: 22%;
  padding: 10px;
  height: 100%;
  min-height: 500px;
  background: #fff;
  border-radius: 10px;
  margin-left: 10px;
}
.el-radio-group {
  line-height: 30px;
}
.el-radio {
  width: 80px;
}
</style>
