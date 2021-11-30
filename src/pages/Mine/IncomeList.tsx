import { selectMemberAcctDetail } from '@/apis/mine'
import { selectMemberAcctDetailItem } from '@/apis/model/mineModel'
import { auth } from '@/components/wrapper/auth'
import React, { useState } from 'react'
import { List, PullRefresh } from 'react-vant'

import './IncomeList.less'

const IncomeList = () => {
    // !參數不要用useState定義，不然會有閉包問題，在下拉刷新時，分頁不會發生改變，
    // const [params, setParams] = React.useState({
    //     maBizType: -1,
    //     maType: -1,
    //     pageNum: 0,
    //     pageSize: 20
    // })
    const params = React.useRef({
        maBizType: -1,
        maType: -1,
        pageNum: 0,
        pageSize: 20
    })
    const [finished, setFinished] = useState(false);
    // 是否處於加載狀態（List）
    const [loading, setLoading] = useState(false)
    const [dataList, setDataList] = useState<selectMemberAcctDetailItem[]>([])

    const onLoad = async () => {
        // setParams(params => ({ ...params, pageNum: ++params.pageNum }))
        params.current.pageNum++
        setLoading(true)
        const res = await selectMemberAcctDetail(params.current);
        setLoading(false)
        if (res.resultCode === 1) {
            const data = res.data.dataIn
            setDataList((v) => {
                const newList = [...v, ...data];
                if (!res.data.isMore) {
                    setFinished(true);
                }
                return newList;
            });
        }
    };

    const onRefresh = async () => {
        setFinished(false);
        params.current.pageNum = 0
        // !下拉刷新時，用useState的話，pageNum不能及時更新，還是未刷新前的值
        // setParams(params => ({ ...params, pageNum: 0 }))
        setDataList([])

        // 注釋掉，不然會請求兩次
        // await onLoad();
    }
    const maType = (item: selectMemberAcctDetailItem) => {
        let { maTypeName, tokenSUm, maSum } = item
        if (maTypeName === 'CNY') {
            return maSum + '(元)'
        } else {
            return tokenSUm + '(' + maTypeName + ')'
        }
    }
    return (
        <div className="order-list">
            <PullRefresh onRefresh={onRefresh}>
                <div className="list">
                    <List
                        // ref={listRef}
                        loading={loading}
                        finished={finished}
                        finished-text="没有更多了"
                        onLoad={onLoad}
                    >
                        <div className="waterfall">
                            <div className="wrap left">
                                {
                                    dataList.map(item => {
                                        return (
                                            <div className="item" key={item.madCode} >
                                                <div className="order">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', width: '100%' }}>
                                                        <div>
                                                            <p className="order-id">{item.createTime}</p>
                                                            <p>{item.maBizRemark}</p>
                                                            <p>订单:{item.madCode}</p>
                                                        </div>

                                                        <div className="order-name">
                                                            <p className={item.maSum > 0 ? 'isPlus' : ''}>{maType(item)}</p>
                                                            <p>{item.maSetStatusName}</p>
                                                            <p>来源:{item.maBizTypeName}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </List>
                </div>
            </PullRefresh>
        </div>
    )
}

export default auth(IncomeList)
