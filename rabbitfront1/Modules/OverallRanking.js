import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Menu } from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import { CommonColors, CommonStyles } from "./style";
import { getOverallRanking } from "../store/redux/tournaments/actions";

const OverallRankings = ({ navigation }) => {
  const isFocused = useIsFocused();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tournaments);
  const [userRankings, setUserRanking] =useState([]);
  useEffect(() => {
    isFocused && dispatch(getOverallRanking());
  }, [isFocused]);

  useEffect(() => {
    setUserRanking(state.userRankings);
  }, [state.userRankings]);
  console.log("aaaa");


  return (
    <View style={CommonStyles.overflowContainer}>
      <Menu />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>My Overall Ranking</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.row}>
              <Text style={CommonStyles.sectionTitle, {marginLeft:20}}>USER NAME</Text>
              <Text style={CommonStyles.sectionTitle,{marginRight:20}}>RANKING</Text>
            </View>
        
            { 
                userRankings.map((user, index) => {                
                const ranking = user.ranking
                return (
                  <View style={styles.row} key={index}>
                  <Text
                    style={[
                      CommonStyles.rowTitle,
                      { color: CommonColors.Dark ,marginLeft:30},
                    ]}
                    
                  >
                    {user['user'].first_name + " " + user['user'].last_name}
                  </Text>
                  <Text
                    style={[
                      CommonStyles.sectionTitle,
                      ,
                      { color: CommonColors.sectionTitle, marginRight:50 },
                    ]}
                  >
                    {/* {ranking} */
                    index+1}
                  </Text>
                </View>
                 
                )
                })              
              }
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.golfers.loading,
  error: state.golfers.error,
});

export default connect(mapStateToProps, { getOverallRanking })(OverallRankings);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
});
