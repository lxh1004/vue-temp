<template>
  <div class="train-project">
    <div class="group-left">
      <div
        style="
          color: #fff;
          font-size: 16px;
          text-align: center;
          width: 100%;
          padding: 14px;
        "
      >
        AI训练工具
      </div>
      <el-menu
        background-color="#051941"
        text-color="#fff"
        active-text-color="#fff"
      >
        <template v-for="(item, index) in nodeModels">
          <el-submenu :index="index + ''" :key="index">
            <template slot="title">
              <i :class="[item.icon]"></i>
              <span style="padding-left: 10px">{{ item.desc }}</span>
            </template>
            <template v-for="(childItem, childIndex) in item.children">
              <el-submenu
                v-if="childItem.name !== 'default'"
                :index="index + '-' + childIndex"
                :key="index + '-' + childIndex"
              >
                <template slot="title">
                  <i class="icon caidan" style="padding-left: 10px"></i>
                  {{ childItem.desc }}
                </template>
                <template v-for="grandchildItem in childItem.operators">
                  <el-menu-item
                    :index="grandchildItem.uuid"
                    :key="grandchildItem.uuid"
                  >
                    <task-node-model :node="grandchildItem">
                      <i class="el-icon-rank"></i>
                      {{ grandchildItem.name }}
                    </task-node-model>
                  </el-menu-item>
                </template>
              </el-submenu>
              <template v-else v-for="grandchildItem in childItem.operators">
                <el-menu-item
                  :index="grandchildItem.uuid"
                  :key="grandchildItem.uuid"
                >
                  <task-node-model :node="grandchildItem">
                    <i class="el-icon-rank"></i>
                    {{ grandchildItem.name }}
                  </task-node-model>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div
      class="group-center"
      @mousewheel.prevent="zoomNode"
      @click="_disRightMenu()"
    >
      <div class="center-btn-group">
        <div style="margin-right: 15px">
          <el-switch
            :disabled="!isEdit"
            active-text="预测"
            inactive-text="训练"
            active-color="#67c23a"
            inactive-color="#409EFF"
            :active-value="0"
            :inactive-value="1"
            v-model="jobPattern"
          ></el-switch>
        </div>
        <el-button
          type="text"
          icon="el-icon-document-add"
          style="font-size: 16px"
          @click="operateBtn('save')"
          :disabled="saveDisabled"
          >保存</el-button
        >
        <el-button
          type="text"
          icon="el-icon-video-play"
          style="font-size: 16px"
          @click="operateBtn('run')"
          :disabled="runDisabled"
          >运行</el-button
        >
        <el-button
          type="text"
          icon="el-icon-switch-button"
          style="font-size: 16px"
          @click="operateBtn('stop')"
          :disabled="jobStopDisabled"
          >停止</el-button
        >
        <el-button
          type="text"
          icon="el-icon-document"
          style="font-size: 16px"
          @click="operateBtn('log')"
          >查看日志</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-document-add"
          style="font-size: 14px; padding: 8px; margin-left: 36px"
          @click="operateBtn('createJob')"
          >新建任务</el-button
        >
        <div style="position: absolute; left: 15px">
          <el-button
            type="text"
            style="font-size: 16px"
            icon="el-icon-d-arrow-left"
            @click="operateBtn('backpage')"
            >返回实验</el-button
          >
        </div>
        <a ref="downloadLink" style="display: none" target="_blank">模型下载</a>
      </div>
      <div class="zoom-btn-group">
        <el-button
          icon="el-icon-zoom-in"
          @click="operateBtn('amplification')"
          circle
        ></el-button>
        <el-button
          icon="el-icon-zoom-out"
          @click="operateBtn('shrink')"
          circle
        ></el-button>
        <!-- <el-button @click="operateBtn('zoom')"
        circle>还原</el-button>-->
      </div>
      <task-work-area
        width="100%"
        height="calc(100% - 50px)"
        :id="work_id"
        :ini="ini_config"
        :menu-top="tranTop"
        :menu-left="tranLeft"
        :menu-list="_menuList"
        @rightMenuItem="contextMenuItem"
        v-on:on-add-nodemodel="onAddNodeModel"
        v-on:on-mouse="mouseMenu"
        ref="area"
      >
        <task-curve-path
          :areaid="work_id"
          :paths="paths"
          ref="curve"
          width="200px"
          v-on:on-mouse="rightClickPath"
        ></task-curve-path>

        <template v-for="(node, index) in nodes">
          <task-common-node
            ref="commonNode"
            :key="index"
            :node="node"
            v-on:on-add-path="addPath"
            v-on:on-select="selectNodeMethod"
            v-on:on-drag-start="dragStart"
            v-on:on-drag-ging="dragGing"
            v-on:on-drag-end="dragEnd"
            :updateTem="updateCompleted"
            v-on:on-mouse="mouseNodeMenu"
          ></task-common-node>
        </template>
      </task-work-area>
    </div>
    <div class="group-right">
      <div class="detail-title">基本参数</div>
      <param-set
        ref="baseparam"
        :params-map="baseParamsMap"
        :initial-data="initialData"
        :select-id="selectNodeId"
        @disRunState="setRunBtnState"
      ></param-set>
    </div>
    <dialog-log
      ref="showlog"
      :log-content="logContent"
      @scrollStop="stopLog"
    ></dialog-log>

    <dialog-echarts
      ref="showecharts"
      :echart-title="echartTitle"
      :echart-data="echartData"
    ></dialog-echarts>
    <dialog-statistic
      ref="showstatistic"
      :statistic-data="jobStatisticData"
    ></dialog-statistic>
  </div>
