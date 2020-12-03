import axios from 'axios'
import QS from 'qs'
import urlConfig from './config'

// 环境的切换

let baseUrl = urlConfig[process.env.NODE_ENV]
axios.defaults.baseURL = baseUrl

// 请求超时时间
axios.defaults.timeout = 15000
axios.defaults.withCredentials = true

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
/*axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  }, error => {
    return Promise.error(error)
  })*/

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    (error) => {
        // 服务器状态码不是200的情况
        if (error.response.status) {
            switch (error.response.status) {
                case 404:
                    // router.push({ path: "/404" });
                    break
                case 500:
                    // router.push({ path: "/404" });
                    break
                default:
            }
            return Promise.reject(error.response)
        }
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
/**
 * 封装patch请求
 * @param url
 * @param params
 * @returns {Promise}
 */

const patch = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(url, QS.stringify(params))
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param params
 * @returns {Promise}
 */

const put = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .put(url, params)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const del = (url, params) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, params)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const uploadFile = (url, params, callback, cancelBack) => {
    let CancelToken = axios.CancelToken;
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        cancelToken: new CancelToken(function executor(c) {
            cancelBack(c);
        }),
        onUploadProgress: callback,
        timeout: 120000,
    }
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, config)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
export { get, post, put, del, patch, uploadFile }
