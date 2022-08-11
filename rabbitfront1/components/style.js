import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Fonts } from '../common/Fonts';
import { CommonColors } from '../Modules/style';

const { width, height } = Dimensions.get('window');

function w(input) {
	return (input / 640) * width;
}

function h(input) {
	return (input / 1136) * height;
}

export const ComponentStyles = StyleSheet.create({
    container: {
		flex: 1,
	},
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: w(460),
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonInnerContainer: {
        width: '100%',
        paddingVertical: w(30),
        paddingHorizontal: w(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    arrow: {
        width: w(50),
        height: w(68),
        resizeMode: 'contain',
    },
    buttonText: {
        fontSize: w(32),
        fontFamily: Fonts.SourceSansRomanBold,
        color: CommonColors.White,
    },
    menu: {
        position: 'absolute',
        top: w(80),
        left: w(40),
        zIndex: 999,
    },
    playButton: {
        borderWidth: 1,
        width: w(140),
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerButton: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderColor: CommonColors.Green,
    },
    stepBar: {
        position: 'absolute',
        left: 0,
        top: w(40),
    },
    roundContainer: {
        width: w(300),
        height: w(100),
    },
    loadingContainer: {
        position: 'absolute',
        width: w(640),
        height: h(1135),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        zIndex: 999999999,
    },
});
