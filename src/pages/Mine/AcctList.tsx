import { getMemberAcctList } from '@/apis/mine'
import { getMemberAcctListItem } from '@/apis/model/mineModel'
import { auth } from '@/components/wrapper/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Cell } from 'react-vant'


const AcctList = () => {
    const navigate = useNavigate()
    const [list, setList] = useState<getMemberAcctListItem[]>([])
    // const iconList = [
    //     { icon: 'gold-coin-o', iconColor: '#1989fa' },
    //     { icon: 'balance-pay', iconColor: '#ff976a' },
    //     { icon: 'after-sale', iconColor: '#07c160' },
    //     { icon: 'balance-o', iconColor: '#ee0a24' }
    // ]
    useEffect(() => {
        getMemberAcctList().then(res => {
            if (res.resultCode === 1) {
                setList(res.data)
            }
        })
    }, [])
    return (
        <div style={{ paddingTop: '10px' }}>
            <Cell.Group>
                {list.map(item => {
                    return (
                        <Cell title={item.maBizTypeName} key={item.rowId} isLink onClick={() => navigate('/mine/acctTakeCash', { state: { ...item } })}>
                        </Cell>
                    )
                })}
            </Cell.Group>
        </div>
    )
}

export default auth(AcctList)
