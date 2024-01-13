import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import {
  sys_colors,
  sys_font,
  sys_icons,
  sys_text_styles,
} from 'rbase-helpers/constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'rbase-helpers/responsive';
import {BackButton} from '../backButton';

export const EmptyComponent = ({
  action,
  text = 'Sorry no data available!',
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={sys_icons.ic_loading}
        resizeMode="contain"
      />
      <Text style={styles.text}>{text}</Text>
      {action ? (
        <BackButton
          onPress={action}
          style={{
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          iconName="refresh"
          size={30}
          color={sys_colors.text.black}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: widthPercentageToDP(100),
    // height: heightPercentageToDP(100),

    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: widthPercentageToDP(40), height: widthPercentageToDP(40)},
  text: {
    ...sys_text_styles.header_black,
  },
});
