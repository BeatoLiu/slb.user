import React, { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router'

// interface Props {

// }

export default function Auth({ children }: { children: JSX.Element }): ReactElement {
    const location = useLocation()
    const token = localStorage.token
    return (
        <div>
            {token ? children : <Navigate to="/login" state={location}></Navigate>}
        </div>
    )
}
