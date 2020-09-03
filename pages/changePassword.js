import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import {auth} from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';


const ChangePassword = () => {
    const [oldPassword, updateOldPassword] = useState('');
    const [newPassword, updateNewPassword] = useState('');
    const [errorOldPassword, updateErrorOldPassword] = useState('');
    const [errorNewPassword, updateErrorNewPassword] = useState('');
    const {account: {resetPasswordEmail}} = useContext(AccountContext);
    const router = useRouter();
    const checkForm = async() => {
      if(!oldPassword){ 
        updateErrorOldPassword('Enter Old Password');
      }else if(oldPassword.length < 6){
        updateErrorOldPassword('Password should be more then 6 characters');
      }else{
        updateErrorOldPassword('');
      }
      if(!newPassword){ 
        updateErrorNewPassword('Enter New Password');
      }else if(newPassword.length < 6){
        updateErrorNewPassword('Password should be more then 6 characters');
      }else{
        updateErrorNewPassword('');
      }
      if(oldPassword !== newPassword){
        updateErrorOldPassword('Password Mistach');
      }
      if(oldPassword !== '' && newPassword !== '' && errorOldPassword === '' && errorNewPassword === ''){
        try{
            const resetPasswordEmail = localStorage.getItem('')
          const response = await auth.user.updatePassword(resetPasswordEmail, token, oldPassword);
          console.log(response,'response response')
          if(response.success){
            toast.info("Your Password has been changesd");
            router.push('/login');
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
        <label for="password">Password</label>
        <input type="text" id="text" placeholder="Enter 6 digit Code" value={oldPassword} onChange={(e) => updateOldPassword(e.target.value)} class="form-control" />
        <p class="error">{errorOldPassword}</p>
      </div>
      <div class="form-group">
        <label for="password">Confirm Password</label>
        <input type="text" id="text" placeholder="Enter 6 digit Code" value={newPassword} onChange={(e) => updateNewPassword(e.target.value)} class="form-control" />
        <p class="error">{errorNewPassword}</p>
      </div>
      <p class="iconSwitch" onClick={() => checkForm()}>Validate</p>
    </form>
  </section>
</div>
    )
}

export default ChangePassword;