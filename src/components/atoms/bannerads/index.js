import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {sys_colors,sys_styles} from 'rbase-helpers/constants';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {ADS_STRING} from 'rbase-helpers/constants';

export const BannerAds = () => {
  return (
    <View
      style={sys_styles.banner_ads}>
      
      <BannerAd
          sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
          unitId={ADS_STRING.BANNER}
        />
    </View>
  );
};

const styles = StyleSheet.create({});
