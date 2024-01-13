import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SplashScreenPage,
  HomeScreenPage,
  LoginScreenPage,
  PigeonScreenPage,
  PedigreeScreenPage,
  RegistScreenPage,
  OneLoftScreenPage,
  OneLoftDetailScreenPage,
  AddPigeonScreenPage,
  PigeonSearchScreenPage,
  DetailPigeonScreenPage,
  AllPigeonScreenPage,
  FeatherScreenPage,
  FeatherAddScreenPage,
  FeatherDetailScreenPage,
} from '../pages';
import {sys_colors, sys_text_styles} from 'rbase-helpers/constants';
import {routes_name} from '.';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        activeTintColor: sys_colors.secondary,
        inactiveTintColor: sys_colors.icon.unactive,
        activeBackgroundColor: sys_colors.secondary,
        inactiveBackgroundColor: sys_colors.primary,
        labelStyle: {
          fontFamily: sys_text_styles.content_small_black,
          fontSize: 10,
        },
        tabBarLabel: () => null,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === routes_name.HOME) {
            iconName = 'home';
          } else {
            iconName = 'account';
          }
          return (
            <Icon
              name={iconName}
              size={24}
              color={
                focused ? sys_colors.icon.active : sys_colors.icon.unactive
              }
            />
          );
        },
      })}>
      <Tab.Screen
        name={routes_name.HOME}
        component={HomeScreenPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName={routes_name.SPLASH}>
      <Stack.Screen
        name={routes_name.SPLASH}
        component={SplashScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.LAYOUT}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.LOGIN}
        component={LoginScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.REGIST}
        component={RegistScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.HOME}
        component={HomeScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.PIGEON}
        component={PigeonScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.PEDIGREE}
        component={PedigreeScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.ONELOFT}
        component={OneLoftScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.ONELOFT_DETAIL}
        component={OneLoftDetailScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.PIGEON_ADD}
        component={AddPigeonScreenPage}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name={routes_name.PIGEON_SEARCH}
        component={PigeonSearchScreenPage}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name={routes_name.PIGEON_DETAIL}
        component={DetailPigeonScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes_name.PIGEON_ALL}
        component={AllPigeonScreenPage}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name={routes_name.FEATHER}
        component={FeatherScreenPage}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name={routes_name.FEATHER_ADD}
        component={FeatherAddScreenPage}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name={routes_name.FEATHER_SEARCH}
        component={FeatherDetailScreenPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
