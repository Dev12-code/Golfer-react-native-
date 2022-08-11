import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { BackButton, Button, ButtonBack, LoadingContainer, Menu, Player, SeparateButton } from '../components/Button';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getRabbitCardChoice, getTournamentById } from '../store/redux/tournaments/actions';
import { UnderlineIcon } from '../components/icons';
import { CommonColors, CommonStyles } from './style';
import { w, h } from '../utils/scale';

const TournamentPushNotification = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const { card } = route.params
  let animation = React.createRef();


  useEffect(() => {
    animation.current.play()
  }, [])

  const dispatch = useDispatch()
  const state = useSelector(state => state.tournaments)


  useEffect(() => {
    isFocused && fetch()
  }, [card])

  const fetch = () => {
    dispatch(getTournamentById(card.t_id))
  }
  const getStartDate = (startDate, round) => {
    let dt = new Date(startDate);
    dt.setDate(dt.getDate() + round - 1);
  
    return dt
  }
  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      {state.tournaments.loading && <LoadingContainer />}
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, { paddingTop: w(100) }]}>
            <Text style={CommonStyles.title}>Tournament Information</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.topSection}>
              <Text style={CommonStyles.subTitle}>{card?.name || ''}</Text>
              <Text style={CommonStyles.sectionTitle}>{new Date(getStartDate(state.selectedTournament?.start_date, card?.round)).toUTCString().substring(0,16) || ""} 
              {/* - {new Date(state.selectedTournament?.end_date).toUTCString().substring(0,16) || ""} */}
              </Text>
              <Text style={CommonStyles.sectionTitle}>Round {card?.round || ''}</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: w(40) }}>
            <Text style={CommonStyles.sectionTitle}>Courses</Text>
            {card.tournament?.courses && card.tournament.courses.length !== 0 && card.tournament.courses.map(course => {
              return <View key={course.course_number} style={{ paddingTop: w(10) }}>
                <Text style={CommonStyles.smallText}>{course.name}</Text>
                <Text style={CommonStyles.smallText}>{course.location}</Text>
                <Text style={CommonStyles.smallText}>Par {course.par_value}, {course.total_yardage} Yards</Text>
              </View>
            })}
          </View>
          <View style={CommonStyles.padding}>
            <Text style={[CommonStyles.sectionTitle, { paddingTop: w(20) }]}>Push Notification Will Alert You As Results Post</Text>
          </View>
          <View style={styles.padding20}>
            <View style={styles.row}>
              <LottieView
                ref={animation}
                autoPlay
                loop={true}
                style={{
                  width: w(300),
                  height: h(300)
                }}
                source={require('../assets/lottie/notification.json')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ButtonBack title="BACK TO RABBIT CARDS" onPress={() => navigation.navigate("MyRabbitCards")} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getRabbitCardChoice })(TournamentPushNotification);

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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  rowSection: {
    flex: 1,
    alignItems: 'flex-start',
  }
});