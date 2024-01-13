import {SESSION} from 'rbase-helpers/constants';
import {globalModal} from 'rbase-helpers/global_store';
import {setSession} from 'rbase-helpers/session';
import * as feather_provider from 'rbase-providers/feather_provider';
import {routes_name} from 'rbase-routes';
import create from 'zustand';
export function base_state(props) {
  return {
    loading: props?.loading ?? false,
    name: props?.name ?? ''
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: async () => {
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
  doInsert,
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  name: (value = '') => useStore.setState({name: value}),
};
async function doInsert(navigation) {
  setter.loading(true);
  try {
    const state = base_state(useStore.getState());
    const resp = await feather_provider.insertData(state);
    navigation.goBack();
  } catch (error) {
    console.log(error);
    globalModal({message: error});
  }
  setter.loading(false);
}
