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
  const { account: { setRoute, toggleShowLoader } } = useContext(AccountContext);
  const router = useRouter();

  const checkForm = async() => {
      toggleShowLoader(true);
      if (oldPassword !== '' && newPassword !== '' && confirmNewPassword !== '' && errorConfirmNewPassword === '' && errorOldPassword === '' && errorNewPassword === '') {
        try {
          const userid = localStorage.getItem('userId');
          const authpassword = localStorage.getItem('authpassword');
          const response = await auth.changePassword(userid, authpassword, oldPassword, newPassword);
          if (response.success) {
            toast.info("Your Password has been changed");
            setRoute('login');
          } else {
            toast.error(response && response.message);
          }
        } catch (err) {
          toast.error(err && err.message);
        }
      }
      toggleShowLoader(false);
  }

  const validateOldPassword = (value) => {
    updateOldPassword(value)
    if (!value) {
      updateErrorOldPassword('Enter Password');
    } else if (value.length < 6) {
      updateErrorOldPassword('Password should be more then 6 characters');
    } else {
      updateErrorOldPassword('');
    }
  }
  const validateNewPassword = (value) => {
    updateNewPassword(value);
    if (!value) {
      updateErrorNewPassword('Enter Password');
    } else if (value.length < 6) {
      updateErrorNewPassword('Password should be more then 6 characters');
    } else {
      updateErrorNewPassword('');
    }
  }
  const validateConfirmNewPassword = (value) => {
    updateConfirmNewPassword(value);
    if (!value) {
      updateErrorConfirmNewPassword('Enter Confirm Password');
    } else if (value.length < 6) {
      updateErrorConfirmNewPassword('Confirm Password should be more then 6 characters');
    } else {
      updateErrorConfirmNewPassword('');
    }
    if (value !== newPassword && errorNewPassword === '') {
      updateErrorConfirmNewPassword('Password Mistach');
    }
  }
  return (
    <div>
      <NavBar prevRoute="home" />
      <div class="container" id="myApp">
        <section class="section login" v-class="flip : signup">
          <h2>Change Password</h2>
          <form action="#">
            <div class="form-group">
              <label for="password">Old Password</label>
              <input type="password" id="text" placeholder="Enter Old Password" value={oldPassword} onChange={(e) => validateOldPassword(e.target.value)} class="form-control" />
              <p class="error">{errorOldPassword}</p>
            </div>
            <div class="form-group">
              <label for="password">New Password</label>
              <input type="password" id="text" placeholder="Enter New Password" value={newPassword} onChange={(e) => validateNewPassword(e.target.value)} class="form-control" />
              <p class="error">{errorNewPassword}</p>
            </div>
            <div class="form-group">
              <label for="password">Confirm New Password</label>
              <input type="password" id="text" placeholder="Enter Confirm Password" value={confirmNewPassword} onChange={(e) => validateConfirmNewPassword(e.target.value)} class="form-control" />
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