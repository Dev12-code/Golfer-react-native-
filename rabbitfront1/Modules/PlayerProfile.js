import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Fonts } from "../common/Fonts";
import { LoadingContainer } from "../components/Button";
import {
  ApproachesIcon,
  BridieIcon,
  DrivingIcon,
  UnderlineIcon,
} from "../components/icons";
import { getGolfer } from "../store/redux/golfers/actions";
import { h, w } from "../utils/scale";
import { CommonColors, CommonStyles } from "./style";

const PlayerProfile = ({ navigation, route }) => {
  const { profile } = route.params;
  const isFocused = useIsFocused();
  const state = useSelector((state) => state.golfers);
  const { golfer } = state;
  const dispatch = useDispatch();
  useEffect(() => {
    isFocused && fetch();
  }, [profile, isFocused]);

  const fetch = async () => {
    profile?.p_id && dispatch(getGolfer(profile.p_id));
  };

  if (!golfer) return <LoadingContainer />;

  const { first_name, last_name, p_id, ...restParams } = golfer;

  return (
    <View style={styles.centeredView}>
      {state.golfers.loadingg && <LoadingContainer />}
      {state.error && <Text style={CommonStyles.errorText}>{state.error}</Text>}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.rank}>
            <View style={styles.column}>
              <Text style={CommonStyles.title}>
                {first_name} {last_name}
              </Text>
            </View>
            <View
              style={[
                styles.column,
                { borderWidth: 1, borderColor: CommonColors.Dark },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/cup.png")}
                  style={styles.image}
                />
                <Text style={CommonStyles.title}> #{golfer.rank}</Text>
              </View>
              <Text style={CommonStyles.sectionTitle}>Approach ranking</Text>
            </View>
          </View>

          <ScrollView style={[styles.container]}>
            <View style={styles.paddingSection}>
              <Text style={CommonStyles.sectionTitle}>Player's Stats</Text>
              <View style={styles.padding20}>
                <UnderlineIcon />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <BridieIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Birdie Conversion Percentage: {golfer.birdie_conversion || ""}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <BridieIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Birdie Conversion Rank: {golfer.bc_rank || ""}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <DrivingIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Driving Accuracy Percentage: {golfer.driving_accuracy || ""}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <DrivingIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Driving Accuracy Rank: {golfer.da_rank || ""}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <ApproachesIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Approach 150-175: {golfer.approach_150175 || ""}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <ApproachesIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Approach 150-175 rank: {golfer.a150_rank || ""}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <ApproachesIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Approach 175-200: {golfer.approach_175200 || ""}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: w(20),
                }}
              >
                <ApproachesIcon />
                <Text
                  style={[
                    CommonStyles.sectionTitle,
                    { paddingHorizontal: w(20) },
                  ]}
                >
                  Approach 175-200 rank: {golfer.a175_rank || ""}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.golfers.loading,
  error: state.golfers.error,
});

export default connect(mapStateToProps, { getGolfer })(PlayerProfile);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: CommonColors.White,
  },
  rank: {
    margin: w(40),
    flexDirection: "row",
    height: w(200),
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: h(1035),
  },
  padding20: {
    paddingVertical: w(20),
  },
  section: {
    paddingVertical: w(20),
  },
  image: {
    width: w(80),
    height: w(80),
    resizeMode: "stretch",
  },
  paddingSection: {
    paddingTop: w(40),
    paddingLeft: w(40),
    paddingRight: w(40),
    paddingBottom: 0,
  },
  close: {
    position: "absolute",
    right: w(20),
    top: w(30),
    width: w(20),
    height: w(20),
    zIndex: 999,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: -10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  rowText: {
    ...CommonStyles.rowTitle,
    fontFamily: Fonts.SourceSansRomanBold,
    lineHeight: w(40),
  },
});
