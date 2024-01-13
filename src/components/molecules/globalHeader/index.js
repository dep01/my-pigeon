import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {sys_colors, sys_font, sys_icons} from 'rbase-helpers/constants';
export const GlobalHeader = ({
  children,
  title = '',
  right = null,
  left = null,
  height = '10%',
  fontSize = 16,
  textAlign = 'left',
  color = sys_colors.text.black,
  style = {},
  type = 'primary',
}) => {
  return type == 'primary' ? (
    <View style={[styles.container, {height: height}, style]}>
      {left != null || right != null ? (
        <View style={styles.left}>{left}</View>
      ) : null}
      {title != '' ? (
        <Text
          style={[
            styles.title,
            {fontSize: fontSize, textAlign: textAlign, color: color},
          ]}>
          {title.toUpperCase()}
        </Text>
      ) : (
        <View style={styles.children}>{children}</View>
      )}
      {left != null || right != null ? (
        <View style={styles.right}>{right}</View>
      ) : null}
    </View>
  ) : (
    <View style={[styles.container, {height: height}, style]}>
      {left != null ? <View style={styles.left}>{left}</View> : null}
      {title != '' ? (
        <Text
          style={[
            styles.title,
            {fontSize: fontSize, textAlign: textAlign, color: color},
          ]}>
          {title.toUpperCase()}
        </Text>
      ) : (
        <View style={styles.children}>{children}</View>
      )}
      {right != null ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
};
export const ImageHeader=()=>{
  return  (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Image source={sys_icons.ic_loading} resizeMode='contain' style={{flex:1}} />
  </View>)
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: sys_colors.text.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: sys_font.primary[700],
  },
  children: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
