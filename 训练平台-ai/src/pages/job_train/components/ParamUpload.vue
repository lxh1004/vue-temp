<template>
  <div>
    <el-button
      :disabled="btnDisabled"
      type="primary"
      @click="selectFile"
      :loading="upLoadingState"
    >
      <input
        type="file"
        ref="upload"
        accept=".csv,.py"
        style="display: none"
        @change="changeFile"
      />
      {{ uploadBtnLabel }}
    </el-button>
    <el-button
      type="text"
      :disabled="!showCsvFile || upLoadingState"
      @click="previewCsv"
      >预览</el-button
    >
    <transition name="fileshow">
      <div v-if="selectInputFile" class="files-progress">
        <div style="width: 100%">
          <span>{{ selectInputFile.name || "" }}</span>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            :percentage="percentage"
          ></el-progress>
        </div>
        <i class="el-icon-close delete-upload-icon" @click="cancelUpload"></i>
      </div>
    </transition>
    <transition name="fileshow">
      <div v-if="showCsvFile">
        <div v-if="showCsvFile.dataName" class="csv-file-text-item">
          <div style="width: 100px">数据集名称</div>
          <el-tooltip :content="showCsvFile.dataName">
            <div class="csvfile_name">{{ showCsvFile.dataName }}</div>
          </el-tooltip>
        </div>
        <div v-if="showCsvFile.dataSize" class="csv-file-text-item">
          <div style="width: 100px">数据大小</div>
          <div>{{ showCsvFile.dataSize }}</div>
        </div>
        <div v-if="showCsvFile.dataStatus" class="csv-file-text-item">
          <div style="width: 100px">数据状态</div>
          <div>{{ checkFileStatus(showCsvFile.dataStatus) }}</div>
        </div>
        <div v-if="showCsvFile.dataType" class="csv-file-text-item">
          <div style="width: 100px">数据类型</div>
          <div>{{ showCsvFile.dataType === 1 ? "图片" : "CSV" }}</div>
        </div>
        <div v-if="showCsvFile.dataSource" class="csv-file-text-item">
          <div style="width: 100px">数据来源</div>
          <div>{{ showCsvFile.dataSource === 0 ? "预置" : "自定义" }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import {
  uploadBigFile,
  dataSetAdd,
  nextFragmentIndex,
  dataSetDel,
  dataSetClear,
  datasetCsvFile,
} from "@/api/job";
export default {
  name: "",
  data() {
    return {
      uploadStatus: "",
      forbidUpload: false,
      percentage: 0,
      selectInputFile: null,
      showCsvFile: null,
      chunkSize: 1024 * 1024 * 5,
      dataSetId: null,
      cancelfn: null,
      fileStateInterval: null,
    };
  },
  watch: {
    dataSetId: {
      handler(value) {
        if (value) {
          this.setFileState();
        }
      },
    },
  },
  props: {
    btnDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    upLoadingState() {
      return (
        this.uploadStatus === "ready" ||
        this.uploadStatus === "start" ||
        this.uploadStatus === "encryption" ||
        this.uploadStatus === "next"
      );
    },
    uploadBtnLabel() {
      let label = "请选择文件";
      switch (this.uploadStatus) {
        case "ready":
          label = "文件分片加密";
          break;
        case "encryption":
          label = "文件整体加密";
          break;
        case "next":
          label = "是否已上传";
          break;
        case "start":
          label = "正在上传";
          break;
        default:
          label = "请选择文件";
      }
      return label;
    },
  },
  components: {},
  mounted() {},
  methods: {
    previewCsv() {
      this.$emit("previewCsv", this.dataSetId);
    },
    checkFileStatus(type) {
      //1-未上传 / 2-上传中 / 3-已上传
      let name = "";
      switch (type) {
        case 1:
          name = "未上传";
          break;
        case 2:
          name = "上传中";
          break;
        case 3:
          name = "已上传";
          break;
        case 4:
          name = "处理中";
          break;
        default:
          name = "未上传";
      }
      return name;
    },
    selectFile() {
      this.$refs["upload"].click();
    },
    cancelUpload() {
      this.selectInputFile = null;
      this.percentage = 0;
      this.forbidUpload = true;
    },
    async changeFile(event) {
      if (event.target.files.length > 0) {
        if (this.selectInputFile) {
          this.$message({ type: "warning", message: "只支持单文件上传" });
        } else {
          let file = event.target.files[0];
          if (file.size > 1024 * 1024 * 1024) {
            this.$refs["upload"].value = null;
            this.$message({
              type: "warning",
              message: "所选文件大小不能超过1G",
            });
            return;
          }
          let fnIndex = file.name.lastIndexOf(".");
          let ext = file.name.substr(fnIndex + 1);
          if (ext !== "csv" && ext !== "py") {
            this.$alert("只能上传csv和py类型文件", "提示", {
              confirmButtonText: "确定",
              callback: () => {},
            });
            return;
          }
          let hasFile = false;
          if (this.selectInputFile) {
            if (this.selectInputFile.name === file.name) {
              hasFile = true;
            }
          }
          if (hasFile) {
            this.$message({ type: "warning", message: "此文件已经选择" });
          } else {
            this.percentage = 0;
            this.selectInputFile = file;
            this.forbidUpload = false;
            let md5 = "";
            try {
              this.uploadStatus = "encryption";
              if (file.size < this.chunkSize) {
                md5 = await this.singeFileMd5(file);
              } else {
                md5 = await this.computeMD5(file);
              }
              if (!this.dataSetId) {
                await this.getDataSetId();
                if (!this.dataSetId) {
                  this.$message({
                    type: "warning",
                    message: "获取数据集Id错误",
                  });
                  return;
                }
              }
              this.uploadStatus = "next";
              let nextIndex = await this.getNextIndex(md5);
              if (nextIndex === -1) {
                this.uploadStatus = "";
                this.selectInputFile = null;
                this.$message("此文件已存在");
              } else {
                this.$emit("disabledRun", "forbidRun");
                this.uploadStatus = "ready";
                let dataobj = await this.fileChunkFormArr(file);
                let filechunkArr = dataobj.formArr;
                let loaded = dataobj.start;
                let index = nextIndex;
                this.uploadStatus = "start";
                if (index !== 0) {
                  filechunkArr.splice(0, index);
                }
                for (let item of filechunkArr) {
                  if (!this.forbidUpload) {
                    item.append("fileMd5", md5);
                    let result = await uploadBigFile(
                      item,
                      () => {
                        let num = ((loaded[index] / file.size) * 100) | 0;
                        this.percentage = num;
                      },
                      (c) => {
                        this.cancelfn = c;
                      }
                    );
                    index++;
                    if (result.status === 200) {
                      if (index === filechunkArr.length + nextIndex) {
                        // 上传完毕
                        this.$emit("dataSetId", this.dataSetId);
                        this.selectInputFile = null;
                        this.uploadStatus = "finish";
                        this.setFileState();
                      }
                    } else {
                      this.forbidUpload = true;
                      this.selectInputFile = null;
                      this.uploadStatus = "";
                      this.$message({ type: "error", message: result.msg });
                    }
                  } else {
                    //取消操作
                    if (this.cancelfn) this.cancelfn();
                    if (this.uploadStatus === "start") {
                      this.dataSetPageClear();
                    }
                    this.uploadStatus = "";
                  }
                }
              }
            } catch (error) {
              this.uploadStatus = "";
              this.$emit("disabledRun", "run");
              this.$message({ type: "error", message: error });
              console.log("upload file error:", error);
            }
            this.$refs["upload"].value = null;
          }
        }
      } else {
        this.$message("取消文件选择");
      }
    },
    setFileState() {
      this.clearFileInterval();
      this.fileStateInterval = setInterval(async () => {
        await this.dataSetCsvDetail();
      }, 1000);
    },
    clearFileInterval() {
      if (this.fileStateInterval) {
        clearInterval(this.fileStateInterval);
        this.fileStateInterval = null;
      }
    },
    computeMD5(file) {
      //这里需要用到File的slice( )方法，以下是兼容写法
      return new Promise((resolve, reject) => {
        let blobSlice =
            File.prototype.slice ||
            File.prototype.mozSlice ||
            File.prototype.webkitSlice,
          chunkSize = this.chunkSize, // 以每片大小来逐次读取
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark = new SparkMD5(), //创建SparkMD5的实例
          fileReader = new FileReader();
        fileReader.onload = (e) => {
          spark.appendBinary(e.target.result); // append array buffer
          currentChunk++;
          if (currentChunk < chunks) {
            if (this.forbidUpload) {
              spark.destroy();
              fileReader.abort();
              reject("取消上传");
            } else {
              loadNext();
            }
            console.log(`第${currentChunk}分片解析完成`);
          } else {
            let md5 = spark.end();
            spark.destroy();
            resolve(md5); // 完成计算，返回结果
          }
        };

        fileReader.onerror = () => {
          reject("something went wrong");
        };

        function loadNext() {
          let start = currentChunk * chunkSize,
            end =
              start + chunkSize >= file.size ? file.size : start + chunkSize;

          fileReader.readAsBinaryString(blobSlice.call(file, start, end));
        }
        loadNext();
      });
    },

    // 切片数组
    async fileChunkFormArr(file) {
      let start = 0,
        end,
        filesize = file.size,
        filename = file.name;
      let fragmentCount = Math.ceil(filesize / this.chunkSize);
      let lengthArr = [];
      for (let index = 0; index < fragmentCount; index++) {
        lengthArr.push(index);
      }
      let formArr = [];
      let startArr = [];

      for (let index of lengthArr) {
        end = start + this.chunkSize;
        if (end > filesize) {
          end = filesize;
        }
        let chunk = file.slice(start, end); //切割文件
        let md5 = await this.singeFileMd5(chunk);
        let fragmentName = filename + index;
        let fragmentIndex = index;
        let form = new FormData();
        form.append("dataId", this.dataSetId);
        form.append("file", chunk, file);
        form.append("fileName", filename);
        form.append("fragmentMd5", md5);
        form.append("fragmentName", fragmentName);
        form.append("fragmentIndex", fragmentIndex);
        form.append("fragmentCount", fragmentCount);
        formArr.push(form);
        start = end;
        startArr.push(start);
      }
      return { formArr: formArr, start: startArr };
    },
    singeFileMd5(file) {
      return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          //FileReader的load事件，当文件读取完毕时触发
          if (file.size != e.target.result.length) {
            reject("加密错误");
          } else {
            let md5 = SparkMD5.hashBinary(e.target.result);
            resolve(md5);
          }
        };
        fileReader.onerror = () => {
          reject("加密错误");
        };
        fileReader.readAsBinaryString(file);
      });
    },

    async getDataSetId() {
      try {
        let params = {
          dataType: 2,
          dataSource: 1,
        };
        let result = await dataSetAdd(params);
        if (result.status === 200) {
          this.dataSetId = result.obj.dataId;
        }
      } catch (error) {
        console.log("get new dataset id error :", error);
      }
    },
    async getNextIndex(md5) {
      let index = 0;
      try {
        let params = {
          dataId: this.dataSetId,
          fileMd5: md5,
        };
        let result = await nextFragmentIndex(params);
        if (result.status === 200) {
          index = result.obj.nextIndex;
        }
      } catch (error) {
        console.log("get next index error :", error);
      }
      return index;
    },
    async dataSetPageDel() {
      try {
        let result = await dataSetDel(this.dataSetId);
        this.$message({
          type: result.status === 200 ? "success" : "warning",
          message: result.msg,
        });
      } catch (error) {
        console.log("del dataset error: ", error);
      }
    },
    async dataSetPageClear() {
      try {
        let param = {
          dataId: this.dataSetId,
        };
        let result = await dataSetClear(param);
        if (result.status === 200) {
          this.uploadStatus = "";
          this.$message({ type: "success", message: "已取消上传" });
        } else {
          this.$message({ type: "warning", message: result.msg });
        }
      } catch (error) {
        console.log("del dataset error: ", error);
      }
    },
    async dataSetCsvDetail() {
      try {
        let result = await datasetCsvFile(this.dataSetId);
        if (result.status === 200) {
          this.showCsvFile = result.obj;
          if (this.showCsvFile.dataStatus === 3) {
            this.clearFileInterval();
          }
        }
      } catch (error) {
        console.log("dataSetCsvDetail error :", error);
      }
    },
  },
  beforeDestroy() {
    if (this.fileStateInterval) {
      console.log("clear csvfile interval");
      this.clearFileInterval();
    }
  },
};
</script>

<style scoped lang="scss">
.files-progress {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  align-items: flex-end;
}
.fileshow-enter-active,
.fileshow-leave-active {
  transition: all 0.5s;
}
.fileshow-enter,
.fileshow-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.csv-file-text-item {
  position: relative;
  width: 100%;
  display: flex;
  line-height: 40px;
  height: 40px;
  justify-content: flex-start;
  font-size: 14px;
}
.csvfile_name {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delete-upload-icon {
  font-size: 14px;
  border-radius: 50%;
  padding: 2px;
  &:hover {
    background: #eee;
  }
}
</style>
