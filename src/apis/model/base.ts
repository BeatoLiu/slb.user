/**
 * 时间
 */
export interface baseDateParams {
    startTime: string;
    endTime: string;
}

/**
 * 请求分页参数
 */
export interface basePageParams {
    pageSize: number;
    pageNum: number
}

export type basePageDateParams = baseDateParams & basePageParams



/**
 * 返回結果
 */
export interface baseRes {
    resultCode: number;
    msg: string;
}
/**
 * 分頁信息
 */
export type dataList<T extends any> = {
    total: number;
    pageNum: number;
    pageSize: number;
    pageCount: number;
    isMore: boolean;
    dataIn: T[]
}

// 返回有分頁的結果
export type baseResPageList<T extends any> = baseRes & {
    data: dataList<T>
}
// 無分頁,有些數據少，無須分頁，只要返回數組就行
// t = any 相當於默認值，即在不需要的時候可以不傳
export type baseResList<T extends any> = baseRes & {
    data: T[]
}

// 無分頁, 可能是個字符串，可能是個對象，可能是數字
// t = any 相當於默認值，即在不需要的時候可以不傳
export type baseResT<T = any> = baseRes & {
    data: T
}
