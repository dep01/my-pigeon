import {routes_name} from 'rbase-routes';
import create from 'zustand';
import convert from 'rbase-model/featherModel';
import * as feather_provider from 'rbase-providers/feather_provider';
import {globalModal, globalToast, loadAds} from 'rbase-helpers/global_store';

export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    search: props?.search ?? '',
    is_refresh: props?.is_refresh ?? false,
    data: convert.listOffeatherModel(props?.data ?? []),
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: () => {
    getData();
  },
  cleanUp: () => useStore.setState(base_state()),
  refresh,
  addPage,
  goToDetail
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  is_refresh: (value = false) => useStore.setState({is_refresh: value}),
  search: (value = '') => useStore.setState({search: value}),
  data: (value = []) =>
    useStore.setState({data: convert.listOffeatherModel(value)}),
};

async function getData() {
  setter.loading(true);
  try {
    let resp = await feather_provider.getAllData()
    setter.data(resp.data);
  } catch (error) {
    globalToast({message: error});
  }
  setter.loading(false);
}

async function refresh() {
  setter.is_refresh(true);
  try {
    
    let resp = await feather_provider.getAllData()
    setter.data(resp.data);
    setter.data(resp.data);
  } catch (error) {
    globalToast({message: error});
  }
  setter.is_refresh(false);
}

function addPage(navigation) {
  navigation.navigate(routes_name.FEATHER_ADD)
}

function goToDetail(val,navigation) {
  navigation.navigate(routes_name.FEATHER_SEARCH,{data:val})
}