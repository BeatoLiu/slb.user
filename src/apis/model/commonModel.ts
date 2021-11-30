// import { Ref } from "vue";
import { baseResList } from "./base";

/**
 * 發送短信
 */
export interface smsModel {
    phoneNum: string;
    type: number
}


/**
 * 查詢字典
 */
export interface showDictionaryModel {
    dType: number
}
export interface showDictionaryItem {
    dName: string;
    dSubName: string;
    dSubCode: number;
    dType: number
}
export type showDictionaryRes = baseResList<showDictionaryItem>

/**
 * 查詢地區列表
 */
export interface showSubAreaModel {
    parentCode: string;
    type: number
}
interface showSubAreaItem {
    currentCode: string;
    currentName: string;
    fullName: string;
    type: number;
    parentCode: string;
    pyName: string
}
export type showSubAreaRes = baseResList<showSubAreaItem>

/** ---------------------------------response-----------------------------------------*/
/**
 * @description 統一下拉刷新的hooks的返回數據
 * @param refreshing 下拉組件PullRefresh的狀態
 * @param loading 加載組件List的加載狀態
 * @param finished List是否加載完成
 * @param dataList 接口返回數據
 * @param onRefresh 下拉組件事件
 * @param onLoad List組件加載事件
 */
export type pullRefreshListRes<T> = {
    // refreshing: Ref<boolean>;
    loading: boolean;
    finished: boolean;
    dataList: T[];
    onRefresh: () => void | Promise<unknown>;
    onLoad: () => void | Promise<unknown>
}