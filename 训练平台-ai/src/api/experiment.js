import { post, get, put, del } from './api'
/**
 * 项目列表
 * @param {String} proName 项目名称
 * @param {Number} proType 项目类型
 * @param {Number} proStatus 项目状态
 * @param {Number} page 项目分页
 */
const projectList = (params) => {
	return get('/experiment/list', params)
}

/**
 * 项目详情
 * @param {Number} id 项目id
 */
const projectDetail = (id) => {
	return get(`/experiment/${id}`)
}

/**
 * 添加项目
 * @param {String} proName 项目名称
 * @param {Number} proType 项目类型
 * @param {Number} trainType 训练类型
 * @param {Number} framework 训练框架
 * @param {String} description 描述
 */
const projectAdd = (params) => {
	return post('/experiment', params)
}
/**
 * 编辑项目
 * @param {Number} proId 项目Id
 * @param {String} proName 项目名称非必填
 * @param {String} description 描述非必填
 */
const projectEdit = (params) => {
	return put('experiment', params)
}

/**
 * 删除项目
 * @param {Number} id 项目Id
 */
const projectDel = (id) => {
	return del(`/experiment/${id}`)
}

export { projectList, projectDetail, projectAdd, projectEdit, projectDel }
