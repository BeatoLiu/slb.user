import { type } from "os";
import { basePageParams, baseResList, baseResPageList, baseResT } from "./base";

/**
 * @description 帳戶信息
 * @param cashHasBeenTaken 已提現
 * @param incomeInToday 今日收益(現在這個字段有問題，不能用)
 * @param cashCanBeTaken 可提現
 */
export interface acctSituationInfo {
    cashHasBeenTaken: number;
    incomeInToday: number;
    cashCanBeTaken: number
}
export type acctSituationRes = baseResT<acctSituationInfo>


/**
 * @description 查詢支付寶帳戶信息
 * @param maRealName 支付寶姓名
 * @param aliPayAcct 支付寶帳號
 */
interface parseAliPayAcctInfo {
    maRealName: string;
    aliPayAcct: string;
}
export type parseAliPayAcctRes = baseResT<parseAliPayAcctInfo>

/**
 * @description 綁定（修改）支付寶帳號信息
 */
export interface bindMemberAliPayAcctModel {
    alipayAcct: string, // 支付寶帳號
    certCode: string, // 驗證碼
    realName: string // 支付寶姓名
}

/**
 * @description 账单明细
 */
export interface selectMemberAcctDetailModel extends basePageParams {
    maBizType: number;
    maType: number
}
export type selectMemberAcctDetailItem = {
    createTime: string;
    maBizRemark: string;
    madCode: number;
    maSetStatusName: string;
    maBizTypeName: string;
    maTypeName: string;
    tokenSUm: number;
    maSum: number
}
export type selectMemberAcctDetailRes = baseResPageList<selectMemberAcctDetailItem>


export interface getMemberAcctListItem {
    rowId: number;
    maBizTypeName: string;
    acctCash: number;
    acctSie: number;
    acctSusd: number;
    acctPic: number;
    acctDef: number;
    acctTaa: number;
    maBizType: number;
}
export type getMemberAcctListRes = baseResList<getMemberAcctListItem>

/**
 * 会员提现
 */
export interface takeMemberCashModel {
    takeCashSum: string,
    // takeAccount: '',
    certCode: string,
    // 提现类型，0 CNY{ //人民币；6 SIE； 7 SUSD ；8 PIC；9 DEF { //数联宝通证
    currencyType: number,
    // memSecretOpenid: localStorage.getItem('openId')
    acctMaBizType: number // 业务
}