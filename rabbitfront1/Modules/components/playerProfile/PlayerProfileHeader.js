import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { CommonStyles } from '../../style';
import { w } from '../../../utils/scale'
import { UnderlineIcon } from '../../../components/icons';

const PlayerProfileHeader = ({name}) => {
   return (
      <View style={styles.container}>
         <Text style={CommonStyles.title}>{name}</Text>
         <View style={styles.iconContainer}>
            <UnderlineIcon />
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
     padding: w(40),
   },
   iconContainer: {
      paddingTop: w(15)
   }
});

export default PlayerProfileHeader