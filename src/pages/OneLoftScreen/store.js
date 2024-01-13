import create from 'zustand';
import convert from 'rbase-model/oneLoftRacingModel'
import {oneLoft} from 'rbase-providers/one_loft_provider'
import { globalModal } from 'rbase-helpers/global_store';
import { routes_name } from 'rbase-routes';

export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    is_refresh: props?.is_refresh ?? false,
    data:convert.listOfoneLoftRacingModel(props?.data??[]),
    search:props?.search??"",
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: async() => {
    await getData();
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
  refresh,goToDetail
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  is_refresh: (value = false) => useStore.setState({is_refresh: value}),
  search: (value = "") => useStore.setState({search: value}),
  data: (value = []) => useStore.setState({data: convert.listOfoneLoftRacingModel(value)}),
};

async function getData(){
  setter.loading(true);
  try {
    const resp = await oneLoft();
    setter.data(resp.data);
  } catch (error) {
    globalModal({message:error})
  }
  setter.loading(false);
}

async function refresh(){
  setter.is_refresh(true);
  try {
    const resp = await oneLoft();
    setter.data(resp.data);
  } catch (error) {
    globalModal({message:error})
  }
  setter.is_refresh(false);
}
async function goToDetail(navigation,url){
  navigation.navigate(routes_name.ONELOFT_DETAIL,{uri:url})
}