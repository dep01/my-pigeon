import create from 'zustand';
import convert from 'rbase-model/oneLoftRacingDetailModel'
import {racing} from 'rbase-providers/one_loft_provider'
import { globalModal } from 'rbase-helpers/global_store';
import {useNavigation} from '@react-navigation/native';

export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    is_refresh: props?.is_refresh ?? false,
    data:convert.objectOfoneLoftRacingDetailModel(props?.data??{}),
    search:props?.search??"",
    id:props?.id??"",
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: async(route,navigation) => {
    setter.id(route.params.uri);
    await getData(navigation);
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
  refresh
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  is_refresh: (value = false) => useStore.setState({is_refresh: value}),
  search: (value = "") => useStore.setState({search: value}),
  id: (value = "") => useStore.setState({id: value}),
  data: (value = {}) => useStore.setState({data: convert.objectOfoneLoftRacingDetailModel(value)}),
};

async function getData(navigation){
  // const navigation = useNavigation();
  setter.loading(true);
  const state = base_state(useStore.getState())
  try {
    const resp = await racing(state.id);
    setter.data(resp.data);
  } catch (error) {
    navigation.goBack();
    globalModal({message:error});

  }
  setter.loading(false);
}

async function refresh(){
  setter.is_refresh(true);
  const state = base_state(useStore.getState())

  try {
    const resp = await racing(state.id);
    setter.data(resp.data);
  } catch (error) {
    globalModal({message:error})
  }
  setter.is_refresh(false);
}
