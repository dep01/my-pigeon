import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView,KeyboardAvoidingView,Platform} from 'react-native';
import shallow from 'zustand/shallow';
import {sys_colors, sys_styles, sys_text_styles} from 'rbase-helpers/constants';
import {action, setter, useStore, base_state} from './store';
import {GlobalHeader} from 'rbase-components/molecules';
import {ImageHeader} from 'rbase-components/molecules/globalHeader';
import {
  BackButton,
  CustomButton,
  CustomInput,
  DividerFullHeigth,
  LoadingIndicator,
} from 'rbase-components/atoms';
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
  return (
    <KeyboardAvoidingView 
    
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={sys_styles.scaffold}>
      <GlobalHeader
        title="input all data"
        textAlign="center"
        left={<BackButton />}
      />
      <ScrollView
      showsVerticalScrollIndicator={false}
        style={[sys_styles.scroll_container, {backgroundColor: 'white'}]}>
        <CustomInput
          onChangeText={val => setter.username(val)}
          containerStyle={styles.containerInput}
          label="USERNAME"
          labelStyle={styles.textLabel}
          placeholder="Username..."
          inputStyle={styles.textInput}
          value={state.username}
        />
        <CustomInput
          labelStyle={styles.textLabel}
          placeholder="Password..."
          secureTextEntry={state.show_password}
          onChangeText={val => setter.password(val)}
          containerStyle={styles.containerInput}
          label="password"
          inputStyle={styles.textInput}
          right={
            <BackButton
              size={30}
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: sys_colors.primary,
              }}
              onPress={() => setter.show_password(!state.show_password)}
              iconName={!state.show_password ? 'eye' : 'eye-off'}
              color={sys_colors.icon.active}
            />
          }
          value={state.password}
        />
        <CustomInput
          labelStyle={styles.textLabel}
          placeholder="Confirm password..."
          onChangeText={val => setter.retype_password(val)}
          containerStyle={styles.containerInput}
          label="Confirm password"
          inputStyle={styles.textInput}
          value={state.retype_password}
        />
        <CustomInput
          labelStyle={styles.textLabel}
          placeholder="Firstname..."
          onChangeText={val => setter.first_name(val)}
          containerStyle={styles.containerInput}
          label="Firstname"
          inputStyle={styles.textInput}
          value={state.first_name}
        />
        <CustomInput
          labelStyle={styles.textLabel}
          placeholder="Lastname..."
          onChangeText={val => setter.last_name(val)}
          containerStyle={styles.containerInput}
          label="Lastname"
          inputStyle={styles.textInput}
          value={state.last_name}
        />

        <CustomInput
          labelStyle={styles.textLabel}
          placeholder="Email..."
          onChangeText={val => setter.email(val)}
          containerStyle={styles.containerInput}
          label="Email"
          inputStyle={styles.textInput}
          value={state.email}
        />

        <CustomInput
          labelStyle={styles.textLabel}
          placeholder="Phone..."
          onChangeText={val => setter.phone(val)}
          containerStyle={styles.containerInput}
          label="phone"
          inputStyle={styles.textInput}
          value={state.phone}
        />

        <CustomButton
          title={state.loading?"":"REGISTER"}
          baseWidth="100%"
          style={styles.buttonLogin}
          onPress={() => state.loading?null: action.doRegist(navigation)}
          children={<LoadingIndicator/>}
        />
        <DividerFullHeigth backgroundColor={sys_colors.text.white} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  titleText: {
    ...sys_text_styles.header_medium_black,
  },
  textLabel: {
    ...sys_text_styles.header_small_black,
    color: sys_colors.text.black,
  },
  textInput: {
    ...sys_text_styles.header_small_black,
    backgroundColor: sys_colors.primary,
    color: sys_colors.text.primary,
  },
  containerInput: {
    marginBottom: 10,
  },
  buttonLogin: {
    marginTop: 10,
    borderRadius: 15,
  },
});
