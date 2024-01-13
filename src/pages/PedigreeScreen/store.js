import create from 'zustand';
import convert from 'rbase-model/burungModel'
export function base_state(props) {
  return {
    loading: props?.loading ?? true,
    data:props?.data??[[]],
    child:convert.objectOfburungModel(props?.child??{})
  };
}
export const useStore = create(set => base_state());
export const action = {
  initialize: (route) => {
    setter.data(route?.params?.data??[[]]);
    // console.log(route.params.child)
    setter.child(route?.params?.child??{});
    
  },
  cleanUp: () => {
    useStore.setState(base_state());
  },
};
export const setter = {
  loading: (value = false) => useStore.setState({loading: value}),
  data: (value = [[]]) => useStore.setState({data: value}),
  child: (value = {}) => useStore.setState({child: value}),
};
