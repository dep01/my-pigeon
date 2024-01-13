import {sys_get, sys_post} from 'rbase-helpers/api_client';

const uri = 'pigeon_status';

export async function getAllData() {
  try {
    const resp = await sys_get({auth: true, endpoint: uri + '/get_all'});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}