import { useLocation, Navigate } from "react-router-dom"

/**
 * @description 用于鉴权
 * @param Component 
 * @returns 
 */
// !这个名字不能首字母大写
export const auth = <T extends {}>(Component: React.ComponentType<T>) => (props: T) => {
    let location = useLocation()
    const token = localStorage.token
    return (
        <>
            {token
                ? (<Component {...props}></Component>)
                : (<Navigate to="/login" state={location}></Navigate>)
            }
        </>
    )
}