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
      route: 'home',
      title: 'Humanity',
      changeRoleUser: '',
      screen: '',
      memberid: '',
      showLoader: false,
      selectedIssue: {},
      selectedUser: {},
      educationList: [],
      professionList: [],
      userPermissions: {},
      sewaPointList: [],
      selectedEventDetail: {},
      selectedState: '',
      selectedStateName: '',
      selectedDestrict: '',
      selectedDestrictName: '',
      prevRoute: '',
      userRoles: [],
      searchMemberBackState: 'searchMember',
      memberPermission: {},
    };
    this.state = this.defaultState;


    this.actions = {
      getLogin: this.getLogin.bind(this),
      updateLoginStatus: this.updateLoginStatus.bind(this),
      saveResetPasswordEmail: this.saveResetPasswordEmail.bind(this),
      saveUserDetailLogin: this.saveUserDetailLogin.bind(this),
      getProfileDetails: this.getProfileDetails.bind(this),
      setChangeRoleUser: this.setChangeRoleUser.bind(this),
      updateSelectedScreen: this.updateSelectedScreen.bind(this),
      setRoute: this.setRoute.bind(this),
      setTitle: this.setRoute.bind(this),
      updateMemberid: this.updateMemberid.bind(this),
      toggleShowLoader: this.toggleShowLoader.bind(this),
      setSelectedIssue: this.setSelectedIssue.bind(this),
      setSelectedUser: this.setSelectedUser.bind(this),
      getEduProList: this.getEduProList.bind(this),
      setPermissions: this.setPermissions.bind(this),
      setItwingRank: this.setItwingRank.bind(this),
      setSewaPointList: this.setSewaPointList.bind(this),
      saveSelectedEvent: this.saveSelectedEvent.bind(this),
      setSelectedState: this.setSelectedState.bind(this),
      setSelectedDestrict: this.setSelectedDestrict.bind(this),
      setPreviousRoute: this.setPreviousRoute.bind(this),
      setSelectedStateName: this.setSelectedStateName.bind(this),
      setSelectedDestrictName: this.setSelectedDestrictName.bind(this),
      setSearchMemberBackState: this.setSearchMemberBackState.bind(this),
      updateMemberPermission: this.updateMemberPermission.bind(this),
      setUserRoles: this.setUserRoles.bind(this),
    };
  }
  async componentDidMount(){
    this.setState({
      userProfileData : JSON.parse(localStorage.getItem('MemberDetaildet')) || [{}],
      ItwingRank: JSON.parse(localStorage.getItem('ItwingRank')) || '',
      samiti: localStorage.getItem('samiti') || '',
    });
    // await this.getEduProList();
  }
  async getEduProList(){
    const eduList = await user.getEducationList();
    const proList = await user.getProfessionList();
    localStorage.setItem('educationList', JSON.stringify(eduList.educations));
    localStorage.setItem('professionList', JSON.stringify(proList.profession));
    this.setState({educationList : eduList.educations });
    this.setState({professionList : proList.profession });
  }
  async getLogin(email, password){
    return await auth.login(email, password);
  }
  async saveUserDetailLogin(userDetail){
    localStorage.setItem('userId',userDetail.mylog[0].usrid);
    localStorage.setItem('authpassword',userDetail.authpassword);
    localStorage.setItem('power',userDetail.enroll_category_id);
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

  async setRoute(route){
    this.setState({route});
  }
  async setPreviousRoute(prevRoute){
    this.setState({prevRoute});
  }
  async setTitle(title){
    this.setState({title});
  }
  async setChangeRoleUser(changeRoleUser){
    this.setState({changeRoleUser});
  }
  async updateSelectedScreen(screen){
    this.setState({screen});
  }
  async updateMemberid(memberid){
    this.setState({memberid});
  }
  async toggleShowLoader(showLoader){
    this.setState({showLoader});
  }
  async setSelectedIssue(selectedIssue){
    this.setState({selectedIssue});
  }
  async setSelectedUser(selectedUser){
    this.setState({selectedUser});
  }
  async setPermissions(userPermissions){
    this.setState({userPermissions});
  }
  async setItwingRank(ItwingRank){
    this.setState({ItwingRank});
  }
  async setSewaPointList(sewaPointList){
    this.setState({sewaPointList});
  }
  async saveSelectedEvent(selectedEventDetail){
    this.setState({selectedEventDetail});
  }
  async setSelectedState(selectedState){
    this.setState({selectedState});
  }
  async setSelectedStateName(selectedStateName){
    this.setState({selectedStateName});
  }
  async setSelectedDestrictName(selectedDestrictName){
    this.setState({selectedDestrictName});
  }
  async setSelectedDestrict(selectedDestrict){
    this.setState({selectedDestrict});
  }
  async setUserRoles(userRoles){
    this.setState({userRoles});
  }
  async setSearchMemberBackState(searchMemberBackState){
    this.setState({searchMemberBackState});
  }
  async updateMemberPermission(memberPermission){
    this.setState({memberPermission});
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
