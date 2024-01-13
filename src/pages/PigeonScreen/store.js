import {askPermission} from 'rbase-helpers/permission';
import {routes_name} from 'rbase-routes';
import create from 'zustand';
import convert from 'rbase-model/pigeonModel';
import * as pigeon_provider from 'rbase-providers/pigeon_provider'
import {globalModal, globalToast, loadAds} from 'rbase-helpers/global_store';


export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    search: props?.search ?? '',
    is_refresh: props?.is_refresh ?? false,
    is_loadmore: props?.is_loadmore ?? false,
    is_end_of_data: props?.is_end_of_data ?? false,
    data: convert.listOfpigeonModel(props?.data ?? []),
    page:props?.page??1
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: () => {
    getData();
  },
  cleanUp: () => useStore.setState(base_state()),
  refresh,
  findFamily,
  load_more,
  addPage,
  goDetail
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  is_refresh: (value = false) => useStore.setState({is_refresh: value}),
  is_end_of_data: (value = false) => useStore.setState({is_end_of_data: value}),
  is_loadmore: (value = false) => useStore.setState({is_loadmore: value}),
  search: (value = '') => useStore.setState({search: value}),
  page: (value = 1) => useStore.setState({page: value}),
  data: (value = []) =>
    useStore.setState({data: convert.listOfpigeonModel(value)}),
};


async function getData() {
  setter.loading(true);
  setter.page(1);
  const state = base_state(useStore.getState())
  try {
    const resp = await pigeon_provider.getData({search:state.search,page:state.page});
    setter.data(resp.data.data);
    if(resp.data.total_page ==resp.data.current_page){
      setter.is_end_of_data(true);
    }
  } catch (error) {
    globalToast({message:error})
  }
  setter.loading(false);

}

async function refresh() {
  setter.is_refresh(true);
  setter.page(1);
  setter.is_end_of_data(false)
  const state = base_state(useStore.getState())
  try {
    const resp = await pigeon_provider.getData({search:state.search,page:state.page});
    setter.data(resp.data.data);
    if(resp.data.total_page ==resp.data.current_page){
      setter.is_end_of_data(true);
    }
  } catch (error) {
    globalToast({message:error})
  }
  setter.is_refresh(false);
}
async function load_more(){
  const state = base_state(useStore.getState())
  if(!state.is_end_of_data &&!state.is_loadmore&&!state.is_refresh){
    setter.is_loadmore(true)
    try {
      setter.page(state.page+1);
      const resp = await pigeon_provider.getData({page:state.page+1,search:state.search});
      setter.data([...state.data,...resp.data.data])
      if(resp.data.total_page ==resp.data.current_page){
        setter.is_end_of_data(true);
      }

      setter.is_loadmore(false)
    } catch (error) {
      setter.is_loadmore(false)
      
    }
  }

}
async function goDetail(navigation,id){
  // console.log(id);
  navigation.navigate(routes_name.PIGEON_DETAIL,{id:id})
}
async function findFamily(data, navigation) {
  const cur_state = base_state(useStore.getState());
  let for_push = cur_state.data;
  var data_burung = convert.objectOfburungModel(data);
  var list_id = {};
  for (let index = 0; index < cur_state.data.length; index++) {
    var key = cur_state.data[index].ring_no;
    list_id[key] = index;
  }
  for_push.forEach((val, index) => {
    let el = for_push[index];
    el.data_induk.forEach((value, indexing) => {
      let data = for_push[list_id[el.data_induk[indexing].ring_no]];
      el.data_induk[indexing].detail = {};
      if (data) el.data_induk[indexing].detail = data;
    });
  });
  const my_pigeon = for_push[list_id[data_burung.ring_no]];
  my_pedi = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  await recursiveFindFamily(my_pigeon.data_induk, 1);
  const for_pedy = my_pedi.splice(0, 4);
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

function addPage(navigation){
  navigation.navigate(routes_name.PIGEON_ADD)
}