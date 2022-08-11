import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { BackButton, Button, Menu } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { CommonColors, CommonStyles } from './style';
import { w, h } from '../utils/scale'

export default ({ navigation, route }) => {
  const { card } = route.params
  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>My Rabbit Purse</Text>
            <View style={styles.padding20}>
                <UnderlineIcon />
              </View>
            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>{card?.tournament?.name || ''}</Text>
              <Text style={CommonStyles.rowTitle}>{new Date(card.tournament.start_date).toUTCString().substring(0,16) || ""} - {new Date(card?.tournament.end_date).toUTCString().substring(0,16) || ""}</Text>
            </View>

            {/* <View style={styles.leftBottom}>
              <Image source={require('./../assets/brand.png')} style={styles.brand} />
              <Text style={[CommonStyles.sectionTitle, { color: CommonColors.LightGrey }]}>DRIVER | TSi2 DRIVER</Text>
            </View> */}
            <View style={styles.section}>
              <Image source={require('./../assets/kicker.png')} style={styles.image} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button title="ENTER SHIPPING INFORMATION" onPress={() => navigation.navigate('Shipping',{ card })} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
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
  image: {
    width: w(600),
    resizeMode: 'contain',
  },
  brand: {
    width: w(160),
    resizeMode: 'contain',
  },
});