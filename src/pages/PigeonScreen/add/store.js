import {SESSION} from 'rbase-helpers/constants';
import {globalModal} from 'rbase-helpers/global_store';
import {setSession} from 'rbase-helpers/session';
import * as pigeon_provider from 'rbase-providers/pigeon_provider';
import * as pigeon_status_provider from 'rbase-providers/pigeon_status_provider';
import * as feather_provider from 'rbase-providers/feather_provider';
import {routes_name} from 'rbase-routes';
import convert from 'rbase-model/pigeonModel';
import create from 'zustand';
export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    pigeon_status_data: props?.pigeon_status_data ?? [],
    pigeon_status: props?.pigeon_status ?? '',
    feather_colors_id: props?.feather_colors_id ?? '',
    feather_colors_data: props?.feather_colors_data ?? [],
    name: props?.name ?? '',
    ring_no: props?.ring_no ?? '',
    chip_no: props?.chip_no ?? '',
    mother_id: props?.mother_id ?? null,
    father_id: props?.father_id ?? null,
    mother_ring: props?.mother_ring ?? '',
    father_ring: props?.father_ring ?? '',
    mother_data: convert.objectOfpigeonModel(props?.mother_data ?? {}),
    father_data: convert.objectOfpigeonModel(props?.father_data ?? {}),
    achievement: props?.achievement ?? null,
    birth: props?.birth ?? null,
    type: props?.type ?? 'COCK',
    show_date_picker:props?.show_date_picker??false
  };
}
export const pigeon_type = ['COCK', 'HEN', 'YB'];
export const useStore = create(set => base_state());
export const action = {
  initialize: async () => {
    await getPigeonStatus();
    await getFeather();
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
  doInsert,
  setParent,
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  pigeon_status: (value = '') => useStore.setState({pigeon_status: value}),
  pigeon_status_data: (value = []) =>
    useStore.setState({pigeon_status_data: value}),
  feather_colors_id: (value = '') =>
    useStore.setState({feather_colors_id: value}),
  feather_colors_data: (value = []) =>
    useStore.setState({feather_colors_data: value}),
  name: (value = '') => useStore.setState({name: value}),
  ring_no: (value = '') => useStore.setState({ring_no: value}),
  chip_no: (value = '') => useStore.setState({chip_no: value}),
  mother_id: (value = '') => useStore.setState({mother_id: value}),
  father_id: (value = '') => useStore.setState({father_id: value}),
  
  mother_ring: (value = '') => useStore.setState({mother_ring: value}),
  father_ring: (value = '') => useStore.setState({father_ring: value}),
  mother_data: (value = {}) => useStore.setState({mother_data: value}),
  father_data: (value = {}) => useStore.setState({father_data: value}),
  achievement: (value = '') => useStore.setState({achievement: value}),
  birth: (value = '') => useStore.setState({birth: value}),
  type: (value = '') => useStore.setState({type: value}),
  show_date_picker: (value = false) => useStore.setState({show_date_picker: value}),

};
async function getPigeonStatus() {
  setter.loading(true);
  try {
    const resp = await pigeon_status_provider.getAllData();
    setter.pigeon_status_data(resp.data);
    setter.pigeon_status(resp.data[0].id);
  } catch (error) {
    console.log(error);
    globalModal({message: error});
  }
  setter.loading(false);
}

async function getFeather() {
  setter.loading(true);
  try {
    const resp = await feather_provider.getAllData();
    setter.feather_colors_data(resp.data);
    setter.feather_colors_id(resp.data[0].id);
  } catch (error) {
    console.log(error);
    globalModal({message: error});
  }
  setter.loading(false);
}
async function doInsert(navigation) {
  setter.loading(true);
  try {
    const state = base_state(useStore.getState());
    const resp = await pigeon_provider.insertData(state);
    navigation.goBack();
  } catch (error) {
    console.log(error);
    globalModal({message: error});
  }
  setter.loading(false);
}
async function setParent(navigation, type = 'hen') {
  await navigation.navigate(routes_name.PIGEON_SEARCH, {
    type: type,
    onBack: value => {
      // setter.loading(true);
      if (type == 'hen') {
        setter.mother_ring(value.ring_no);
        setter.mother_id(value.id);
      } else {
        setter.father_ring(value.ring_no);
        setter.father_id(value.id);
      }

      // setTimeout(() => setter.loading(false), 100);
    },
  });
}
