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
      <GlobalHeader left={<BackButton />} title="FEATHER"
      
      right={
        <BackButton
          iconName="plus"
          style={{alignItems: 'center',justifyContent:"center"}}
          onPress={() => action.addPage(navigation)}
        />
      } />
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
            val.name.toLowerCase().includes(state.search.toLowerCase()) 
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
            onPress={() => value.item.is_all?null:action.goToDetail(value.item,navigation)}
            style={{
              width: '100%',
              minHeight: heightPercentageToDP(5),
              backgroundColor:
                !value.item.is_all
                  ? sys_colors.text.white
                  : sys_colors.icon.unactive,
              borderRadius: 12,
              padding: 8,
              margin: 8,
              alignItems: 'center',
            }}>
            <View style={{width: '100%', flex: 1}}>
              <SpaceText
                left={value?.item?.name??'-'}
                leftStyle={styles.titleText}
                rightStyle={[styles.titleText, {textAlign: 'right'}]}
              />
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
