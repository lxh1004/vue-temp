import { post, get, put, del } from './api'

/**
 * 获取项目模式列表
 */
const expPatternList = () => {
	return get('/experiment/pattern/list')
}

/**
 * 任务状态列表
 */
const jobStatusList = () => {
	return get('/job/status/list')
}

/**
 * 项目学习类型列表
 */
const projectLearnTypeList = () => {
	return get('/experiment/learnType/list')
}

/**
 *
 * @param {Number} type 1-机器学习，2-深度学习
 */
const frameworkList = (params) => {
	return get('/framework/list', params)
}

export {
	expPatternList,
	jobStatusList,
	projectLearnTypeList,
	frameworkList,
}
