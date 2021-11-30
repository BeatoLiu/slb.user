import { httpGet, httpPost } from "./axios";
import { baseResT } from "./model/base";
import { acctSituationRes, bindMemberAliPayAcctModel, getMemberAcctListRes, parseAliPayAcctRes, selectMemberAcctDetailModel, selectMemberAcctDetailRes, takeMemberCashModel } from "./model/mineModel";

enum Api {
    ACCT_SITUATION = 'mem/memberAcct/acctSituation',
    BIND_MEMBER_ALIPAY_ACCT = 'mem/member/bindMemberAliPayAcct',
    PARSE_ALIPAY_ACCT = 'mem/member/parseAliPayAcct',
    SEND_BIND_ALIPAY_ACCT_SMS = 'mem/member/sendBindAliPayAcctSms',

    SELECT_MEMBER_ACCT_DETAIL = 'mem/memberAcct/selectMemberAcctDetail',
    GET_MEMBER_ACCT_LIST = 'mem/member/getMemberAcctList',
    SEND_TAKE_CASH_SMS = 'mem/memberAcct/sendTakeCashSms',
    TAKE_MEMBER_CASH = 'mem/memberAcct/takeMemberCash'
}

/**
 * @description 查詢用戶帳戶信息
 * @returns 用戶帳戶信息
 */
export const acctSituation = () => httpPost<acctSituationRes>(Api.ACCT_SITUATION)

/**
 * @description 查詢支付寶帳戶信息
 * @returns 
 */
export const parseAliPayAcct = () => httpGet<parseAliPayAcctRes>(Api.PARSE_ALIPAY_ACCT)

/**
 * @description 修改或者提交支付寶信息時，發送短信
 * @returns 
 */
export const sendBindAliPayAcctSms = () => httpGet<baseResT>(Api.SEND_BIND_ALIPAY_ACCT_SMS)

/**
 * @description 修改或者提交支付寶信息時，發送短信
 * @returns 
 */
export const bindMemberAliPayAcct = (p: bindMemberAliPayAcctModel) => httpGet<baseResT>(Api.BIND_MEMBER_ALIPAY_ACCT, p)

/**
 * @description 修改或者提交支付寶信息時，發送短信
 * @returns 
 */
export const selectMemberAcctDetail = (p: selectMemberAcctDetailModel) => httpPost<selectMemberAcctDetailRes>(Api.SELECT_MEMBER_ACCT_DETAIL, p)

// 获取消费者账户资金列表
export const getMemberAcctList = () => httpGet<getMemberAcctListRes>(Api.GET_MEMBER_ACCT_LIST)

/**
 * @description 提现时发送短信验证码
 * @returns 
 */
export const sendTakeCashSms = () => httpGet<baseResT>(Api.SEND_TAKE_CASH_SMS)

/**
 * @description 会员提现
 * @param p 
 * @returns 
 */
export const takeMemberCash = (p: takeMemberCashModel) => httpGet<baseResT>(Api.TAKE_MEMBER_CASH, p)

