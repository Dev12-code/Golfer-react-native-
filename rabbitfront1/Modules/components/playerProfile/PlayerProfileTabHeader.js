import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UnderlineIcon } from '../../../components/icons';
import { w } from '../../../utils/scale'
import { CommonStyles } from '../../style';

const PlayerProfileTabHeader = ({header}) => {
  return (
    <View>
      <Text style={CommonStyles.sectionHeader}>
        {header}
      </Text>
      <View style={[styles.underline]}>
        <UnderlineIcon />
      </View>
    </View>
  );
}

export default PlayerProfileTabHeader;

const styles = StyleSheet.create({
  underline: {
    paddingTop: w(30),
    paddingBottom: w(20)
  }
});