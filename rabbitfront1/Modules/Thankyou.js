import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, } from 'react-native';
import { CommonStyles, CommonColors } from './style';
import { BackButton, Button, ButtonReverse, Menu } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { w, h } from '../utils/scale'

export default ({ navigation }) => {

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Thank you</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.subTitle}>Congratulations on winning the Rabbit Purse for
                this tournament.</Text>
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.subTitle}>Continue the winning streak and return to your current
                Rabbit Cards, or create more Rabbit Cards for upcoming tournaments.</Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
      <ButtonReverse title="CREATE RABBIT CARDS" onPress={() => navigation.navigate('ChooseDates')} backgroundColor={CommonColors.White} style={{ width: '100%' }} />
      <Button title="GO TO MY RABBIT CARDS" onPress={() => navigation.navigate('MyRabbitCards')} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20)
  },
  section: {
    paddingVertical: w(40),
  },
  bottom: {
    backgroundColor: CommonColors.White,
    paddingLeft: w(40),
    paddingVertical: w(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});