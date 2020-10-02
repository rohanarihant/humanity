import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import AccountContext from '../contexts/accountContext';
import { toast } from 'react-toastify';


const LoginRegister = () => {
  const [email, updateEmail] = useState('');
  const [emailError, updateEmailError] = useState('');
  const [password, updatePassword] = useState('');
  const [errorPassword, updateErrorPassword] = useState('');
  const { account: { getLogin, updateLoginStatus, saveUserDetailLogin } } = useContext(AccountContext);
  const router = useRouter();
  const checkForm = async () => {
    if (!email) {
      updateEmailError('Enter Email Address');
    } else {
      updateEmailError('');
    }
    if (!password) {
      updateErrorPassword('Enter Password');
    } else {
      updateErrorPassword('');
    }
    if (email !== '' && emailError === '' && password !== '' && errorPassword === '') {
      try {
        const response = await getLogin(email, password);
        if (response.success) {
          toast.success("You are logged in successfully");
          updateLoginStatus(true);
          saveUserDetailLogin(response);
          router.push('/');
        } else {
          toast.error(response && response.message);
        }
      } catch (err) {
        toast.error(err && err.message);
      }
    }
  }
  useEffect(() => {
    if(localStorage.getItem('userId') !== null && localStorage.getItem('authpassword') !== null){
      router.push('/');
    }
  },[]);
  const moveToSignUp = () => {
    console.log('dsfkjlahjkh')
    router.push('/signup');
  }
  return (
    <div class="container" id="myApp">
      <section class="section login" v-class="flip : signup">
        <h2>Login</h2>
        <form action="#">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="text" placeholder="Enter Email Address" value={email} onChange={(e) => updateEmail(e.target.value)} class="form-control" />
            <p class="error">{emailError}</p>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => updatePassword(e.target.value)} class="form-control" />
            <p class="error">{errorPassword}</p>
          </div>
          <p class="iconSwitch" onClick={() => checkForm()}>Login</p>
          <p style={{ width: '80vw' }}><a  onClick={() => moveToSignUp()} class="create-account">Create Account</a><a href="javascript:;" onClick={() => router.push('/forgotPassword')} class="create-account">Forgot Password</a></p>
        </form>
      </section>
    </div>
  )
}

export default LoginRegister;