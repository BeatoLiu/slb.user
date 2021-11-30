import { httpGet, httpPost } from './axios'
import { baseResT } from './model/base'
import { showDictionaryModel, showDictionaryRes, showSubAreaModel, showSubAreaRes, smsModel } from './model/commonModel'


enum Api {
    SEND_SMS_CODE = 'mg/common/sendSmsCode',
    SHOW_DICTIONARY = 'mg/common/showDictionary',
    SHOW_SUB_AREA = 'mg/common/showSubArea',
    GET_TAA_PRICE = 'mg/secret/getTAAPrice'
}
/**
 * @description 發送短信
 * @param p.phoneNum 手機號
 * @param p.type 業務類型
 * @returns 發送結果
 */
export const sendSmsCode = (p: smsModel) => httpGet<baseResT>(Api.SEND_SMS_CODE, p)

/**
 * @description 查詢字典
 * @param p.dType 業務類型
 * @returns 
 */
export const showDictionary = (p: showDictionaryModel) => httpGet<showDictionaryRes>(Api.SHOW_DICTIONARY, p);

/**
 * @description 查詢字典
 * @param p.dType 業務類型
 * @returns 
 */
export const showSubArea = (p: showSubAreaModel) => httpGet<showSubAreaRes>(Api.SHOW_SUB_AREA, p);


/**
 * @description 獲取TAA價格
 * @param p.dType 業務類型
 * @returns 
 */
export const getTAAPrice = () => httpPost<baseResT<number>>(Api.GET_TAA_PRICE);