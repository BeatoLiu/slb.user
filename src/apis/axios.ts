import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios'
import { stringify } from "qs"
import { Toast } from 'react-vant'

import { hostName, payName } from '../utils/config'
// import logoImg from '../assets/img/pay-logo.png'



axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form/urlencoded;charset=UTF-8'

axios.defaults.withCredentials = true


axios.defaults.baseURL = hostName

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.token;
    (config.headers as AxiosRequestHeaders)['token'] = token
    return config
})

// 返回状态判断(添加响应拦截器)


const ajax_main = <T = any>(method: Method, url: string, params: any, config: configInter): Promise<T> => {
    return new Promise((resolve, reject) => {
        const notBodyMethod = ["GET", "DELETE"];

        const configObj: AxiosRequestConfig = {
            method,
            url
        };

        if (notBodyMethod.indexOf(method) > -1) {
            if (method === "GET") {
                configObj.url = configObj.url + "?" + stringify(params);
            } else {
                configObj.data = params;
            }
        } else {
            configObj.data = params;
        }

        if (config.showLoading) {
            Toast.loading({
                // icon: logoImg,
                // forbidClick: true,
                duration: 5000,
                forbidClick: true, // 禁用背景点击
                message: '加载中...'
            })
        }
        // 接口地址
        if (config.type === 'pay') {
            // console.log(payName)
            configObj.baseURL = payName
        }
        // else {
        //     configObj.baseURL = hostName
        // }
        axios(configObj).then(function (response) {
            // console.log(1)
            // Toast.clear()
            resolve(response.data as unknown as Promise<T>)
            if (response.data.resultCode < 1) {
                if (response.data.msg) {
                    // console.log(response.data.msg)
                    Toast({
                        message: response.data.msg,
                        // duration: 5000
                    })
                }
                if (response.data.resultCode === -6 || response.data.resultCode === -66) {
                    localStorage.clear()
                    window.location.href = window.location.origin + window.location.pathname + '#/login'
                }
                // reject(response.data.msg)
            } else {
                Toast.clear()
            }
        })
            .catch(function (error) {
                reject(error)
                Toast.clear()
                console.log(error.message)
            })
    })
}
// 接口配置项
interface configInter {
    // 是否要loading
    showLoading?: boolean,
    // 接口地址
    type?: string;
}
// export default {
/**
 * { showLoading = true, type }: configInter = {}
 * 此句作用相当天设置可选参数
 */
export function httpGet<T = any>(url: string, params?: any, { showLoading = true, type }: configInter = {}): Promise<T> {
    const config: configInter = { showLoading, type }
    return ajax_main("GET", url, params, config)
}
export function httpPost<T = any>(url: string, params?: any, { showLoading = true, type }: configInter = {}): Promise<T> {
    const config: configInter = { showLoading, type }
    return ajax_main("POST", url, params, config)
}
export const httpDelete = (url: string, params?: any, { showLoading = true, type }: configInter = {}) => {
    const config: configInter = { showLoading, type }
    return ajax_main("DELETE", url, params, config)
}
export const httpPut = (url: string, params?: any, { showLoading = true, type }: configInter = {}) => {
    const config: configInter = { showLoading, type }
    return ajax_main("PUT", url, params, config)
}

/**
 * @description 提供給某些需要自定義請求方式的頁面使用
 * @param method 請求方式
 * @param url 請求地址
 * @param params 參數
 * @param param3 配置信息
 * @returns 
 */
export const httpRequest = <T = any>(method: Method, url: string, params: any, { showLoading = true, type }: configInter = {}): Promise<T> => {
    const config: configInter = { showLoading, type }
    return ajax_main(method, url, params, config)
}
// }

