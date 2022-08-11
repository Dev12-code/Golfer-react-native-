import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from '../common/Fonts';

const { width, height } = Dimensions.get('window');

function w(input) {
    return input / 640 * width;
}

function h(input) {
    return input / 1136 * height;
}

export const CommonColors = {
    Green: '#76BC21',
    Black: '#000000',
    White: '#FFFFFF',
    Dark: '#212322',
    Red: '#EE4036',
    Warning: '#F88D2A',
    Grey: '#474848',
    LightGrey: '#B3B3B3',
    Orange: '#FFA500'
}

export const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonColors.White,
    },
    overflowContainer: {
        flex: 1,
        overflow: 'hidden'
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        paddingTop: w(300),
        paddingBottom: w(200),
        width: w(400),
        height: w(400),
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: w(400),
        height: w(200),
        resizeMode: 'contain'
    },
    paddingVertical: {
        paddingVertical: w(20),
    },
    padding: {
        padding: w(40),
        paddingTop: w(80)
    },
    title: {
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(58),
        lineHeight: w(68),
        color: CommonColors.Dark,
    },
    sectionHeader: {
        fontFamily: Fonts.SourceSansRomanRegular,
        fontSize: w(40),
        lineHeight: w(44),
        color: CommonColors.Dark,
    },
    sectionTitle: {
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(40),
        lineHeight: w(46),
        color: CommonColors.Dark,
    },
    sponsorTitle: {
        fontFamily: Fonts.SourceSansRomanBold,
        fontSize: w(40),
        lineHeight: w(46),
        color: CommonColors.Dark,
    },
    nameTitle: {
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(45),
        lineHeight: w(51),
        color: CommonColors.Dark,
    },
    subTitle: {
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(48),
        lineHeight: w(56),
        color: CommonColors.Dark,
    },
    rowTitle: {
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(24),
        lineHeight: w(28),
        color: CommonColors.Dark,
    },
    roundTitle: {
        fontFamily: Fonts.SourceSansRomanBold,
        fontSize: w(32),
        lineHeight: w(28),
        color: CommonColors.Dark,
    },
    smallText: {
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(24),
        lineHeight: w(28),
        color: CommonColors.Dark,
    },
    buttonText: {
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(16),
        lineHeight: w(28),
        color: CommonColors.Dark,
    },
    playerButtonText: {
       
        fontSize: w(20),
        lineHeight: w(26),
        color: CommonColors.Dark,
    },
    paddingT100: {
        paddingTop: w(100)
    },
    textInput: {
        borderBottomColor: CommonColors.Dark,
        borderBottomWidth: 1,
        fontFamily: Fonts.SourceSansRomanLight,
        fontSize: w(32),
        lineHeight: w(36),
        paddingBottom: w(10),
    },
    errorText: {
        fontFamily: Fonts.SourceSansRomanBold,
        fontSize: w(28),
        lineHeight: w(36),
        paddingBottom: w(10),
        color: CommonColors.Red
    }
})

export const SlectionListStyles = StyleSheet.create({
    container: {
     flex: 1,
    },
    sectionHeader: {
      paddingTop: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 2,
      fontSize: 16,
      borderTopWidth: 1,
      borderColor: CommonColors.Black,
    },
    item: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop:15,
      fontSize: 24,
      height: 50,
    },
  })