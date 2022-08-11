import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { connect, useDispatch } from "react-redux";
import { logOut, clearLoginError } from "../store/redux/auth/actions";
import {
  AccountIcon,
  MyRabbitIcon,
  CrossIcon,
  PlayerDirectory,
  RankingIcon,
  SponsorsIcon,
  ApproachesIcon,
  RabbitIcon,
  TournamentIcon,
} from "../components/icons";
import { w, h } from "../utils/scale";
import { CommonColors, CommonStyles } from "./style";
import { Fonts } from "../common/Fonts";

const Sidebar = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={CommonStyles.overflowContainer}>
      <View style={CommonStyles.container}>
        <View style={styles.container}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("MyRabbitCards")}
            >
              <MyRabbitIcon />
              <Text style={styles.text}>My Rabbit Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("ChooseDates")}
            >
              <TournamentIcon />
              <Text style={styles.text}>Tournaments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.row,]}
              onPress={() => navigation.navigate("Directory")}
            >
              <PlayerDirectory />
              <Text style={[styles.text,{marginLeft:-5}]}>Player Directory</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("Sponsors")}
            >
              <SponsorsIcon />
              <Text style={styles.text}>Sponsors</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("OverallRankings")}
            >
              <RankingIcon />
              <Text style={styles.text}>My Overall Ranking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("HeadToHead")}
            >
            <Image style = {{width:25, height:30, }} source={require('../assets/icon/FaceoffThin-03.png')} />
              <Text style={styles.text}>Head to Head</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("Account")}
            >
            <Image style = {{width:25, height:40, }} source={require('../assets/icon/RC-03.png')} />
              <Text style={styles.text}>Account</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("TestScreen")}
            >
              <AccountIcon />
              <Text style={styles.text}>Test Mode</Text>
            </TouchableOpacity> */}

              <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("FAQs")}
            >
              <AccountIcon />
              <Text style={styles.text}>FAQs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("Tutorial")}
            >
              <AccountIcon />
              <Text style={styles.text}>Tutorial</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => dispatch(logOut())}
      >
        <Text style={styles.bottomText}>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.signUpLoading,
  serverError: state.auth.loginError,
});

export default connect(mapStateToProps, { logOut, clearLoginError })(Sidebar);

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonColors.Dark,
    width: w(480),
    height: h(1135),
  },
  innerContainer: {
    paddingTop: w(40),
    paddingHorizontal: w(40),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: w(40),
  },
  text: {
    paddingLeft: w(60),
    color: CommonColors.White,
    fontSize: w(36),
    fontFamily: Fonts.SourceSansRomanRegular,
    lineHeight: w(48.8),
  },
  closeContainer: {
    paddingTop: w(80),
    paddingLeft: w(50),
  },
  bottomButton: {
    width: w(480),
    backgroundColor: CommonColors.Grey,
    justifyContent: "flex-end",
  },
  bottomText: {
    paddingLeft: w(60),
    paddingVertical: w(40),
    color: CommonColors.White,
    fontSize: w(36),
    fontFamily: Fonts.SourceSansRomanBold,
    lineHeight: w(48.8),
  },
});
