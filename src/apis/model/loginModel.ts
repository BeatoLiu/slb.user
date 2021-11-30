import { baseResT } from './base'
/**--------------------------------request----------------------------------------------------*/

/**
 * 登錄參數
 */
export type pwdLoginModel = {
    memMobile: string;
    memPassword: string
}

/**
 * 註冊(和修改密碼,兩者相同)參數
 */
export type registerModel = pwdLoginModel & {
    vCode: string;
    memChannel: number
}


/** ---------------------------------response item-----------------------------------------*/

interface pwdLoginInfo {
    memMobile: string;
    memCode: number;
    memName: string;
    token: string
}

/** ---------------------------------response-----------------------------------------*/
/**
 * 登錄結果
 */
export type pwdLoginRes = baseResT<pwdLoginInfo>