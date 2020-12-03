<template>
  <div class="detail-container">
    <div class="detail-info-group">
      <div class="info-btn-group">
        <div class="info-title">实验详情</div>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="projectOperation('delete')"
          >删除</el-button
        >
        <el-button
          type="primary"
          plain
          icon="el-icon-edit"
          @click="editVisible = true"
          >编辑</el-button
        >
        <el-button type="primary" plain @click="projectOperation('inProject')"
          >新建任务</el-button
        >
      </div>
      <div class="info-content">
        <div class="info-content-item">
          <div class="info-content-label">实验名称：</div>
          <div class="info-content-text">{{ detailData.expName }}</div>
        </div>
        <div class="info-content-item">
          <div class="info-content-label">模式：</div>
          <div class="info-content-text">
            {{ checkPattern(detailData.expPattern) }}
          </div>
        </div>
        <div class="info-content-item">
          <div class="info-content-label">学习类型：</div>
          <div class="info-content-text">
            {{ checkLearnType(detailData.learnType) }}
          </div>
        </div>
        <div class="info-content-item">
          <div class="info-content-label">框架名称：</div>
          <div class="info-content-text">
            {{ checkFramework(detailData.frameId) }}
          </div>
        </div>
        <div class="info-content-item">
          <div class="info-content-label">创建时间：</div>
          <div class="info-content-text">{{ detailData.createTime }}</div>
        </div>
        <div class="info-content-item">
          <div class="info-content-label">最新修改时间：</div>
          <div class="info-content-text">{{ detailData.updateTime }}</div>
        </div>

        <div
          class="info-content-item"
          style="width: 100%; flex-direction: column"
        >
          <div class="info-content-label">实验描述：</div>
          <div class="info-content-text" style="min-height: 50px">
            {{ detailData.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="detail-info-group" style="margin-top: 10px">
      <div class="info-btn-group">
        <div class="info-title">历史任务</div>
      </div>
      <data-table
        v-loading="tableLoading"
        :columns="columns"
        :data="expData"
        :operation="operation"
        @operate="tableOperation"
      ></data-table>
    </div>
    <el-dialog
      title="编辑"
      :close-on-click-modal="false"
      :visible.sync="editVisible"
      width="30%"
      @close="closeDialog"
    >
      <el-form
        v-loading="showEditLoading"
        ref="editForm"
        label-width="80px"
        :model="editData"
        :rules="rules"
        @submit.native.prevent="projectOperation('edit')"
      >
        <el-form-item prop="expName" label="实验名称">
          <el-input
            placeholder="请输入实验名称"
            v-model="editData.expName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="description" label="实验描述">
          <el-input
            type="textarea"
            :maxlength="120"
            placeholder="实验描述长度不超过120"
            v-model="editData.description"
          ></el-input>
        </el-form-item>
        <el-button style="display: none" native-type="submit"></el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="projectOperation('edit')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dataTable from "@/components/AutoTable";
import { projectDetail, projectDel, projectEdit } from "@/api/experiment";
import { jobList, deleteJob } from "@/api/job";
import { mapGetters } from "vuex";
export default {
  name: "projectDetail",
  components: {
    dataTable,
  },
  computed: {
    ...mapGetters(["patternData", "learnTypeData", "frameworkAllData"]),
    expData() {
      this.tableData.forEach((item, index) => {
        item.jobCode = index;
      });
      return this.tableData;
    },
  },
  data() {
    return {
      expId: null,
      jobId: null,
      isEdit: 0,
      detailData: {
        expId: null,
        proPattern: null,
        expName: "",
        expStatus: null,
        learnType: null,
        frameId: null,
        description: "",
        createTime: "",
        updateTime: "",
      },
      editData: {
        expName: "",
        description: "",
      },
      editVisible: false,
      tableData: [],
      tableLoading: false,
      columns: [
        {
          attrName: "jobId",
          label: "任务编号",
        },
        {
          attrName: "createTime",
          label: "提交时间",
        },
        {
          attrName: "jobStatus",
          label: "状态",
          isType: "jobStatus",
        },
        {
          attrName: "dataset",
          label: "数据集",
        },
      ],
      operation: [
        {
          operateName: "编辑",
          operatetype: "edit",
          operateAlias: "查看",
        },
        {
          operateName: "删除",
          operatetype: "deljob",
          operateAlias: "删除",
        },
      ],
      showEditLoading: false,
      rules: {
        expName: [
          { required: true, message: "请输入实验名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id) {
        this.expId = this.$route.query.id;
        this.getProjectInfo();
        this.getExpriment();
      }
    });
  },
  methods: {
    //实验详情事件操作集合
    async projectOperation(type) {
      switch (type) {
        case "delete":
          this.delProject();
          break;
        case "edit":
          this.editProject();
          break;
        case "inProject":
          this.isEdit = 1;
          this.goProjectTrain();
          break;
      }
    },

    //表格事件操作
    async tableOperation(event) {
      if (event.type === "deljob") {
        try {
          let del = await this.confirmDel("确认删除该任务?");
          if (del) {
            this.pageDeleteJob(event.value.jobId);
          }
        } catch (error) {}
      } else if (event.type === "edit") {
        this.jobId = event.value.jobId;
        this.isEdit = 1;
        this.goProjectTrain();
      }
    },

    async pageDeleteJob(jobId) {
      this.tableLoading = true;
      try {
        let result = await deleteJob(jobId);
        if (result.status === 200) {
          this.getExpriment();
          this.$message({ type: "success", message: "删除成功" });
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        console.log("delete job error:", error);
        this.$message({ type: "error", message: error });
      }
      this.tableLoading = false;
    },

    closeDialog() {
      this.$refs["editForm"].resetFields();
    },
    confirmDel(message) {
      return new Promise((resolve, reject) => {
        this.$confirm(message ? message : "确认删除该项?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      });
    },

    goProjectTrain() {
      let params = {
        frameId: this.detailData.frameId,
        expId: this.expId,
        jobId: this.jobId,
      };
      this.$store.commit("SETTRAINABORTID", params);
      this.$router.push({
        path: "/job_train",
        query: { isEdit: this.isEdit },
      });
    },
    //获取实验模式名称
    checkPattern(value) {
      let patternName = "--";
      if (value) {
        for (let patternItem of this.patternData) {
          if (patternItem.expPattern === value) {
            patternName = patternItem.patternName;
            break;
          }
        }
      }
      return patternName;
    },
    //获取学习类型名称
    checkLearnType(value) {
      let typeName = "--";
      if (value) {
        for (let item of this.learnTypeData) {
          if (item.learnType === value) {
            typeName = item.typeName;
            break;
          }
        }
      }
      return typeName;
    },
    //获取框架名称
    checkFramework(value) {
      let frameworkName = "--";
      if (value) {
        for (let item of this.frameworkAllData) {
          if (item.frameId === value) {
            frameworkName = item.frameName;
            break;
          }
        }
      }
      return frameworkName;
    },
    /***********网络接口************** */
    //获取实验详情
    async getProjectInfo() {
      try {
        let result = await projectDetail(this.expId); //没有返回状态校验
        if (result.status === 200) {
          this.detailData = result.obj;
          this.editData = {
            expId: this.expId,
            expName: this.detailData.expName,
            description: this.detailData.description,
          };
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        console.log("project deatil error:", error);
      }
    },

    //实验列表
    async getExpriment() {
      try {
        this.tableLoading = true;
        let params = {
          expId: this.expId,
        };
        let result = await jobList(params);
        if (result.status === 200) {
          this.tableData = result.obj.data;
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
        console.log("expriment list error:", error);
      }
      this.tableLoading = false;
    },

    //删除实验
    async delProject() {
      try {
        let del = await this.confirmDel();
        if (del) {
          let result = await projectDel(this.expId); //没有返回状态校验
          if (result.status === 200) {
            this.$message({ type: "success", message: "实验已删除" });
            this.$router.push("/home");
          } else {
            this.$message({ type: "warning", message: result.msg });
          }
        } else {
          this.$message({ type: "warning", message: "取消删除" });
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
        console.log("del project error:", error);
      }
    },

    //编辑实验
    async editProject() {
      this.showEditLoading = true;
      try {
        let params = {
          expId: this.expId,
          expName: this.editData.expName,
          description: this.editData.description,
        };
        let result = await projectEdit(params);
        if (result.status === 200) {
          this.getProjectInfo();
          this.editVisible = false;
          this.$message({ type: "success", message: "保存成功" });
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        console.log("edit project error:", error);
        this.$message({ type: "error", message: "网络连接超时" });
      }
      this.showEditLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  padding: 10px 0;
  overflow-y: auto;
}
.detail-info-group {
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding-bottom: 20px;
}
.info-btn-group {
  position: relative;
  display: flex;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  padding: 10px 15px;
  height: 50px;
  border-bottom: #eee solid 1px;
}
.info-title {
  position: absolute;
  left: 0;
  font-size: 14px;
  padding: 15px;
}
.info-content {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
  min-width: 700px;
}
.info-content-item {
  position: relative;
  display: flex;
  width: 33%;
  padding: 15px 15px 0 15px;
}
.info-content-text {
  color: $type_color;
}
</style>
