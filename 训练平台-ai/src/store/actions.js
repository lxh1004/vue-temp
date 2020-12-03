import {
  expPatternList,
  jobStatusList,
  projectLearnTypeList,
  frameworkList,
} from '../api/dictionary'
import { jobCsvHeader } from '../api/job'

const getPatternList = async (context) => {
  try {
    let result = await expPatternList()
    if (result.status === 200) {
      context.commit('PATTERNLIST', result.obj.data)
    }
  } catch (error) {
    console.log('pattern list error :', error)
  }
}
const getStatusList = async (context) => {
  try {
    let result = await jobStatusList()
    if (result.status === 200) {
      context.commit('JOBSTATUSLIST', result.obj.data)
    }
  } catch (error) {
    console.log('status list error :', error)
  }
}
const getLearnTypeList = async (context) => {
  try {
    let result = await projectLearnTypeList()
    if (result.status === 200) {
      context.commit('LEARNTYPELIST', result.obj.data)
    }
  } catch (error) {
    console.log('learntype list error :', error)
  }
}
const getFrameworkList = async (context, params) => {
  try {
    let result = await frameworkList(params)
    if (result.status === 200) {
      if (!params) {
        context.commit('FRAMEWORKLISTALL', result.obj.data)
      } else if (params.learnType === 1) {
        context.commit('FRAMEWORKLISTROBOT', result.obj.data)
      } else if (params.learnType === 2) {
        context.commit('FRAMEWORKLISTDEEP', result.obj.data)
      }
    }
  } catch (error) {
    console.log('framework list error :', error)
  }
}


const jobCsvContentData = async (context, params) => {

  try {
    let result = await jobCsvHeader(params);
    if (result.status === 200) {
      if (result.obj.data) {
        context.commit('CSVCONTENTDATA', result.obj.data);
      }
    }
  } catch (error) {
    console.log('job csv content data error :', error)

  }
}

const setViPathingData = (context, value) => {
  context.commit('setMViPathingData', value)
}
const setViConfig = (context, value) => {
  context.commit('setMViConfig', value)
}
const setViDragDis = (context, value) => {
  context.commit('setDragDis', value)
}

export {
  getPatternList,
  getStatusList,
  getLearnTypeList,
  getFrameworkList,
  setViPathingData,
  setViConfig,
  setViDragDis,
  jobCsvContentData
}
