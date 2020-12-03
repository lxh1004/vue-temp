const patternData = (state) => state.patternList

const learnTypeData = (state) => state.learnTypeList //镜像

const jobStatusData = (state) => state.jobStatusList

const frameworkAllData = (state) => state.frameworkAllList

const frameworkRobotData = (state) => state.frameworkRobotList

const frameworkDeepData = (state) => state.frameworkDeepList

const jobCsvData = (state) => state.jobCsvContentArr
const abortTrainParam = (state) => state.trainAbortParam

const getViPathingData = (state) => state.vi_pathing_data
const getViConfig = (state) => state.vi_config
const getViDragDis = (state) => state.disDrag


export {
    patternData,
    learnTypeData,
    jobStatusData,
    frameworkAllData,
    frameworkRobotData,
    frameworkDeepData,
    abortTrainParam,
    jobCsvData,
    getViPathingData,
    getViConfig,
    getViDragDis
}
