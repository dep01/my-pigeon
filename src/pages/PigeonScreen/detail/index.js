import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import shallow from 'zustand/shallow';
import {sys_colors, sys_styles, sys_text_styles} from 'rbase-helpers/constants';
import {action, setter, useStore, base_state, pigeon_type} from './store';
import {GlobalHeader} from 'rbase-components/molecules';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {
  BackButton,
  CustomButton,
  CustomInput,
  DividerFullHeigth,
  LoadingIndicator,
} from 'rbase-components/atoms';
import {SysDateTransform} from 'rbase-helpers/global_store';
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
        <CustomInput
          onChangeText={val => setter.ring_no(val)}
          editable={state.is_edit}
          containerStyle={styles.containerInput}
          label="Ring"
          labelStyle={styles.textLabel}
          placeholder="Ring..."
          inputStyle={styles.textInput}
          value={state.ring_no}
        />
        <CustomInput
          onChangeText={val => setter.chip_no(val)}
          editable={state.is_edit}
          containerStyle={styles.containerInput}
          label="Chip"
          labelStyle={styles.textLabel}
          placeholder="Chip..."
          inputStyle={styles.textInput}
          value={state.chip_no}
        />

        <Text
          style={[sys_text_styles.header_small_black, {marginVertical: 10}]}>
          COCK
        </Text>
        <TouchableOpacity
          onPress={() =>
            !state.is_edit ? null : action.setParent(navigation, 'cock')
          }>
          <Text style={styles.textParent}>
            {state.father_ring ?? 'Select Father'}
          </Text>
        </TouchableOpacity>
        <Text
          style={[sys_text_styles.header_small_black, {marginVertical: 10}]}>
          HEN
        </Text>
        <TouchableOpacity
          onPress={() =>
            !state.is_edit ? null : action.setParent(navigation, 'hen')
          }>
          <Text style={styles.textParent}>
            {state.mother_ring ?? 'Select Mother'}
          </Text>
        </TouchableOpacity>
        <Text
          style={[sys_text_styles.header_small_black, {marginVertical: 10}]}>
          BIRTH
        </Text>
        <TouchableOpacity
          onPress={() =>
            !state.is_edit ? null : setter.show_date_picker(true)
          }>
          <Text style={styles.textParent}>
            {state.birth
              ? SysDateTransform({
                  date: state.birth,
                  withTime: false,
                  type: 'short',
                })
              : 'Birth Date'}
          </Text>
        </TouchableOpacity>
        <Text
          style={[sys_text_styles.header_small_black, {marginVertical: 10}]}>
          STATUS
        </Text>
        <Picker
          mode="dialog"
          enabled={state.is_edit}
          style={styles.textInput}
          selectedValue={state.pigeon_status}
          onValueChange={(itemValue, itemIndex) =>
            setter.pigeon_status(itemValue)
          }>
          {state.pigeon_status_data.map(val => {
            return <Picker.Item key={val.id} label={val.name} value={val.id} />;
          })}
        </Picker>

        <Text
          style={[sys_text_styles.header_small_black, {marginVertical: 10}]}>
          TYPE
        </Text>
        <Picker
          mode="dialog"
          enabled={state.is_edit}
          style={styles.textInput}
          selectedValue={state.type}
          onValueChange={(itemValue, itemIndex) => setter.type(itemValue)}>
          {pigeon_type.map((val, index) => {
            return <Picker.Item key={index} label={val} value={val} />;
          })}
        </Picker>

        <Text
          style={[sys_text_styles.header_small_black, {marginVertical: 10}]}>
          FEATHER
        </Text>
        <Picker
          mode="dialog"
          enabled={state.is_edit}
          style={styles.textInput}
          selectedValue={state.feather_colors_id}
          onValueChange={(itemValue, itemIndex) => {
            setter.feather_colors_id(itemValue);
          }}>
          {state.feather_colors_data.map((val, index) => {
            return <Picker.Item key={val.id} label={val.name} value={val.id} />;
          })}
        </Picker>
        <CustomInput
          editable={state.is_edit}
          onChangeText={val => setter.achievement(val)}
          containerStyle={styles.containerInput}
          label="Achievement"
          labelStyle={styles.textLabel}
          placeholder="Achievement..."
          inputStyle={styles.textInput}
          value={state.achievement}
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
      <DatePicker
        modal
        mode="date"
        open={state.show_date_picker}
        date={state.birth?new Date(state.birth):new Date()}
        onConfirm={date => {
          // const d = SysDateTransform({date:date,withTime:false,forSql:true});
          setter.birth(date);
          setter.show_date_picker(false);
          // setDate(date)
          // console.log(date);
        }}
        onCancel={() => {
          setter.show_date_picker(false);
        }}
      />
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
