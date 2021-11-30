import { Toast } from 'react-vant'

/**
 * @description 校驗手機號碼是否正確
 * @param value 手機號碼
 * @returns 正確為true，錯誤為false
 */
export const checkPhone = (value: string): boolean => {
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    if (reg.test(value)) {
        return true
    } else {
        Toast('请输入正确的手机号')
        return false
    }
}

/**
 * @description 校驗登錄密碼格式是否正確
 * @param value 密碼
 * @returns 正確為true，錯誤為false
 */
export const checkPassWord = (value: string): boolean => {
    const reg = /^[a-zA-Z0-9_-]{6,20}$/
    if (reg.test(value)) {
        return true
    } else {
        Toast('密码必须由6-20位字母、数字、下划线组成')
        return false
    }
}

/**
 * @description 校驗驗證碼格式是否正確（6位）
 * @param value 驗證碼
 * @returns 正確為true，錯誤為false
 */
export const checkCode6 = (value: string): boolean => {
    const reg = /^\d{6}$/
    if (reg.test(value)) {
        return true
    } else {
        Toast('验证码为六位数字')
        return false
    }
}

/**
 * @description 判斷設備是IOS还是Android
 * @returns 蘋果為'io's，安卓為'android'，未知為'' 
 */
export const isIOSorANDROID = (): string => {
    var u = navigator.userAgent
    // app = navigator.appVersion
    // var isXiaomi = u.indexOf('XiaoMi') > -1; // 小米手机
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // 其它安卓
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios
    if (isAndroid) {
        return 'android'
    } else if (isIOS) {
        return 'ios'
    }
    return ''
}


// 短信验证码倒计时
export const timeCountdown = (obj: { canGet: boolean, timer: any, waitTime: number }) => { // obj包括timer、waitTime 、canGet
    const TIME_COUNT = 60 // 默认倒计时秒数
    if (!obj.timer) {
        obj.waitTime = TIME_COUNT
        obj.canGet = false
        obj.timer = setInterval(() => {
            if (obj.waitTime > 0 && obj.waitTime <= TIME_COUNT) {
                obj.waitTime--
            } else {
                obj.canGet = true
                clearInterval(obj.timer) // 清空定时器
                obj.timer = null
            }
        }, 1000)
    }
    return {
        timer: obj.timer,
        canGet: obj.canGet,
        waitTime: obj.waitTime
    }
}