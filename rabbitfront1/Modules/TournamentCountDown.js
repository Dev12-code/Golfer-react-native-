import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Animated } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getTournamentById, setTournament as setTournamentReducer } from '../store/redux/tournaments/actions';
import { BackButton, Button, ButtonBack, Menu } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { CommonColors, CommonStyles } from './style';
import { w, h } from '../utils/scale'
import { Fonts } from '../common/Fonts';

const getTimeRemaining = (_startDate,round) => {
  const start = new Date(_startDate.getTime());
  const total = Date.parse(start) - Date.parse(new Date());
  const start_weekday = _startDate.getUTCDay()
  var tmpST = start;
  var newST;
  // if(start_weekday === 4 ){
  //   newST = tmpST.setHours(tmpST.getHours() - 24-7);
  // }
  // else if(start_weekday === 5){
  //   newST = tmpST.setHours(tmpST.getHours() - 48-7);

  // }else if(start_weekday ===6){
  //   newST = tmpST.setHours(tmpST.getHours() );
  
  // }else if(start_weekday === 0){
  //   newST = tmpST.setHours(tmpST.getHours() - 24);
  // }else{
  //   newST = tmpST.setHours(tmpST.getHours() - 24);
  // }  
  console.log(start_weekday ,_startDate.getUTCDate(),_startDate.getUTCDay(),_startDate)

  var first = _startDate.getUTCDate() - _startDate.getUTCDay(); // First day is the day of the month - the day of the week
  // console.log(first,_startDate.getUTCDate(),_startDate.getUTCDay());
  if(round === 1 || round === 2){
    var curr = new Date();
    curr.setUTCHours(13)
    curr.setMinutes(0)
    curr.setSeconds(0)
    curr.setMonth(_startDate.getMonth())
    newST = new Date(curr.setUTCDate(first + 2))
   
  }else if(round === 3){
    var curr = new Date();
    curr.setUTCHours(2)
    curr.setMinutes(0)
    curr.setSeconds(0)
    curr.setMonth(_startDate.getMonth())

    newST = new Date(curr.setUTCDate(first + 6))

  }else if(round === 4){
    var curr = new Date();
    var second = curr.getUTCDate() - curr.getUTCDay(); // First day is the day of the month - the day of the week

    curr.setUTCHours(2)
    curr.setMinutes(0)
    curr.setSeconds(0)
    curr.setMonth(_startDate.getMonth())

    if(first === second+7){
      newST = new Date(curr.setUTCDate(second+7))
    }else{
      newST = new Date(curr.setUTCDate(first))

    }
  }

  const newDST = new Date(newST);

  var dateFuture = new Date(newDST.getTime());
  var dateNow = new Date();

  var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - (days * 24);
  minutes = minutes - (days * 24 * 60) - (hours * 60);
  seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

  seconds = seconds; 
  minutes = minutes;
  hours = hours+(days*24);
  days = days;


  if(days < 10){
    days = '0'+days
  }
  if(hours < 10){
    hours = '0'+hours
  }
  if(minutes < 10){
    minutes = '0'+minutes
  }
  if(seconds < 10){
    seconds = '0'+seconds
  }
  

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

const getStartDate = (date, round) => {
  let dt = new Date(date);
  dt.setUTCDate(dt.getUTCDate() + round - 1);
  return dt
}
const TournamentCountDown = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { card } = route.params
  const [duration, setDuration] = useState(60)
  const [initRemainTime, setInitRemainTime] = useState(0)

  const endDate = card.tournament.end_date
  const startDate = getStartDate(card.tournament.start_date , card.round)
  const _displayTime =  getStartDate(card.tournament.start_date , card.round);
  var timeRemaning = getTimeRemaining(startDate,card.round);
  useEffect(() => {
    // const duration = Math.floor((new Date(startDate).getTime() - Date.now()) / 1000)
    // startDate = getStartDate(card.tournament.start_date , card.round)
    const mS = parseInt(''+getTimeRemaining(startDate,card.round).seconds)
    setInitRemainTime(mS)
    // setDuration(duration)
    // setDuration(100)

  }, [startDate])
  console.log(card)
  if (!card) return <View />

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Rabbit Card Pick Countdown</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>{card.tournament.name}</Text>
              <Text style={CommonStyles.rowTitle}>{_displayTime.toUTCString().substring(0,16)}
               {/* - {new Date(card.tournament.end_date).toUTCString().substring(0,16)} */}
               </Text>
              <Text style={[CommonStyles.sectionTitle, { paddingVertical: w(20) }]}>Make final Rabbit Card Picks before time runs out.</Text>
              <Text style={[CommonStyles.sectionTitle, { paddingVertical: w(20) }]}>Push notification will be sent to phone when parings are released by the PGA</Text>
            </View>
            <View style={styles.container}>
              <CountdownCircleTimer
                key={`${new Date().getTime()}`}
                isPlaying={true}
                duration={duration}
                colors={[
                  [CommonColors.Warning, 0.2],
                  [CommonColors.Green, 0.8],
                ]}
                onComplete={() => [true]}
                size={w(450)}
                isLinearGradient
                initialRemainingTime={initRemainTime}
              >
                {({ remainingTime, animatedColor }) => (
                  <View style={styles.timeContent}>
                    <Animated.Text style={styles.timerText}>
                      { timeRemaning = getTimeRemaining(startDate,card.round),`${timeRemaning.hours}:${timeRemaning.minutes}:${timeRemaning.seconds}`}
                    </Animated.Text>
                    <Animated.Text style={[CommonStyles.sectionTitle, { textAlign: 'center', }]}>
                      {_displayTime.toUTCString().substring(0,16)}
                    </Animated.Text>
                    <Animated.Text style={[CommonStyles.smallText, { textAlign: 'center' }]}>
                      All picks must be final one minute
                      before tournament’s first tee time.
                    </Animated.Text>
                  </View>
                )}
              </CountdownCircleTimer>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ButtonBack title="BACK TO RABBIT CARDS"
        onPress={() => navigation.goBack()}
        backgroundColor={CommonColors.Green} style={{ width: '100%' }}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getTournamentById, })(TournamentCountDown);

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
    paddingVertical: w(40),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: w(20),
    padding: 8,
  },
  timeContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: w(40)
  },
  timerText: {
    color: CommonColors.Warning,
    fontFamily: Fonts.SourceSansRomanBold,
    fontSize: w(60),
    paddingVertical: w(18)
  },
});