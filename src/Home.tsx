import React from 'react'
import { auth } from './components/wrapper/auth'
const Home: React.FC = () => {
    return (
        <div>Home</div>
    )
}

export default auth(Home)