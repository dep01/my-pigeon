import {globalModalConfirmation, loadAds} from 'rbase-helpers/global_store';
import {routes_name} from 'rbase-routes';
import create from 'zustand';
import {countData} from 'rbase-providers/pigeon_provider'
import { clearSession } from 'rbase-helpers/session';
export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    total:props?.total??0
  };
}
export const menus = [
  {
    name: 'Pigeon',
    route: routes_name.PIGEON,
  },
  {
    name: 'Pedigree',
    route: routes_name.PIGEON_ALL,
  },
  {
    name: 'Feather',
    route: routes_name.FEATHER,
  },
];
export const useStore = create(set => base_state());
export const action = {
  initialize: async() => {
    setter.loading(true);
    try {
      const resp = await countData();
      setter.total(resp.data);
    } catch (error) {
      
    }
    setter.loading(false);
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
  goTo,
  confirmationLogOut
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  total: (value = 0) => useStore.setState({total: value}),
};
async function goTo(navigation, route) {
  loadAds(navigation.navigate(route));
}
async function confirmationLogOut(navigation){
  globalModalConfirmation({
    message:"Are you sure want to logout?",
    action:async()=>{
      await clearSession();
      navigation.popToTop();
      navigation.replace(routes_name.LOGIN);
    }
  })
}
