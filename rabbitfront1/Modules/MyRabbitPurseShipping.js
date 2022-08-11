import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BackButton, Button } from "../components/Button";
import { UnderlineIcon } from "../components/icons";
import { w } from "../utils/scale";
import { CommonColors, CommonStyles } from "./style";
import { connect, useDispatch, useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import { regex } from "../utils/helpers";
import {
  myrabbitPurse,
  getRabbitCards

} from "../store/redux/tournaments/actions";

export default ({ navigation ,route}) => {
  const { card } = route.params
  console.log("aaaaa",card);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setErrors({});      
      // setTimeout(function() {
      //   dispatch(getRabbitCards());
      // }, 500);
    }
  }, [isFocused]);



  const onSubmit = async() => {
    let errors = {};
    if (!name) {
      errors.name = "Name is a required field";
    }
    if (!email) {
      errors.email = "Email is a required field";
    }
    if (!regex.email.test(email)) {
      errors.email = "Email is invalid";
    }   
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("erros");
    } else {
      const payload = {
        t_id: card.t_id,
        round:card.round,
        name: name ,
        address: address ,
        city: city ,
        state: state ,
        zip: zipCode ,
        email: email ,
      }
      dispatch(myrabbitPurse(payload))
      navigation.navigate("Thank You");
    }
  };

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>My Rabbit Purse</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={styles.section}>
              <Text style={CommonStyles.sectionTitle}>Shipping Details</Text>
            </View>
            <View style={styles.section}>
              <TextInput
                style={CommonStyles.textInput}
                onChangeText={setName}
                value={name}
                placeholder="Full Name *"
                keyboardType="default"
                placeholderTextColor={CommonColors.Dark}
              />
            </View>
            {errors.name ? (
                  <Text style={CommonStyles.errorText}>{errors.name}</Text>
                ) : (
                  <View />
                )}
            <View style={styles.section}>
              <TextInput
                style={CommonStyles.textInput}
                onChangeText={setAddress}
                value={address}
                placeholder="Street Address *"
                keyboardType="default"
                placeholderTextColor={CommonColors.Dark}
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={CommonStyles.textInput}
                onChangeText={setCity}
                value={city}
                placeholder="City *"
                keyboardType="default"
                placeholderTextColor={CommonColors.Dark}
              />
            </View>
            <View style={styles.section}>
              <View style={styles.row}>
                <TextInput
                  style={[CommonStyles.textInput, { width: "45%" }]}
                  onChangeText={setState}
                  value={state}
                  placeholder="State *"
                  keyboardType="default"
                  placeholderTextColor={CommonColors.Dark}
                />
                <TextInput
                  style={[CommonStyles.textInput, { width: "45%" }]}
                  onChangeText={setZipCode}
                  value={zipCode}
                  placeholder="ZIP Code *"
                  keyboardType="numeric"
                  placeholderTextColor={CommonColors.Dark}
                />
              </View>
            </View>
            <View style={styles.section}>
              <TextInput
                style={CommonStyles.textInput}
                onChangeText={setEmail}
                value={email}
                placeholder="Email for Confirmation *"
                keyboardType="email-address"
                placeholderTextColor={CommonColors.Dark}
              />
            </View>
            {errors.email ? (
                  <Text style={CommonStyles.errorText}>{errors.email}</Text>
                ) : (
                  <View />
                )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button
        title="ENTER"
        onPress={() => onSubmit()}
        backgroundColor={CommonColors.Green}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20),
  },
  section: {
    paddingVertical: w(40),
  },
  bottom: {
    backgroundColor: CommonColors.White,
    paddingLeft: w(40),
    paddingVertical: w(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
