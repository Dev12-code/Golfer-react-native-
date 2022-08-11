import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getHoleGolfers,
  getTournamentById,
  getGroupingsPar3s,
  userCTTPPick,
} from "../store/redux/tournaments/actions";
import {
  BackButton,
  Button,
  Menu,
  Round,
  SeparateButton,
} from "../components/Button";
import { CheckedIcon, UnCheckedIcon, UnderlineIcon } from "../components/icons";
import { CommonColors, CommonStyles } from "./style";
import { w, h } from "../utils/scale";
import { ComponentStyles } from "../components/style";
import { groupingsPar3s } from "../../api/src/controllers/tournament.controller";

const PairingPlayer = ({ percent, golfer, selectedId, onPress, onCheck ,progressColor}) => (
  <View>
   
    <View style={styles.row,{marginLeft:25}}>
      {/* <Progress.Bar
        borderRadius={0}
        progress={1}
        color={percent > 0.5 ? CommonColors.Green : CommonColors.Red}
        width={w(540 * percent)}
      /> */}
      <View style={[ { height: w(40),}]}>
        <Progress.Bar
          borderRadius={0}
          progress={1}
          color={CommonColors.White}
          width={percent*250}
          style={ComponentStyles.stepBar}
        />
        <Progress.Bar
          borderRadius={0}
          progress={1}
          color={progressColor}
          width={percent*250}
          style={ComponentStyles.stepBar}
        />
      </View>
      <Text style={[{
          fontSize: w(27),
          lineHeight: w(25),
          color: CommonColors.Dark,
          marginLeft: percent*250+10 }]}>
        {/* {(percent * 100)}% */}
        {Number(percent * 100).toFixed(1)}%
      </Text>
    </View>
    <View style={styles.playerRow}>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[CommonStyles.subTitle, { textDecorationLine: "underline",fontSize:25 }]}
        >
          {golfer.first_name} {golfer.last_name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCheck}>
        {golfer.p_id === selectedId ? <CheckedIcon /> : <UnCheckedIcon />

        }
      </TouchableOpacity>
    </View>
  </View>
);

