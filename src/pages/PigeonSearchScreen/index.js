import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import shallow from 'zustand/shallow';
import {
  sys_colors,
  sys_icons,
  sys_styles,
  sys_text_styles,
} from 'rbase-helpers/constants';
import {action, setter, useStore, base_state} from './store';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'rbase-helpers/responsive';
import {
  BackButton,
  BannerAds,
  CustomInput,
  DividerFullHeigth,
  EmptyComponent,
  LoadingIndicator,
  SpaceText,
} from 'rbase-components/atoms';
import {GlobalHeader} from 'rbase-components/molecules';
import {SysDateTransform, SysOldMonts} from 'rbase-helpers/global_store';
export default ({navigation, route}) => {
  const state = {
    ...useStore(state => base_state(state), shallow),
  };

  useEffect(() => {
    action.initialize(route);
    return () => {
      action.cleanUp();
    };
  }, [navigation, action]);
  return state.loading ? (
    <LoadingIndicator />
  ) : (
    <View style={sys_styles.scaffold}>
      <GlobalHeader left={<BackButton />} title="PIGEON" />
      <View
        style={{
          width: '100%',
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Searh data.."
          value={state.search}
          onChangeText={val => {
            setter.search(val);
            if (val == '') {
              action.refresh();
            }
          }}
          style={styles.inputText}
        />
      </View>
      <FlatList
        data={state.data.filter(
          val =>
            val.name.toLowerCase().includes(state.search.toLowerCase()) ||
            val.ring_no.toLowerCase().includes(state.search.toLowerCase()),
        )}
        style={styles.scrollContainer}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        onRefresh={() => action.refresh()}
        refreshing={state.is_refresh}
        ListFooterComponent={<DividerFullHeigth />}
        ListEmptyComponent={
          <View
            style={{
              height: heightPercentageToDP(80),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EmptyComponent action={() => action.refresh()} />
          </View>
        }
        keyExtractor={val => val.id}
        renderItem={value => (
          <Pressable
            onPress={() => {
              route.params.onBack(value.item);
              navigation.goBack();
            }}
            style={{
              width: '100%',
              minHeight: heightPercentageToDP(15),
              backgroundColor:
                value.item.pigeon_status_name == 'ALIVE'
                  ? sys_colors.text.white
                  : sys_colors.icon.unactive,
              borderRadius: 12,
              padding: 8,
              margin: 8,
              alignItems: 'center',
            }}>
            <View style={{width: '100%', flex: 1}}>
              <SpaceText
                right={value?.item?.chip_no == '' ? '-' : value.item.chip_no}
                leftStyle={styles.boldText}
                rightStyle={[styles.boldText, {textAlign: 'right'}]}
                left={`${
                  value?.item?.ring_no == '' ? '-' : value.item.ring_no
                }`}
              />
              <SpaceText
                left={`${value?.item?.name == '' ? '-' : value.item.name}`}
                right={value.item.type == '' ? '-' : value.item.type}
                leftStyle={styles.titleText}
                rightStyle={[styles.titleText, {textAlign: 'right'}]}
              />
              <SpaceText
                left={`${
                  value?.item?.birth == null
                    ? 'No birth data'
                    : SysDateTransform({
                        date: value.item.birth,
                        type: 'short',
                        withTime: false,
                      })
                }`}
                right={
                  value?.item?.birth == null
                    ? '-'
                    : SysOldMonts({date: value.item.birth})
                }
                leftStyle={styles.titleText}
                rightStyle={[styles.titleText, {textAlign: 'right'}]}
              />
              <Text style={styles.boldText}>
                {value?.item?.achievement ?? 'No Achievement'}
              </Text>
            </View>
          </Pressable>
        )}
      />
      <BannerAds />
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    ...sys_text_styles.content_medium_black,
    overflow: 'hidden',
    textAlign: 'left',
  },
  boldText: {
    ...sys_text_styles.header_medium_black,
    overflow: 'hidden',
    textAlign: 'left',
  },
  inputText: {
    backgroundColor: sys_colors.text.white,
    flex: 1,
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 5,
    ...sys_text_styles.content_medium_black,
  },
  scrollContainer: {
    ...sys_styles.scroll_container,
    paddingTop: 0,
  },
  containerCard: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
  },
});
