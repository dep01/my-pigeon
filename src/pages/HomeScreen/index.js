import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import shallow from 'zustand/shallow';
import {
  sys_colors,
  sys_styles,
  sys_text_styles,
  sys_icons,
} from 'rbase-helpers/constants';
import {action, setter, useStore, base_state, menus} from './store';
import {GlobalHeader} from 'rbase-components/molecules';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'rbase-helpers/responsive';
import {ImageHeader} from 'rbase-components/molecules/globalHeader';
import {BackButton, BannerAds, CustomButton} from 'rbase-components/atoms';
import { routes_name } from 'rbase-routes';
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
  return (
    <View style={sys_styles.scaffold}>
      <GlobalHeader title="MY PIGEON" left={<ImageHeader />} right={<BackButton align='flex-end' iconName='logout' onPress={()=>action.confirmationLogOut(navigation)} />} />
      <View style={sys_styles.container_center}>
        <View
          style={{
            width: '100%',
            height: heightPercentageToDP(20),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: sys_colors.text.white,
          }}>
          <Text style={[sys_text_styles.content_black]}>My Pigeon</Text>
          <Text style={[sys_text_styles.header_black, {fontSize: 25}]}>{state.loading?"calculating":state.total}</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical:10
          }}>
          {menus.map((val, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => action.goTo(navigation,val.route)}
                style={{
                  width: widthPercentageToDP(29),
                  height: widthPercentageToDP(29),
                  backgroundColor: sys_colors.text.white,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={sys_text_styles.content_black}>{val.name}</Text>
                </TouchableOpacity>
            );
          })}
        </View>
        <CustomButton title='One Loft Racing by Topigeon' baseWidth='100%' onPress={()=>action.goTo(navigation,routes_name.ONELOFT)} baseHeight={heightPercentageToDP(15)} style={{borderRadius:15}} />
      </View>
      <BannerAds />
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    ...sys_text_styles.header_medium_black,
  },
  inputText: {
    // backgroundColor: sys_colors.text.white,
    flex: 1,
    height: '100%',
    borderRadius: 12,
    padding: 5,
    textAlignVertical: 'center',
    ...sys_text_styles.header_medium_black,
  },
});
