import React, { useCallback, useEffect, useState } from 'react';
import {
	Animated,
	Image,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getGolfer } from '../store/redux/golfers/actions';
import {
	ApproachesIcon,
	BridieIcon,
	CrossIcon,
	DrivingIcon,
	UnderlineIcon,
} from '../components/icons';
import { LoadingContainer } from '../components/Button';
import { w, h } from '../utils/scale';
import { CommonColors, CommonStyles } from './style';
import { useIsFocused } from '@react-navigation/core';
import { fetchProfile } from '../utils/pgapi';
import { Profile } from '../utils/profile';
let profile;
const PlayerProfile = ({ golfer }) => {
	// const [golfer, setGolfer] = useState({});
	//  const [info, setInfo] = useState();
	// const info_ = golfer
	// useEffect(() => {
	// 	console.log('cccccc',golfer);
	// 	profile = new Profile(golfer.p_id);
	// 	profile
	// 		.fetchProfile()
	// 		.then((info_) => updateInfo(info_))
	// 		.catch((err) => console.log(err));
	// }, [golfer.p_id]);
	// const updateInfo = useCallback(
	// 	(info_) => {
	// 		//console.log('updatePlayerRank');
	// 		//console.log(info_);
	// 		setInfo(info_);
	// 	},
	// 	[info]
	// );
	return (
		<ScrollView>
			<View style={styles.centeredView}>
				<Text style={styles2.textTitle}>Player Bio</Text>
				<View style={styles2.green} />
				{!golfer && (
					<ActivityIndicator
						size="large"
						color={CommonColors.Green}
						style={styles.activity}
					/>
				)}
				{golfer && (
					<View style={styles2.centeredView}>
						<ProfileText
							label="FULL NAME"
							text={`${golfer.first_name || ''} ${golfer.middle_name || ''} ${golfer.last_name || ''
								}`}
						/>
						<ProfileText label="NICK NAME" text={`${golfer.nick_name || ''}`} />
						<ProfileText
							label="HEIGHT"
							text={`${golfer.height}’`}
						/>
						<ProfileText label="WEIGHT" text={`${golfer.weight} lbs`} />
						<ProfileText
							label="BIRTHDATE/PLACE"
							text={`${golfer.birthdate}/${golfer.birthplace}`}
							vertical={true}
						/>
						<ProfileText label="NATIONALITY" text={`${golfer.country}`} />
						<ProfileText label="TOUR WINNINGS" text={`${golfer.tour_winnings}`} />
						<ProfileText
							label="CURRENT SEASON HIGHLIGHTS"
							text={
								golfer.current_season_highlight
							}
							vertical={true}
						/>
						<ProfileText
							label="SPECIAL INTERESTS"
							text={`${golfer.special_interests}`}
							vertical={true}
						/>
						<ProfileText
							label="FUN FACT"
							text={golfer.fun_fact}
							vertical={true}
						/>
					</View>
				)}
			</View>
		</ScrollView>
	);
};

const ProfileText = ({ label, text, vertical }) => {
	return  (
		<View style={styles2.textView2}>
			<Text style={styles2.textLabel2}>{label}</Text>
			<Text style={styles2.textInfo2}>{text}</Text>
		</View>
	);
	// return vertical ? (
	// 	<View style={styles2.textView2}>
	// 		<Text style={styles2.textLabel2}>{label}</Text>
	// 		<Text style={styles2.textInfo2}>{text}</Text>
	// 	</View>
	// ) : (
	// 	<View style={styles2.textView}>
	// 		<Text style={styles2.textLabel}>{label}</Text>
	// 		<Text style={styles2.textInfo}>{text}</Text>
	// 	</View>
	// );
};

export default PlayerProfile;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginHorizontal: w(58),
		paddingBottom: h(30),
	},
	activity: {
		alignSelf: 'center',
		marginVertical: h(60),
	},
});

const styles2 = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	textView: {
		flexDirection: 'row',
		alignItems: 'stretch',
		marginTop: h(30),
		flexWrap: 'wrap',
	},
	textView2: {
		marginTop: h(30),
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
	textTitle: {
		color: 'black',
		fontSize: 27,
	},
	textLabel: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'left',
		textTransform: 'uppercase',
		alignSelf: 'flex-end',
	},
	textLabel2: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'left',
		textTransform: 'uppercase',
	},
	textInfo: {
		color: 'black',
		fontWeight: 'normal',
		fontSize: 16,
		textAlign: 'left',
		textTransform: 'capitalize',
		marginLeft: w(10),
	},
	textInfo2: {
		color: 'black',
		fontWeight: 'normal',
		fontSize: 16,
		textAlign: 'left',
		textTransform: 'capitalize',
		marginTop: h(10),
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},

	green: {
		height: 2.5,
		backgroundColor: '#78BA31',
		width: 50,
		// marginVertical: 10,
		marginTop: h(30),
	},
});