</template>

<script>
import dialogLog from "./components/DialogLog";
import { mapGetters } from "vuex";
import taskCommonNode from "@/components/VisualDrag/node/common";
import taskWorkArea from "@/components/VisualDrag/workarea";
import taskNodeModel from "@/components/VisualDrag/nodemodel";
import taskCurvePath from "@/components/VisualDrag/path/curvepath";
import dialogEcharts from "./components/DialogNodeEcharts";
import dialogStatistic from "./components/DialogStatistics";
import urlConfig from "@/api/config";

import {
  componentDatas, //左侧可拖拽节点
  jobAdd, //保存
  jobDetail,
  jobEdit, //编辑
  jobRun, //运行
  jobStop, //停止
  jobRunStatus, //运行状态
  checkJobLog, //查看实验日志
  jobAttribute, //组件属性
  jobIndex, //指标数据
  jobStatistic, //任务统计数据
  dataSetDel,
  jobMainNode,
} from "@/api/job";
import paramSet from "./components/ParamSet";
export default {
  name: "App",
  components: {
    paramSet,
    dialogLog,
    taskCommonNode,
    taskWorkArea,
    taskCurvePath,
    taskNodeModel,
    dialogEcharts,
    dialogStatistic,
  },
  data() {
    return {
      runBtnDis: false,
      selectNodeId: null,
      jobRunStatus: null,
      jobPattern: 1,
      delNodes: [],
      tranLeft: 0, // 向左偏移
      tranTop: 0, // 向右偏移
      menuList: [],
      work_id: "work_id",
      ini_config: {
        lineType: "Q",
        isDotted: false,
        scaling: {
          Zoom: 1.0001,
        },
      },
      startNode: {},
      selectNode: {},
      nodes: [],
      paths: [],
      leftNodeModels: [],
      statusTimer: null,
      logOffset: 0,
      logContent: "",
      logInterval: null,
      hasDataId: false,
      baseUrl: "",
      echartTitle: "",
      echartData: [],
      jobStatisticData: { data: {}, index: [] },
      zoomWarning: 0,
      paramsComplete: false,
      fileStateInterval: null,
      fromNodeId: null,
      toNodeId: null,
      dataSetId: null,
      jobMainNodes: [],
    };
  },
  computed: {
    ...mapGetters(["abortTrainParam"]),
    jobId() {
      return this.abortTrainParam.jobId ? this.abortTrainParam.jobId : null;
    },
    frameId() {
      return this.abortTrainParam.frameId ? this.abortTrainParam.frameId : null;
    },
    expId() {
      return this.abortTrainParam.expId ? this.abortTrainParam.expId : null;
    },
    jobStopDisabled() {
      //停止的运行状态
      return (
        (this.jobRunStatus !== null && this.jobRunStatus !== 2) || !this.isEdit
      );
    },
    saveDisabled() {
      //保存的禁用状态
      return (
        this.nodes.length === 0 ||
        this.jobRunStatus === 2 ||
        this.jobRunStatus === 0 ||
        !this.isEdit
      );
    },
    runDisabled() {
      //运行的禁用状态
      return (
        this.nodes.length === 0 ||
        this.jobRunStatus === 2 ||
        this.jobRunStatus === 0 ||
        !this.isEdit ||
        this.runBtnDis
      );
    },
    isEdit() {
      return this.$route.query.isEdit == 1;
    },
    _menuList() {
      let dataArr = [];
      let deldata = {
        title: "删除节点",
        type: "delnode",
        disabled: !this.isEdit,
      };
      dataArr.push(deldata);
      let rundataArr = [
        {
          title: "运行到此处",
          type: "runhere",
          disabled: !this.isEdit,
        },
        {
          title: "从此处开始运行",
          type: "fromhere",
          disabled: !this.isEdit,
        },
      ];
      dataArr = dataArr.concat(rundataArr);
      this.menuList.forEach((item) => {
        let data = item.attribute.map((attr) => {
          return {
            title: attr.describe,
            type: attr.name,
            disabled: this.selectNode.nodeId ? false : true,
            portType: item.portType,
          };
        });
        dataArr = dataArr.concat(data);
      });
      return dataArr;
    },
    nodeModels() {
      let navArr = [];
      for (let item of this.leftNodeModels) {
        if (item.children.length > 0) {
          for (let childItem of item.children) {
            let nodeArr = [];
            if (childItem.operators.length > 0) {
              for (let nodeM of childItem.operators) {
                nodeM.period = item.name;
                let ports = nodeM.ports;
                let inPorts = [];
                let outPorts = [];
                for (let inport of ports.in) {
                  let indata = {
                    id: inport.name + "," + nodeM.uuid,
                    isConnected: true,
                    dtype: inport.dtype,
                  };
                  inPorts.push(indata);
                }
                for (let outport of ports.out) {
                  let outdata = {
                    id: outport.name + "," + nodeM.uuid,
                    dtype: outport.dtype,
                  };
                  outPorts.push(outdata);
                }
                let data = {
                  uuid: nodeM.uuid,
                  name: nodeM.desc,
                  id: nodeM.uuid,
                  clazzname: nodeM.clazzname,
                  period: nodeM.period,
                  params: nodeM.params,
                  inPorts: inPorts,
                  outPorts: outPorts,
                  cpntInfo: nodeM,
                };
                nodeArr.push(data);
              }
              childItem.operators = nodeArr;
            }
          }
        }
        item.icon = this.setNodeIcon(item.name);
        navArr.push(item);
      }
      return navArr;
    },
    baseParamsMap() {
      let paramMap = {};
      this.nodes.forEach((item) => {
        paramMap[item.id] = item.params;
      });
      return paramMap;
    },
    initialData() {
      let data = {};
      this.nodes.forEach((item) => {
        data[item.id] = item.cpntInfo.params;
      });
      return data;
    },
  },
  watch: {
    isEdit: {
      handler(value) {
        this.$store.dispatch("setViDragDis", value);
      },
      immediate: true,
    },
    frameId: {
      handler(value) {
        if (value !== null) {
          this.getLeftNodes();
        }
      },
      immediate: true,
    },
    jobId: {
      handler(value) {
        if (value !== null) {
          console.log("jobid is change :", value);
          this.jobInfo();
        } else {
          let params = {
            expId: this.expId,
            jobPattern: this.jobPattern,
          };
          this.jobPageCreate(params);
        }
      },
      immediate: true,
    },
    jobRunStatus: {
      handler(value) {
        if (value !== 2) {
          this.paths.forEach((item) => {
            item.useAnimation = false;
          });
        } else {
          this.$refs.curve.vReload();
        }
      },
    },
  },
  mounted() {
    // 环境的切换
    this.baseUrl = urlConfig[process.env.NODE_ENV];
  },
  methods: {
    initNodes(result) {
      let nodeArr = result.obj.graph;
      this.jobPattern = result.obj.jobPattern;
      let dataArr = [];
      let pathArr = [];
      for (let item of nodeArr) {
        let cpntInfo = item.cpntInfo;
        let ports = cpntInfo.ports;
        let inPorts = [];
        let outPorts = [];
        if (ports) {
          for (let inport of ports.in) {
            let indata = {
              id: inport.name + "," + cpntInfo.uuid,
              isConnected: true,
              dtype: inport.dtype,
            };
            inPorts.push(indata);
          }
          for (let outport of ports.out) {
            let outdata = {
              id: outport.name + "," + cpntInfo.uuid,
              dtype: outport.dtype,
            };
            outPorts.push(outdata);
          }
        }
        let params = this.initBaseParams(
          Array.from(new Set(JSON.parse(JSON.stringify(cpntInfo.params)))),
          item.nodeAttr
        );
        //初始化节点
        let data = {
          positionX: item.leftPx,
          positionY: item.topPx,
          uuid: cpntInfo.uuid,
          id: cpntInfo.uuid,
          nodeId: item.nodeId,
          name: cpntInfo.desc,
          clazzname: cpntInfo.clazzname,
          state: item.nodeStatus,
          period: cpntInfo.period,
          params: params,
          inPorts: inPorts,
          outPorts: outPorts,
          cpntInfo: cpntInfo,
        };
        data.icon = this.setNodeIcon(data.period);
        dataArr.push(data);
        //初始化路径
        let nodeEdge = item.nodeEdge;
        nodeEdge.forEach((pathItem) => {
          let path = {
            dotted: this.ini_config.isDotted,
            ptype: this.ini_config.lineType,
            startPort: pathItem.from_port + "," + pathItem.from_id, //out
            endPort: pathItem.to_port + "," + pathItem.to_id, //in
            to_dtype: pathItem.to_dtype,
            from_dtype: pathItem.from_dtype,
            from_id: pathItem.from_id,
            to_id: pathItem.to_id,
          };
          pathArr.push(path);
        });
      }
      this.nodes = dataArr;
      this.paths = pathArr;
      this.setPathAnimation();
    },
    initBaseParams(params, nodeAttr) {
      if (nodeAttr.length > 0)
        params.forEach((item, index) => {
          if (item.name === nodeAttr[index].key) {
            item.default = nodeAttr[index].value;
          }
        });
      for (let item of nodeAttr) {
        if (item.key === "data_id") {
          this.hasDataId = item.value;
          let dataidparam = {
            default: item.value,
            name: item.key,
          };
          params.push(dataidparam);
          break;
        }
      }
      return params;
    },

    jobCsvData(portName, from_id) {
      // 连线选择上一个末节点

      let nodeid = null;
      for (let item of this.nodes) {
        if (item.uuid === from_id) {
          nodeid = item.nodeId;
          break;
        }
      }
      let params = {
        jobId: this.jobId,
        nodeId: nodeid,
        portName: portName,
      };
      this.$store.dispatch("jobCsvContentData", params);
    },

    checkHasPath() {
      let hasDataframe = false;
      for (let port of this.selectNode.inPorts) {
        if ("dataframe" === port.dtype) {
          for (let item of this.paths) {
            if (item.endPort === port.id) {
              hasDataframe = true;
              this.jobCsvData(item.startPort.split(",")[0], item.from_id);
              break;
            }
          }
          break;
        }
      }
      if (!hasDataframe) {
        this.$store.commit("CSVCONTENTDATA", []);
      }
    },

    backProject() {
      if (!this.jobId) {
        if (this.$refs["baseparam"].datasetId) {
          this.$confirm("您还没有保存，返回将删除已上传的数据集", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.dataSetPageDel(this.$refs["baseparam"].datasetId);
            })
            .catch(() => {});
        } else {
          this.$router.back(-1);
        }
      } else {
        this.$router.back(-1);
      }
    },
    operateBtn(type) {
      switch (type) {
        case "save":
          this.logContent = "";
          this.saveNode();
          break;
        case "createJob":
          let params = {
            expId: this.expId,
            jobPattern: this.jobPattern,
          };
          this.jobPageCreate(params);
          break;
        case "run":
          this.logContent = "";
          this.fromNodeId = null;
          this.toNodeId = null;
          this.experimenPagetRun();
          break;
        case "stop":
          this.jobPageStop();
          break;
        case "amplification": //放大
          this._disRightMenu();
          this.amplificationSet();
          break;
        case "shrink": //缩小
          this._disRightMenu();
          this.shrinkSet();
          break;
        case "zoom": //还原大小
          this.ini_config.scaling.Zoom = 1.0001;
          break;
        case "log": //查看日志
          this.$refs.showlog.showDialog();
          this.logOffset = 0;
          this.logContent = "";
          this.setLog();
          break;
        case "delnode":
          this.deleteNode();
          break;
        case "backpage":
          this.backProject();
          break;
        default:
      }
    },
    _showRightMenu() {
      this.$refs["area"].showRightMenu();
    },
    _disRightMenu() {
      this.$refs["area"].disRightMenu();
    },
    _showRightLoading() {
      this.$refs["area"].showMenuLoading();
    },
    _disRightLoading() {
      this.$refs["area"].disMenuLoading();
    },
    contextMenuItem(type) {
      switch (type) {
        case "delnode":
          this.operateBtn(type);
          break;
        case "downloadModel":
          this.downloadModel();
          break;
        case "downloadPipeline":
          this.downloadPipeline();
          break;
        case "metricsDisplay":
          this._jobIndex();
          this.echartTitle = "指标展示";
          this.$refs.showecharts.showDialog();
          break;
        case "statisticDisplay":
          this._jobStatistic();
          this.$refs.showstatistic.showDialog();
          break;
        case "runhere":
          this.fromNodeId = null;
          this.toNodeId = this.selectNode.nodeId;
          this.experimenPagetRun();
          break;
        case "fromhere":
          this.toNodeId = null;
          this.fromNodeId = this.selectNode.nodeId;
          this.experimenPagetRun();
          break;
        default:
          "";
      }
    },
    setNodeIcon(type) {
      let icon = "";
      switch (type) {
        case "dataio":
          icon = "icon data-read";
          break;
        case "preprocess":
          icon = "icon data-preprocess";
          break;
        case "algorithm":
          icon = "icon learning-arithmetic";
          break;
        case "evaluation":
          icon = "icon model-evaluation";
          break;
        case "extend":
          icon = "icon model-extend";
          break;
        default:
          icon = "icon biaotishuqian";
      }
      return icon;
    },
    setRunBtnState(type) {
      if (type === "run") {
        this.runBtnDis = false;
      } else {
        this.runBtnDis = true;
      }
    },

    /**
     * 下载结果模型
     */
    downloadModel() {
      //模型下载地址拼写
      let portName = "";

      for (let port of this.selectNode.outPorts) {
        if ("sklearn_model" === port.dtype) {
          portName = port.id.split(",")[0];
          break;
        }
      }

      let downloadUrl =
        this.baseUrl +
        `/job/download/model?jobId=${this.jobId}&nodeId=${this.selectNode.nodeId}&portName=${portName}`;
      this.$refs["downloadLink"].href = downloadUrl;
      this.$refs["downloadLink"].click();
    },
    /**
     * 下载工作流
     */
    downloadPipeline() {
      let portName = "";
      for (let port of this.selectNode.outPorts) {
        if ("pipeline_model" === port.dtype) {
          portName = port.id.split(",")[0];
          break;
        }
      }
      let downloadUrl =
        this.baseUrl +
        `/job/download/pipeline?jobId=${this.jobId}&nodeId=${this.selectNode.nodeId}&portName=${portName}`;
      this.$refs["downloadLink"].href = downloadUrl;
      this.$refs["downloadLink"].click();
    },

    /***************查看日志 start********************** */
    stopLog(type) {
      if (type) {
        this.clearLogInterval();
      } else {
        this.setLog();
      }
    },
    clearLogInterval() {
      if (this.logInterval) {
        clearInterval(this.logInterval);
        this.logInterval = null;
      }
    },
    //定时器
    async setLog() {
      this.clearLogInterval();
      this.logInterval = setInterval(async () => {
        await this.jobPageLog();
      }, 1000);
    },
    /***************查看日志 end********************** */

    /*************幕布节点放大缩小 start******************** */
    zoomNode(event) {
      this._disRightMenu();
      if (event.deltaY < 0) {
        this.amplificationSet();
      } else {
        this.shrinkSet();
      }
      return false;
    },
    amplificationSet() {
      if (this.ini_config.scaling.Zoom < 1.5) {
        this.ini_config.scaling.Zoom = this.ini_config.scaling.Zoom + 0.1;
        if (this.zoomWarning > 0) {
          this.zoomWarning = 0;
        }
      } else {
        if (this.zoomWarning === 0) {
          this.$message({ type: "warning", message: "能力有限，不能再大了" });
          this.zoomWarning++;
        }
      }
    },
    shrinkSet() {
      if (this.ini_config.scaling.Zoom > 0.7) {
        this.ini_config.scaling.Zoom = this.ini_config.scaling.Zoom - 0.1;
        if (this.zoomWarning > 0) {
          this.zoomWarning = 0;
        }
      } else {
        if (this.zoomWarning === 0) {
          this.$message({ type: "warning", message: "不能再小了" });
          this.zoomWarning++;
        }
      }
    },
    /*************幕布节点放大缩小 end******************** */

    pageAlert(title) {
      this.$alert(title, "缺少必填基本参数", { confirmButtonText: "确定" });
    },

    async pageJobMainNode() {
      try {
        let params = {
          jobId: this.jobId,
          fromNodeId: this.fromNodeId,
          toNodeId: this.toNodeId,
        };
        let result = await jobMainNode(params);
        if (result.status === 200) {
          if (result.obj.data) {
            for (let item of result.obj.data) {
              for (let nod of this.nodes) {
                if (item === nod.nodeId) {
                  this.jobMainNodes.push(nod);
                  break;
                }
              }
            }
          }
        }
      } catch (error) {
        console.log("page job main node error :", error);
      }
    },

    async saveNode() {
      let graphdata = this.checkCallBackGraph();
      if (graphdata.length) {
        this.paramsComplete = true;
        if (this.jobId && this.jobRunStatus !== 2 && this.jobRunStatus !== 0) {
          let params = {
            jobId: this.jobId,
            jobPattern: this.jobPattern,
            graph: graphdata.concat(this.delNodes),
          };
          await this.jobPageEdit(params);
        }
      }
    },

    /**
     * 校验文件参数
     */
    handleVerify() {
      this.hasDataId = false;
      //检验
      for (let item of this.jobMainNodes) {
        for (let param of item.params) {
          if (item.period !== "dataio") {
            if (param.is_required && param.ptype !== "Bool") {
              if (param.ptype === "List") {
                if (param.default.length === 0) {
                  this.paramsComplete = false;
                  this.pageAlert(`请填写节点${item.name}中参数${param.desc}`);
                  return false;
                }
              } else {
                if (!param.default) {
                  this.paramsComplete = false;
                  this.pageAlert(`请填写节点${item.name}中参数${param.desc}`);
                  return false;
                }
              }
            }
          } else {
            if (param.name !== "csv_path") {
              if (param.name === "data_id") {
                this.hasDataId = true;
              }
              if (!this.hasDataId) {
                this.pageAlert("请先上传CSV文件");
                return false;
              }
            }
          }
        }
      }
      return true;
    },

    /**
     * 校验node基本参数
     */
    checkCallBackGraph() {
      let graph = [];
      this.hasDataId = false;
      //检验
      for (let item of this.nodes) {
        let nodeAttr = [];
        for (let param of item.params) {
          let data = {
            key: param.name,
            value: param.default,
          };
          nodeAttr.push(data);
        }

        //格式
        let nodeEdge = [];
        for (let outs of item.outPorts) {
          for (let path of this.paths) {
            if (item.uuid === path.from_id && outs.id === path.startPort) {
              let data = {
                from_id: path.from_id,
                from_port: path.startPort.split(",")[0],
                from_dtype: path.from_dtype,
                to_id: path.to_id,
                to_port: path.endPort.split(",")[0],
                to_dtype: path.to_dtype,
              };
              nodeEdge.push(data);
            }
          }
        }
        let data = {
          topPx: item.positionY,
          leftPx: item.positionX,
          cpntInfo: item.cpntInfo,
          nodeAttr: nodeAttr,
          nodeEdge: nodeEdge,
          isDelete: false,
        };
        if (this.jobId) {
          data.nodeId = item.nodeId;
        }
        graph.push(data);
      }
      return graph;
    },

    onAddNodeModel(event, node) {
      // console.log("添加节点", event.clientX, event.clientY, node);
      console.log("添加节点 node ：", node);
      let newNode = {};
      newNode = node;
      newNode.id = node.id;
      newNode.positionX = node.positionX - 90; // -15 -90 定位到节点的终点
      newNode.positionY = node.positionY - 15;
      let needPush = true;
      for (let item of this.nodes) {
        if (item.clazzname === node.clazzname) {
          needPush = false;
          break;
        }
      }
      if (needPush) {
        this.selectNodeId = newNode.id;
        newNode.icon = this.setNodeIcon(newNode.period);
        this.nodes.push(newNode);
      } else {
        this.$message("此数据已经存在！");
      }
    },
    rightClickPath(event, portData) {
      // console.log("鼠标右击路径事件", event, portData);
      this.deletePath(portData);
    },
    selectNodeMethod(event, data, node) {
      console.log("节点左键点击事件", data);
      this.selectNode = data;
      this.selectNodeId = data.uuid;
      this.checkHasPath();
    },
    dragStart(event, node) {
      // let nodeData = event.dataTransfer.getData("nodedata");
      /* console.log(
        "节点开始移动",
        event.clientX,
        event.clientY,
        node,
        JSON.parse(nodeData)
      ); */
      this._disRightMenu();
      this.startNode = {
        id: node.id,
        positionX: event.clientX,
        positionY: event.clientY,
      };
    },
    dragEnd(event, node) {
      console.log("节点移动结束", event.clientX, event.clientY, node);
      this.nodes.forEach((item) => {
        if (item.id === node.id) {
          item.positionX =
            node.positionX + (event.clientX - this.startNode.positionX);
          item.positionY =
            node.positionY + (event.clientY - this.startNode.positionY);
        }
      });
    },
    dragGing(event) {
      // this.tranLeft = event.clientX - 160 + "px";
      // this.tranTop = event.clientY + 20 + "px";
    },
    addPath(event, startData, endData) {
      console.log("添加路径: ", event, startData, endData);
      if (startData.split(",")[1] === endData.split(",")[1]) {
        this.$message({ type: "warning", message: "禁止此连接操作" });
        return;
      }
      let linkLine = true;
      for (let path of this.paths) {
        if (path.endPort === endData) {
          linkLine = false;
          break;
        }
      }
      if (linkLine) {
        let to_dtype = null,
          from_dtype = null,
          from_id = null,
          to_id = null;
        for (let item of this.nodes) {
          for (let ins of item.inPorts) {
            if (ins.id === endData) {
              to_dtype = ins.dtype;
              to_id = item.uuid;
              this.selectNode = item;
              break;
            }
            if (to_dtype !== null) break;
          }
        }
        for (let item of this.nodes) {
          for (let outs of item.outPorts) {
            if (outs.id === startData) {
              from_dtype = outs.dtype;
              from_id = item.uuid;
              break;
            }
            if (from_dtype !== null) break;
          }
        }
        if (to_dtype === from_dtype) {
          setTimeout(() => {
            this.paths.push({
              dotted: this.ini_config.isDotted,
              ptype: this.ini_config.lineType,
              startPort: startData, //out
              endPort: endData, //in
              to_dtype: to_dtype,
              from_dtype: from_dtype,
              from_id: from_id,
              to_id: to_id,
            });
            if (to_dtype === "dataframe") {
              this.checkHasPath();
            }
          }, 200);
        } else {
          this.$message("节点类型不匹配");
        }
      } else {
        this.$message("此点已达上限");
      }
    },
    mouseMenu: function (event, id) {
      console.log("mouseMenu", "on-mouse", "工作区右击事件", event, id);
    },
    updateCompleted() {
      // 重新加载路径
      this.$refs.curve.vReload();
    },
    async mouseNodeMenu(event, node) {
      console.log("节点右击事件", event, node);
      this.selectNode = node;
      this.tranLeft = node.positionX + 160;
      this.tranTop = node.positionY + 60;
      try {
        let ports = node.outPorts.map((item) => {
          return item.dtype;
        });
        ports = Array.from(new Set(ports));
        let params = {
          frameId: this.frameId,
          portTypes: ports.join(","),
        };
        await this._jobAttribute(params);
      } catch (error) {
        console.log("job attribute error :", error);
      }
    },

    async deletePath(port) {
      try {
        let del = await this.confirmDel("确定删除此路径?");
        if (del) {
          for (let i = 0; i < this.paths.length; i++) {
            if (
              this.paths[i].startPort === port.startPort &&
              this.paths[i].endPort === port.endPort
            ) {
              this.paths.splice(i--, 1);
              this.$store.commit("CSVCONTENTDATA", []);
            }
          }
        }
      } catch (error) {
        console.log("delete path :", error);
      }
    },

    async deleteNode() {
      try {
        let del = await this.confirmDel();
        if (del) {
          let index = this.nodes.findIndex(
            (item) => item.id === this.selectNode.id
          );
          let delData = this.nodes[index];
          if (delData.nodeId) {
            let nodeData = {
              cpntInfo: {},
              nodeId: delData.nodeId,
              isDelete: true,
              nodeEdge: [],
              nodeAttr: [],
            };
            this.delNodes.push(nodeData);
          }
          for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].to_id === delData.uuid) {
              this.paths.splice(i--, 1);
            }
          }
          for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].from_id === delData.uuid) {
              this.paths.splice(i--, 1);
            }
          }
          this.nodes.splice(index, 1);
          console.log("del node :", delData);
          if (delData.period === "dataio") {
            this.$refs["baseparam"].clearParams();
          }
          this._disRightMenu();
        }
      } catch (error) {
        this._disRightMenu();
        console.log("delete node err:", error);
      }
    },

    /**
     * 确认是否删除
     */
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
            reject("取消删除");
          });
      });
    },

    setJobStatus() {
      this.clearStatusTime();
      this.statusTimer = setInterval(async () => {
        await this.jobPageRunStatus();
      }, 1000);
    },

    clearStatusTime() {
      if (this.statusTimer) {
        clearTimeout(this.statusTimer);
        this.statusTimer = null;
      }
    },

    /**************接口请求******************** */
    async getLeftNodes() {
      try {
        let result = await componentDatas({ frameId: this.frameId });
        if (result.status === 200) {
          this.leftNodeModels = result.obj.data;
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        console.log("get nodes error :", error);
        this.$message({ type: "error", message: "网络连接超时" });
      }
    },

    async _jobAttribute(params) {
      this._showRightMenu();
      this._showRightLoading();
      try {
        let result = await jobAttribute(params);
        if (result.status === 200) {
          this.menuList = result.obj.data;
        }
      } catch (error) {
        console.log("expriment attribute error :", error);
      }
      this._disRightLoading();
    },

    //添加任务
    async jobPageCreate(params) {
      try {
        let result = await jobAdd(params);
        if (result.status === 200) {
          let idParam = {
            frameId: this.frameId,
            expId: this.expId,
            jobId: result.obj.jobId,
          };
          this.$store.commit("SETTRAINABORTID", idParam);
          this.delNodes = [];
          this.$message({ type: "success", message: "新建成功" });
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
      }
    },

    //修改
    async jobPageEdit(params) {
      try {
        let result = await jobEdit(params);
        if (result.status === 200) {
          this.delNodes = [];
          this.jobInfo();
          this.$message({ type: "success", message: "保存成功" });
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
      }
    },

    //运行实验 步揍需要调整

    async experimenPagetRun() {
      try {
        await this.saveNode();
        await this.pageJobMainNode();
        let res = await this.handleVerify();
        //校验之后的最后一次保存
        if (res) {
          let params = {
            jobId: this.jobId,
            fromNodeId: this.fromNodeId,
            toNodeId: this.toNodeId,
          };
          let result = await jobRun(params);
          if (result.status === 200) {
            this.$message({ type: "success", message: "开始运行" });
            this.setJobStatus();
          } else {
            this.$message({ type: "warning", message: result.msg });
          }
        } else {
          return;
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
        console.log("job run error :", error);
      }
    },

    //获取实验运行状态
    async jobPageRunStatus() {
      try {
        let result = await jobRunStatus(this.jobId);
        if (result.status === 200) {
          let data = result.obj;
          for (let item of this.nodes) {
            for (let citem of data.graph) {
              if (item.nodeId === citem.nodeId) {
                item.state = citem.nodeStatus;
                break;
              }
            }
            this.setPathAnimation();
          }
          this.jobRunStatus = data.jobStatus;
          if (
            this.jobRunStatus !== 2 &&
            this.jobRunStatus !== 1 &&
            this.jobRunStatus !== 0
          ) {
            this.clearStatusTime();
          }
        } else {
          this.$message({ type: "warning", message: result.msg });
          this.clearStatusTime();
        }
      } catch (error) {
        console.log("job run statues error :", error);
      }
    },

    //设置数据流向路径动画
    setPathAnimation() {
      for (let item of this.nodes)
        if (item.state === 2) {
          for (let path of this.paths) {
            for (let inport of item.inPorts) {
              if (inport.id === path.endPort) {
                path.useAnimation = true;
              }
            }
          }
        } else {
          for (let path of this.paths) {
            for (let inport of item.inPorts) {
              if (inport.id === path.endPort) {
                path.useAnimation = false;
              }
            }
          }
        }
    },
    //停止实验
    async jobPageStop() {
      try {
        let params = {
          jobId: this.jobId,
        };
        let result = await jobStop(params);
        if (result.status === 200) {
          this.$message({ type: "success", message: "停止成功" });
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
      }
    },

    //详情
    async jobInfo() {
      try {
        let result = await jobDetail(this.jobId);
        if (result.status === 200) {
          this.jobRunStatus = result.obj.jobStatus;
          if (this.jobRunStatus === 2 || this.jobRunStatus === 0) {
            this.setJobStatus();
          }
          this.initNodes(result);
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接超时" });
        console.log("job detail error:", error);
      }
    },

    //获取实验日志
    async jobPageLog() {
      try {
        let params = {
          jobId: this.jobId,
          offset: this.logOffset,
        };
        let result = await checkJobLog(params);
        if (result.status === 200) {
          this.logOffset = result.obj.offset ? result.obj.offset : 0;
          this.logContent =
            this.logContent + (result.obj.content ? result.obj.content : "");
          if (result.obj.isEnd) {
            this.stopLog(true);
          }
        }
      } catch (error) {
        console.log("check job log error:", error);
      }
    },
    async _jobIndex() {
      try {
        let portName = "";
        for (let item of this._menuList) {
          for (let port of this.selectNode.outPorts) {
            if (item.portType === port.dtype) {
              portName = port.id.split(",")[0];
              break;
            }
          }
          if (portName) {
            break;
          }
        }
        let params = {
          jobId: this.jobId,
          nodeId: this.selectNode.nodeId,
          portName: portName,
        };
        let result = await jobIndex(params);
        if (result.status === 200) {
          this.echartData = result.obj.data;
        }
      } catch (error) {
        this.$message({ type: "error", message: "网络连接错误" });
      }
    },

    //任务统计数据
    async _jobStatistic() {
      try {
        let portName = "";
        for (let item of this._menuList) {
          for (let port of this.selectNode.outPorts) {
            if (item.portType === port.dtype) {
              portName = port.id.split(",")[0];
              break;
            }
          }
          if (portName) {
            break;
          }
        }
        let params = {
          jobId: this.jobId,
          nodeId: this.selectNode.nodeId,
          portName: portName,
        };
        let result = await jobStatistic(params);
        if (result.status === 200 && result.obj.index) {
          this.jobStatisticData = result.obj;
        }
      } catch (error) {
        console.log("job statistic data error :", error);
        this.$message({ type: "error", message: "网络连接错误" });
      }
    },

    //删除数据集文件
    async dataSetPageDel(dataid) {
      try {
        let result = await dataSetDel(dataid);
        if (result.status === 200) {
          this.$router.back(-1);
        }
      } catch (error) {
        this.$message({ type: "error", message: "删除数据集错误" + error });
        console.log("del dataset error: ", error);
      }
    },
  },

  beforeDestroy() {
    this.clearStatusTime();
    this.clearLogInterval();
  },
};
</script>

<style lang="scss" scoped>
.train-project {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: hidden;
}
.group-center {
  position: relative;
  width: 65%;
  min-width: 760px;
  height: calc(100% - 5px);
  border-radius: 10px;
  margin: 5px 0;
  background: white;
  overflow: hidden;
}
.center-btn-group {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 5px 15px;
  background: #fff;
  border-bottom: solid 1px #eee;
  align-items: center;
}
.zoom-btn-group {
  position: absolute;
  top: 60px;
  right: 15px;
  z-index: 1000;
}
.el-menu {
  border-right: none;
}
.group-left {
  position: relative;
  background-color: $nav_item_bg_color;
  width: 15%;
  min-width: 200px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.group-right {
  position: relative;
  width: 20%;
  height: calc(100% - 10px);
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  margin: 5px;
  overflow-y: auto;
}
.task-node-model {
  color: white;
  width: 200px;
  &:hover {
    background: none;
    border: none;
  }
}
.detail-title {
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: $title_color;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
}
.right-menu {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  border: solid 1px $auto_primary_color;
  border-radius: 3px;
  z-index: 9999;
  width: 180px;
  text-align: center;
}
.right-menu-item {
  cursor: pointer;
  font-size: 14px;
  height: 35px;
  width: 100%;
  padding: 0 10px;
  margin: 0;
  border-bottom: solid 1px $auto_primary_color;
  line-height: 35px;
  text-align: left;
  &:hover {
    opacity: 0.8;
    // background: #eee;
  }
  &:last-child {
    border: none;
  }
}

.rightmenu-show-enter-active,
.rightmenu-show-leave-active {
  transition: all 0.5s;
}
.rightmenu-show-enter,
.rightmenu-show-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.el-menu-item {
  padding: 0 20px !important;
}
/deep/ .el-submenu > .el-submenu__title {
  padding: 0 !important;
}
</style>
