import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { BackButton, Button, Menu } from '../components/Button';
import { RabbitIcon } from '../components/icons';
import { CommonColors, CommonStyles } from './style';

export default ({ navigation }) => {
  return (
    <View style={CommonStyles.container}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <View style={styles.container}>
          <RabbitIcon />
          <Text style={[CommonStyles.title, { paddingTop: 20 }]}>Create Rabbit Cards</Text>
        </View>
      </SafeAreaView>
      <Button title="CHOOSE TOURNAMENTS" onPress={() => navigation.navigate('ChooseDates')} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});