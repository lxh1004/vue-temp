const state = {
    learnTypeList: [], //学习类型
    patternList: [], //项目模式
    jobStatusList: [], //任务状态
    frameworkAllList: [], //项目框架
    frameworkRobotList: [], //项目框架
    frameworkDeepList: [], //项目框架
    jobCsvContentArr:[],//特征列
    trainAbortParam: {}, //训练详情所需id
    /***可视化拖拉拽**********/
    vi_pathing_data: {
      isShow: false
    },
    vi_config: {
      pathType: 'Q',
      dotted: false,
      scaling: {Zoom: 1}
    },
    disDrag:true,
}

export default state
