import React, { useState } from 'react'
import { Button, Cell, Field } from 'react-vant'

import CountBTN from '@/components/CountBTN'

import './InputForm.less'

interface Props {
    bizType: 'register' | 'findPWD'
}

const InputForm = (props: Props) => {
    const [memMobile, setMemMobile] = useState('')
    const [vCode, setVCode] = useState('')
    const [memPassword, setMemPassword] = useState('')
    const [newPWD, setNewPWD] = useState('')

    const submit = () => { }
    const subText = props.bizType === 'register' ? '注册' : '提交'
    return (
        <div className="input-content">
            <Cell.Group>
                <Field
                    value={memMobile}
                    type="number"
                    leftIcon="contact"
                    placeholder="请输入手机"
                    clearable
                    onChange={setMemMobile}
                />
                <Field
                    value={vCode}
                    type="number"
                    leftIcon="font-o"
                    placeholder="请输入验证码"
                    clearable
                    onChange={setVCode}
                    button={
                        <CountBTN memMobile={memMobile} bizType={props.bizType} count={60}></CountBTN>
                    }
                >
                </Field>
                <Field value={memPassword} type="password" leftIcon="shield-o" placeholder="请输入密码" clearable onChange={setMemPassword} />
                <Field value={newPWD} type="password" leftIcon="shield-o" placeholder="重复密码" clearable onChange={setNewPWD} />
            </Cell.Group>
            <div className="save">
                <Button round type="primary" size="large" onClick={submit}>{subText}</Button>
            </div>
        </div>
    )
}

export default InputForm
