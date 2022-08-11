import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { CommonStyles } from '../../../style';

const StatsBannerText = ({rank}) => {
   return (
      <View style={styles.container}>
         <Text style={CommonStyles.sectionTitle}>APPROACH RANKING</Text>
         <Text style={CommonStyles.title}>#{rank}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center'
   }
});

export default StatsBannerText