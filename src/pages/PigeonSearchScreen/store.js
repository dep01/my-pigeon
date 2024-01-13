import {askPermission} from 'rbase-helpers/permission';
import {routes_name} from 'rbase-routes';
import create from 'zustand';
import convert from 'rbase-model/pigeonModel';
import * as pigeon_provider from 'rbase-providers/pigeon_provider';
import {globalModal, globalToast, loadAds} from 'rbase-helpers/global_store';

export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    search: props?.search ?? '',
    type: props?.type ?? '',
    is_refresh: props?.is_refresh ?? false,
    data: convert.listOfpigeonModel(props?.data ?? []),
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: route => {
    setter.type(route.params.type ?? 'hen');
    getData();
  },
  cleanUp: () => useStore.setState(base_state()),
  refresh,
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  is_refresh: (value = false) => useStore.setState({is_refresh: value}),
  search: (value = '') => useStore.setState({search: value}),
  type: (value = '') => useStore.setState({type: value}),
  data: (value = []) =>
    useStore.setState({data: convert.listOfpigeonModel(value)}),
};

async function getData() {
  setter.loading(true);
  try {
    const state = base_state(useStore.getState());
    let resp = null;
    if (state.type == 'hen') {
      resp = await pigeon_provider.getHen();
    } else {
      resp = await pigeon_provider.getCock();
    }
    setter.data(resp.data);
  } catch (error) {
    globalToast({message: error});
  }
  setter.loading(false);
}

async function refresh() {
  setter.is_refresh(true);
  const state = base_state(useStore.getState());
  try {
    let resp = null;
    if (state.type == 'hen') {
      resp = await pigeon_provider.getHen();
    } else {
      resp = await pigeon_provider.getCock();
    }
    setter.data(resp.data);
  } catch (error) {
    globalToast({message: error});
  }
  setter.is_refresh(false);
}
