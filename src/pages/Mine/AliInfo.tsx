import { bindMemberAliPayAcct, parseAliPayAcct, sendBindAliPayAcctSms } from '@/apis/mine';
import { auth } from '@/components/wrapper/auth';
import { COUNT_DOWN } from '@/utils/constant';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { Button, Cell, Field, Icon, Toast } from 'react-vant';

import './AliInfo.less'

/**
 * @description 用於查看（修改）用戶的提現支付寶帳號
 * @returns 
 */
const AliInfo: React.FunctionComponent = () => {
    const navigate = useNavigate()
    // 提交的參數
    const [params, setParams] = React.useState({
        alipayAcct: '', // 支付寶帳號
        certCode: '', // 驗證碼
        realName: '' // 支付寶姓名
    })
    // 是否能輸入
    const [editable, setEditable] = React.useState(false)
    // 倒計時
    const [counting, setCounting] = React.useState(COUNT_DOWN)
    // 倒計時是否結束
    const [countDis, setCountDis] = React.useState(false)
    // 表單是否可以提交
    const [dis, setDis] = React.useState(false)
    // 定時器
    const timer = React.useRef<any>(null)
    React.useEffect(
        () => {
            // 獲取支付寶信息
            parseAliPayAcct().then(res => {
                if (res.resultCode === 1) {
                    params.realName = res.data.maRealName || ''
                    params.alipayAcct = res.data.aliPayAcct || ''
                    if (params.realName) setEditable(true)
                }
            })
            // 清除定時器
            window.clearInterval(timer.current)
            return () => {
                window.clearInterval(timer.current)
            }
        },
        []
    )
    React.useEffect(() => {
        if (counting <= 0) {
            setCountDis(false)
            window.clearInterval(timer.current)
        }
        setDis(!!params.realName && !!params.alipayAcct && params.certCode.length === 6)
    }, [counting, params.certCode])
    // 使表單可修改
    const edit = () => {
        setEditable(false)
    }
    const change = (val: string, name: string) => {
        // !用Object.assign這種方法不行，params改變了，但頁面不會重新渲染
        // setParams(Object.assign(params, { [name]: val }))

        setParams({ ...params, [name]: val })

        // console.log(params)
    }
    // 發送短信
    const getCode = () => {
        sendBindAliPayAcctSms().then(res => {
            if (res.resultCode === 1) {
                setCounting(COUNT_DOWN)
                timer.current = window.setInterval(() => {
                    setCounting(v => v - 1)
                }, 1000)
                setCountDis(true)
            }
        })
    }
    // 提交表單
    const toSign = () => {
        bindMemberAliPayAcct(params).then(res => {
            if (res.resultCode === 1) {
                Toast('操作成功')
                navigate('/mine')
            }
        })
    }
    // 是否顯示發送短信的輸入框
    const msgField = (
        editable
            ? <></>
            : (
                <Field
                    value={params.certCode}
                    clearable
                    label="验证码"
                    placeholder="请输入短信验证码"
                    button={
                        <Button size="small" type="primary" onClick={getCode} disabled={countDis}>
                            {!countDis ? '发送验证码' : counting + 's后重新获取'}
                        </Button>
                    }
                    onChange={val => change(val, 'certCode')}
                >
                </Field>
            )
    )
    // 是否顯示提交按鈕
    const submitBtn = (
        editable
            ? <></>
            : <Button className="btn" type="primary" onClick={toSign} disabled={!dis}>提交</Button>
    )
    return (
        <div className="take-cash-account">
            <div className="login-cont">
                <Cell.Group>
                    <Field
                        button={
                            <div className="flex-center" style={{ color: '#ee0a24' }} onClick={edit}>
                                <Icon name="edit" color="#ee0a24" size="20" />修改
                            </div>
                        }
                    >
                    </Field>
                    <Field
                        clearable
                        value={params.realName}
                        disabled={editable}
                        label="支付宝姓名"
                        placeholder="提现支付宝姓名"
                        onChange={val => change(val, 'realName')}
                    />
                    <Field
                        value={params.alipayAcct}
                        clearable
                        disabled={editable}
                        label="支付宝账号"
                        placeholder="提现支付宝账号"
                        onChange={val => change(val, 'alipayAcct')}
                    />
                    {msgField}
                </Cell.Group>
                {submitBtn}
            </div>
        </div>
    );
};

export default auth(AliInfo);
