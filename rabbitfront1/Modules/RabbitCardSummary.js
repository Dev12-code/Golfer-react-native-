import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect,useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import LottieView from 'lottie-react-native';

import {
  BackButton,
  LoadingContainer,
  Player,
  SeparateButton,
} from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import {
  getTournamentById,
  getGroupingsPar3s,
  getRabbitCardChoice,
  getUserRanking,
} from "../store/redux/tournaments/actions";
import { h, w } from '../utils/scale';
import { CommonColors, CommonStyles } from "./style";

var _ = require("lodash");

const Summary = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { card } = route.params;
  
  const state = useSelector((state) => state.tournaments);
  const [holes, setHoles] = useState(state.holes)
  const dispatch = useDispatch();
  let animation = React.createRef();
  var popupStatus = false;

  useEffect(async() => {
    isFocused && fetch();
    const device_token = await AsyncStorage.getItem("device_token")
  }, [card]);
  const fetch = () => {
    dispatch(getTournamentById(card.t_id));
    const { t_id, round, group_id } = card
    const payload = {
      t_id,
      round,
      group_id: group_id || 1,
      cttp_flag: true
    }
    dispatch(getRabbitCardChoice(payload))
    if (t_id && round) {
      dispatch(getUserRanking(payload))

      dispatch(getGroupingsPar3s(payload))
    }
  };
  const [userRankings, setUserRanking] =useState([]);
  useEffect(() => {
    setUserRanking(state.userRankings);
  }, [state.userRankings]);


  var winnerCount = 0 ;
  if(state.choice.length == 0 ){
    holes.map((hole, index) => {
      var item = { 
          'hole': hole.hole_number,
          'par':hole.par,
          'yardage':hole.yardage,
      };
      state.choice.push(item);
    })
  }
  const getStartDate = (startDate, round) => {
    let dt = new Date(startDate);
    dt.setDate(dt.getDate() + round - 1);
  
    return dt
  }

  if(!state.rabbitcardLoading){
    console.log("bbbbbbb","okay");

    state.choice.map((hole, index) => {          
      const groups = _.groupBy(hole.players, "group_id");
            Object.keys(groups).map((groupId) => (
                groups[groupId].map((item, index) => {                   
                    if(item.status === 1 || item.status === 2) popupStatus = true;       

                })
            ))
      })
      if(popupStatus === false){
        Alert.alert("You missed the deadline for making selections. Check back tomorrow for more rounds.");
        state.rabbitcardLoading = true; 
      }


  }


  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      {/* {state.loading && <LoadingContainer /> } */}
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
                 getStartDate(card.tournament.start_date,card.round)).toUTCString().substring(0,16) || ""}{" "}
                {/* -{" "}
                {new Date(state.selectedTournament?.end_date).toUTCString().substring(0,16) ||
                  ""} */}
              </Text>
              <Text style={[CommonStyles.sectionTitle, { paddingTop: w(40) }]}>
                RABBIT CARDS BY HOLE
              </Text>
            </View>
          </View>     
          
          {   
          winnerCount = 0 ,

         state.loading ?    
          <LottieView
                ref={animation}
                autoPlay
                loop={true}
                style={{
                  width: w(500),
                  height: h(500)
                }}
                source={require('../assets/lottie/card_animation.json')}
              />         
             : 
          state.choice.map((hole, index) => {
            const groups = _.groupBy(hole.players, "group_id");
            const hole_win = state.holes.find(element => element['hole_number'] === hole.hole)
            console.log("aaaaa", groups);
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
                          if(item.status == 1) winnerCount ++
                          var item_status = item.status;
                          const array = groups[groupId];
                          // if( item_status ===2){
                          //   if(array[0].p_id === item.p_id){
                          //     if(array[0].status === 2 && array[1].status === 4 && array[2].status === 4) item_status = -1                  
                          //   }else  if(array[1].p_id = item.p_id){
                          //     if(array[1].status === 2 && array[0].status ===4 && array[2].status === 4) item_status = -1                  
                          //   }else  if(array[2].p_id ===item.p_id){
                          //     if(array[2].status === 2 && array[0].status === 4 && array[1].status === 4) item_status = -1                  
                          //   }
                          // }
                          return (
                            <Player
                              key={index}
                              // status={item.won ? 1 : 3}
                              status={item_status}
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
      {/* tournaments */}
      <SeparateButton
        prevTitle="RABBIT CARDS"
        nextTitle="TOURNAMENT RANKING"
        prev={() => navigation.navigate("MyRabbitCards")}
        next={async() => {
          var filteredTournaments = state.tournaments.filter((item) => item.t_id === card.t_id);
          console.log("filteredTournaments : ",filteredTournaments);
          if(filteredTournaments.length > 0){
              var filteredT = filteredTournaments[0];
              var tCard = card;
            tCard.tournament = filteredT;
            var exist = -1;
            if(userRankings.length>0){
              exist =  userRankings[0]['user']['id']
            }
            

            var userID = parseInt(await AsyncStorage.getItem("@userId"));

            if(exist === userID){
              navigation.navigate("YouWin", { card:tCard })
            }else{
              navigation.navigate("MyTournamentRankingProgress", { card:tCard })
            }        
          }

          
        }}
        backgroundColor={CommonColors.Green}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getRabbitCardChoice ,getGroupingsPar3s})(Summary);

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
