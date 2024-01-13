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
    is_refresh: props?.is_refresh ?? false,
    data: convert.listOfpigeonModel(props?.data ?? []),
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: route => {
    getData();
  },
  cleanUp: () => useStore.setState(base_state()),
  refresh,
  findFamily
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  is_refresh: (value = false) => useStore.setState({is_refresh: value}),
  search: (value = '') => useStore.setState({search: value}),
  data: (value = []) =>
    useStore.setState({data: convert.listOfpigeonModel(value)}),
};

async function getData() {
  setter.loading(true);
  try {
    const state = base_state(useStore.getState());
    let resp = await pigeon_provider.getAllData()
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
async function findFamily(data, navigation) {
  const cur_state = base_state(useStore.getState());
  let for_push = cur_state.data;
  var data_burung = convert.objectOfpigeonModel(data);
  var list_id = {};
  for (let index = 0; index < cur_state.data.length; index++) {
    var key = cur_state.data[index].ring_no;
    list_id[key] = index;
  }
  for_push.forEach((val, index) => {
    let el = for_push[index];
    el.parent_data.forEach((value, indexing) => {
      let data = for_push[list_id[el.parent_data[indexing].ring_no]];
      el.parent_data[indexing].detail = {};
      if (data) el.parent_data[indexing].detail = data;
    });
  });
  const my_pigeon = for_push[list_id[data_burung.ring_no]];
  my_pedi = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  await recursiveFindFamily(my_pigeon.parent_data, 1);
  const for_pedy = my_pedi.splice(0, 4);
  // console.log(for_pedy)
  loadAds(
    navigation.navigate(routes_name.PEDIGREE, {data: for_pedy, child: data_burung}),
  );
}
let my_pedi = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
async function recursiveFindFamily(data, gen) {
  for (let index = 0; index < data.length; index++) {
    my_pedi[gen - 1].push({
      ring_no: data[index].ring_no,
      type: data[index].type,
    });
  }
  if (data.length <= 0) {
    let i = 1;
    for (let index = gen - 1; index < 10; index++) {
      for (let ind = 0; ind < i; ind++) {
        my_pedi[index].push({});
        my_pedi[index].push({});
      }
      i++;
    }
  }
  gen++;
  for (let index = 0; index < data.length; index++) {
    recursiveFindFamily(data[index]?.detail?.data_induk ?? [], gen);
  }
}

