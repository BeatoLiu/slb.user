import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabbar } from 'react-vant';

interface Imenu {
    path: string;
    title: string;
    icon: string;
}
const FooterNav = () => {
    let navigate = useNavigate()
    let location = useLocation()
    const [name, setName] = useState(location.pathname)
    const [menu] = useState<Imenu[]>([
        {
            path: '/',
            title: '首页',
            icon: 'home-o',
        },
        {
            path: '/mine',
            title: '我的',
            icon: 'friends-o',
        }
    ])

    const change = (val: number | string) => {
        setName(val as string)
        navigate(val as string)
    }
    return (
        <>
            <Outlet />
            <Tabbar activeColor="#39b9b9" value={name} onChange={change}>
                {menu.map(item => {
                    return <Tabbar.Item name={item.path} icon={item.icon} key={item.path}>{item.title}</Tabbar.Item>
                })}
            </Tabbar>
        </>
    );
}

export default FooterNav
