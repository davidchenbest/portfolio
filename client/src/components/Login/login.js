import React, { useState,useEffect } from 'react'
import fetchLogin from '../../modules/fetchLogin'


const Login = () => {
    const [email,setEmail] = useState()
    const [pass,setPass] = useState()
    const [error,setError] = useState()

    useEffect(() => {
        if(document.cookie.includes('jiachenuser')){
            window.location.assign('/blog')
        }
      });

    const submit = async (e) => {
        e.preventDefault();
        if(!email || !pass) {
            setError('Incomplete')
            return
        }
        let login = await fetchLogin(email,pass)
        if(login.errors) {
            setError(login.errors)
            return
        }
        window.location.assign('/blog');
    }

    return (
        <form id='login' onSubmit={submit}>
            <input type='email' placeholder='Email' onChange={e=>setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={e=>setPass(e.target.value)} />
            <input id='login-submit' className='button' type='submit' value='Login' />
            <span>{error}</span>
        </form>
    )

}

export default Login