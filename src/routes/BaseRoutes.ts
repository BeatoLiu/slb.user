import React, { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import Register from "../pages/Login/Register";
const Login = lazy(() => import('../pages/Login'))


const BaseRoutes: RouteObject[] = [
    {
        path: '/login',
        //     element: <Suspense fallback={<>...</>}>
        //     <Login />
        //   </Suspense>
        element: React.createElement(Login, null, null)
    },
    {
        path: '/register',
        element: React.createElement(Register, null, null)
    },
    {
        path: '/',
        index: true,
        element: lazy(() => import('../Home'))
    }
]

export default BaseRoutes