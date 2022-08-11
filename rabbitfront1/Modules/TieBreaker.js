import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { CommonStyles, CommonColors } from './style';
import { BackButton, Button, ButtonBack, ButtonReverse, Menu } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { w, h } from '../utils/scale'
import { connect, useDispatch, useSelector } from "react-redux";
import { createTieBreaker, } from "../store/redux/tournaments/actions";
import {
  getRabbitCards,
} from "../store/redux/tournaments/actions";
export default ({ navigation, route }) => {
  let animation = React.createRef();

  useEffect(() => {
    animation.current.play()
  }, [])

  const { card } = route.params

  const [feet, setFeet] = useState('')
  const [inches, setInch] = useState('')
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onChangeText = (field, value) => {
    setInputs({ ...inputs, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const onSubmit = () => {
    console.log(card)
    if (!inputs.feet) {
     Alert.alert("Please input feet");      
     return
    }else if (!inputs.inches) {
      Alert.alert("Please input inches");
      return
    }

    const payload = {
      id:card.id,
      feet:inputs.feet,
      inches:inputs.inches
    }
    dispatch(createTieBreaker(payload));
    dispatch(getRabbitCards());
    navigation.navigate('MyRabbitCards')    

  };
  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Tie Breaker</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>

            <View style={styles.section}>
              <Text style={[CommonStyles.subTitle]}>Tie breakers are determined by the user who guesses the closest to the hole of the last par 3 hole in the round. </Text>
            </View>
            <View style={styles.section}>
              <TextInput
                style={CommonStyles.textInput}
                onChangeText={setFeet}
                value={inputs.feet}
                placeholder="Feet"
                onChangeText={(text) => onChangeText("feet", text)}
                keyboardType = 'numeric'
                placeholderTextColor={CommonColors.Dark}
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={CommonStyles.textInput}
                onChangeText={setInch}
                value={inputs.inches}
                onChangeText={(text) => onChangeText("inches", text)}
                keyboardType = 'numeric'
                placeholder="Inches"
                placeholderTextColor={CommonColors.Dark}
              />
            </View>
            <View style={styles.section}>
              <LottieView
                ref={animation}
                loop={true}
                style={{
                  width: w(400),
                  height: h(400)
                }}
                source={require('../assets/lottie/breaker.json')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button title="ENTER" onPress={() => onSubmit()} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20)
  },
  section: {
    paddingVertical: w(40),
    alignItems: 'center'
  },
  bottom: {
    backgroundColor: CommonColors.White,
    paddingLeft: w(40),
    paddingVertical: w(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  section: {
    paddingVertical: w(40),
  },
});