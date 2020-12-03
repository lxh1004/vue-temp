<template>
  <el-dialog :visible.sync="visibleDialog"
             :close-on-click-modal="false"
             width="80%"
             @close="cancel"
             title="数据预览">
    <data-table v-loading="showLoading"
                :columns="overviewColumns"
                :data="overviewData">
    </data-table>
    <data-table v-loading="showLoading"
                :columns="columns"
                :aver-min-width="120"
                :data="previewData">
    </data-table>
    <!-- <el-pagination
      :page-size="currentLimit"
      :current-page="currentPage"
      :total="page.total"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
    ></el-pagination> -->
  </el-dialog>
</template>

<script>
import { dataSetCsvContent } from "@/api/job";
import dataTable from "@/components/AutoTable";
import initPage from "@/mixins/pagination";
export default {
  name: "csvPreview",
  components: {
    dataTable,
  },
  mixins: [initPage],
  data() {
    return {
      visibleDialog: false,
      datasetId: null,
      csvData: [],
      tabHeads: [],
      overviewColumns:[
        {
          attrName:'rowNum',
          label:'行数'
        },
        {
          attrName:'colNum',
          label:'列数'
        }
      ]
    };
  },
  computed: {
    overviewData(){
      let dataArr=[];
      if(this.previewData[0]){
        dataArr.push({
        rowNum:this.page.total,
        colNum:Object.keys(this.previewData[0]).length
      });
      }
      return dataArr;
    },
    columns() {
      let columnArr = [];
      columnArr = this.tabHeads.map((item) => {
        return {
          attrName: item,
          label: item,
        };
      });
      return columnArr;
    },
    previewData() {
      let tableData = [];
      this.csvData.forEach((data) => {
        let cdata = new Map(data.map((item, i) => [this.tabHeads[i], item]));
        let dataObj = {};
        for (let [key, val] of cdata) {
          dataObj[key] = val;
        }
        tableData.push(dataObj);
      });
      return tableData;
    },
    currentPage() {
      return this.page.page;
    },
    currentLimit() {
      let limit = 6;
      /*  if(this.currentPage===1){
        limit = 6;
      }else{
        limit = 5;
      } */
      return limit;
    },
  },
  watch: {
    visibleDialog(value) {
      if (value) {
        this.previewCsv();
      }
    },
    /* currentPage(){
      this.previewCsv();
    } */
  },
  mounted() {},
  methods: {
    cancel() {
      this.visibleDialog = false;
    },
    showDialog() {
      this.visibleDialog = true;
    },
    async previewCsv() {
      this.showLoading = true;
      try {
        let params = {
          dataId: this.datasetId,
          page: this.currentPage,
          limit: this.currentLimit,
        };
        let result = await dataSetCsvContent(params);
        if (result.status === 200) {
          let dataObj = result.obj;
          this.csvData = dataObj.data;
          if (this.page.page === 1) {
            this.tabHeads = this.csvData.shift();
          }
          this.page.total = dataObj.total;
        }
      } catch (error) {
        console.log("dataSetCsv preview error :", error);
      }
      this.showLoading = false;
    },
  },
};
</script>

<style>
</style>