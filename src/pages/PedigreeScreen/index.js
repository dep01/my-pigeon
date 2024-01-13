import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import shallow from 'zustand/shallow';
import {sys_colors, sys_styles, sys_text_styles} from 'rbase-helpers/constants';
import {action, setter, useStore, base_state} from './store';
import {GlobalHeader} from 'rbase-components/molecules';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'rbase-helpers/responsive';
import {BackButton} from 'rbase-components/atoms';
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
  return (
    <View style={sys_styles.scaffold}>
      <ScrollView
        horizontal={true}
        style={{
          minWidth: widthPercentageToDP(100),
          height: heightPercentageToDP(100),
          padding: 12,
        }}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: heightPercentageToDP(5),
            width: widthPercentageToDP(35),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: sys_colors.text.white,
            borderRadius: 8,
          }}>
          <View style={{flex: 1,alignItems:"center",justifyContent:"center"}}>
            <Text style={sys_text_styles.content_small_black}>CHILD</Text>
            <Text style={sys_text_styles.content_small_black}>{state.child?.ring_no ?? ''}</Text>
          </View>
        </View>
        {state.data.map((val, index) => {
          return (
            <View
              key={index}
              style={{
                minHeight: '100%',
                width: widthPercentageToDP(35),
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginLeft: 10,
                padding: 10,
                overflow: 'scroll',
                marginVertical: 5,
              }}>
              {val.map((value, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      height: heightPercentageToDP(5),
                      width: widthPercentageToDP(35),
                      justifyContent: 'center',
                      backgroundColor: sys_colors.text.white,
                      borderRadius: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={sys_text_styles.content_small_black}>{value?.type ?? ''}</Text>
                    <Text style={sys_text_styles.content_small_black}>{value?.ring_no ?? ''}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}

        <View
          style={{
            height: heightPercentageToDP(5),
            width: widthPercentageToDP(35),
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <View
          style={{
            width: widthPercentageToDP(15),
            height: widthPercentageToDP(15),
            borderRadius: 50,
            position: 'absolute',
            backgroundColor: sys_colors.text.white,
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BackButton
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            color={sys_colors.text.black}
            size={30}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    ...sys_text_styles.header_medium_black,
  },
});
