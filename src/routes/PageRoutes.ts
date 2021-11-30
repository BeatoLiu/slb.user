import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// 暂时无用
const PageRoutes: RouteObject[] = [
    {
        path: '/',
        element: lazy(() => import('../Home'))
    },
    {
        path: '/mine',
        element: lazy(() => import('../pages/Mine'))
    }
]

export default PageRoutes