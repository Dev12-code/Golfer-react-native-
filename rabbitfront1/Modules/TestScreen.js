import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { BackButton, LoadingContainer } from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import { w } from "../utils/scale";
import { StorageUtils } from "../utils/storage";
import { CommonColors, CommonStyles } from "./style";
import { logOut, clearLoginError } from "../store/redux/auth/actions";
import { Fonts } from "../common/Fonts";

const TestScreen = ({ navigation, route }) => {
  const auth = useSelector((state) => state.auth);
  const [startTesting, setStartTesting] = useState(false);
  const dispatch = useDispatch();
  const callStartBtn = async () => {
    if (!startTesting) {
      // AsyncStorage.setItem("testing", "true");
      // StorageUtils.setStringValue("url", "http://3.143.227.24:3000/test/api");
      AsyncStorage.setItem("testing", "false");
      StorageUtils.setStringValue("url", "https://api.rabbitcards.com/api");
    } else {
      AsyncStorage.setItem("testing", "false");
      StorageUtils.setStringValue("url", "https://api.rabbitcards.com/api");
    }
    // await Restart();
    dispatch(logOut());
  };

  useEffect(async () => {
    if ((await AsyncStorage.getItem("testing")) == "true") {
      setStartTesting(true);
    } else {
      setStartTesting(false);
    }
  }, []);

  return (
    <View style={CommonStyles.overflowContainer}>
      {auth.loading && <LoadingContainer />}
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Test Mode</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <TouchableOpacity
                onPress={() => {
                  setStartTesting(!startTesting);
                  callStartBtn();
                }}
                underlayColor={null}
              >
                <View style={styles.ButtonStyle}>
                  <Text style={styles.buttonTextStyle}>
                    {startTesting ? "Stop Testing" : "Start Testing"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.signUpLoading,
  serverError: state.auth.loginError,
});

// export default TestScreen;
export default connect(mapStateToProps, { logOut, clearLoginError })(TestScreen);

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
  ButtonStyle: {
    justifyContent: "center",
    height: 100,
    borderRadius: 1,
    backgroundColor: CommonColors.Green,
  },
  buttonTextStyle: {
    fontFamily: Fonts.SourceSansRomanRegular,
    fontSize: w(58),
    lineHeight: w(68),
    color: CommonColors.White,
    textAlign: "center",
  },
});
