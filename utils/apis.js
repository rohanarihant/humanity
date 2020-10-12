const fetch = require('isomorphic-fetch');
import {API_URLS} from '../constants/url';
async function fetchData({
    endpoint, data, method, token,
  }) {
  
    const url = `${API_URLS}${endpoint}`;
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'X-Requested-With',
      },
      method,
    };
    if (method !== 'GET') {
      var formData = new FormData();
      for (var k in data) {
        formData.append(k, data[k]);
      }
    
      options.body = formData;
    }
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        /*eslint-disable */
        if (response.status === 204) {
          return undefined;
        }
        const res = await response.json();
        if(!res.success && res.message === 'Device not found'){
          localStorage.removeItem('userId');
          localStorage.removeItem('authpassword');
        }else{
          return res;
        }
      }
    } catch (err) {
      throw err;
    }
  }


  const deleteData = ({
    endpoint, data, token, notJson, msType,
  }) => fetchData({
    method: 'DELETE',
    endpoint,
    data,
    token,
    notJson,
    msType,
  });
  const getData = ({
    endpoint, data, token, isCached, msType,
  }) => fetchData({
    method: 'GET',
    endpoint,
    data,
    token,
    isCached,
    msType,
  });
  const patchData = ({
    endpoint, data, token, msType,
  }) => fetchData({
    method: 'PATCH',
    endpoint,
    data,
    token,
    msType,
  });
  const postData = ({
    endpoint, data, token,
  }) => fetchData({
    method: 'POST',
    endpoint,
    data,
    token,
  });
  const putData = ({
    endpoint, data, token, msType,
  }) => fetchData({
    method: 'PUT',
    endpoint,
    data,
    token,
    msType,
  });

  export const auth = {
      register: async user => postData({
        endpoint: 'login/registeracc/',
        data: user,
      }),
      login: async (userlog, password) => postData({
        endpoint: 'login/login_me/',
        data: { userlog, password },
      }),
      searchBlock: async (blockname) => postData({
        endpoint: 'api/select_block_new',
        data: { blockname },
      }),
      resetPassword: async resetpwd => postData({
          endpoint: 'login/reset_password',
          data: { resetpwd },
      }),
      validatePassword: async (checkresetcode, mail) => postData({
          endpoint: 'login/check_passcode',
          data: { checkresetcode, mail },
      }),
      updatePassword: async (newpassword, code, password) => postData({
        endpoint: 'login/update_newpassword/',
        data: { newpassword, code, password },
      }),
      updateUser: async (userid, authpassword, mobno, wmobno, othermail, twitter, education, profession, skills, device, othertwitter) => postData({
        endpoint: 'api/update_profile/',
        data: { userid, authpassword, mobno, wmobno, othermail, twitter, education, profession, skills, device, othertwitter },
      }),
      checkLoginStatus: async (userid, authpassword) => postData({
        endpoint: 'api/check_login/',
        data: { userid, authpassword },
      }),
      changePassword: async (userid, authpassword, oldpwd, newpwd) => postData({
        endpoint: 'api/change_password/',
        data: { userid, authpassword, oldpwd, newpwd },
      }),
      uploadImage: async (userid, authpassword, image, name) => postData({
        endpoint: 'uploadprofile/upload/',
        data: { userid, authpassword, image, name },
      }),
  };
  export const commonMethods = {
      getAllStates: async (userid, authpassword, power, countryid, stateid) => postData({
          endpoint: 'api/select_state_list/',
          data: { userid, authpassword, power, countryid, stateid },
      })
    }
  export const user = {
      getProfile: async (userid, authpassword) => postData({
          endpoint: 'api/my_profile/',
          data: { userid, authpassword },
      }),
      getMyTeam: async (userid, authpassword, power, gender, countryid, stateid) => postData({
          endpoint: 'api/my_teamdetail/',
          data: { userid, authpassword, power, gender, countryid, stateid },
      }),
      addHazri: async (userid, authpassword, sewaat, sewadid, sewadate, hajri) => postData({
          endpoint: 'api/add_mysewa/',
          data: { userid, authpassword, sewaat, sewadid, sewadate, hajri },
      }),
      deleteHazri: async (userid, authpassword, power, gender, sewaid) => postData({
          endpoint: 'api/delete_hazri',
          data: { userid, authpassword, power, gender, sewaid },
      }),
      getHazri: async (userid, authpassword, power, fromdate, todate, pagging) => postData({
          endpoint: 'api/download_sewareport/',
          data: { userid, authpassword, power, fromdate, todate, pagging},
      }),
      getOfficialHandler: async (userid, authpassword, gender) => postData({
          endpoint: 'api/get_official_handler_list/',
          data: { userid, authpassword, gender },
      }),
      deleteProfile: async (userid, authpassword, gender) => postData({
          endpoint: 'api/delete_member/',
          data: { userid, authpassword, gender },
      }),
      addSewa: async (userid, authpassword, gender, points_entrydata, countryid, stateid, distidd, blockid, postdate) => postData({
          endpoint: 'api/send_points/',
          data: { userid, authpassword, gender, points_entrydata, countryid, stateid, distidd, blockid, postdate },
      }),
      getEducationList: async () => postData({
          endpoint: 'api/select_education/',
          data: {  },
      }),
      getProfessionList: async () => postData({
          endpoint: 'api/select_profession/',
          data: { },
      }),
  };
  export const events = {
    getEvents: async (userid, authpassword, gender, power, countryid, stateid, blockid, timing) => postData({
      endpoint: 'api/upcoming_events/',
      data: { userid, authpassword, gender, power, countryid, stateid, blockid, timing },
    }),
    addEvent: async (userid, authpassword, gen, nameof, countryid, stateid, distidd,
      block, startdate, enddate, detail, mm, nm, sm, dm, bm, tm, stateids, power) => postData({
      endpoint: 'api/create_events/',
      data: { userid, authpassword, gen, nameof, countryid, stateid, distidd,
        block, startdate, enddate, detail, mm, nm, sm, dm, bm, tm, stateids, power },
    }),
    getPointsList: async (userid, authpassword, gender) => postData({
      endpoint: 'api/get_point_list/',
      data: { userid, authpassword, gender },
    }),
  };
  export const issues = {
    getAllIssues: async (userid, authpassword, gender, power) => postData({
      endpoint: 'api/fetch_issue/',
      data: { userid, authpassword, gender, power },
    }),
    closeIssue: async (userid, authpassword, power, issueid, issueclose) => postData({
      endpoint: 'api/fetch_issue_byid/',
      data: { userid, authpassword, power, issueid, issueclose },
    }),
    addCommentIssue: async (userid, authpassword, power, issue, sendto, issueby, type, issueids, senddate) => postData({
      endpoint: 'api/addissue_comment/',
      data: { userid, authpassword, power, issue, sendto, issueby, type, issueids, senddate },
    }),
    addIssue: async (userid, authpassword, power, issue, sendto, issueby, type, issueids, senddate, gender, image) => postData({
      endpoint: 'api/addissue/',
      data: { userid, authpassword, power, issue, sendto, issueby, type, issueids, senddate, gender, image },
    })
  };
  export const searchUsers = {
    listUserSearch: async (userid, authpassword, gender, searchmymem, power) => postData({
      endpoint: 'api/search_member/',
      data: { userid, authpassword, gender, searchmymem, power },
    }),
    updateUserRole: async (userid, authpassword, gender, searchmymem, power) => postData({
      endpoint: 'api/updaterole/',
      data: { userid, authpassword, gender, searchmymem, power },
    }),
    getUserRoles: async (fetchroles) => postData({
      endpoint: 'api/select_role/',
      data: { fetchroles },
    }),
    updateUserPermission: async (userid, authpassword, power, updatepermission, uby, appmem, singlestate, allstate, downloadpoints, sendbroadcast) => postData({
      endpoint: 'api/updatepermission/',
      data: { userid, authpassword, power, updatepermission, uby, appmem, singlestate, allstate, downloadpoints, sendbroadcast },
    }),
    getUserDetail: async (userid, authpassword, memberid) => postData({
      endpoint: 'api/fetch_memberdetail/',
      data: { userid, authpassword, memberid},
    }),
  };
  export const download = {
    downloadMembers: async (userid, authpassword, countryid, gender) => postData({
      endpoint: `downloadapi/download_selected_state_json/${userid}/${authpassword}/${countryid}/${gender}`,
      data: {}
    }),
  };
  export const accountApproval = {
    fetchPendingAccounts: async (userid, authpassword,power, countryid, stateid, gender) => postData({
      endpoint: `api/fetch_pendingaccount/`,
      data: {userid, authpassword,power, countryid, stateid, gender}
    }),
    fetchUserDetail: async (userid, authpassword, memberid) => postData({
      endpoint: `api/fetch_memberdetail/`,
      data: {userid, authpassword, memberid}
    }),
    approveAccount: async (userid, authpassword, power, account_id, emailid, name, dmname, dmcon, dmcommnts, role, humanityid, enroll_id) => postData({
      endpoint: `api/approveaccount/`,
      data: {userid, authpassword, power, account_id, emailid, name, dmname, dmcon, dmcommnts, role, humanityid, enroll_id}
    }),
    rejectAccount: async (userid, authpassword, power, countryid, reason, memberid) => postData({
      endpoint: `api/delete_member/`,
      data: {userid, authpassword, power, countryid, reason, memberid}
    }),
  };
  export const results = {
    getPointResults: async (userid, authpassword, power, countryid, state_id, dist_id, block_id, gender) => postData({
      endpoint: `api/get_point_result/`,
      data: {userid, authpassword, power, countryid, state_id, dist_id, block_id, gender}
    }),
    getDistrictPointResults: async (userid, authpassword, power, countryid, state_id, dist_id, block_id, gender) => postData({
      endpoint: `api/get_point_result_dist/`,
      data: {userid, authpassword, power, countryid, state_id, dist_id, block_id, gender}
    }),
    getBlockPointResults: async (userid, authpassword, power, countryid, state_id, dist_id, block_id, gender, distid) => postData({
      endpoint: `api/get_point_result_block/`,
      data: {userid, authpassword, power, countryid, state_id, dist_id, block_id, gender, distid}
    }),
  };

  