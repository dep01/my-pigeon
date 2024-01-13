import create from 'zustand';
import {routes_name} from 'rbase-routes';
import {initIntertitialAds} from 'rbase-helpers/global_store';
import {checkSession} from 'rbase-providers/auth_provider';
import {clearSession,setSession} from 'rbase-helpers/session';
import { SESSION } from 'rbase-helpers/constants';
export function base_state(props) {
  return {
    loading: props?.loading ?? true,
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: async navigation => {
    initIntertitialAds();
    await setSession(SESSION.ADS_COUNT, '5');
    try {
      const ses = await checkSession();
      if (ses.success) {
        navigation.replace(routes_name.HOME);
      } else {
        navigation.replace(routes_name.LOGIN);
      }
    } catch (error) {
      await clearSession();
      navigation.replace(routes_name.LOGIN);
    }
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
};
