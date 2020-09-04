import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import {auth} from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';


const ForgotPassword = () => {
    const [email, updateEmail] = useState('');
    const [emailError, updateEmailError] = useState('');
    const {account: { saveResetPasswordEmail}} = useContext(AccountContext);
    const router = useRouter();
    const checkForm = async() => {
      if(!email){ 
        updateEmailError('Enter Email Address');
      }else{
        updateEmailError('');
      }
      if(email !== '' && emailError === ''){
        try{
          const response = await auth.resetPassword(email);
          if(response.success){
            saveResetPasswordEmail(email);
            localStorage.setItem('email',email);
            toast.info("Reset Password Email has been sent to your Email Address");
            router.push('/validateForgotPassword');
          }else{
            toast.error(response && response.message);
          }
        }catch(err){
          toast.error(err && err.message);
        }
        }
      }
    return(
        <div class="container" id="myApp">
  <section class="section login" v-class="flip : signup">
    <h2>Forgot Password</h2>
    <form action="#">
      <div class="form-group">
        <label for="email">Enter Registered Email</label>
        <input type="text" id="text" placeholder="Enter Email Address" value={email} onChange={(e) => updateEmail(e.target.value)} class="form-control" />
        <p class="error">{emailError}</p>
      </div>
      <p class="iconSwitch" onClick={() => checkForm()}>Reset Password</p>
      <p><a href="javascript:;" onClick={() => router.push('/login')} class="create-account">Login</a></p>
    </form>
  </section>
</div>
    )
}

export default ForgotPassword;