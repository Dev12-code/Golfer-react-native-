import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { CommonColors, CommonStyles } from "../Modules/style";
import { BackIcon, MenuIcon } from "./icons";
import { ComponentStyles } from "./style";
import { w } from "../utils/scale";
import Paring from "../Modules/Paring";
import { Fonts } from '../common/Fonts';

const getColor = (status) => {
  switch (status) {
    case "in_progress":
      return CommonColors.Green;
    case "completed":
      return CommonColors.Warning;
    case "played":
      return CommonColors.Red;
    case "ready":
      return CommonColors.Warning;
    default:
      return CommonColors.Black;
  }
};

const getStatus = (status) => {
  switch (status) {
    case "in_progress":
      return "IN PROGRESS";
    case "selected":
      return "SELECTED";
    case "played":
      return "PLAYED";
    case "ready":
      return "READY TO PLAY";
    default:
      return "";
  }
};

const getPayerColor = (status) => {
  switch (status) {
    case 1:
      return CommonColors.Green;
    case 2:
      return CommonColors.Dark;
    case 3:
      return CommonColors.Dark;
    case 4:
      return CommonColors.Green;
    case -1:
       return CommonColors.Green;   //// picked, but not winner
    default:
      return CommonColors.Dark;
  }
};

export const Button = ({ title, onPress, backgroundColor, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      ComponentStyles.buttonContainer,
      { backgroundColor: backgroundColor },
      style,
    ]}
  >
    <View style={ComponentStyles.buttonInnerContainer}>
      <Text style={ComponentStyles.buttonText}>{title}</Text>
      <Image
        style={ComponentStyles.arrow}
        source={require("./../assets/arrow.png")}
      />
    </View>
  </TouchableOpacity>
);

export const GeneralButton = ({ title, onPress, backgroundColor, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      ComponentStyles.buttonContainer,
      { backgroundColor: backgroundColor , height:50,width:150, marginTop:10},
      style,
    ]}
  >
    <View >
      <Text style={ComponentStyles.buttonText}>{title}</Text>      
    </View>
  </TouchableOpacity>
);

export const ButtonReverse = ({ title, onPress, backgroundColor, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      ComponentStyles.buttonContainer,
      { backgroundColor: backgroundColor },
      style,
    ]}
  >
    <View style={ComponentStyles.buttonInnerContainer}>
      <Text style={[ComponentStyles.buttonText, { color: CommonColors.Green }]}>
        {title}
      </Text>
      <Image
        style={ComponentStyles.arrow}
        source={require("./../assets/arrow-green.png")}
      />
    </View>
  </TouchableOpacity>
);

export const ButtonBack = ({ title, onPress, backgroundColor, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      ComponentStyles.buttonContainer,
      { backgroundColor: backgroundColor },
      style,
    ]}
  >
    <View style={ComponentStyles.buttonInnerContainer}>
      <Image
        style={ComponentStyles.arrow}
        source={require("./../assets/arrow-reverse.png")}
      />
      <Text style={[ComponentStyles.buttonText, { color: CommonColors.White}]}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export const SeparateButton = ({
  prevTitle,
  nextTitle,
  prev,
  next,
  backgroundColor,
  style,
}) => (
  <View style={{ flexDirection: "row" }}>
    <TouchableOpacity
      onPress={prev}
      style={[
        ComponentStyles.buttonContainer,
        { flex: 1, backgroundColor: backgroundColor },
        style,
      ]}
    >
      <View style={ComponentStyles.buttonInnerContainer}>
        <Image
           style={[{ width: w(50),
            height: w(45),
            resizeMode: 'contain',}]}
          source={require("./../assets/arrow-reverse.png")}
        />
        <Text style={[{ fontSize: w(27),
        fontFamily: Fonts.SourceSansRomanBold,
        color: CommonColors.White,}]}>{prevTitle}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={next}
      style={[
        ComponentStyles.buttonContainer,
        { flex: 1, backgroundColor: CommonColors.White },
        style,
      ]}
    >
      <View style={ComponentStyles.buttonInnerContainer}>
        <Text
          style={[{ fontSize: w(27),
            fontFamily: Fonts.SourceSansRomanBold,
            color: CommonColors.Green,textAlign:"center",}]}
        >
          {nextTitle}
        </Text>
        <Image
          style={[{ width: w(50),
            height: w(45),
            resizeMode: 'contain',}]}
          source={require("./../assets/arrow-green.png")}
        />
      </View>
    </TouchableOpacity>
  </View>
);

export const Menu = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.toggleDrawer()}
      style={ComponentStyles.menu}
    >
      <MenuIcon />
    </TouchableOpacity>
  );
};

export const PlayButton = ({ onPress, status }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[ComponentStyles.playButton, { borderColor: getColor(status) }]}
  >
    <Text style={[CommonStyles.buttonText, { padding: 4 },{color:getColor(status)},{fontWeight:'bold'}]}>
      {getStatus(status)}
    </Text>
  </TouchableOpacity>
);

export const MakeSelectionButton = ({ onPress, status }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      ComponentStyles.playButton,
      { width: w(200), marginVertical: w(10), borderColor: CommonColors.Green },
    ]}
  >
    <Text
      style={[
        CommonStyles.playerButtonText,
        { padding: 4, color: CommonColors.Green },
      ]}
    >
      Make Selections
    </Text>
  </TouchableOpacity>
);
// color: getPayerColor(status)
export const Player = ({ onPress, status, name }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      ComponentStyles.playerButton,
      { 
        borderWidth: status === 1 ? 1 : 0 ,
         //backgroundColor: getPayerColor(status),
        paddingLeft:5,
        paddingRight:5,
        margin:3,
      },
    ]}
  >
    <Text
      style={[
        CommonStyles.playerButtonText,
        {
          color: getPayerColor(status),
          // textDecorationLine: status === 3 ? "line-through" : "none",
          fontFamily:  status === 2 ? Fonts.SourceSansRomanBold: Fonts.SourceSansRomanRegular ,
          
        },
      ]}
    >
      {name}
    </Text>
  </TouchableOpacity>
);

export const Round = ({ round,step }) => (
  
  <View style={ComponentStyles.roundContainer}>
    <Text style={CommonStyles.smallText}>Round {step}</Text>
    <Progress.Bar
      borderRadius={0}
      progress={1}
      color={CommonColors.Dark}
      width={200}
      style={ComponentStyles.stepBar}
    />
    <Progress.Bar
      borderRadius={0}
      progress={0.75}
      color={CommonColors.LightGrey}
      width={200}
      style={ComponentStyles.stepBar}
    />
    <Progress.Bar
      borderRadius={0}
      progress={0.5}
      color={CommonColors.Dark}
      width={200}
      style={ComponentStyles.stepBar}
    />
    <Progress.Bar
      borderRadius={0}
      progress={0.25}
      color={CommonColors.Green}
      width={200}
      style={ComponentStyles.stepBar}
    />
    <Progress.Bar
      borderRadius={0}
      progress={step / 4}
      color={CommonColors.Green}
      width={200}
      style={ComponentStyles.stepBar}
    />
  </View>
);

export const LoadingContainer = () => (
  <View style={ComponentStyles.loadingContainer}>
    <ActivityIndicator size="large" color={CommonColors.Green} />
  </View>
);

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={ComponentStyles.menu}
    >
      <BackIcon />
    </TouchableOpacity>
  );
};
