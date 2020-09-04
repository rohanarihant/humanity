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
        return res;
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
  };
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
      getHazri: async (userid, authpassword, power, pagging = 0) => postData({
          endpoint: 'api/download_sewareport/',
          data: { userid, authpassword, power, pagging },
      }),
      getOfficialHandler: async (userid, authpassword, gender) => postData({
          endpoint: 'api/get_official_handler_list/',
          data: { userid, authpassword, gender },
      }),
  };