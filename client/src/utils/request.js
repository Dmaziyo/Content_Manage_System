import axios from 'axios'
const service = axios.create({
    // 配置请求路径
    baseURL: process.env.VUE_APP_BASE_API + "/api",
    timeout: 5000
})
export default service