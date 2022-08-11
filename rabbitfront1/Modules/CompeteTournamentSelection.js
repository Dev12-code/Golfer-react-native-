import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, } from 'react-native';
import LottieView from 'lottie-react-native';
import { CommonStyles, CommonColors } from './style';
import { BackButton, Button, ButtonBack, ButtonReverse, Menu } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { w, h } from '../utils/scale'

export default ({ navigation, route }) => {
  let animation = React.createRef();

  useEffect(() => {
    animation.current.play()
  }, [])

  const { card } = route.params

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Congratulations</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <LottieView
                ref={animation}
                loop={true}
                style={{
                  width: w(500),
                  height: h(500)
                }}
                source={require('../assets/lottie/rocket.json')}
              />
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.subTitle}>You've completed your selections for {card.tournament.name || ''} Round {card.round || ''}</Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
      <ButtonBack title="BACK TO MY RABBIT CARDS" onPress={() => navigation.navigate('MyRabbitCards')} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20)
  },
  section: {
    paddingVertical: w(40),
    alignItems: 'center'
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