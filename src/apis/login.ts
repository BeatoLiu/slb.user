import { httpPost, httpGet } from './axios'
import { baseResT } from './model/base'
import { pwdLoginModel, pwdLoginRes, registerModel } from './model/loginModel'

enum Api {
    PWD_LOGIN = 'mem/member/pwdLogin',
    REGISTER = 'mem/member/register',
    MODIFY_PASSWORD = 'mem/member/modifyPassword'
}

/**
 * @description 登錄
 * @param p.memMobile 帳號
 * @param p.memPassword 密碼
 * @returns 登錄信息
 */
export const pwdLogin = (p: pwdLoginModel) => httpGet<pwdLoginRes>(Api.PWD_LOGIN, p)

/**
 * @description 註冊
 * @param p.memMobile 帳號
 * @param p.memPassword 密碼
 * @param p.vCode 驗證碼
 * @param p.memChannel 生成會員的渠道
 * @returns 登錄信息
 */
export const register = (p: registerModel) => httpPost<baseResT>(Api.REGISTER, p)

/**
* @description 修改密碼
* @param p.memMobile 帳號
* @param p.memPassword 密碼
* @param p.vCode 驗證碼
* @param p.memChannel 生成會員的渠道
* @returns 登錄信息
*/
export const modifyPassword = (p: registerModel) => httpPost<baseResT>(Api.MODIFY_PASSWORD, p)
