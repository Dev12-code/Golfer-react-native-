import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { login, clearLoginError } from "../store/redux/auth/actions";
import { UnderlineIcon } from "../components/icons";
import { BackButton, Button, LoadingContainer } from "../components/Button";
import { w, h } from "../utils/scale";
import { regex } from "../utils/helpers";
import { CommonColors, CommonStyles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
  const isFocused = useIsFocused();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [requests, setRequests] = useState(0);
  useEffect(() => {
    if (requests > 3) navigation.navigate("Forgot Password");
  }, [requests]);

  useEffect(() => {
    if (isFocused) {
      setRequests(0);
      setErrors({});
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(clearLoginError());
  }, []);

  const onChangeText = (field, value) => {
    dispatch(clearLoginError());
    setInputs({ ...inputs, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const onSubmit = async() => {
    setRequests(requests + 1);
    let errors = {};
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
    inputs.device_token = device_token;//'mayur';//device_token

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      dispatch(login(inputs));
    }
  };

  return (
    <View style={CommonStyles.overflowContainer}>
      {auth.signUpLoading && <LoadingContainer />}
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Sign in</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>

            <View style={styles.section}>
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
                  placeholder="Password"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
                {errors.password ? (
                  <Text style={CommonStyles.errorText}>{errors.password}</Text>
                ) : (
                  <View />
                )}
              </View>
              {auth.loginError ? (
                <Text style={CommonStyles.errorText}>{auth.loginError}</Text>
              ) : (
                <View />
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate("Forgot Password")}
              >
                <Text
                  style={[
                    CommonStyles.smallText,
                    {
                      color: CommonColors.Green,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Create Account")}
              >
                <Text
                  style={[
                    CommonStyles.smallText,
                    {
                      color: CommonColors.Green,
                      textDecorationLine: "underline",
                      paddingTop: w(20),
                    },
                  ]}
                >
                  Need to Create an Account?
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

export default connect(mapStateToProps, { login, clearLoginError })(SignIn);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20),
  },
  section: {
    paddingTop: w(200),
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
