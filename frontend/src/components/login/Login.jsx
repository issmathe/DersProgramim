import React from 'react'
import {useAuth0} from "@auth0/auth0-react"

const Login = () => {
    const {loginWithRedirect,logout}=useAuth0();
  return (
    <div>
        <button onClick={loginWithRedirect}>bas buraya</button>
        <button onClick={logout}>çıkış yap</button>
    </div>
  )
}

export default Login