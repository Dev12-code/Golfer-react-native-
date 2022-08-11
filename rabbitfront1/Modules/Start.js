import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Button } from '../components/Button'
import { CommonStyles, CommonColors } from './style';

export default ({ navigation }) => {
  return (
    <ScrollView style={CommonStyles.container}>
      <View style={CommonStyles.centerContainer}>
        <View style={CommonStyles.logoContainer}>
          <Image style={CommonStyles.logo} source={require('./../assets/logonew.png')} />
        </View>
        <View style={CommonStyles.paddingVertical}>
          <Button title="SIGN IN" backgroundColor={CommonColors.Green} onPress={() => navigation.navigate('Sign In')} />
        </View>
        <View style={CommonStyles.paddingVertical}>
          <Button title="CREATE ACCOUNT" backgroundColor={CommonColors.Black} onPress={() => navigation.navigate('Create Account')} />
        </View>
      </View>
    </ScrollView >
  );
}