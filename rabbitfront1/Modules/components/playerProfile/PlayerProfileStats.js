import React, {useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getGolfer } from '../../../store/redux/golfers/actions';
import { ApproachesIcon, BridieIcon, DrivingIcon, UnderlineIcon } from '../../../components/icons';
import { LoadingContainer } from '../../../components/Button';
import { w } from '../../../utils/scale'
import { CommonColors, CommonStyles } from '../../../Modules/style';
import PlayerProfileTabHeader from './PlayerProfileTabHeader';
import { useIsFocused } from '@react-navigation/core';
import { setTab } from '../../../store/redux/golfers/actions';

const PlayerProfileStats = () => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  useEffect(() => {
    isFocused && dispatch(setTab('Stats'))
  }, [isFocused])

  const state = useSelector(state => state.golfers)
  const { golfer } = state

  if (!golfer) return <LoadingContainer />

  const { first_name, last_name, p_id, ...restParams } = golfer

  return (
    <View style={styles.centeredView}>
      {(state.loading) && <LoadingContainer />}
      {state.error && <Text style={CommonStyles.errorText}>{state.error}</Text>}
      <View style={[styles.centeredView]}>
          <ScrollView>
            <View style={styles.paddingSection}>
              <PlayerProfileTabHeader header="Player Quick Stats" /> 
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <BridieIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Birdie Conversion Percentage: {golfer.birdie_conversion || ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <BridieIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Birdie Conversion Rank: {golfer.bc_rank || ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <DrivingIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Driving Accuracy Percentage: {golfer.driving_accuracy || ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <DrivingIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Driving Accuracy Rank: {golfer.da_rank || ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <ApproachesIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Approach 150-175: {golfer.approach_150175 || ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <ApproachesIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Approach 150-175 rank: {golfer.a150_rank || ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <ApproachesIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Approach 175-200: {golfer.approach_175200 || ''}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: w(20) }}>
                <ApproachesIcon />
                <Text style={[CommonStyles.sectionTitle, { paddingHorizontal: w(20) }]}>Approach 175-200 rank: {golfer.a175_rank || ''}</Text>
              </View>
            </View>
          </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.golfers.loading,
  error: state.golfers.error,
});

export default connect(mapStateToProps, { getGolfer })(PlayerProfileStats);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: CommonColors.White
  },
  paddingSection: {
    paddingLeft: w(40),
    paddingRight: w(40),
    paddingBottom: 0
  }
});