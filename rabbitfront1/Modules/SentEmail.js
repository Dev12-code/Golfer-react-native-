import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { verifyCode, clearSignUpError } from '../store/redux/auth/actions';
import { CommonColors, CommonStyles } from './style';
import { UnderlineIcon } from '../components/icons';
import { BackButton, Button, LoadingContainer } from '../components/Button';
import { w, h } from '../utils/scale';
import { Fonts } from '../common/Fonts';

const SentEmail = ({ route }) => {
  let animation = React.createRef();
  const { inputs } = route.params

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    animation.current.play()
  }, [])

  useEffect(() => {
    dispatch(clearSignUpError())
  }, [])

  const onSubmit = () => {
    navigation.navigate('ResetTemporaryPassword', { email: inputs.email })
  };


  return (
    <View style={CommonStyles.overflowContainer}>
      {auth.loading && <LoadingContainer />}
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Password Sent</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.textContainer}>
              <Text style={CommonStyles.sectionTitle}>Temporary password sent to your email.</Text>
            </View>
            <View style={styles.padding20}>
              <View style={styles.textContainer}>
                <LottieView
                  ref={animation}
                  loop={true}
                  style={{
                    width: w(300),
                    height: h(300)
                  }}
                  source={require('../assets/lottie/email.json')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button title="Reset Password" onPress={() => onSubmit()} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, { verifyCode, clearSignUpError })(SentEmail);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20)
  },
  section: {
    paddingTop: w(100),
    paddingHorizontal: w(60),
  },
  textContainer: {
    paddingVertical: w(40),
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