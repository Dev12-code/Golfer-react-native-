import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { verifyCode, clearSignUpError } from '../store/redux/auth/actions';
import { CommonColors, CommonStyles } from './style';
import { BackButton, Button, ButtonBack, LoadingContainer } from '../components/Button';
import { w, h } from '../utils/scale';
import { Fonts } from '../common/Fonts';

const NoChoice = ({ route }) => {
  let animation = React.createRef();

  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    animation.current.play()
  }, [])

  useEffect(() => {
    dispatch(clearSignUpError())
  }, [])

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <View style={styles.padding20}>
              <View style={styles.textContainer}>
                <LottieView
                  ref={animation}
                  autoPlay
                  loop={true}
                  style={{
                    width: w(500),
                    height: h(500)
                  }}
                  source={require('../assets/lottie/nochoice.json')}
                />
              </View>
              <Text style={[CommonStyles.subTitle, { textAlign: 'center', paddingVertical: w(40) }]}>You've chosen all desired tournaments and rounds for the selected date range.</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ButtonBack title="BACK TO RABBIT CARDS" onPress={() => navigation.navigate("MyRabbitCards")} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, {})(NoChoice);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20)
  },
  section: {
    paddingTop: w(100),
    paddingHorizontal: w(60),
  },
  textContainer: {
    alignItems: 'center'
  },
  row: {
    paddingTop: w(40),
    flexDirection: 'row',
    alignItems: 'center'
  },
  root: {
    padding: w(20),
    minHeight: w(300)
  },
  title: {
    textAlign: 'center',
    fontSize: w(30)
  },
  codeFiledRoot: {
    marginTop: w(40),
    width: w(300),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: w(30),
    height: w(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: CommonColors.Green,
    borderBottomWidth: 1,
  },
  cellText: {
    color: CommonColors.Green,
    fontSize: w(48),
    fontFamily: Fonts.SourceSansRomanBold,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});