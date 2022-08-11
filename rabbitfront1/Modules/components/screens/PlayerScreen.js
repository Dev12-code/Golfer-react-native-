import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getGolfer } from '../../../store/redux/golfers/actions';
import { LoadingContainer } from '../../../components/Button';
import { h } from '../../../utils/scale'
import { CommonColors, CommonStyles } from '../../style';
import { useIsFocused } from '@react-navigation/core';

import PlayerProfileHeader from '../playerProfile/PlayerProfileHeader'
import PlayerProfileBanner from '../playerProfile/PlayerProfileBanner'
import StatsBannerText from '../playerProfile/banner/StatsBannerText';
import Tabs from '../playerProfile/navigation/Tabs'

const PlayerScreen = ({ navigation, route }) => {
  const { profile } = route.params
  const isFocused = useIsFocused()
  const state = useSelector(state => state.golfers)
  const { golfer, tab } = state
  const dispatch = useDispatch()

  useEffect(() => {
    isFocused && fetch()
  }, [profile, isFocused])

  const fetch = async () => {
    profile?.p_id && dispatch(getGolfer(profile.p_id))
  }

  if (!golfer) return <LoadingContainer />

  const { first_name, last_name, p_id, ...restParams } = golfer

  return (
    <View style={styles.centeredView}>
      {(state.loading) && <LoadingContainer />}
      {state.error && <Text style={CommonStyles.errorText}>{state.error}</Text>}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <PlayerProfileHeader name={`${first_name} ${last_name}`} />
          <PlayerProfileBanner>
            {tab === 'Stats' && <StatsBannerText rank={golfer.rank} />}
          </PlayerProfileBanner>
          <View style={styles.tabContainer}>
            <Tabs />
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.golfers.loading,
  tab: state.golfers.tab,
  error: state.golfers.error,
});

export default connect(mapStateToProps, { getGolfer })(PlayerScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: CommonColors.White
  },
  modalView: {
    width: '100%',
    height: h(1035),
  },
  tabContainer: {
    flex: 1, 
    position: 'relative'
  }
});