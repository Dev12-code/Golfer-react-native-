import React from 'react'
import {StyleSheet, View} from 'react-native'
import { w } from '../../../utils/scale'

const PlayerProfileBanner = ({children}) => {
   return (
      <View style={styles.container}>
         {children}
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
     backgroundColor: '#E8E8E8',
     paddingHorizontal: w(40),
     height: 90
   }
});

export default PlayerProfileBanner