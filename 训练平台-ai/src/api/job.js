import { get, uploadFile, post, put, del } from "./api"

const componentDatas = (params) => {
  return get("/component/structure", params);
};

/**
 * 任务列表
 */
const jobList = (params) => {
  return get("/job/list", params);
};
/**
 *任务详情
 * @param {Number} params id 任务id：jobId
 */
const jobDetail = (id) => {
  return get(`/job/${id}`);
};

/**
 * 添加任务
 * @param {*} params
 */
const jobAdd = (params) => {
  return post("/job", params);
};

/**
 * 编辑任务
 * @param {*} params
 */
const jobEdit = (params) => {
  return put("/job", params);
};

/**
 * 运行任务
 * @param {Number} id 任务id：jobId
 */
const jobRun = (params) => {
  return post("/job/run", params);
};

/**
 * 删除任务
 * @param {Number} jobId 
 */
const deleteJob = (jobId) =>{
  return del(`/job/${jobId}`);
}

/**
 * 获取任务运行状态
 * @param {Number} jobId 任务id：jobId
 */
const jobRunStatus = (jobId) => {
  return get(`/job/status/${jobId}`);
};
/**
 * 停止任务
 * @param {Number} id 任务id：jobId
 */
const jobStop = (params) => {
  return post("/job/stop", params);
};

/**
 * 添加数据集
 * @param {Number} dataType 1-图片 / 2-CSV
 * @param {Number} sourceType 0-预置 / 1-自定义
 */
const dataSetAdd = (params) => {
  return post("/dataset", params);
};
/**
 * 删除数据集
 * @param {Number} dataId 数据集ID
 */
const dataSetDel = (id) => {
  return del(`/dataset/${id}`);
};
/**
 * 清除数据集
 * @param {Number} dataId 数据集ID
 */
const dataSetClear = (params) => {
  return post('/dataset/clear', params);
}

/**
 *
 * @param {Number} dataId datasetId
 * @param {String} fileMd5 文件MD5值
 */
const nextFragmentIndex = (params) => {
  return get("/dataset/file/nextIndex", params);
};

/**
 * 上传大文件
 * @param {*} params
 * @param {*} callback 回调函数，上次进度
 */
const uploadBigFile = (params, callback, cancelBack) => {
  return uploadFile("/dataset/file", params, callback, cancelBack);
};

/**
 *查看csv文件内容
 * @param {Number} jobId 任务id
 * @param {Number} nodeId 节点id
 * @param {String} portName 端口名称
 * @param {Number} page 当前页：1
 * @param {Number} limit 每页限制条数：1
 */
const jobCsvContent = (params) => {
  return get("/job/csv", params);
};

/**
 * 获取CSV表头信息
 * @param {Number} jobId 任务id
 * @param {Number} nodeId 节点id
 * @param {String} portName 端口名称
 */
const jobCsvHeader = (params) => {
  return get('/job/csv/header', params);
}

/**
 *获取数据集特征列
 * @param {Number} dataId 数据集id
 * @param {Number} page 当前页：1
 * @param {Number} limit 每页限制条数：1
 */
const dataSetCsvContent = (params) => {
  return get("/dataset/csv", params);
};

/**
 * 获取数据集详情
 * @param {Number} dataId 数据集id
 */
const datasetCsvFile = (dataId) => {
  return get(`/dataset/${dataId}`);
};

/**
 * 查看日志
 * @param {Number} jobId 任务id
 * @param {Number} offset 偏移量
 */
const checkJobLog = (params) => {
  return get("/job/log", params);
};

/**
 * 下载结果模型文件
 * @param {Number} jobId 任务id
 */
const modelDownload = (params) => {
  return get("/model/download", params);
};

/**
 * 获取指标数据
 * @param {Number} jobId 任务id
 * @param {Number} nodeId 节点id
 */
const jobIndex = (params) => {
  return get("/job/index", params);
};


/**
 * 获取任务统计数据
 * @param {Number} jobId 任务id
 * @param {Number} nodeId 节点id
 * @param {String} portName 端口名
 */
const jobStatistic = (params) => {
  return get("job/statistic", params);
}

/**
 * 获取组件属性（右击菜单栏）
 * @param {Number} frameId 框架id
 */
const jobAttribute = (params) => {
  return get('/component/attribute', params);
};

const jobMainNode = (params) => {
  return get('/job/graph/majorNodeIds', params);
}

export {
  componentDatas,
  jobList,
  jobDetail,
  jobAdd,
  jobEdit,
  jobRun,
  deleteJob,
  jobStop,
  uploadBigFile,
  dataSetAdd,
  nextFragmentIndex,
  dataSetDel,
  dataSetClear,
  dataSetCsvContent,
  jobCsvContent,
  datasetCsvFile,
  jobRunStatus,
  checkJobLog,
  modelDownload,
  jobIndex,
  jobAttribute,
  jobStatistic,
  jobCsvHeader,
  jobMainNode
};
