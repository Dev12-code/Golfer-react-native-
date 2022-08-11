import { useIsFocused } from "@react-navigation/native";
import { round } from "lodash";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  BackButton,
  LoadingContainer,
  Player,
  PlayButton,
  SeparateButton,
} from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import {
  getTournamentById,
  getRabbitCardChoice,
} from "../store/redux/tournaments/actions";
import { w } from "../utils/scale";
import { CommonColors, CommonStyles } from "./style";
//detailscreen
var _ = require("lodash");

const SummaryReadyToPlay = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { card } = route.params;

  const dispatch = useDispatch();
  const state = useSelector((state) => state.tournaments);
  const fetch = () => {
    dispatch(getTournamentById(card.t_id));
    const { t_id, round, group_id } = card
    const payload = {
      t_id,
      round,
      group_id: group_id || 1,
      cttp_flag: false
    }
    dispatch(getRabbitCardChoice(payload))
  };
  useEffect(() => {
    isFocused && fetch();
  }, [card]);

  let holes = _.groupBy(state.choice, "hole");
  Object.keys(holes).forEach(
    (key) => (holes[key] = _.groupBy(holes[key], "group_id"))
  );

  const getStartDate = (startDate, round) => {
    let dt = new Date(startDate);
    dt.setDate(dt.getDate() + round - 1);
  
    return dt
  }
  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      {state.loading && <LoadingContainer />}
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, { paddingTop: w(100) }]}>
            <Text style={CommonStyles.title}>Rabbit Card Summary</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.topSection}>
              <Text style={CommonStyles.subTitle}>
                {state.selectedTournament?.name || ""}
              </Text>
              <Text style={CommonStyles.sectionTitle}>
                {new Date(
                  getStartDate(state.selectedTournament?.start_date,card?.round)
                ).toUTCString().substring(0,16) || ""}{" "}
                {/* -{" "}
                {new Date(state.selectedTournament?.end_date).toUTCString().substring(0,16) ||
                  ""} */}
              </Text>
              <Text style={CommonStyles.sectionTitle}>
                Round {card?.round || ""}
              </Text>
              <Text style={[CommonStyles.sectionTitle, { paddingTop: w(40) }]}>
                RABBIT CARDS BY HOLE
              </Text>
            </View>
          </View>
          {state.choice.map((hole, index) => {
            const groups = _.groupBy(hole.players, "group_id");
            return (
              <View style={styles.section} key={index}>
                <View style={styles.paddingH40}>
                  <View style={[styles.row, { alignItems: "flex-end" }]}>
                    <Text style={CommonStyles.subTitle}>HOLE {hole.hole}</Text>
                    <Text
                      style={[CommonStyles.sectionTitle, { paddingLeft: 4 }]}
                    >
                      Par {hole?.par || ""}, {hole?.yardage || ""} Yards
                    </Text>
                  </View>
                  <View style={styles.row}>
                    {Object.keys(groups).map((groupId) => (
                      <View style={styles.rowSection}>
                        {groups[groupId].map((item, index) => {
                          return (
                            <Player
                              key={index}
                            //  status={item.won ? 1 : 3}
                              status={item.status}
                              name={item.first_name + " " + item.last_name}
                              onPress={() =>
                                  {
                                  navigation.navigate("PlayerProfile", {
                                    profile: item,
                                  })
                                }
                              }
                            />
                          );
                        })}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <SeparateButton
        prevTitle="BACK"
        nextTitle="COMPLETE"
        prev={() => navigation.goBack()}
        next={() => navigation.navigate("TieBreaker", { card })}
        backgroundColor={CommonColors.Green}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getRabbitCardChoice })(
  SummaryReadyToPlay
);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20),
  },
  paddingH40: {
    paddingHorizontal: w(40),
    paddingVertical: w(10),
  },
  topSection: {
    paddingTop: w(20),
  },
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: -1,
    borderColor: CommonColors.Black,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  rowSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
