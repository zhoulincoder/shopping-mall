import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3000}`,
  timeout: 2000, // 可自定义请求接口返回时间
  headers: {

  }
})

export default instance
