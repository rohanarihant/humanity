import React from 'react';

import {
  auth, user,
} from '../utils/apis';

/* eslint-disable class-methods-use-this */

const AccountContext = React.createContext([]);

export class AccountProvider extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      isSignedIn: false,
      resetPasswordEmail: '',
      userDetailLogin: [{}],
      userId:'',
      authpassword:'',
      ItwingRank:'',
      samiti:'',
    };
    this.state = this.defaultState;


    this.actions = {
      getLogin: this.getLogin.bind(this),
      updateLoginStatus: this.updateLoginStatus.bind(this),
      saveResetPasswordEmail: this.saveResetPasswordEmail.bind(this),
      saveUserDetailLogin: this.saveUserDetailLogin.bind(this),
      getProfileDetails: this.getProfileDetails.bind(this),
    };
  }
  componentDidMount(){
    this.setState({
      userProfileData : JSON.parse(localStorage.getItem('MemberDetaildet')) || [{}],
      ItwingRank: localStorage.getItem('ItwingRank') || '',
      samiti: localStorage.getItem('samiti') || '',
    });
  }
  async getLogin(email, password){
    return await auth.user.login(email, password);
  }
  async saveUserDetailLogin(userDetail){
    localStorage.setItem('userId',userDetail.mylog[0].usrid);
    localStorage.setItem('authpassword',userDetail.authpassword);
    this.setState({userDetailLogin: userDetail || [{}], userId: userDetail.mylog[0].usrid, authpassword: userDetail.authpassword});
  }
  async getProfileDetails(){
    const userId = localStorage.getItem('userId');
    const authpassword = localStorage.getItem('authpassword');
    return await user.getProfile(userId, authpassword);
  }
  async updateLoginStatus(status){
    this.setState({isSignedIn: status});
  }
  async saveResetPasswordEmail(email){
    this.setState({resetPasswordEmail: email});
  }

  render() {
    const context = {
      ...this.state,
      ...this.actions,
    };

    const { children } = this.props;
    return (
      <AccountContext.Provider value={{ "account": context}}>
        {children}
      </AccountContext.Provider>
    );
  }
}

export const withAccount = Component => props => (
  <AccountContext.Consumer>
    {context => <Component {...context} {...props} />}
  </AccountContext.Consumer>
);

// AccountProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default AccountContext;
