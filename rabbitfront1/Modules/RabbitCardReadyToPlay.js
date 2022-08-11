import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { BackButton, Button, ButtonBack, MakeSelectionButton, Menu, Player,  LoadingContainer,  SeparateButton } from '../components/Button';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getRabbitCardChoice, getTournamentById, getGroupingsPar3s } from '../store/redux/tournaments/actions';
import { UnderlineIcon } from '../components/icons';
import { CommonColors, CommonStyles } from './style';
import { w, h } from '../utils/scale';
var _ = require("lodash");

const ReadyToPlay = ({ navigation, route }) => {
  const { card } = route.params
  const isFocused = useIsFocused()

  const dispatch = useDispatch()
  const state = useSelector(state => state.tournaments)

  const [holes, setHoles] = useState(state.holes)

  useEffect(() => {
    setHoles(state.holes)
  }, [state.holes])

  useEffect(() => {
    isFocused && fetch()
  }, [card])

  const fetch = () => {
    // dispatch(getTournamentById(card.t_id))
    // const { t_id, round, group_id } = card
    // const payload = {
    //   t_id,
    //   round,
    //   group_id: group_id || 1,
    //   cttp_flag: false
    // }
    // dispatch(getRabbitCardChoice(payload))

    // if (t_id && round) dispatch(getGroupingsPar3s(payload))
 
  }

  if(!holes || holes.length === 0){
    Alert.alert("There are no groups assigned to this round yet. Check back soon, selections will be available shortly.")

  }

  const makeSelectionNavigation = () => {
    if (holes && holes.length !== 0) {    
      navigation.navigate('Pairings', { card })
    } else {
      Alert.alert("There is no holes assigned to this card, Check back soon, selections will be available shortly.")
    }
  }
  const getStartDate = (startDate, round) => {
    let dt = new Date(startDate);
    dt.setDate(dt.getDate() + round - 1);
  
    return dt
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
              <Text style={CommonStyles.sectionTitle}>{card?.tournament?.name || ''}</Text>
              <Text style={CommonStyles.rowTitle}>{new Date(getStartDate(card.tournament.start_date,card.round)).toUTCString().substring(0,16) || ""}
               {/* - {new Date(card?.tournament.end_date).toUTCString().substring(0,16)|| ""} */}
               </Text>
              <Text style={CommonStyles.rowTitle}>Round {card?.round || ''}</Text>   
              { 
                // state.choice.length == 0 && (
                //   <MakeSelectionButton onPress={() => makeSelectionNavigation()} />
                // )  
                (
                  <MakeSelectionButton onPress={() => makeSelectionNavigation()} />
                )
              }
            </View>
          </View>
          
          {
          

          state.choice.length == 0 && ( holes && holes.length !== 0 &&
            holes.map(item =>
             <View style={styles.section} key={item.id}>
              <View style={styles.paddingH40}>
                <View style={[styles.rowWrap, { alignItems: 'flex-end' }]}>
                  <Text style={CommonStyles.subTitle}>HOLE {item.hole_number}</Text>
                  <Text style={[CommonStyles.sectionTitle, { paddingLeft: 4 }]}>Par {item.par}, {item.yardage} Yards</Text>
                </View>
              </View>
            </View>
            ))
          } 
          {
          state.choice.map((hole, index) => {
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
      <ButtonBack title="BACK TO MY RABBIT CARDS" onPress={() => navigation.navigate("MyRabbitCards")} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getGroupingsPar3s,getRabbitCardChoice })(ReadyToPlay);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20),
  },
  paddingH40: {
    paddingHorizontal: w(40),
    paddingVertical: w(10)
  },
  topSection: {
    paddingTop: w(20)
  },
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: -1,
    borderColor: CommonColors.Black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rowSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});