import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { w } from '../../../utils/scale'
import { connect, useDispatch, useSelector } from 'react-redux';
import { CommonColors } from '../../../Modules/style';
import PlayerProfileTabHeader from './PlayerProfileTabHeader';
import PlayerProfileBioItems from './PlayerProfileBioItems';
import { useIsFocused } from '@react-navigation/core';
import { setTab, getGolfer } from '../../../store/redux/golfers/actions';
import { LoadingContainer } from '../../../components/Button';

const PlayerProfileBio = () => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  useEffect(() => {
    isFocused && dispatch(setTab('Bio'))
  }, [isFocused])

  const state = useSelector(state => state.golfers)
  const { golfer } = state

  if (!golfer) return <LoadingContainer />

  const { p_id } = golfer

  return (
    <View style={styles.centeredView}>
      <View style={[styles.centeredView]}>
          <ScrollView>
            <View style={styles.paddingSection}>
              <PlayerProfileTabHeader header="Player Bio" /> 
            </View>
            <PlayerProfileBioItems p_id={p_id} />
          </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  loading: state.golfers.loading,
  error: state.golfers.error,
});

export default connect(mapStateToProps, { getGolfer })(PlayerProfileBio);

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