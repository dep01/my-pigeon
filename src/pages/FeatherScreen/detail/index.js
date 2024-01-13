import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import shallow from 'zustand/shallow';
import {sys_colors, sys_styles, sys_text_styles} from 'rbase-helpers/constants';
import {action, setter, useStore, base_state, pigeon_type} from './store';
import {GlobalHeader} from 'rbase-components/molecules';
import {
  BackButton,
  CustomButton,
  CustomInput,
  DividerFullHeigth,
  LoadingIndicator,
} from 'rbase-components/atoms';
export default ({navigation,route}) => {
  const state = {
    ...useStore(state => base_state(state), shallow),
  };

  useEffect(() => {
    action.initialize(route);
    return () => {
      action.cleanUp();
    };
  }, [navigation, action]);
  return state.loading ? (
    <LoadingIndicator />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={sys_styles.scaffold}>
      <GlobalHeader
        title="input all data"
        textAlign="center"
        left={<BackButton />}
        right={
          <BackButton
            iconName={state.is_edit ? 'close' : 'pencil'}
            style={{alignItems: 'center',justifyContent:"center"}}
            onPress={() =>
              state.is_edit ? action.revertValues() : setter.is_edit(true)
            }
          />
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[sys_styles.scroll_container, {backgroundColor: 'white'}]}>
        <CustomInput
          onChangeText={val => setter.name(val)}
          editable={state.is_edit}
          containerStyle={styles.containerInput}
          label="Name"
          labelStyle={styles.textLabel}
          placeholder="Name..."
          inputStyle={styles.textInput}
          value={state.name}
        />
       
        {!state.is_edit ? null : (
          <CustomButton
            title={state.loading ? '' : 'SAVE'}
            baseWidth="100%"
            style={styles.buttonLogin}
            onPress={() => (state.loading ? null : action.doUpdate(navigation))}
            children={<LoadingIndicator />}
          />
        )}
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

  textParent: {
    ...sys_text_styles.header_small_black,
    backgroundColor: sys_colors.primary,
    color: sys_colors.text.primary,
    height: 50,
    textAlignVertical: 'center',
    paddingLeft: 12,
  },
  containerInput: {
    marginBottom: 10,
  },
  buttonLogin: {
    marginTop: 10,
    borderRadius: 15,
  },
});
