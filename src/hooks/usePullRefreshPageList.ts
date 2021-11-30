import { httpRequest } from "@/apis/axios"
import { basePageParams, baseResPageList } from "@/apis/model/base"
import { pullRefreshListRes } from "@/apis/model/commonModel"
import { Method } from "axios"
import { useState } from "react"
// import { stringify } from "qs"

interface optionsType {
    method: Method;
    // 是否要loading
    showLoading?: boolean,
    // 接口地址
    type?: string;
}
/**
 * @description 用於下拉刷新和無限加載列表（數據有分頁）(其實我也不知道這個范型要怎麼弄，各種試，花了一下午，僅是沒報錯，還不甚理解)
 * @param api 請求路徑
 * @param p 請求參數，各頁面不盡相同
 * @returns 返回組件所需屬性及頁面渲染所需數據dataList
 */
export function usePullRefreshPageList<V, K extends basePageParams>(api: string, p: K, options: optionsType = { method: 'GET' }) {
    // 是否處於加載狀態中（下拉）
    // const refreshing = ref(false)
    const [params, setParams] = useState(p)
    // 是否處於加載狀態（List）
    const [loading, setLoading] = useState(false)
    // 是否已加載完成
    const [finished, setFinished] = useState(false)
    // 接口返回數據列表
    const [dataList, setDataList] = useState<V[]>([])
    // 記錄總條數
    const [total, setTotal] = useState(0)
    // !定義一個定時器(有的組件(ShowSelfTaoKeOrder)在離開時List會觸發一次load事件,還不知道是怎麼回事。用定時器，可以在組件銷毀時，去除定時器，便可不用調用load裏的接口)
    // const timer = ref(0)
    // 獲取數據
    const getData = async () => {
        let res = await httpRequest<baseResPageList<V>>(options.method, api, params, options)

        setLoading(false)
        if (res.resultCode === 1) {
            setDataList([...dataList, ...res.data.dataIn])
            setTotal(res.data.total)
            if (dataList.length >= total) {
                setFinished(true)
            }
        } else {
            setFinished(true)
        }
    }
    // 下垃操作
    const onRefresh = () => {
        // 清空列表数据
        setFinished(false)

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        // setLoading(true)
        // refreshing.value = false
        setDataList([])
        // p.pageNum = 0
        setParams({ ...params, pageNum: 0 })
        onLoad()
    }
    // 加載列表
    const onLoad = () => {
        // console.log(1111)
        // window.setTimeout(() => {
        setParams({ ...params, pageNum: params.pageNum++ })
        setLoading(true)
        getData()
        // }, 500)
    }

    return {
        // refreshing,
        loading,
        finished,
        dataList,
        onRefresh,
        onLoad
    }
}