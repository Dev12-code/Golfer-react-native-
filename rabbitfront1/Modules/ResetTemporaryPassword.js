import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { BackButton, Button, LoadingContainer } from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import {
  clearSignUpError,
  resetTempPassword,
} from "../store/redux/auth/actions";
import { w } from "../utils/scale";
import { CommonColors, CommonStyles } from "./style";

const ResetTemporaryPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { email } = route.params;
  const [passwordInputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearSignUpError());
  }, []);

  const onChangeText = (field, value) => {
    dispatch(clearSignUpError());
    setInputs({ ...passwordInputs, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const onSubmit = () => {
    let errors = {};
    if (passwordInputs.new_password2 !== passwordInputs.new_password1) {
      errors.password = "Password does not match";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const inputs = {
        email: email,
        code: passwordInputs.old_password,
        password: passwordInputs.new_password1,
      };
      dispatch(resetTempPassword({ inputs, navigation }));
    }
  };

  return (
    <View style={CommonStyles.overflowContainer}>
      {auth.loading && <LoadingContainer />}
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Reset Password</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <View style={styles.textContainer}>
                <TextInput
                  secureTextEntry
                  style={CommonStyles.textInput}
                  onChangeText={(text) => onChangeText("old_password", text)}
                  value={passwordInputs.old_password}
                  placeholder="Temporary Password"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
              </View>
              <View style={styles.textContainer}>
                <TextInput
                  secureTextEntry
                  style={CommonStyles.textInput}
                  onChangeText={(text) => onChangeText("new_password1", text)}
                  value={passwordInputs.new_password1}
                  placeholder="New Password"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
              </View>
              <View style={styles.textContainer}>
                <TextInput
                  secureTextEntry
                  style={CommonStyles.textInput}
                  onChangeText={(text) => onChangeText("new_password2", text)}
                  value={passwordInputs.new_password2}
                  placeholder="Conform Password"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
                {errors.password ? (
                  <Text style={CommonStyles.errorText}>{errors.password}</Text>
                ) : (
                  <View />
                )}
              </View>
              {auth.error ? (
                <Text style={CommonStyles.errorText}>{auth.error}</Text>
              ) : (
                <View />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button
        title="RESET"
        onPress={() => onSubmit()}
        backgroundColor={CommonColors.Green}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  resetTempPassword,
  clearSignUpError,
})(ResetTemporaryPassword);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20),
  },
  section: {
    paddingTop: w(100),
    paddingHorizontal: w(60),
  },
  textContainer: {
    paddingVertical: w(40),
  },
  row: {
    paddingTop: w(40),
    flexDirection: "row",
    alignItems: "center",
  },
});
