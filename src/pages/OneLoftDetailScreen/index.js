import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import shallow from 'zustand/shallow';
import {
  sys_colors,
  sys_font,
  sys_styles,
  sys_text_styles,
} from 'rbase-helpers/constants';
import {action, setter, useStore, base_state} from './store';
import {GlobalHeader} from 'rbase-components/molecules';
import {
  BackButton,
  BannerAds,
  DividerFullHeigth,
  EmptyComponent,
  LoadingIndicator,
} from 'rbase-components/atoms';
import {heightPercentageToDP} from 'rbase-helpers/responsive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SysDateTransform, SysDecodeHours} from 'rbase-helpers/global_store';
export default ({navigation, route}) => {
  const state = {
    ...useStore(state => base_state(state), shallow),
  };

  useEffect(() => {
    action.initialize(route,navigation);
    return () => {
      action.cleanUp();
    };
  }, [navigation, action]);
  return state.loading ? (
    <LoadingIndicator />
  ) : (
    <View style={sys_styles.scaffold}>
      <GlobalHeader left={<BackButton />} title="One Loft Racing" />
      <View
        style={{
          width: '100%',
          minHeight: heightPercentageToDP(20),
          justifyContent: 'center',
          padding:12,
          backgroundColor:sys_colors.text.white
        }}>
        <Text style={sys_text_styles.header_small_black}>
          {state.data.detail.name}
        </Text>
        <Text style={sys_text_styles.content_small_black}>
          {state.data.detail.race_name}
        </Text>
        <Text style={sys_text_styles.header_small_black}>
          Liberation Time
        </Text>
        <Text style={sys_text_styles.content_small_black}>
          {state.data.detail.liberation_time == ''
            ? 'No Data'
            : SysDateTransform({
                date: state.data.detail.liberation_time.replace(/\u00A0/," "),
                checkIsToDay:false,
                withTime: true,
              })}
        </Text>
        <Text style={sys_text_styles.header_small_black}>Cut Off</Text>
        <Text style={sys_text_styles.content_small_black}>
          {state.data.detail.cut_off == ''
            ? 'No Data'
            : SysDateTransform({
                date: state.data.detail.cut_off.replace(/\u00A0/," "),
                checkIsToDay:false,
                withTime: true,
              })}
        </Text>

        <Text style={sys_text_styles.header_small_black}>Distance</Text>
        <Text style={sys_text_styles.content_small_black}>
          {state.data.detail.distance==""? 'No Data':state.data.detail.distance}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          height: heightPercentageToDP(10),
        }}>
        <TextInput
          placeholder="Search data.."
          value={state.search}
          onChangeText={val => setter.search(val)}
          style={styles.inputText}
        />
      </View>
      <FlatList
        style={styles.container}
        data={state.data.data.filter(
          val =>
            val.ring.toLowerCase().includes(state.search.toLowerCase()) ||
            val.loft.toLowerCase().includes(state.search.toLowerCase()) ||
            val.rank.toLowerCase().includes(state.search.toLowerCase()),
        )}
        showsVerticalScrollIndicator={false}
        onRefresh={() => action.refresh()}
        refreshing={state.is_refresh}
        ListFooterComponent={<DividerFullHeigth />}
        ListEmptyComponent={
          <View
            style={{
              height: heightPercentageToDP(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EmptyComponent action={() => action.refresh()} />
          </View>
        }
        renderItem={value => (
          <View
            key={value.index}
            style={{
              width: '100%',
              height: heightPercentageToDP(20),
              borderRadius: 15,
              backgroundColor: sys_colors.text.white,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
            }}>
            <View style={styles.imageContainer}>
              {value.item.rank == '1' ||
              value.item.rank == '2' ||
              value.item.rank == '3' ? (
                <Icon name="crown" color={sys_colors.icon.active} size={30} />
              ) : null}
              <Text
                style={
                  value.item.rank == '1' ||
                  value.item.rank == '2' ||
                  value.item.rank == '3'
                    ? [sys_text_styles.header_black, {fontSize: 25}]
                    : [sys_text_styles.content_black, {fontSize: 20}]
                }>
                {value.item.rank}
              </Text>
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <Text style={sys_text_styles.header_black}>
                {value.item.ring}
              </Text>
              <Text style={sys_text_styles.header_black}>
                {value.item.loft}
              </Text>

              <Text style={sys_text_styles.content_medium_black}>
                {value.item.arrival == ''
                  ? 'No Data Arrive'
                  : SysDateTransform({
                      date: value.item.arrival,
                      type: 'short',
                      checkIsToDay: false,
                      withTime: true,
                    })}
              </Text>
              <View style={{width: '100%', flexDirection: 'row'}}>
                {value.item.duration == '' ? (
                  <Text style={sys_text_styles.content_medium_black}>
                    No Data Duration
                  </Text>
                ) : (
                  value.item.duration.split(':').map((val, index) => {
                    return (
                      <View key={`sss${index}`} style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            sys_text_styles.header_medium_black,
                            {marginRight: 3},
                          ]}>
                          {index < 2 ? parseInt(val) : val}
                        </Text>
                        <Text
                          style={[
                            sys_text_styles.content_medium_black,
                            {marginRight: 5},
                          ]}>
                          {index == 0 ? 'H' : index == 1 ? 'M' : 'S'}
                        </Text>
                      </View>
                    );
                  })
                )}
              </View>
              <Text style={sys_text_styles.content_medium_black}>
                {value.item.speed == '' ? 'No Data Speed' : value.item.speed}
              </Text>
              {/* <Text style={sys_text_styles.content_small_black} >{value.item.race_session} ({value.item.race_number})</Text>
                <Text style={sys_text_styles.content_small_black} >LOFT ({value.item.loft})</Text>
                <Text style={sys_text_styles.content_small_black} >PIGEION ({value.item.pigeons})</Text> */}
            </View>
          </View>
        )}
      />
      <BannerAds />
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    ...sys_text_styles.header_medium_black,
  },
  container: {
    paddingTop: 0,
    ...sys_styles.scroll_container,
  },
  imageContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },

  inputText: {
    backgroundColor: sys_colors.text.white,
    flex: 1,
    height: '100%',
    borderRadius: 12,
    padding: 5,
    ...sys_text_styles.content_medium_black,
  },
});
