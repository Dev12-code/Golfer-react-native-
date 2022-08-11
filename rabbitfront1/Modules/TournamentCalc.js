import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { CalcIcon, UnderlineIcon } from '../components/icons';
import { BackButton, LoadingContainer, Menu } from '../components/Button';
import { CommonStyles } from './style';
import { w, h } from '../utils/scale'
import { getRabbitCardChoice, getTournamentById, getGroupingsPar3s } from '../store/redux/tournaments/actions';
import { connect, useDispatch, useSelector } from 'react-redux';


export default ({ navigation, route }) => {
  let animation = React.createRef();
  const isFocused = useIsFocused()

  const { card } = route.params
  const dispatch = useDispatch()
  const state = useSelector(state => state.tournaments)

  const [holes, setHoles] = useState(state.holes)



  useEffect(() => {
    animation && animation.current && animation.current.play()
  }, [])


  const round = card.tournament['rounds_official_money'];
  if (!card?.tournament) return <LoadingContainer />

  useEffect(() => {
      setHoles(state.holes)
    }, [state.holes])

    useEffect(() => {
      isFocused && fetch()
    }, [card])

    const fetch = () => {
      dispatch(getTournamentById(card.t_id))
      const { t_id, round, group_id } = card
      const payload = {
        t_id,
        round,
        group_id: group_id || 1,
        cttp_flag: false
      }
      dispatch(getRabbitCardChoice(payload))

      if (t_id && round) dispatch(getGroupingsPar3s(payload))
  
    }

    useEffect(() => {
      setTimeout(() => {
        isFocused && navigation.navigate('ReadyToPlay', { card })
      }, 5000);
    }, [isFocused])



  const getStartDate = (startDate, round) => {
    let dt = new Date(startDate);
    dt.setDate(dt.getDate() + round - 1);
    return dt
  }
  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Calculating Your Rabbit Cards</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>{card?.tournament?.name || ''}</Text>
              <Text style={CommonStyles.rowTitle}>{new Date(getStartDate(card.tournament.start_date,card?.round)).toUTCString().substring(0,16) || ""} - {new Date(card?.tournament.end_date).toUTCString().substring(0,16) || ""}</Text>
              <Text style={CommonStyles.rowTitle}>Round {card?.round || ''}</Text>
            </View>
            <View style={styles.container}>
              <LottieView
                ref={animation}
                autoPlay
                loop={true}
                style={{
                  width: w(300),
                  height: h(300)
                }}
                source={require('../assets/lottie/calc.json')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

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
    height: h(500),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: w(20),
    padding: 8,
  },
});