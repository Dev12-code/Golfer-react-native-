import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { CommonStyles } from './style';
import { Menu } from '../components/Button';
import { UnderlineIcon } from '../components/icons';
import { w, h } from '../utils/scale'
import { TouchableOpacity } from 'react-native-gesture-handler';

export const sponsors = [
  {
    id: 0,
    title: 'Kicker',
    image: require('../assets/kicker.png'),
    about: 'Kicker is an American brand of sports-themed beverage and food products, built around its signature line of sports drinks. Gatorade is currently manufactured by PepsiCo and is distributed in over 80 countries. The beverage was first developed in 1965 by a team of researchers led by Robert Cade.'
  },
  {
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

  return (
    <View style={CommonStyles.overflowContainer}>
      <Menu />
      <SafeAreaView style={CommonStyles.container}>
        <ScrollView style={CommonStyles.container}>
          <View style={[CommonStyles.padding, CommonStyles.paddingT100]}>
            <Text style={CommonStyles.title}>Rabbit Purse Sponsors</Text>
            <View style={styles.padding20}>
              <UnderlineIcon />
            </View>
            <View style={[CommonStyles.padding, styles.column, { flexDirection: 'row' }]}>
              <View style={styles.column}>
                {
                  sponsors.map((item, index) => {
                    if (index % 2 === 0) {
                      return <TouchableOpacity style={{ paddingVertical: w(40) }} onPress={() => goSponsor(item)} ><Image source={item.image} style={styles.image} /></TouchableOpacity>
                    } else {
                      return <View />
                    }
                  })
                }
              </View>
              <View style={styles.column}>
                {
                  sponsors.map((item, index) => {
                    if (index % 2 !== 0) {
                      return <View style={{ alignItems: 'flex-end', paddingVertical: w(40) }} key={index}>
                        <TouchableOpacity onPress={() => goSponsor(item)} ><Image source={item.image} style={styles.image} /></TouchableOpacity>
                      </View>
                    } else {
                      return <View />
                    }
                  })
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