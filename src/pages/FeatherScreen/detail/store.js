import {globalModal} from 'rbase-helpers/global_store';
import * as feather_provider from 'rbase-providers/feather_provider';
import {routes_name} from 'rbase-routes';
import convert from 'rbase-model/featherModel';
import create from 'zustand';
export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    id: props?.id ?? null,
    is_edit: props?.is_edit ?? false,
    data: convert.objectOffeatherModel(props?.data ?? {}),
    name: props?.name ?? '',
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: async route => {
    setter.data(route.params.data);
    setter.id(route.params.data.id);
    setter.name(route.params.data.name);
    setter.loading(false);
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
  doUpdate,
  revertValues,
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  is_edit: (value = false) => useStore.setState({is_edit: value}),
  id: (value = '') => useStore.setState({id: value}),
  data: (value = {}) => useStore.setState({data: convert.objectOffeatherModel(value)}),
  name: (value = '') => useStore.setState({name: value}),
};
function revertValues() {
  const state = base_state(useStore.getState());
  setter.is_edit(false);
  setter.name(state.data?.name ?? null);
}
async function doUpdate(navigation) {
  setter.loading(true);
  try {
    const state = base_state(useStore.getState());
    const resp = await feather_provider.updateData(state, state.id);
    navigation.goBack();
  } catch (error) {
    console.log(error);
    globalModal({message: error});
  }
  setter.loading(false);
}
