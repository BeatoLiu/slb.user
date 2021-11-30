import { sendTakeCashSms, takeMemberCash } from '@/apis/mine'
import { auth } from '@/components/wrapper/auth'
import { COUNT_DOWN } from '@/utils/constant'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Dialog, Field, Radio, Toast } from 'react-vant'

import './AcctTakeCash.less'
const AcctTakeCash = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [accountBalance, setAcctountBalance] = useState(0)
    const [params, setParams] = useState({
        takeCashSum: '',
        currencyType: 0,
        certCode: '',
        acctMaBizType: 0
    })
    const [typeList, setTypeList] = useState([
        { title: '人民币', type: 0, typeDesc: 'acctCash', acctBalance: 0 },
        { title: 'SIE', type: 6, typeDesc: 'acctSie', acctBalance: 0 },
        { title: 'SUSD', type: 7, typeDesc: 'acctSusd', acctBalance: 0 },
        { title: 'PIC', type: 8, typeDesc: 'acctPic', acctBalance: 0 },
        { title: 'DEF', type: 9, typeDesc: 'acctDef', acctBalance: 0 },
        { title: 'TAA', type: 11, typeDesc: 'acctTaa', acctBalance: 0 }
    ])
    const [dis, setDis] = useState(false)
    const [countDis, setCountDis] = useState(false)
    const [counting, setCounting] = useState(0)
    const timer = useRef<any>(null)

    useEffect(() => {
        document.title = '提现'
        setTypeList(typeList.filter(item => {
            if (+location.state[item.typeDesc]) {
                item.acctBalance = +location.state[item.typeDesc]
                return true
            }
        }))
        setAcctountBalance(typeList[0].acctBalance)
        setParams({ ...params, currencyType: typeList[0].type, acctMaBizType: location.state.maBizType })
        // 清除定時器
        window.clearInterval(timer.current)
        return () => {
            window.clearInterval(timer.current)
        }
    }, [])

    useEffect(() => {
        if (counting <= 0) {
            setCountDis(false)
            window.clearInterval(timer.current)
        }
        setDis(!!params.takeCashSum && params.certCode.length === 6)
    }, [counting, params.takeCashSum, params.certCode])

    const change = (val: number | string, name: string) => {
        if (name === 'currencyType') {
            typeList.forEach(item => {
                if (item.type === val) {
                    setAcctountBalance(item.acctBalance)
                }
            })
        }
        setParams({ ...params, [name]: val })
    }
    const sendSms = () => {
        sendTakeCashSms().then(res => {
            if (res.resultCode === 1) {
                setCounting(COUNT_DOWN)
                timer.current = window.setInterval(() => {
                    setCounting(v => v - 1)
                }, 1000)
                setCountDis(true)
            }
        })
    }
    const submit = () => {
        let restMoney = accountBalance - +params.takeCashSum
        if (restMoney < 0) {
            return Toast.fail('金额不能超可提现金额')
        }
        if (+params.takeCashSum < 1) {
            return Toast.fail('金额不能小于1')
        }
        takeMemberCash(params).then(res => {
            if (res.resultCode === 1) {
                Dialog.alert({
                    message: '提现申请成功'
                }).then(() => {
                    navigate('/', { replace: true })
                })
            }
        })
    }
    return (
        <div className="draw">
            <div className="draw-top">
                <div className="top-container">
                    <p>提现金额  <span className="tips" onClick={() => navigate('download')}>红包可参与理财,请下载app</span></p>
                    <div className="draw-money flex-start">
                        <Field type="number" value={params.takeCashSum} placeholder="请输入提现金额" onChange={val => change(val, 'takeCashSum')} />
                    </div>
                    <div className="rest-money flex-space">
                        <p>可提现余额：<span>{accountBalance}</span></p>
                    </div>
                    <div>
                        <Radio.Group value={params.currencyType} direction="horizontal" onChange={val => change(val, 'currencyType')}>
                            {typeList.map(item => {
                                return <Radio name={item.type} key={item.type} disabled={item.type === 11}>{item.title}</Radio>
                            })}
                        </Radio.Group>
                    </div>
                </div>
            </div>
            <div className="cash">
                <Field
                    value={params.certCode}
                    type="number"
                    clearable
                    placeholder="请输入验证码"
                    button={<Button type="primary" size="small" disabled={countDis} onClick={sendSms}>{!countDis ? '发送验证码' : counting + 's后重新获取'}</Button>}
                    onChange={val => change(val, 'certCode')}
                >
                </Field>
            </div>
            <div className="flex-start tips">
                <div>注：</div>
                <div>
                    <p>提现只在周一和周五下午5点之前，进行结算</p>
                    <p>TAA暂不支持提现</p>
                </div>
            </div>
            <Button type="primary" className="btn" size="large" onClick={submit} disabled={!dis}>立即提现</Button>
        </div>
    )
}

export default auth(AcctTakeCash)
