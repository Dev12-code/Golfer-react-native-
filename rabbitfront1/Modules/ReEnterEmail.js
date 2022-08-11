import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { verifyEmail, clearSignUpError } from '../store/redux/auth/actions';
import { UnderlineIcon } from '../components/icons';
import { BackButton, Button, LoadingContainer } from '../components/Button';
import { regex } from '../utils/helpers'
import { w, h } from '../utils/scale';
import { CommonColors, CommonStyles } from './style';

const ReEnterEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const auth = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isFocused) {
      dispatch(clearSignUpError())
      setErrors({})
    }
  }, [isFocused])

  const onChangeText = (field, value) => {
    dispatch(clearSignUpError());
    setInputs({ ...inputs, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const onSubmit = () => {
    let errors = {};
    if (!inputs.email) {
      errors.email = 'Email is a required field';
    }
    if (!regex.email.test(inputs.email)) {
      errors.email = 'Email is invalid';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      dispatch(verifyEmail({ inputs, navigation, nextScreen: "Create Account" }));
    }
  };

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      {auth.loading && <LoadingContainer />}
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Re-enter Email</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.textContainer}>
              <Text style={[CommonStyles.sectionTitle, { textAlign: 'center' }]}>
                Your email does not match existing user in our database
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Create Account')} style={styles.button}>
              <Text style={[CommonStyles.sectionTitle, { color: CommonColors.Green }]}>Try creating an account</Text>
            </TouchableOpacity>
            <View style={styles.section}>
              <View style={styles.textContainer}>
                <TextInput
                  style={CommonStyles.textInput}
                  onChangeText={(text) => onChangeText('email', text.toLowerCase())}
                  value={inputs.email}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor={CommonColors.Dark}
                />
                {errors.email ? <Text style={CommonStyles.errorText}>{errors.email}</Text> : <View />}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button title="ENTER" onPress={() => onSubmit()} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, { verifyEmail, clearSignUpError })(ReEnterEmail);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20)
  },
  section: {
    paddingTop: w(100),
    paddingHorizontal: w(60),
  },
  textContainer: {
    paddingVertical: w(40)
  },
  row: {
    paddingTop: w(40),
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    height: w(80),
    borderWidth: 1,
    borderColor: CommonColors.Green,
    justifyContent: 'center',
    alignItems: 'center'
  }
});