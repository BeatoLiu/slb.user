import { useSendSms } from '@/hooks/useSendSms'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Button } from 'react-vant'

interface Props {
    memMobile: string;
    bizType: string;
    count?: number
}
/**
 * @description 发短信时倒计时用
 * @param 
 * @returns 
 */
// 或者在组件内部用useRef
// let timer: number
export default function CountBTN({ memMobile, bizType, count = 60 }: Props): ReactElement {
    const [counting, setCounting] = useState(count)
    const [dis, setDis] = useState(false)
    const timer = useRef<any>(null)
    // 这个timer不能定义在组件内部，不然在counting小于0时，不能清除定时器
    // let timer: number
    useEffect(() => {
        window.clearInterval(timer.current)
        return () => {
            window.clearInterval(timer.current)
        }
    }, [])
    useEffect(() => {
        if (counting <= 0) {
            setDis(false)
            window.clearInterval(timer.current)
        }
    }, [counting])
    const sendSms = async () => {
        const params = {
            phoneNum: memMobile,
            type: bizType === 'register' ? 6 : 12
        }
        const { status } = await useSendSms(params)
        if (status === 1) {
            setCounting(count)
            timer.current = window.setInterval(() => {
                // 不能在这里判断counting是否倒计时完，此处的counting值不会改变，所以永远不会倒计时完
                // console.log(timer, counting)
                // if (counting <= 0) {
                //     setDis(false)
                //     clearInterval(timer)
                // }
                setCounting(v => v - 1)
            }, 1000)
            setDis(true)
        }
    }
    return (
        <Button size="small" type="primary" disabled={dis} onClick={sendSms}>
            {!dis ? '发送短信' : counting + '秒后重新发送'}
        </Button>
    )
}
