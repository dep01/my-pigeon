import {sys_get, sys_post} from 'rbase-helpers/api_client';

const uri = 'scrapper/';

export async function oneLoft() {
  try {
    const resp = await sys_get({auth: true, endpoint: uri + 'oneloft'});
    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}

export async function racing(id="") {
  try {
    const resp = await sys_get({auth: true, endpoint: uri + 'racing?id='+id});

    if (!resp.success) throw resp;
    return resp;
  } catch (error) {
    throw error.message;
  }
}