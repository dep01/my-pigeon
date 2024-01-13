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
export default ({navigation}) => {
  const state = {
    ...useStore(state => base_state(state), shallow),
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      action.initialize();
    });
    return () => {
      action.cleanUp();
      unsubscribe;
    };
  }, [navigation, action]);
  return state.loading ? (
    <LoadingIndicator />
  ) : (
    <View style={sys_styles.scaffold}>
      <GlobalHeader
        left={<BackButton />}
        title="PIGEON"
        right={
          <BackButton
            iconName="plus"
            style={{alignItems: 'center',justifyContent:"center"}}
            onPress={() => action.addPage(navigation)}
          />
        }
      />
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
        {state.search != '' ? (
          <BackButton
            style={{
              backgroundColor: sys_colors.text.white,
              width: '10%',
              height: heightPercentageToDP(7),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setter.search('');
              action.refresh();
            }}
            iconName={'close'}
          />
        ) : null}
        <BackButton
          style={{
            backgroundColor: sys_colors.text.white,
            width: '10%',
            height: heightPercentageToDP(7),
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            state.search == '' ? null : action.refresh();
          }}
          iconName={'magnify'}
        />
      </View>
      <FlatList
        data={state.data}
        style={styles.scrollContainer}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        onRefresh={() => action.refresh()}
        refreshing={state.is_refresh}
        onEndReachedThreshold={0.2}
        onEndReached={() => action.load_more()}
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
            onPress={() => action.goDetail(navigation, value.item.id)}
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
