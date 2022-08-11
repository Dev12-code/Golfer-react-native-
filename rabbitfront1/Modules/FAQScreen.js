import React, { Component,useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView,	TouchableHighlight} from 'react-native';
import { CommonStyles } from './style';
import { Menu } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { w, h } from '../utils/scale'
import { TouchableOpacity } from 'react-native-gesture-handler';

export const sponsors = [{
  id: 1,
  title: 'Gatorade',
  image: require('../assets/sponsors/gatorade.png'),
  about: 'Gatorade is an American brand of sports-themed beverage and food products, built around its signature line of sports drinks. Gatorade is currently manufactured by PepsiCo and is distributed in over 80 countries. The beverage was first developed in 1965 by a team of researchers led by Robert Cade.'
}, {
  id: 2,
  title: 'workday',
  image: require('../assets/sponsors/workday.png'),
  about: "Workday, Inc., is an American on‑demand financial management and human capital management software vendor. Workday was founded by David Duffield, founder and former CEO of ERP company PeopleSoft, and former PeopleSoft chief strategist Aneel Bhusri following Oracle's hostile takeover of PeopleSoft in 2005"
}, {
  id: 3,
  title: 'BARCLAYS',
  image: require('../assets/sponsors/barclays.png'),
  about: "Barclays plc is a British multinational universal bank, headquartered in London, England. Barclays operates as two divisions, Barclays UK and Barclays International, supported by a service company, Barclays Execution Services."
}, {
  id: 4,
  title: 'ROLEX',
  image: require('../assets/sponsors/rolex.png'),
  about: "Rolex SA is a luxury watch manufacturer based in Geneva, Switzerland. Founded as Wilsdorf and Davis by Hans Wilsdorf and Alfred Davis in London, England, in 1905, the company registered Rolex as the brand name of its watches in 1908, and became Rolex Watch Co. Ltd. in 1915"
}, {
  id: 5,
  title: 'AMGEN',
  image: require('../assets/sponsors/amgen.png'),
  about: "Amgen Inc. is an American multinational biopharmaceutical company headquartered in Thousand Oaks, California. One of the world's largest independent biotechnology companies, Amgen was established in Thousand Oaks, California, in 1980."
}, {
  id: 6,
  title: 'KPMG',
  image: require('../assets/sponsors/kpmg.png'),
  about: "KPMG International Limited is an Anglo-Dutch multinational professional services network, and one of the Big Four accounting organizations."
}, {
  id: 7,
  title: 'ClubCar',
  image: require('../assets/sponsors/clubcar.png'),
  about: "Club Car is an American company that manufactures electric and gas-powered golf cars and UTVs for personal and commercial use. It is currently owned by Platinum Equity after being acquired in 2021. Before that, the company was business unit of the Ingersoll Rand corporation in its Industrial Technologies division"
}, {
  id: 8,
  title: 'Titleist',
  image: require('../assets/sponsors/titleist.png'),
  about: "Titleist is an American brand name of golf equipment produced by the Acushnet Company, headquartered in Fairhaven, Massachusetts, United States. The Titleist brand, established in 1932 by Phillip E. Young, focuses on golf balls and clubs."
}
]

export default ({ navigation }) => {

  const goSponsor = (sponsor) => {
    navigation.navigate('Sponsor', { sponsor })
  }


  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);

  const toggleStatus = (flag) => {
    if(flag === 0 ){
      setFaq1(!faq1)

    }
    else if(flag === 1){
      setFaq2(!faq2)

    }else if(flag ===2){
      setFaq3(!faq3)

    }
  };
  return (
    <View style={CommonStyles.overflowContainer}>
      <Menu />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>FAQs</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={[CommonStyles.padding, styles.column, { flexDirection: 'row' ,paddingLeft:10}]}>
              <View style={styles.column}>  
              <TouchableOpacity onPress={() => toggleStatus(0)}>
                <Text style={CommonStyles.sectionHeader}>
                What is Rabbitcards? 
                </Text>
              </TouchableOpacity>     
                { faq1 ?   
                 
                      <Text  style={CommonStyles.smallText, { paddingLeft:20,paddingTop:20,}}>RabbitCards is the first free to play golf game that uses PGA Tour Shotlink data to allow users to compete for prizes in the closest to the pin contests.  RabbitCards games are on a per-round basis and include only the PAR 3 holes in each round. 
                      </Text>
                      :      console.log("this.state.first")

                    
                }
                <TouchableOpacity onPress={() => toggleStatus(1)}>
                <Text style={[CommonStyles.sectionHeader,{marginTop:20}]}>How are tie-breakers determined? </Text>
              </TouchableOpacity>     
                { faq2 ?   
                 
                 <Text style={CommonStyles.smallText, { paddingLeft:20,paddingTop:20 }}>Users will be required to enter information to be used in the case of a tie-breaker for each RabbitCard they play.  The tie-breaker is based on the distance (feet and inches) for the closest to the pin on the last Par 3 hole in the round.
                 </Text>
                 :   console.log("this.state.first")
                }

              <TouchableOpacity onPress={() => toggleStatus(2)}>
              <Text style={[CommonStyles.sectionHeader,{marginTop:20}]}>
                  How do you play Rabbitcards? 
                  </Text>
                </TouchableOpacity>     
                  { faq3 ?   
                  
                        <Text  style={CommonStyles.smallText, { paddingLeft:20,paddingTop:20,}}>Upon signing into RabbitCards a user will see the next 3 PGA tournaments and can elect to play in any or all of the rounds for these tournaments on an individual round basis.   When the pairings are out for a particular round that specific RabbitCard becomes READY TO PLAY and the user is presented with 3 different pairings for each of the 4 PAR 3 holes (ie – 12 total pairings.)  The user selects who they believe will the closest to the pin for each of the 12 pairings presented.  From there the user’s RabbitCard Summary card will displayed and will  be updated with results throughout the round.   Once the round is played winners will be notified within the app and prizes will be awarded. 
                        </Text>
                        :      console.log("this.state.first")

                      
                  }
              </View>                         
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40
  },
  image: {
    height: h(100),
    width: w(200),
    resizeMode: 'contain',
  },
  column: {
    flex: 1,
  },
});