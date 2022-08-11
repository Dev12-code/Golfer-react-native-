import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { BackButton, Button, LoadingContainer } from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import { clearSignUpError, signUp } from "../store/redux/auth/actions";
import { regex } from "../utils/helpers";
import { w } from "../utils/scale";
import { CommonColors, CommonStyles } from "./style";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearSignUpError());
  }, []);

  useEffect(() => {
    if (auth.signUpSuccess) {
      Alert.alert("Registration success.");
      navigation.navigate("Sign In");
    }
  }, [auth.signUpSuccess]);

  const onChangeText = (field, value) => {
    dispatch(clearSignUpError());
    setInputs({ ...inputs, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const onSubmit = async() => {
    let errors = {};
    if (!inputs.first_name) {
      errors.first_name = "First Name is a required field";
    }
    if (!inputs.last_name) {
      errors.last_name = "Last Name is a required field";
    }
    if (!inputs.email) {
      errors.email = "Email is a required field";
    }
    if (!regex.email.test(inputs.email)) {
      errors.email = "Email is invalid";
    }
    if (!inputs.password) {
      errors.password = "Password is a required field";
    }

    const device_token = await AsyncStorage.getItem("device_token")
    inputs.device_token = device_token
    console.log("signup payload ",inputs);
    // return;
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      inputs.roles = ["admin"];
      dispatch(signUp(inputs));
    }
  };

  return (
    <View style={CommonStyles.overflowContainer}>
      {auth.signUpLoading && <LoadingContainer />}
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Create Account</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <View style={styles.textContainer}>
                <TextInput
                  style={CommonStyles.textInput}
                  onChangeText={(text) => onChangeText("first_name", text)}
                  value={inputs.first_name}
                  placeholder="First Name"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
                {errors.first_name ? (
                  <Text style={CommonStyles.errorText}>
                    {errors.first_name}
                  </Text>
                ) : (
                  <View />
                )}
              </View>
              <View style={styles.textContainer}>
                <TextInput
                  style={CommonStyles.textInput}
                  onChangeText={(text) => onChangeText("last_name", text)}
                  value={inputs.last_name}
                  placeholder="Last Name"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
                {errors.last_name ? (
                  <Text style={CommonStyles.errorText}>{errors.last_name}</Text>
                ) : (
                  <View />
                )}
              </View>
              <View style={styles.textContainer}>
                <TextInput
                  style={CommonStyles.textInput}
                  onChangeText={(text) =>
                    onChangeText("email", text.toLowerCase())
                  }
                  value={inputs.email}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor={CommonColors.Dark}
                />
                {errors.email ? (
                  <Text style={CommonStyles.errorText}>{errors.email}</Text>
                ) : (
                  <View />
                )}
              </View>
              <View style={styles.textContainer}>
                <TextInput
                  secureTextEntry
                  style={CommonStyles.textInput}
                  onChangeText={(text) => onChangeText("password", text)}
                  value={inputs.password}
                  placeholder="Choose Password"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
                {errors.password ? (
                  <Text style={CommonStyles.errorText}>{errors.password}</Text>
                ) : (
                  <View />
                )}
              </View>
              {auth.signUpErrorMsg ? (
                <Text style={CommonStyles.errorText}>
                  {auth.signUpErrorMsg}
                </Text>
              ) : (
                <View />
              )}
              <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
                <Text
                  style={[
                    CommonStyles.smallText,
                    {
                      color: CommonColors.Green,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  Already Have an Account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button
        title="ENTER"
        onPress={() => onSubmit()}
        backgroundColor={CommonColors.Green}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.signUpLoading,
  serverError: state.auth.loginError,
});

export default connect(mapStateToProps, { signUp, clearSignUpError })(SignUp);

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
