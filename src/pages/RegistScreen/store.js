import {SESSION} from 'rbase-helpers/constants';
import {globalModal} from 'rbase-helpers/global_store';
import {setSession} from 'rbase-helpers/session';
import {regist} from 'rbase-providers/auth_provider';
import {routes_name} from 'rbase-routes';
import create from 'zustand';
export function base_state(props) {
  return {
    loading: props?.loading ?? false,
    show_password: props?.show_password ?? true,
    username: props?.username ?? '',
    password: props?.password ?? '',
    retype_password: props?.retype_password ?? '',
    first_name: props?.first_name ?? '',
    last_name: props?.last_name ?? '',
    email: props?.email ?? '',
    phone: props?.phone ?? '',
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: () => {},
  cleanUp: () => {
    useStore.setState(base_state());
  },
  doRegist,
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  show_password: (value = false) => useStore.setState({show_password: value}),
  username: (value = '') => useStore.setState({username: value}),
  password: (value = '') => useStore.setState({password: value}),
  retype_password: (value = '') => useStore.setState({retype_password: value}),
  first_name: (value = '') => useStore.setState({first_name: value}),
  last_name: (value = '') => useStore.setState({last_name: value}),
  email: (value = '') => useStore.setState({email: value}),
  phone: (value = '') => useStore.setState({phone: value}),
};

async function doRegist(navigation) {
  setter.loading(true);
  try {
    const state = base_state(useStore.getState());
    if (state.username.length < 6) {
      setter.loading(false);
      return globalModal({message: 'Username minimum 6 digit!'});
    }
    if (state.password < 6) {
      setter.loading(false);
      return globalModal({message: 'Password minimum 6 digit!'});
    }
    if (state.password != state.retype_password) {
      setter.loading(false);
      return globalModal({message: 'Password confirmation not same!'});
    }
    const resp = await regist(state);
    if (resp.success) {
      await setSession(SESSION.ACCESS_TOKEN, resp.data.access_token);
      navigation.popToTop();
      navigation.replace(routes_name.HOME);
    }
  } catch (error) {
    console.log(error);
    globalModal({message: error});
  }
  setter.loading(false);
}
