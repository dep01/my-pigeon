import {sys_get, sys_post,sys_put} from 'rbase-helpers/api_client';
import { limit_table } from 'rbase-helpers/global_store';

const uri = 'feather';

export async function getAllData() {
  try {
    const resp = await sys_get({auth: true, endpoint: uri + '/get_all'});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}

export async function getById({id=""}) {
  try {
    const resp = await sys_get({auth: true, endpoint: uri + `/${id}`});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}

export async function insertData({name=""}) {
  try {
    const resp = await sys_post({auth: true, endpoint:uri,body:{name:name}});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}



export async function updateData(data={},id="") {
  try {
    const resp = await sys_put({auth: true, endpoint: uri + `/${id}`,body:data});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}