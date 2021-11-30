
// console.log(process.env, process.env.VUE_APP_ENV, process.env.NODE_ENV)
const getHostName = () => {
    let hostName
    // console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case 'development':
            hostName = '/api' // 这里是本地的请求url
            break
        case 'test': // 注意这里的名字要和设置的模式名字对应起来
            hostName = 'http://tk.2qzs.com' // 这里是测试环境中的url
            break
        case 'production':
            hostName = 'http://tk.2qzs.com' // 生产环境url
            break
    }
    return hostName
}

const getPayName = () => {
    let hostName
    // console.log(process.env.VUE_APP_ENV)
    switch (process.env.NODE_ENV) {
        case 'development':
            hostName = '/pay' // 这里是本地的请求url
            break
        case 'test': // 注意这里的名字要和设置的模式名字对应起来
            // hostName = 'http://tttest.2qzs.com' // 这里是测试环境中的url
            hostName = 'http://slpayservice.2qzs.com' // 生产环境url
            break
        case 'production':
            hostName = 'http://slpayservice.2qzs.com' // 生产环境url
            break
    }
    return hostName
}

const getPicName = () => {
    let picName
    switch (process.env.NODE_ENV) {
        case 'development':
            picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/uploadTest/' // 这里是本地的请求url
            // picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/upload/' // 生产环境url
            break
        case 'test': // 注意这里的名字要和设置的模式名字对应起来
            // picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/uploadTest/' // 这里是测试环境中的url
            picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/upload/' // 生产环境url
            break
        case 'production':
            picName = 'https://ytxxkj-bucket.oss-cn-hangzhou.aliyuncs.com/upload/' // 生产环境url
            break
    }
    return picName
}

// 图片文件止传地址
const getPicPath = () => {
    let picName
    switch (process.env.NODE_ENV) {
        case 'development':
            picName = 'http://mg.2qzs.com/img/' // 生产环境url
            break
        case 'test':
            picName = '/img/' // 生产环境url
            break
        case 'production':
            picName = '/img/' // 生产环境url
            break
    }
    return picName
}


const hostName = getHostName()
const payName = getPayName()
const picName = getPicName()
const picDisplayPath = getPicPath()
const localtionOrigin = window.location.origin



export {
    // 域名
    hostName,
    // 支付域名
    payName,
    // 圖片上傳時存儲地址
    picName,
    // 項目圖片的外網地址
    picDisplayPath,
    // 項目地址
    localtionOrigin
}

