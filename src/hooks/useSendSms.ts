import { sendSmsCode } from "@/apis/common";
import { smsModel } from "@/apis/model/commonModel";
import { checkPhone } from "@/utils";
import { Toast } from "react-vant";
/**
 * @description 發送短信
 * @param p 
 * @returns 
 */
export const useSendSms = async (p: smsModel) => {
    let status = -1
    if (checkPhone(p.phoneNum)) {
        const res = await sendSmsCode(p)
        if (res.resultCode === 1) {
            status = 1
            Toast('短信发送成功')
        }
    }
    return { status }
}