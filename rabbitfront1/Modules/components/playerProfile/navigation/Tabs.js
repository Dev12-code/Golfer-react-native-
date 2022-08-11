import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommonColors } from '../../../style';
import PlayerProfileStats from '../PlayerProfileStats';
import PlayerProfileBio from '../PlayerProfileBio';

// TEMP
function PremiumAccess() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Premium Access!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
         screenOptions={{
            tabBarStyle: {
               backgroundColor: CommonColors.Greys,
               height: 50,
               padding: 5
            },
            tabBarIndicatorContainerStyle: {
              backgroundColor: CommonColors.LightGrey,
              height: 3
            },
            tabBarIndicatorStyle: {
               backgroundColor: CommonColors.Green,
               top: 0
            },
            tabBarItemStyle: {
               justifyContent: 'flex-start',
               margin: 0,
               padding:0
            },
            tabBarLabelStyle: {
               height: 25,
               margin: 0,
               fontSize: 16,
            },
            tabBarActiveTintColor: CommonColors.Green,
            tabBarInactiveTintColor: CommonColors.LightGrey
         }}
      >
        <Tab.Screen name="PLAYER BIO" component={PlayerProfileBio} />
        <Tab.Screen name="PLAYER QIUCK STATS" component={PlayerProfileStats} />
        <Tab.Screen name="PREMIUM ACCESS" component={PremiumAccess} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}