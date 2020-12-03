
import { get, post } from './api'

const login = (params) => {
    return get("/user/login", params);
};

export {
    login
}