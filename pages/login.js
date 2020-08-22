import React, { useState } from 'react';
import { useRouter } from 'next/router'

const LoginRegister = () => {
    const [signupFlag, updateSignupFlag] = useState(false);
    const [email, updateEmail] = useState('');
    const [emailError, updateEmailError] = useState('');
    const [password, updatePassword] = useState('');
    const [errorPassword, updateErrorPassword] = useState('');
    const [confirmPassword, updateConfirmPassword] = useState('');
    const [confirmErrorPassword, updateConfirmErrorPassword] = useState('');
    const router = useRouter();
    const checkForm = () => {
      if(!email){ 
        updateEmailError('Enter Email Address');
      }else{
        updateEmailError('');
      }
      if(!password){ 
        updateErrorPassword('Enter Password');
      }else{
        updateErrorPassword('');
      }
      if(!confirmPassword){ 
        updateConfirmErrorPassword('Enter Confirm Password');
      }else{
        updateConfirmErrorPassword('');
      }
      if(email !== '' && emailError === '' && password !== '' && errorPassword === ''){
        if(signupFlag && confirmPassword !== '' && confirmErrorPassword === ''){
          localStorage.setItem('login', true);
          router.push('/');
        }else{
          localStorage.setItem('login', true);
          router.push('/');
        }
      }
    }
    return(
        <div class="container" id="myApp">
  <section class="section login" v-class="flip : signup">
    <h2>{signupFlag ? 'Sign Up' : 'Login'}</h2>
    <form action="#">
      <div class="form-group">
        <label for="email">Username</label>
        <input type="text" id="text" value={email} onChange={(e) => updateEmail(e.target.value)} class="form-control" />
        <p class="error">{emailError}</p>
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => updatePassword(e.target.value)} class="form-control" />
        <p class="error">{errorPassword}</p>
      </div>
      
      {signupFlag && <div class="form-group" v-show="signup">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => updateConfirmPassword(e.target.value)} class="form-control" />
        <p class="error">{confirmErrorPassword}</p>
      </div>}
      
      <div class="checkbox-layout" v-show="signup">
        <input type="checkbox" id="confirm-password"/>
        <a href="#" class="eula">I have read, and agree to the terms of uses.</a>
      </div>
      
      <p class="iconSwitch" onClick={() => checkForm()}>{signupFlag ? 'Sign Up' : 'Login' }</p>
      <p><a href="javascript:;" onClick={() => updateSignupFlag(!signupFlag)}>{signupFlag ? 'Sign In' : 'Create Account' }</a></p>
    </form>
  </section>
</div>
    )
}

export default LoginRegister;