const Pairing = ({ navigation, route }) => {
  const step = route.params?.step || 1;
  const selUsers = route.params?.selUsers || [];
  const { card } = route.params;
  const isFocused = useIsFocused();
  

  const dispatch = useDispatch();
  const state = useSelector((state) => state.tournaments);
  const auth = useSelector((state) => state.auth);

  const [groupIndex, setGroupIndex] = useState(0);
  const [golfers, setGolfers] = useState([]);
  const [selectedGolferId, setGolfer] = useState("");
  const [golferArray, setGolferArray] = useState([]);
  const [currentGroup, setCurrentGroup] = useState([]);
  const [selectedGolferGroupId, setGolferGroupId] = useState("");
  const hole = state.holes[step - 1];
  const totalStep = state.holes.length;

  const getStartDate = (startDate, round) => {
    let dt = new Date(startDate);
    dt.setDate(dt.getDate() + round - 1);
  
    return dt
  }

  useEffect(() => {
    const payload = {
      t_id: card.t_id,
      round: card.round,
      group_id: card.group_id || 1,
      hole_number: state.holes[step - 1]["hole_number"],
      counter: step
    };
    dispatch(getHoleGolfers(payload));
  }, [step]);

  useEffect(() => {
    if (state.holeGolfers && state.holeGolfers.length !== 0) {

      setGolfers(state.holeGolfers[0].groups);

      const unique = {};

      for (let i = 0; i < state.holeGolfers[0].groups.length; i++) {
        const gp = state.holeGolfers[0].groups[i]
        unique["" + gp.group_id] = gp.group_id
      }
      const mGolfers = state.holeGolfers[0].groups;
      const mGolferArray = [];
      for (var key in unique) {
        var val = unique[key];
        var filteredGolfer = mGolfers.filter((item) => item.group_id === val);
        mGolferArray.push(filteredGolfer);
      }
      setGolferArray(mGolferArray);
      const currentGroup = mGolferArray[0];
      setCurrentGroup(currentGroup);
      console.log("aaaaaaaaaaa====", currentGroup)

      // setGolfer(currentGroup[0].p_id);
      // setGolferGroupId(currentGroup[0].group_id);
    }
  }, [state.holeGolfers]);

  const getCurrentGroupTotalRaning = () => {
    let total = 0
    currentGroup.map((golfer, index) => {
      total+= golfer.rank;
    })
    return total
  }
  const getNextGolferList = () => {
    if (selectedGolferId === "" && selectedGolferGroupId === "") {
      return;
    }

    const payload = {
      user_id: auth.user.id,
      t_id: card.t_id,
      hole: hole.hole_number,
      round: card.round,
      group_id: selectedGolferGroupId,
      p_id: selectedGolferId,
      counter: step
    };

    dispatch(userCTTPPick(payload));


    var gIndex = groupIndex;
    gIndex = gIndex + 1;
    setGroupIndex(gIndex)

    if (gIndex < golferArray.length &&  gIndex < 3) {

      setGolfer("")
      setGolferGroupId("")
      const mArray = golferArray;
      const cGroup = mArray[gIndex];
      setCurrentGroup(cGroup)


    } else {
      setGolfer("");
      setGroupIndex(0)
      setGolferGroupId("");
      setCurrentGroup([]);
      setGolferArray([]);
      navigation.navigate("Pairings", { step: step + 1, card });
    }

  }
  const setIds = (golfer) => {
    setGolfer(golfer.p_id);
    setGolferGroupId(golfer.group_id);
    console.log("golferId " + golfer.p_id + "   , groupId " + golfer.group_id)
  };

  const nextPairing = () => {
    const payload = {
      user_id: auth.user.id,
      t_id: card.t_id,
      hole: hole.hole_number,
      round: card.round,
      // group_id: card.group_id,
      group_id: selectedGolferGroupId,
      p_id: selectedGolferId,
    };

    dispatch(userCTTPPick(payload));
    navigation.navigate("Pairings", { step: step + 1, card });
  };

  const getProgressColor=(golfer)=>{
    var lowest = Number.POSITIVE_INFINITY;
    var highest = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var i=currentGroup.length-1; i>=0; i--) {
        tmp = currentGroup[i].rank;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
    }
    if(golfer.rank === highest) return CommonColors.Green
    if(golfer.rank === lowest && currentGroup.length === 2 ) return CommonColors.Orange
    if(golfer.rank === lowest ) return CommonColors.Red
    return CommonColors.Orange;
  }

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Rabbit Card PAIRINGS</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>
                {card?.tournament?.name || ""}
              </Text>
              <Text style={CommonStyles.rowTitle}>
                {new Date(getStartDate(card.tournament.start_date,card.round)).toUTCString().substring(0,16) || ""} -{" "}
                {new Date(card?.tournament.end_date).toUTCString().substring(0,16) || ""}
              </Text>
            </View>
            <View style={styles.container}>
              
              <Round step={card.round,card.round} />
              <Text style={CommonStyles.subTitle}>
                HOLE {hole.hole_number}: PAR {hole.par}, {hole.yardage} YARDS
                PAIRING {step}
              </Text>
              <Text style={CommonStyles.smallText}>
                Select one player to be closest to the pin. See our expert
                recommentaions.
              </Text>
            </View>
          </View>
          {/* {golfers.map((golfer, index) => (
            <PairingPlayer
              key={index}
              golfer={golfer}
              percent={0.25 * (index + 1)}
              selectedId={selectedGolferId}
              onPress={() =>
                navigation.navigate("PlayerProfile", { profile: golfer })
              }
              // onCheck={() => setGolfer(golfer.p_id)}
              onCheck={() => setIds(golfer)}
            />
          ))} */}
          {

          currentGroup.length === 0 ? <View></View> : currentGroup.map((golfer, index) => 
          (
            console.log("ddddddd====",golfer),
            <PairingPlayer
              key={index}
              golfer={golfer}
              // percent={Number(golfer.rank/getCurrentGroupTotalRaning()).toFixed(3)}
              percent={golfer.ranking_perc}
              selectedId={selectedGolferId}
              progressColor = {getProgressColor(golfer)}
              onPress={() =>

                navigation.navigate("PlayerProfile", { profile: golfer })
              }
              // onCheck={() => setGolfer(golfer.p_id)}
              onCheck={() => setIds(golfer)}
            />
          ))}
          {/* {
          Object.keys(groupWiseGolfer).length===0?<View></View>:
          Object.keys(groupWiseGolfer).map((key) => (
            <View>
              <Text>Group : {key}</Text>
              {
                groupWiseGolfer[key].map((golfer, index) => (
                  <PairingPlayer
                    key={index}
                    golfer={golfer}
                    percent={0.25 * (index + 1)}
                    selectedId={Object.keys(selectedGroupWiseGolfer).length===0?"":selectedGroupWiseGolfer[key].hasOwnProperty('p_id')?selectedGroupWiseGolfer[key].p_id:""}
                    onPress={() =>
                      navigation.navigate("PlayerProfile", { profile: golfer })
                    }
                    // onCheck={() => setGolfer(golfer.p_id)}
                    onCheck={() => setIds(golfer,key)}
                  />
                ))
              }
            </View>
          ))} */}
        </ScrollView>
      </SafeAreaView>
      {/* <Button
        title="NEXT Group"
        onPress={getNextGolferList}
        backgroundColor={CommonColors.Green}
        style={{ width: "100%" }}
      /> */}
    
      {(step !== totalStep) ? (
        <Button
          title="NEXT PAIRING"
          // onPress={() => nextPairing()}
          onPress={() => getNextGolferList()}
          backgroundColor={CommonColors.Green}
          style={{ width: "100%" }}
        />
      // ) : (step === totalStep && groupIndex < (golferArray.length - 1)) ?
      ) : (step === totalStep && groupIndex < 2) ?
        (
          <Button
            title="NEXT PAIRING"
            // onPress={() => nextPairing()}
            onPress={() => getNextGolferList()}
            backgroundColor={CommonColors.Green}
            style={{ width: "100%" }}
          />
        ) :
        (<SeparateButton
          prevTitle="TOURNAMENTS"
          nextTitle="RABBIT CARD"
          prev={() => navigation.goBack()}
          next={() => {
            if (selectedGolferId === "" && selectedGolferGroupId === "") {
              return;
            }


            const payload = {
              user_id: auth.user.id,
              t_id: card.t_id,
              hole: hole.hole_number,
              round: card.round,
              group_id: selectedGolferGroupId,
              p_id: selectedGolferId,
            };

            console.log("payload", payload);
            dispatch(userCTTPPick(payload));


            navigation.navigate("ReadyToPlaySummary", { card })
          }}
          backgroundColor={CommonColors.Green}
        />)

        // : (step === 4 && groupIndex >= (golferArray.length-1)) ? (
        //   <SeparateButton
        //     prevTitle="TOURNAMENTS"
        //     nextTitle="RABBIT CARD"
        //     prev={() => navigation.goBack()}
        //     next={() => {
        //       if (selectedGolferId === "" && selectedGolferGroupId === "") {
        //         return;
        //       }
        //       navigation.navigate("ReadyToPlaySummary", { card })
        //     }}
        //     backgroundColor={CommonColors.Green}
        //   />
        // ):<View></View>
      }
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getHoleGolfers, userCTTPPick })(
  Pairing
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
    paddingVertical: w(40),
  },
  container: {
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: w(40),
    paddingVertical: w(20),
  },
});
