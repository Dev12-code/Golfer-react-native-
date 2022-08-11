import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BackButton, ButtonBack } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { h, w } from '../utils/scale';
import { CommonColors, CommonStyles } from './style';

export default ({ navigation, route }) => {
  const { sponsor } = route.params

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>{sponsor.title}</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.logo}>
              <Image source={sponsor.image} style={styles.image} />
            </View>
            <View style={styles.logo}>
              <Text style={CommonStyles.sectionTitle}>{sponsor.about}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ButtonBack title="BACK" onPress={() => navigation.goBack()} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40
  },
  image: {
    height: h(400),
    width: w(400),
    resizeMode: 'contain',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: w(40)
  },
});