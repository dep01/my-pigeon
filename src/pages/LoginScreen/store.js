import {askPermission} from 'rbase-helpers/permission';
import {routes_name} from 'rbase-routes';
import {login} from 'rbase-providers/auth_provider';
import create from 'zustand';
import {globalModal} from 'rbase-helpers/global_store';
import {setSession} from 'rbase-helpers/session';
import {SESSION} from 'rbase-helpers/constants';

export function base_state(props) {
  return {
    loading: props?.loading ?? false,
    showPassword: props?.showPassword ?? true,
    username: props?.username ?? '',
    password: props?.password ?? '',
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: () => {
    askPermission();
  },
  cleanUp: () => useStore.setState(base_state()),
  doLogin,
  oneLoft
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  password: (value = '') => useStore.setState({password: value}),
  username: (value = '') => useStore.setState({username: value}),
  showPassword: () =>
    useStore.setState({showPassword: !useStore.getState().showPassword}),
};

async function doLogin(navigation) {
  setter.loading(true);
  const state = base_state(useStore.getState());
  try {
    const resp = await login({
      username: state.username,
      password: state.password,
    });
    await setSession(SESSION.ACCESS_TOKEN, resp.data.access_token);
    
    navigation.replace(routes_name.HOME);
  } catch (error) {
    globalModal({message: error});
  }
  setter.loading(false);
}

async function oneLoft(navigation) {
  setter.loading(true);
  try {
    navigation.navigate(routes_name.ONELOFT);
  } catch (error) {
    globalModal({message: error});
  }
  setter.loading(false);
}
