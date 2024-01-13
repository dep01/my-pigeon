import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, Image,TouchableOpacity} from 'react-native';
import shallow from 'zustand/shallow';
import {sys_colors, sys_styles, sys_text_styles} from 'rbase-helpers/constants';
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
export default ({navigation}) => {
  const state = {
    ...useStore(state => base_state(state), shallow),
  };

  useEffect(() => {
    action.initialize();
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
        data={state.data.filter(
          val =>
            val.country.toLowerCase().includes(state.search.toLowerCase()) ||
            val.name.toLowerCase().includes(state.search.toLowerCase()) ||
            val.loft.toLowerCase().includes(state.search.toLowerCase()) ||
            val.race_number
              .toLowerCase()
              .includes(state.search.toLowerCase()) ||
            val.race_session.toLowerCase().includes(state.search.toLowerCase()),
        )}
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
        renderItem={value => (
          <TouchableOpacity
            key={value.index}
            onPress={()=>action.goToDetail(navigation,value.item.race_uri)}
            style={{
              width: '100%',
              height: heightPercentageToDP(20),
              borderRadius: 15,
              backgroundColor:sys_colors.text.white,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems:"center",
              padding: 8,
            }}>
            <View style={styles.imageContainer}>
              {value.item.club_image == '' ? null : (
                <Image
                  style={styles.imageContainer}
                  source={{uri: value.item.club_image}}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={{flex:1,marginLeft:5}}>
                <Text style={sys_text_styles.header_black} >{value.item.country}</Text>
                <Text style={sys_text_styles.content_small_black} >{value.item.name}</Text>
                <Text style={sys_text_styles.content_small_black} >{value.item.race_session} ({value.item.race_number})</Text>
                <Text style={sys_text_styles.content_small_black} >LOFT ({value.item.loft})</Text>
                <Text style={sys_text_styles.content_small_black} >PIGEION ({value.item.pigeons})</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: sys_colors.icon.active,
    width: heightPercentageToDP(12),
    height: heightPercentageToDP(12),
    borderRadius: 100,
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
