import {post} from './api'

const login = (params)=>{
return post('user/login',params)
}

export {
    login
}