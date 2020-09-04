import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import {auth} from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';


const ForgotPassword = () => {
    const [password, updatePassword] = useState('');
    const [errorPassword, updateErrorPassword] = useState('');
    let {account: {resetPasswordEmail}} = useContext(AccountContext);
    const router = useRouter();
    const checkForm = async() => {
      if(!password){ 
        updateErrorPassword('Enter 6 digit Code');
      }else{
        updateErrorPassword('');
      }
      if(password !== '' && errorPassword === ''){
        try{
            if(!resetPasswordEmail){ resetPasswordEmail = localStorage.getItem('email') }
            const response = await auth.validatePassword(password, resetPasswordEmail );
            if(response.success){
              localStorage.setItem('otp',password);
            toast.info("Your Password has been changed");
            router.push('/changePassword');
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
    <form action="#">
      <div class="form-group">
        <label for="password">Enter 6 digit Code</label>
        <input type="text" id="text" placeholder="Enter 6 digit Code" value={password} onChange={(e) => updatePassword(e.target.value)} class="form-control" />
        <p class="error">{errorPassword}</p>
      </div>
      <p class="iconSwitch" onClick={() => checkForm()}>Validate</p>
    </form>
  </section>
</div>
    )
}

export default ForgotPassword;