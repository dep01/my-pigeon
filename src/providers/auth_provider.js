import {sys_get, sys_post} from 'rbase-helpers/api_client';

const uri = 'auth/';

export async function login(body = {}) {
  try {
    const resp = await sys_post({auth: false, endpoint: uri + 'login', body});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}

export async function checkSession() {
  try {
    const resp = await sys_get({auth: true, endpoint: uri + 'check_session'});
    if (!resp.success)throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}


export async function regist(body = {}) {
  try {
    const resp = await sys_post({auth: false, endpoint: uri + 'regist', body});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}