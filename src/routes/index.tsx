import React, { lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
// 不用高阶组件的话，可以用Auth这个组件套一层进行鉴权
// const Auth = React.lazy(() => import('./Auth'))

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Login/Register'))
const ResetPWD = lazy(() => import('../pages/Login/ResetPWD'))
const FooterNav = lazy(() => import('../components/FooterNav'))
const Home = lazy(() => import('../Home'));
const Mine = lazy(() => import('../pages/Mine'));
const AliInfo = lazy(() => import('../pages/Mine/AliInfo'))
const IncomeList = lazy(() => import('../pages/Mine/IncomeList'))
const AcctList = lazy(() => import('../pages/Mine/AcctList'))
const AcctTakeCash = lazy(() => import('../pages/Mine/AcctTakeCash'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function App() {
    let routes: RouteObject[] = [
        {
            path: '/',
            element: <FooterNav />,
            children: [
                { index: true, element: <Home /> },
                { path: '/mine', element: <Mine /> },
            ],
        },
        { path: '/mine/aliInfo', element: <AliInfo /> },
        { path: '/mine/incomeList', element: <IncomeList /> },
        { path: '/mine/acctList', element: <AcctList /> },
        { path: '/mine/acctTakeCash', element: <AcctTakeCash /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/resetPWD', element: <ResetPWD /> },
        { path: '*', element: <NotFound /> },
    ];

    let element = useRoutes(routes);

    return (
        <React.Suspense fallback={<>...</>}>
            {element}
        </React.Suspense>
    );
}


