import React, { useEffect, useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { login, clearLoginError } from "../store/redux/auth/actions";
import { UnderlineIcon } from "../components/icons";
import { BackButton, GeneralButton, LoadingContainer } from "../components/Button";
import { w, h } from "../utils/scale";
import { Dimensions } from 'react-native';
const {width: windowWidth , height:windowHeight} = Dimensions.get('window');

import { regex } from "../utils/helpers";
import { CommonColors, CommonStyles } from "./style";
import Carousel from 'react-native-anchor-carousel';
import {SimplePaginationDot} from '../PaginationComponent';
import { Images } from "../common/Images";
import { getLoggedUser } from "../store/redux/auth/actions";

const data = [
  {
    uri: Images.introduce1,
    title: 'Create Card',
    content:
      'Select tournaments to follow for picks',
  },
  {
    uri: Images.introduce2,
    title: 'Select Tournament',
    content: 'Select tournaments to follow for picks',
  },
  {
    uri: Images.introduce3,
    title: 'View Upcoming Matches',
    content:
      'Choose rounds to make predictions for',
  },
  {
    uri: Images.introduce4,
    title: 'Choose your Cards ',
    content: 'Make picks in your newly-created cards',
  },
  {
    uri: Images.introduce5,
    title: 'Make Picks',
    content: 'Make your predictions with help from our analytics',
  },
  {
    uri: Images.introduce6,
    title: 'See Progress',
    content: 'Track your predictions as a tournament is underway',
  },
  {
    uri: Images.introduce7,
    title: 'View TournamentRankings',
    content: 'See where you placed, and win prizes if you get a top spot',
  },
];
const INITIAL_INDEX = 0;

const Introduce = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  var state = useSelector((state) => state.auth);


  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({item, index}) {
    const {uri, title, content} = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.item,{justifyContent: 'center',alignItems: 'center',alignItems:'center',alignContent:'center'}]}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <Text style={[CommonStyles.title,{textAlign:'center',marginBottom:30,fontSize:35}]}>{title}</Text>
        <ImageBackground source={uri} style={styles.imageBackground}  resizeMode='contain'>        
        </ImageBackground>
      
        <Text style={[CommonStyles.subTitle,{textAlign:'center',marginTop:20,fontSize:24,marginLeft:20,marginRight:20}]}>{content}</Text>    

      </TouchableOpacity>
    );
  }
  const onSubmit = (index) => {
    if(index === 6) {     
    state.Introduce = true; 
      dispatch(getLoggedUser())
      return
    }
    
    carouselRef.current.scrollToIndex(index+1);
  };


  return (
    <SafeAreaView style={[CommonStyles.container,{justifyContent: 'center',alignItems: 'center',alignItems:'center',alignContent:'center'}]}>
    <View >
        <Carousel
          style={[styles.carousel]}
          data={data}
          renderItem={renderItem}          
          itemWidth={ windowWidth}
          inActiveOpacity={0.3}
          containerWidth={windowWidth}      
          onScrollEnd={handleCarouselScrollEnd}
          ref={carouselRef}
        />
       <View  style={[{alignItems: 'center'}]}>
        <GeneralButton
            title="Next"
            onPress={() => onSubmit(currentIndex)}
            backgroundColor={CommonColors.Green}          
          />
       </View>
        
        <View style = {{marginTop:30,justifyContent: 'center',alignItems: 'center',alignItems:'center',alignContent:'center'}}>
           <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.signUpLoading,
  serverError: state.auth.loginError,
});
export default connect(mapStateToProps, { login, clearLoginError })(Introduce);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20),    
  },
  section: {
    paddingTop: w(200),
    paddingHorizontal: w(60),
  },
  textContainer: {
    paddingVertical: w(40),
  },
  row: {
    paddingTop: w(40),
    flexDirection: "row",
    alignItems: "center",
  },
  carousel: {
    flexGrow: 0,
    height: windowHeight*0.7,
   },
   item: {
    borderWidth: 2,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 1,
    // height:windowHeight*0.5,
    // backgroundColor:"#000",
    aspectRatio: 1,

  
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {color: 'white'},
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentText: {
    marginTop: 10,
    fontSize: 12,
  },
});
