import React, { useState, useCallback } from 'react';
import { StyleSheet, Dimensions, View, Image, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'
import { CommonColors, CommonStyles } from './style';
import { BackButton, ButtonBack, Menu } from '../components/Button';
import { w, h } from '../utils/scale'
import { product } from './TournamentChoices';
import { Fonts } from '../common/Fonts';

export default ({ navigation, route }) => {
  const { product } = route.params
  const [index, setIndex] = useState(0)
  const width = Dimensions.get('screen').width
  const updateIndex = (num) => {
    setTimeout(() => {
      setIndex(num.toFixed())
    }, 50);
  }

  return (
    <View style={CommonStyles.overflowContainer}>
      <BackButton />
      <SafeAreaView style={CommonStyles.container}>
        <View style={[CommonStyles.padding, { paddingTop: w(40), paddingBottom: 0 }]}>
          {/* <Image source={product.logo} style={styles.logo} />
          <Text style={styles.company}>{product.name}</Text>
          <Text style={styles.price}>$ {product.price}</Text> */}
           <Image
              source={require("./../assets/kicker.png")}
              style={styles.brand}
            />
               <Text style={styles.price}>$ {product.price}</Text>

        </View>
        <ScrollView >
          <View style={[CommonStyles.padding]}>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              height={w(500)}
              loadMinimal={true}
              // autoplay={true}
              dot={<Image source={product.images[index].image} style={styles.dotStyle} />}
              activeDot={<Image source={product.images[index].image} style={styles.dotStyle} />}
              paginationStyle={styles.paginationStyle}
              index={index}
              // onIndexChanged={setIndex}
              // onMomentumScrollEnd={e => updateIndex((e.nativeEvent.contentOffset.x / (width - w(80))))}
              showsPagination={false}
            >
              {
                product.images.map((product, iii) => <View style={styles.slide1} key={iii}>
                  <Image source={product.image} style={styles.image} />
                </View>)}
            </Swiper>
            <View style={styles.logo}>
            </View>
          </View>
        </ScrollView>
        <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'center', }} style={{ flexDirection: 'row', backgroundColor: CommonColors.White, paddingHorizontal: w(20), height: w(60) }} >
          {product.images.map((product, iindex) => <TouchableOpacity onPress={() => setIndex(iindex)} style={[styles.paginationStyle, { borderBottomWidth: index === iindex ? 4 : 0 }]} key={iindex}>
            <Image source={product.image} style={styles.dotStyle} />
          </TouchableOpacity>)}
        </ScrollView>
      </SafeAreaView>
      <ButtonBack title="BACK" onPress={() => navigation.goBack()} backgroundColor={CommonColors.Green} style={{ width: '100%' }} />
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
  brand: {
    width: w(400),
    resizeMode: 'contain',
  },
  image: {
    height: h(400),
    width: w(400),
    resizeMode: 'contain',
  },
  logo: {
    height: h(50),
    width: w(100),
    resizeMode: 'contain',
  },
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  company: {
    fontSize: w(60),
    fontFamily: Fonts.SourceSansRomanBold,
  },
  price: {
    fontSize: w(32),
    fontFamily: Fonts.SourceSansRomanRegular,
  },
  dotStyle: {
    width: w(60),
    height: w(60),
    marginHorizontal: w(20),
    marginVertical: w(10),
    backgroundColor: CommonColors.LightGrey
  },
  paginationStyle: {
    borderBottomColor: CommonColors.Red,
    borderBottomWidth: 4,
    backgroundColor: CommonColors.LightGrey
  }
});