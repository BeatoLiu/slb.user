import { auth } from '@/components/wrapper/auth'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import myImg from '@/assets/img/logo.png'
import { acctSituation } from '@/apis/mine'

import './index.less'
import { Icon, Cell } from 'react-vant'
import { useNavigate } from 'react-router'

interface MenuItem {
    path: string;
    icon: ReactNode;
    title: string
}
const Mine = () => {
    const navigate = useNavigate()
    const myName = localStorage.memName
    const memCode = localStorage.memCode
    const menu = useRef<MenuItem[]>([
        {
            title: '绑定支付宝',
            path: '/mine/aliInfo',
            icon: <Icon name="alipay" size="24" color="#3476fe" />,

        },
        {
            title: '账单明细',
            path: '/mine/incomeList',
            icon: <Icon name="bill" size="24" color="#fe8744" />,

        },
        {
            title: '提现',
            path: '/mine/acctList',
            icon: <Icon name="gold-coin" size="24" color="#1891bb" />,

        }
    ])
    const [account, setAccount] = useState({
        cashHasBeenTaken: 0,
        cashCanBeTaken: 0,
        incomeInToday: 0
    })
    useEffect(() => {
        acctSituation().then(res => {
            setAccount(res.data)
        })
    }, [])

    const destniation = (path: string) => navigate(path)
    return (
        <div className="home">
            <div className="img-wrapper">
                <div className="user">
                    <div className="photo">
                        <img src={myImg} alt="" />
                    </div>
                    <div className="info">
                        <p>{myName}</p>
                        <p>ID：{memCode}</p>
                    </div>
                    <div className="setting" onClick={() => destniation('/setting')}>
                        <Icon name="setting-o" color="#fff" size="28" />
                    </div>
                </div>
            </div>

            <div className="cash-wrapper">
                {/* <div className="earn">
                <p>{account.incomeInToday}</p>
                <span>今日收入</span>
            </div> */}
                <div className="line"></div>
                <div className="earn">
                    <p>{account.cashHasBeenTaken}</p>
                    <span>已提现</span>
                </div>
                <div className="line"></div>
                <div className="earn">
                    <p>{account.cashCanBeTaken}</p>
                    <span>可提现</span>
                </div>
            </div>
            <Cell.Group>
                {
                    menu.current.map(item => {
                        return (
                            <Cell title={item.title} icon={item.icon} isLink key={item.title} onClick={() => destniation(item.path)}></Cell>
                        )
                    })
                }
            </Cell.Group>
        </div>
    )
}

export default auth(Mine)

