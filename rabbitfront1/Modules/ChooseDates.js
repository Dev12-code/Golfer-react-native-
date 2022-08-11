import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Alert,SectionList, } from 'react-native';
//import { ScrollView } from 'react-native-virtualized-view';

import DateRangePicker from "rn-select-date-range";
import { useIsFocused } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { Button, LoadingContainer, Menu,ButtonReverse, ButtonBack } from '../components/Button';
import { CheckedIcon, UnderlineIcon } from '../components/icons';
import { getTournamentByRange ,getTournamentById} from '../store/redux/tournaments/actions';
import { w, h } from '../utils/scale'
import { CommonColors, CommonStyles ,SlectionListStyles} from './style';

import { sponsors } from './PurseSponsors';
import {
  getAllTournaments,
} from "../store/redux/tournaments/actions";
import { filter } from 'lodash';

import Svg, { G, Path, Circle, Ellipse, TSpan, } from "react-native-svg"


const fetch = async () => {
  dispatch(getRabbitCards());
  dispatch(getAllTournaments());
  dispatch(getAllGolfers());
};

const currentFormatString = "YYYY-MM-DD";
const newFormatString = "dddd, MMMM DD, YYYY";


const ChooseDates = ({ navigation }) => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tournaments);
  const [selectedRange, setRange] = useState({});
  const alltournaments = useSelector((state) => state.tournaments);
  const { rangeTournaments, selectedTournament, tournaments } = alltournaments;

  const myRabbitCard = useSelector((state) => state.tournaments).rabbitCards;

  const newData = [...tournaments];
	var selectedThreeTournaments = [];
  var selection = [];
  // console.log("bbbb", newData);

  newData.map(async(item) => 
      addTournaments(item)
  );  
  
  function addTournaments(item) {
    const start_dateMilionSecond = new Date(item.start_date).getTime();
    const end_dateMilionSecond = new Date(item.end_date).getTime();

    const currentMilonSecond = new Date().getTime()
    if(start_dateMilionSecond>=currentMilonSecond){
      selectedThreeTournaments.push(item);

    if(selection.length<3){
      var offset = new Date().getTimezoneOffset();

      selection.push({id:selection.length,title:item.name,
        data:[new Date(item?.start_date).toUTCString().substring(0,16) + " - " +new Date(item?.end_date).toUTCString().substring(0,16)],t_id :item.t_id});

    }
  }else if(start_dateMilionSecond<currentMilonSecond && end_dateMilionSecond>currentMilonSecond){
    selectedThreeTournaments.push(item);

    if(selection.length<3){
      var offset = new Date().getTimezoneOffset();

      selection.push({id:selection.length,title:item.name,
        data:[new Date(item?.start_date).toUTCString().substring(0,16) + " - " +new Date(item?.end_date).toUTCString().substring(0,16)],t_id :item.t_id});

    }
    }
  }
  useEffect(() => {
    if (isFocused) {
      setRange({})
    }
  }, [isFocused])

  const onSubmit = () => {
    navigation.toggleDrawer()
    // if (selectedRange.firstDate && selectedRange.secondDate) {
    //   dispatch(getTournamentByRange({
    //     startDate: selectedRange.firstDate,
    //     endDate: selectedRange.secondDate,
    //     navigation
    //   }))
    // } else {
    //   Alert.alert("Please choose dates.")
    // }
  }

  const startDate = moment(selectedRange.firstDate, currentFormatString).format(newFormatString)
  const endDate = moment(selectedRange.secondDate, currentFormatString).format(newFormatString)

  function onClickItem(item) {
      const select = selectedThreeTournaments.find(data => data.t_id === item.t_id);    
      var start_date = new Date(select.start_date);
      start_date.setDate(start_date.getDate() - 1);

      var end_date = new Date(select.end_date);
      end_date.setDate(end_date.getDate() - 1);
      // navigation.navigate("TournamentChoices", { card: select })
      var exist = myRabbitCard.filter(function(element) {
        return element.t_id === select.t_id;
      });
      const start_dateMilionSecond = new Date(select.start_date).getTime();
      const end_dateMilionSecond = new Date(select.end_date).getTime();    
      const currentMilonSecond = new Date().getTime()
      
      // if(start_dateMilionSecond<currentMilonSecond && end_dateMilionSecond>currentMilonSecond){
      //   var lastTwoRounds = myRabbitCard.filter(function(element) {
      //     return element.t_id === select.t_id && (element.round === select.rounds_official_money-1 || element.round === select.rounds_official_money);
      //   });
      //   if(lastTwoRounds.length === 2){
      //     Alert.alert("Round already selected")
      //      return
      //   }
      // }


      // if(exist.length >= select.rounds_official_money){
      //    Alert.alert("Round already selected")
      //     return
      // }else {       
      //   if(start_dateMilionSecond<currentMilonSecond && end_dateMilionSecond>currentMilonSecond){
      //     var lastTwoRounds = myRabbitCard.filter(function(element) {
      //       return element.t_id === select.t_id && (element.round === select.rounds_official_money-1 || element.round === select.rounds_official_money);
      //     });
      //     if(lastTwoRounds.length === 2){
      //       Alert.alert("Round already selected")
      //        return
      //     }
      //   }
      // }

      console.log(select.rounds_official_money);
      dispatch(
        getTournamentByRange({
        t_id:select.t_id,
        startDate: start_date,
        endDate: end_date,
        navigation
      })

       // getTournamentById(select.t_id)
      )
  }
  return (<View style={CommonStyles.container}>
    <Menu />
    {loading && <LoadingContainer />}
    {error && <Text style={CommonStyles.errorText}>{error}</Text>}
    <SafeAreaView style={CommonStyles.container} >
      {/* <ScrollView style={CommonStyles.container} nestedScrollEnabled={true}> */}
        <View style={[CommonStyles.padding, { paddingTop: w(100) }]}>
          <Text style={CommonStyles.title}>Select Tournament</Text>
          <View style={styles.padding20}>
            <UnderlineIcon />
          </View>
        </View>

        <View style={SlectionListStyles.container}>

        <SectionList
          sections={selection}
          renderItem={({item,index,section}) => 
            <View style = {{ flexDirection: "row",flexWrap: "wrap", justifyContent:'center',alignItems:'center' ,}}>
              <View style = {{width:"90%"}}>
                <Text numberOfLines={1} ellipsizeMode = 'tail' onPress={() => onClickItem(section)}style={[SlectionListStyles.item,{width:'90%',paddingTop:4,fontSize:16,paddingLeft:5}]} >{item}</Text>
                {/* <View style = {{height:w(2), width:300 ,backgroundColor:"#000",marginLeft:20,marginTop:-10,marginBottom:15}} /> */}
              </View>            
              <TouchableOpacity
               onPress={() => onClickItem(section)}>
                 <View style={styles.paddingRight10}>
                  {/* <CheckedIcon /> */}
                </View>
                </TouchableOpacity>
            </View>}
          renderSectionHeader={({section}) => <Text style={[SlectionListStyles.sectionHeader,{fontSize:22}]}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
          scrollEnabled = {true}
        />
      </View>
        {/* <View style={styles.container}>
          <DateRangePicker
            onSelectDateRange={(range) => {
              setRange(range);
            }}
            blockSingleDateSelection={true}
            responseFormat={currentFormatString}
            maxDate={null}
            minDate={null} 
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
          />
        </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
    <View style={[styles.bottom,{backgroundColor:"#F6F6F6"}]}>
      <View style={styles.left}>
        <View style={styles.leftTop}>
          <Text style={[CommonStyles.sectionTitle,{fontWeight:"bold"}]}>RABBIT PURSE PRIZES</Text>
        </View>
        <Text style={[CommonStyles.sectionTitle,{fontWeight:"bold",fontSize:17,marginTop:10}]}>{"EVERY winner of EVERY round of EVERY\ntournament is awarded a Rabbit Purse Prize!"}</Text>
        <Text style={[CommonStyles.sectionTitle,{fontSize:17}]}>Prizes provided by our Rabbit Purse Sponsors</Text>
        <ScrollView horizontal style={{ paddingVertical: w(20), flexDirection: 'row' }}>
          {sponsors.map((sponsor, index) => <TouchableOpacity style={{ paddingHorizontal: w(20) }} onPress={() => navigation.navigate('Sponsor', { sponsor })}>
            <Image source={sponsor.image} style={styles.brand} />
          </TouchableOpacity>)}
        </ScrollView>
      </View>
    </View>

    <ButtonBack title="Back To Menu" onPress={() => onSubmit()} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
    {/* <View  backgroundColor={CommonColors.Green} style={{ width: '100%',height:80}} /> */}
  </View>
  );
}


const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  error: state.tournaments.error,
});

export default connect(mapStateToProps, { getAllTournaments, })(ChooseDates);

const styles = StyleSheet.create({
  padding20: {
    paddingVertical: w(20)
  },
  paddingRight10: {
    paddingRight: w(10)
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: w(40)
  },
  dateContainer: {
    flex: 1,
    paddingRight: w(20),
  },
  date: {
    backgroundColor: CommonColors.White,
    padding: w(10),
    minHeight: w(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: w(20)
  },
  container: {
    marginHorizontal: w(40),
    marginVertical: w(40),
    backgroundColor: CommonColors.White
  },
  selectedDateContainerStyle: {
    height: w(60),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CommonColors.Green,
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: CommonColors.White,
  },
  bottom: {
    backgroundColor: CommonColors.White,
    paddingLeft: w(40),
    paddingVertical: w(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brand: {
    width: w(120),
    height: w(50),
    resizeMode: 'stretch',
  },
});