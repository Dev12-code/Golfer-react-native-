import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
var _ = require("lodash");

import { Button, Menu,BackButton } from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import { w } from "../utils/scale";
import { CommonColors, CommonStyles } from "./style";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect ,useState} from 'react';
import { connect, useDispatch,useSelector } from 'react-redux';
import { Fonts } from '../common/Fonts';
import { clearSignUpError } from '../store/redux/auth/actions';
import { getAllGolfers } from "../store/redux/golfers/actions";
import { getUserRanking } from "../store/redux/tournaments/actions";

import { useIsFocused } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { color } from "react-native-reanimated";

const MyTournamentRanking = ({ route }) => {
  const { card } = route.params
  const isFocused = useIsFocused();

  let animation = React.createRef();

  const navigation = useNavigation()
  const dispatch = useDispatch();
 
  useEffect(() => {
    const payload = {
      t_id:card.tournament.t_id,
      round:card.round,
    }
    isFocused && dispatch(getUserRanking(payload));
  }, [isFocused]);
  const state = useSelector((state) => state.tournaments);
  const [userRankings, setUserRanking] =useState([]);
 
  useEffect(() => {
    setUserRanking(state.userRankings);
  }, [state.userRankings]);
  
  return (
    <View style={CommonStyles.overflowContainer}>
     <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>My Rabbit Card Ranking</Text>
            <View style={styles.padding20}>
                <UnderlineIcon />
              </View>
            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>
                {card?.tournament?.name || ''}
              </Text>
            
              <Text style={CommonStyles.rowTitle}>
              {new Date(card.tournament.start_date).toUTCString().substring(0,16) || ""} - {new Date(card?.tournament.end_date).toUTCString().substring(0,16) || ""}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[CommonStyles.sectionTitle,{width:100,textAlign:'center'}]}>RANKING</Text>
              <Text style={[CommonStyles.sectionTitle,{width:150,textAlign:'center'}]}>USER NAME</Text>
              <Text style={[CommonStyles.sectionTitle,{width:100,textAlign:'center'}]}>POINTS</Text>
            </View>   
              { 
                userRankings.map((user, index) => {                
                const ranking = user.ranking
                return (
                  <View style={styles.row} key={index}>
                  <Text
                    style={[
                      CommonStyles.sectionTitle,
                      ,
                      { color: CommonColors.sectionTitle ,width:100 ,textAlign:'center'},
                    ]}
                  >
                    {index+1}
                  </Text>
                  <Text
                    style={[
                      CommonStyles.rowTitle,
                      { color: CommonColors.Dark,width:150,textAlign:'center'},
                    ]}
                    
                  >
                    {user['user'].first_name + " " + user['user'].last_name}
                  </Text>
                  <Text
                    style={[
                      CommonStyles.sectionTitle,
                      ,
                      { color: CommonColors.sectionTitle,width:100 ,textAlign:'center'},
                    ]}
                  >
                    {ranking}
                  </Text>
                
                </View>
                 
                )
                })              
              }
            

          </View>
        </ScrollView>
      </SafeAreaView>
      <Text style={[CommonStyles.sectionTitle,{fontSize: w(25),textAlign:'center',backgroundColor:"#fff"}]}>*Ties decided by tie breaker</Text>

      <View style={styles.bottom}>
        
        <View style={styles.left}>

          <View style={styles.leftTop}>
            <Text style={CommonStyles.sectionTitle}>RABBIT PURSE</Text>
            <Text style={[CommonStyles.smallText, { paddingLeft: 4 }]}>
              Top Five Winners
            </Text>
          </View>
          <View style={styles.leftBottom}>
          <Image
              source={require("./../assets/kicker.png")}
              style={styles.brand}
            />
            {/* <Text
              style={[
                CommonStyles.sectionTitle,
                { color: CommonColors.LightGrey },
              ]}
            >
              DRIVER | TSi2 DRIVER
            </Text> */}
          </View>
        </View>
        {/* <Image
          source={require("./../assets/group542.png")}
          style={styles.image}
        /> */}
      </View>
      <View
        style={{ width: "100%" ,backgroundColor:CommonColors.Green,height:w(140)}}
      />
      
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.golfers.loading,
  error: state.golfers.error,
});
export default connect(mapStateToProps,  { getUserRanking })(MyTournamentRanking);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: w(10),
  },
  padding20: {
    paddingVertical: w(20),
  },
  section: {
    paddingVertical: w(40),
  },
  bottom: {
    backgroundColor: CommonColors.White,
    paddingLeft: w(40),
    paddingVertical: w(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: w(200),
    height: "100%",
    resizeMode: "contain",
  },
  brand: {
    width: w(400),
    resizeMode: "contain",
  },
  leftTop: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  leftBottom: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  bottomButtonContainer: {
    paddingVertical: w(20),
    backgroundColor: CommonColors.Green,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
