import React, { useEffect, useState,useRef} from 'react';
import * as Animatable from 'react-native-animatable';

import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert,Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getTournamentById, setRound, setTournament, createRabbitCard } from '../store/redux/tournaments/actions';
import { CancelIcon, SelectIcon, UnderlineIcon } from '../components/icons';
import { BackButton, LoadingContainer, Menu } from '../components/Button';
import { CommonColors, CommonStyles } from './style';
import { w, h } from '../utils/scale';
import { round } from 'lodash';

export const product = {
  id: 1,
  name: "TSi2 Driver",
  price: 549,
  company: "Titleist",
  logo: require("../assets/sponsors/titleist.png"),
  images: [{
    id: 1,
    image: require('../assets/titleist/1.png')
  }, {
    id: 2,
    image: require('../assets/titleist/2.png')
  }, {
    id: 3,
    image: require('../assets/titleist/3.png')
  }, {
    id: 4,
    image: require('../assets/titleist/4.png')
  }, {
    id: 5,
    image: require('../assets/titleist/5.png')
  }, {
    id: 6,
    image: require('../assets/titleist/6.png')
  },]
}

const nextDay = (date, next) => {
  const day = new Date(date);

  let nextDay = new Date(day);
  nextDay.setDate(day.getDate() + next);
  return nextDay
}
const getStartDate = (startDate, round) => {
  let dt = new Date(startDate);
  dt.setDate(dt.getDate() + round - 1);

  return dt
}
const TournamentChoices = ({ navigation }) => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch();
  const tournaments = useSelector((state) => state.tournaments);
  var { rangeTournaments, selectedTournament, currentRound } = tournaments;
  const [loading, setLoading] = useState(false)
  const myRabbitCard = useSelector((state) => state.tournaments).rabbitCards;
  var existCards = myRabbitCard.filter(function(element) {
    return element.t_id === selectedTournament.t_id;
  });
  useEffect(() => {
    if (selectedTournament) {
      setLoading(true)

      setTimeout(() => {
        dispatch(setTournament(selectedTournament))
        dispatch(getTournamentById(selectedTournament.t_id))
        setLoading(false)
      }, 500);

    } else {
      navigation.navigate('NoChoice')
    }
  }, [currentRound])

  if (selectedTournament) {
    const start_dateMilionSecond = new Date(selectedTournament.start_date).getTime();
    const end_dateMilionSecond = new Date(selectedTournament.end_date).getTime();    
    const currentMilonSecond = new Date().getTime()
    if(start_dateMilionSecond<currentMilonSecond && end_dateMilionSecond>currentMilonSecond){
        for(let round = 1; round <=selectedTournament.rounds_official_money; round++){
            var _startDate = getStartDate(selectedTournament.start_date , round)
            if((currentMilonSecond -  _startDate.valueOf())/1000 < 25200 ){                
              currentRound = round;
              break
            }
        }
     // currentRound = selectedTournament.rounds_official_money - 1
     
      
    }
  }
  for (let i = currentRound; i <= selectedTournament.rounds_official_money; i++) {
    var exist = existCards.filter(function(element) {
     
      return element.round === i;
    });
    if(exist.length === 0 ){
      currentRound = i;
      break
    }
  }
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start(({ finished }) => {
      /* completion callback */
      fadeOut();
    });
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();

  };
  const onSubmit = () => {
  
    fadeIn();
    const payload = { t_id: selectedTournament.t_id, round: currentRound, state:1 }
    dispatch(createRabbitCard(payload))
    updateTournament()
  }

  const onCancel = () => {
    fadeIn();
    const payload = { t_id: selectedTournament.t_id, round: currentRound, state:0 }
    dispatch(createRabbitCard(payload))
    updateTournament()
  }

  const updateTournament = async () => {
    if (currentRound === selectedTournament.rounds_official_money) {
      const rangeIds = rangeTournaments.map(item => item.t_id)
      const index = rangeIds.indexOf(selectedTournament.t_id);
      if (index >= 0 && index < rangeTournaments.length - 1) {
        const nextItem = rangeTournaments[index + 1]
        dispatch(setTournament(nextItem))
        var round = -1;
        for (let i = 1; i <= selectedTournament.rounds_official_money; i++) {
          var exist = existCards.filter(function(element) {
            return element.round === i;
          });
          if(exist.length > 0 ){
            round = i;
            break
          }
        }
        if(round >0){
          dispatch(setRound(round))
        }

      } else {
        navigation.navigate('NoChoice')

      }
    } else {
      var round = -1;
      for (let i = currentRound+1; i <= selectedTournament.rounds_official_money; i++) {
        var exist = existCards.filter(function(element) {
          return element.round === i;
        });
        if(exist.length > 0 ){
          round = i;
          break
        }
      }
      if(round >0){
        dispatch(setRound(round))
      }

    }
  }
  

  if (!selectedTournament) return <View />

  return (
    <View style={[CommonStyles.overflowContainer]}>
      <BackButton />
      {loading || tournaments.loading && <LoadingContainer />}
      <SafeAreaView style={[CommonStyles.container,]}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, { paddingTop: w(100) }]}>
            <Text style={CommonStyles.title}>Tournament Choices</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.nameTitle}>{selectedTournament.name || ""}</Text>
              <Text style={CommonStyles.rowTitle}>{new Date(selectedTournament.start_date).toUTCString().substring(0,16) || ""} - {new Date(selectedTournament?.end_date).toUTCString().substring(0,16) || ""}</Text>
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>Location</Text>
              <View style={styles.padding20}>
                <UnderlineIcon />
              </View> 
              {selectedTournament?.courses && <View>
                <Text style={CommonStyles.rowTitle}>{selectedTournament?.courses[0]?.location || ''}</Text>
                <Text style={CommonStyles.rowTitle}>{selectedTournament?.courses[0]?.name || ''}</Text>
              </View>}
            </View>

            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>Round Details</Text>
              {<View style={styles.padding20}>
                <UnderlineIcon />
              </View>}
            
          
              <View style={[                  
                  { flex: 1,
                    justifyContent: 'center',
                    }]}>            
                    <Animated.View
                      style={[                  
                        { flex: 1,
                          justifyContent: 'center',
                          height: "100%",
                          width: "100%",
                          position: "absolute",
                          backgroundColor: 'lightgray',
                          justifyContent: 'center'},
                        {
                          opacity: fadeAnim, // Bind opacity to animated value
                        },
                      ]}>

                      </Animated.View>
                      {currentRound &&    
                       <View style = {[{paddingTop:10}]}>
                         <Text style={CommonStyles.roundTitle}>ROUND {currentRound}</Text>
                         <Text style={[CommonStyles.rowTitle, { paddingBottom: w(20) }]}>{new Date(nextDay(selectedTournament.start_date, currentRound - 1)).toUTCString().substring(0,16)}</Text>
                       </View>}
                  </View>             
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <View style={styles.leftTop}>
            <Text style={CommonStyles.sponsorTitle}>RABBIT PURSE</Text>
            <Text style={[CommonStyles.smallText, { paddingLeft: 4 ,alignContent:"center",marginBottom:5}]}>Top Five Winners</Text>
          </View>
          <View style={styles.leftBottom}>
            <Image source={require("./../assets/kicker.png")} style={styles.brand} />
            {/* <Text style={[CommonStyles.sectionTitle, { color: CommonColors.LightGrey }]}>DRIVER | TSi2 DRIVER</Text> */}
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate("SponsorGalary", { product })} >
          <Image source={product.images[0].image} style={styles.image} />
        </TouchableOpacity> */}
      </View>
      <View style={[styles.bottomButtonContainer,{paddingBottom:30}]}>
        <TouchableOpacity onPress={() => onCancel()}>
          <CancelIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSubmit()}>
          <SelectIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getTournamentById, createRabbitCard })(TournamentChoices);

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: w(200),
    height: w(100),
    resizeMode: 'contain',
  },
  brand: {
    width: w(400),
    resizeMode: 'contain',
  },
  leftTop: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  leftBottom: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  bottomButtonContainer: {
    paddingVertical: w(20),
    backgroundColor: CommonColors.Green,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});