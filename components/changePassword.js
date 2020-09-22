import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { auth } from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';
import NavBar from './NavBarBack';


const ChangeMyPassword = () => {
  const [oldPassword, updateOldPassword] = useState('');
  const [newPassword, updateNewPassword] = useState('');
  const [confirmNewPassword, updateConfirmNewPassword] = useState('');
  const [errorOldPassword, updateErrorOldPassword] = useState('');
  const [errorNewPassword, updateErrorNewPassword] = useState('');
  const [errorConfirmNewPassword, updateErrorConfirmNewPassword] = useState('');
  const { account: { resetPasswordEmail } } = useContext(AccountContext);
  const router = useRouter();
  const checkForm = async () => {
    if (!oldPassword) {
      updateErrorOldPassword('Enter Password');
    } else if (oldPassword.length < 6) {
      updateErrorOldPassword('Password should be more then 6 characters');
    } else {
      updateErrorOldPassword('');
    }
    if (!newPassword) {
      updateErrorNewPassword('Enter Password');
    } else if (newPassword.length < 6) {
      updateErrorNewPassword('Password should be more then 6 characters');
    } else {
      updateErrorNewPassword('');
    }
    if (!confirmNewPassword) {
      updateErrorConfirmNewPassword('Enter Confirm Password');
    } else if (confirmNewPassword.length < 6) {
      updateErrorConfirmNewPassword('Confirm Password should be more then 6 characters');
    } else {
      updateErrorConfirmNewPassword('');
    }
    if (confirmNewPassword !== newPassword && errorNewPassword === '') {
      updateErrorConfirmNewPassword('Password Mistach');
    }
    if (oldPassword !== '' && newPassword !== '' && confirmNewPassword !== '' && errorConfirmNewPassword === '' && errorOldPassword === '' && errorNewPassword === '') {
      try {
        const resetPasswordEmail = localStorage.getItem('email');
        const otp = localStorage.getItem('otp');
        const response = await auth.updatePassword(resetPasswordEmail, otp, oldPassword);
        if (response.success) {
          toast.info("Your Password has been changesd");
          router.push('/login');
        } else {
          toast.error(response && response.message);
        }
      } catch (err) {
        toast.error(err && err.message);
      }
    }
  }
  return (
    <div>
      <NavBar />
      <div class="container" id="myApp">
        <section class="section login" v-class="flip : signup">
          <h2>Change Password</h2>
          <form action="#">
            <div class="form-group">
              <label for="password">Old Password</label>
              <input type="text" id="text" placeholder="Enter Old Password" value={oldPassword} onChange={(e) => updateOldPassword(e.target.value)} class="form-control" />
              <p class="error">{errorOldPassword}</p>
            </div>
            <div class="form-group">
              <label for="password">New Password</label>
              <input type="text" id="text" placeholder="Enter New Password" value={newPassword} onChange={(e) => updateNewPassword(e.target.value)} class="form-control" />
              <p class="error">{errorNewPassword}</p>
            </div>
            <div class="form-group">
              <label for="password">Confirm New Password</label>
              <input type="text" id="text" placeholder="Enter Confirm Password" value={confirmNewPassword} onChange={(e) => updateConfirmNewPassword(e.target.value)} class="form-control" />
              <p class="error">{errorConfirmNewPassword}</p>
            </div>
            <p class="iconSwitch" onClick={() => checkForm()}>Change Password</p>
          </form>
        </section>
      </div>

    </div>
  )
}

export default ChangeMyPassword;