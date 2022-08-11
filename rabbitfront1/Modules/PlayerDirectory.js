import React, { useState, useEffect, useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	FlatList,
	Modal,
	Image,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllGolfers, getGolfer } from '../store/redux/golfers/actions';
import { UnderlineIcon } from '../components/icons';
import { LoadingContainer, Menu } from '../components/Button';
import { w, h } from '../utils/scale';
import { CommonColors, CommonStyles } from './style';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import fetchStats, {
	driving,
	app100125,
	app125150,
	app150175,
	app175200,
	app200,
	putting,
	overall,
} from '../utils/pgapi';
import axios from 'axios';

import { values } from 'lodash';
import PlayerDirectoryProfile from './PlayerDirectoryProfile';
const strArr = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;
const SecondRoute = ({ updatePlayerRank }) => {
	const playerData = [
		{
			id: '1',
			driving_accuracy: '0',
			a100_rank: '0',
		},
		{
			id: '2',
			blanka: 'null',
			blankh: 'null',
		},
		{
			id: '3',
			approach_100125: '0',
			a125_rank: '0',
		},
		{
			id: '4',
			approach_125150: '0',
			a150_rank: '0',
		},
		{
			id: '5',
			approach_150175: '0',
			a175_rank: '0',
		},
		{
			id: '6',
			approach_200: '0',
			a200_rank: '0',
		},
		{
			id: '7',
			pp_rank: '0%',
		},
	];

	const [playerList, setPlayerList] = useState({ 0: {}, 1: {} });
	const [result, setResult] = useState({});
	const golfers = useSelector((state) => state.golfers);
	const [statsData, setStatsData] = useState({});	

	const setGolferData = () => {
		let arrGolfersData = result;
		let resultArray = [];
		arrGolfersData &&
			arrGolfersData.length > 0 &&
			arrGolfersData.forEach((element) => {
				// console.log("element", element);
				let tempObj = {
					...element,
					label:
						element?.first_name.toUpperCase()[0] + '. ' + element?.last_name,
					value: element?.p_id,
				};
				// console.log("tempObj", tempObj);
				resultArray.push(tempObj);
			});
		resultArray.sort((first, second) =>
			first.label.localeCompare(second.label)
		);
		setItems1(resultArray);
	};
	useEffect(() => {
		const int_ = setInterval(() => {
			if (golfers.golfers) {
				clearInterval(int_);
				const result_ = golfers.golfers.filter(function (a) {
					return !this[a.p_id] && (this[a.p_id] = true);
				}, Object.create(null));
				//console.log('golfers.golfer');

				fetchStats().then(
					axios.spread(
						(data1, data2, data3, data4, data5, data6, data7, data8) => {
							// output of req.
							const obj = {};

							const { statID, details } = data1.data.tours[0].years[0].stats[0];
							obj[statID] = details;
							const { statID: statID1, details: details1 } =
								data2.data.tours[0].years[0].stats[0];
							obj[statID1] = details1;
							const { statID: statID2, details: details2 } =
								data3.data.tours[0].years[0].stats[0];
							obj[statID2] = details2;
							const { statID: statID3, details: details3 } =
								data4.data.tours[0].years[0].stats[0];
							obj[statID3] = details3;
							const { statID: statID4, details: details4 } =
								data5.data.tours[0].years[0].stats[0];
							obj[statID4] = details4;
							const { statID: statID5, details: details5 } =
								data6.data.tours[0].years[0].stats[0];
							obj[statID5] = details5;
							const { statID: statID6, details: details6 } =
								data7.data.tours[0].years[0].stats[0];
							obj[statID6] = details6;
							const { statID: statID7, details: details7 } =
								data8.data.tours[0].years[0].stats[0];
							obj[statID7] = details7;
							setStatsData(obj);
							//console.log(obj);
						}
					)
				);
				//.catch((err) => console.log(err));
				//	.then((values) => console.log(values))
				//	.catch((errors) => console.log(errors));
				//console.log('result', golfers.golfers);
				setResult(result_);
			}
		}, 100);
	}, []);
	useEffect(() => {
		//console.log('result', result.length, golfers.golfer === undefined);
		if (statsData && Object.keys(statsData).length && golfers.golfer) {
			setValue(golfers.golfer['p_id']);
			//console.log(golfers.golfer['p_id']);
			onChangePlayer(golfers.golfer['p_id'], 0);
			setGolferData();
		}
	}, [statsData]);
	// useEffect(() => {
	//   // console.log("value1", value1, items1);
	//   // serIsrefresh(true);
	//   if (items1) {
	//     if (items1.length > 0) {
	//       let temp = items1.find((i) => {
	//         return i.value === value1;
	//       });
	//       // console.log("temp2222", temp);
	//       if (temp) {
	//         let temparr = [
	//           {
	//             id: "1",
	//             drivingp: temp.drivingaccuracy,
	//             drivingr: temp.drivingpercentage,
	//           },
	//           {
	//             id: "2",
	//             blanka: "null",
	//             blankh: "null",
	//           },
	//           {
	//             id: "3",
	//             yardone: temp.yards100,
	//             yardonerank: temp.yards100rank,
	//           },
	//           {
	//             id: "4",
	//             yardstwo: temp.yards125,
	//             yardstworank: temp.yards125rank,
	//           },
	//           {
	//             id: "5",
	//             yardsthree: temp.yards150,
	//             yardsthreerank: temp.yards150rank,
	//           },
	//           {
	//             id: "6",
	//             yardsfour: temp.yards200,
	//             yardsfourrank: temp.yards200rank,
	//           },
	//           {
	//             id: "7",
	//             puttingp: temp.puttingpercentage,
	//           },
	//         ];
	//         // console.log('temparr2323',temparr);
	//         setPlayerList(temparr);
	//       }
	//     }
	//   }
	// }, [value1, items1]);

	const renderItem = ({ item }) => (
		<View style={styles.mainview}>
			{item.drivingp && item.drivingr ? (
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.itemTxt}>{item.drivingp}</Text>
					<Text style={{ marginTop: 13 }}>{item.drivingr}</Text>
				</View>
			) : null}
			{item.blanka ? (
				<View style={{ marginTop: 20 }}>
					<Text></Text>
					<Text style={{ marginTop: 15 }}></Text>
				</View>
			) : null}
			{item.yardone || item.yardonerank ? (
				<View style={styles.yardoneView}>
					<Text style={styles.itemTxt}>{item.yardone}</Text>
					<Text style={styles.itemTxt}>{item.yardonerank}</Text>
				</View>
			) : null}
			{item.yardstwo || item.yardstworank ? (
				<View style={styles.yards}>
					<Text style={styles.itemTxt}>{item.yardstwo}</Text>
					<Text style={styles.yardTxt}>{item.yardstworank}</Text>
				</View>
			) : null}
			{item.yardsthree || item.yardsthreerank ? (
				<View style={styles.yards}>
					<Text style={styles.itemTxt}>{item.yardsthree}</Text>
					<Text style={styles.yardTxt}>{item.yardsthreerank}</Text>
				</View>
			) : null}
			{item.yardsfour || item.yardsfourrank ? (
				<View style={styles.yards}>
					<Text style={styles.itemTxt}>{item.yardsfour}</Text>
					<Text style={styles.yardTxt}>{item.yardsfourrank}</Text>
				</View>
			) : null}
			{item.puttingp ? (
				<View style={styles.yards}>
					<Text style={styles.itemTxt}>{item.puttingp}</Text>
				</View>
			) : null}
		</View>
	);
	const render_Item1 = ({ item }) => {
		//console.log('itemofPlayerlist');
		return (
			// <View style={styles.mainview}>
			//   {item.drivingp && item.drivingr ? (
			//     <View style={{ alignItems: "center" }}>
			//       <Text style={styles.itemTxt}>{item.drivingp }</Text>
			//       <Text style={styles.itemTxt}>{item.drivingr}</Text>
			//     </View>
			//   ) : null}
			//   {item.blanka ? (
			//     <View style={{ marginTop: 20 }}>
			//       <Text></Text>
			//       <Text style={{ marginTop: 15 }}></Text>
			//     </View>
			//   ) : null}
			//   {item.yardone || item.yardonerank ? (
			//     <View style={styles.yardoneView}>
			//       <Text style={styles.itemTxt}>{item.yardone}</Text>
			//       <Text style={styles.yardTxt}>{item.yardonerank}</Text>
			//     </View>
			//   ) : null}
			//   {item.yardstwo || item.yardstworank ? (
			//     <View style={styles.yards}>
			//       <Text style={styles.itemTxt}>{item.yardstwo}</Text>
			//       <Text style={styles.yardTxt}>{item.yardstworank}</Text>
			//     </View>
			//   ) : null}
			//   {item.yardsthree || item.yardsthreerank ? (
			//     <View style={styles.yards}>
			//       <Text style={styles.itemTxt}>{item.yardsthree}</Text>
			//       <Text style={styles.yardTxt}>{item.yardsthreerank}</Text>
			//     </View>
			//   ) : null}
			//   {item.yardsfour || item.yardsfourrank ? (
			//     <View style={styles.yards}>
			//       <Text style={styles.itemTxt}>{item.yardsfour}</Text>
			//       <Text style={styles.yardTxt}>{item.yardsfourrank}</Text>
			//     </View>
			//   ) : null}
			//   {item.puttingp ? (
			//     <View style={styles.yards}>
			//       <Text style={styles.itemTxt}>{item.puttingp}</Text>
			//     </View>
			//   ) : null}
			// </View>
			<View>
				<Text>123</Text>
			</View>
		);
	};
	const StatsItem = ({ item }) => {
		if (!item) return <View style={styles.mainview}></View>;
		//console.log('item', item.length);
		return (
			<View
				style={[
					styles.mainview,
					{
						marginTop: 38,
						paddingTop: 7,
					},
				]}
			>
				<View style={{ alignItems: 'center' }}>
					<Text style={[styles.drivingtxt, { fontSize: 14 }]}>
						{item.driving_accuracy ? item.driving_accuracy : 0}%
					</Text>
					<Text
						style={[
							styles.drivingtxt,
							{ fontWeight: 'bold', fontSize: 12, marginRight: 7 },
						]}
					>
						{item.da_rank ? item.da_rank : '-'}
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text></Text>
					<Text style={{ marginTop: 28 }}></Text>
				</View>
				<View style={styles.yardoneView}>
					<Text style={[styles.itemTxt, { fontSize: 12 }]}>
						{item.approach_100125 ? item.approach_100125 : 0}
					</Text>
					<Text style={styles.txt}>
						{item.a125_rank ? item.a125_rank : '-'}
					</Text>
				</View>
				<View style={styles.yards}>
					<Text style={[styles.itemTxt, { fontSize: 12 }]}>
						{item.approach_125150 ? item.approach_125150 : 0}
					</Text>
					<Text style={styles.txt}>
						{item.a150_rank ? item.a150_rank : '-'}
					</Text>
				</View>
				<View style={[styles.yards, { bottom: 2 }]}>
					<Text style={[styles.itemTxt, { fontSize: 12 }]}>
						{item.approach_150175 ? item.approach_150175 : 0}
					</Text>
					<Text style={styles.txt}>
						{item.a175_rank ? item.a175_rank : '-'}
					</Text>
				</View>
				{/* {item.approach_175200 || item.a175_rank ? (
					<View style={styles.yards}>
						<Text style={[styles.itemTxt, { fontSize: 14 }]}>
							{item.approach_175200}
						</Text>
						<Text style={styles.txt}>{item.a175_rank}</Text>
					</View>
				) : null} */}
				<View style={[styles.yards, { bottom: 4 }]}>
					<Text style={[styles.itemTxt, { fontSize: 12 }]}>
						{item.approach_200 ? item.approach_200 : 0}
					</Text>
					<Text style={styles.txt}>
						{item.a200_rank ? item.a200_rank : '-'}
					</Text>
				</View>
				<View style={[styles.yards, { bottom: 5, top: 25 }]}>
					<Text style={styles.last}>
						{item.putting_perc ? item.putting_perc / 10.0 : 0}%
					</Text>
				</View>
			</View>
		);
	};

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
	]);
	const [open1, setOpen1] = useState(false);
	const [value1, setValue1] = useState(null);
	const [items1, setItems1] = useState([]);
	const [open2, setOpen2] = useState(false);
	const [value2, setValue2] = useState(null);
	const [lastSelectedDropDown, setLastSelectedDropDown] = useState(0);
	const [ddwidth, setDDWidth] = useState('100%');

	const [items2, setItems2] = useState([
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
	]);
	const onChangePlayer = (id_, column) => {
		// const player = result.find((e) => {
		// 	return e.p_id == id;
		// });
		//console.log('player', id_, typeof id_, Object.keys(statsData));
		///	playerList[column] = player;
		let player = {};
		for (let key in statsData) {
			let player_ = statsData[key].find((player) => player.plrNum == id_);
			//console.log(player_ === undefined, key);
			if (!player_) continue;
			if (key === driving) {
				player.driving_accuracy = player_.statValues[0].statValue1;
				player.da_rank = player_.curRank;
			} else if (key === app100125) {
				player.approach_100125 = player_.statValues[0].statValue1;
				player.a125_rank = player_.curRank;
			} else if (key === app125150) {
				player.approach_125150 = player_.statValues[0].statValue1;
				player.a150_rank = player_.curRank;
			} else if (key === app150175) {
				player.approach_150175 = player_.statValues[0].statValue1;
				player.a175_rank = player_.curRank;
			} else if (key === app200) {
				player.approach_200 = player_.statValues[0].statValue1;
				player.a200_rank = player_.curRank;
			} else if (key === putting) {
				player.putting_perc = new Number(
					player_.statValues[0].statValue1
				).toFixed(2);
			} else if (key === overall && column === 0) {
				player.overall = player_.curRank;
				updatePlayerRank(player_.curRank);
			}
		}
		/* if (column === 0) {
			const golferRank_ = Math.floor(
				(parseInt(player.a125_rank) +
					parseInt(player.a150_rank) +
					parseInt(player.a175_rank) +
					parseInt(player.a200_rank)) /
					4
			);
			updatePlayerRank(golferRank_);
		} */
		playerList[column] = player;
		setPlayerList({ ...playerList });
		//	setLastSelectedDropDown(column);
		// const name = player
		// 	? player.first_name.toUpperCase()[0] + '. ' + player.last_name
		// 	: '';
		// setDDWidth(100 + name.length * 4 + '%');
		// console.log('player', lastSelectedDropDown);
	};

	const renderListItem = ({ label, onPress, item, custom }) => {
		// const nameFragments = item.label.split(' ');
		// item.label = nameFragments
		// 	.map(
		// 		(name, index) =>
		// 			nameFragments.length === index + 1
		// 				? name
		// 				: name[0].toUpperCase() + '.',
		// 		''
		// 	)
		// 	.join(' ');
		// console.log(item.label, 'name');
		return (
			<TouchableOpacity onPress={() => onPress(item, custom)}>
				<Text
					style={{
						fontSize: 12,
						textAlign: 'left',
						paddingHorizontal: 5,
						paddingVertical: 3,
					}}
					numberOfLines={2}
					ellipsizeMode={'tail'}
				>
					{label}
				</Text>
			</TouchableOpacity>
		);
	};
	const PlayersNames = () => {
		//console.log('display name', playerList);
		return (
			<View style={styles.namesView}>
				{playerList &&
					Object.keys(playerList).map(
						(key) =>
							playerList[key] && (
								<View style={styles.namesLabel_}>
									<Text
										style={styles.namesLabel}
									>{`${playerList[key].first_name} ${playerList[key].last_name}`}</Text>
								</View>
							)
					)}
			</View>
		);
	};
	return (
		<View style={[styles.container, { flex: 1 }]}>
			<Text style={styles.playerTxt}>Player Quick Stats</Text>
			{/* <PlayersNames />
			<Text
				style={{
					fontSize: 12,
					width: '100%',
					textAlign: 'right',
					paddingRight: '13%',
					position: 'relative',
					bottom: -5,
				}}
			>
				Choose Player Below
			</Text> */}

			<ScrollView style={{ paddingBottom: 20 }}>
				<View style={styles.firstView}>
					<View style={[styles.firstchild, { paddingRight: 0 }]}>
						<View style={styles.green} />

						<View style={styles.imgview}>
							<Image
								resizeMode={'contain'}
								style={styles.img}
								source={require('../assets/fingers.png')}
							/>
							<View>
								<Text style={styles.drivingtxt}>
									Driving Accuracy Percentage
								</Text>
								<Text
									style={[
										styles.drivingtxt,
										{ fontWeight: 'bold', fontSize: 10 },
									]}
								>
									DRIVING ACCURACY RANK
								</Text>
							</View>
						</View>
						<View style={styles.imgview}>
							<Image
								resizeMode={'contain'}
								style={styles.img}
								source={require('../assets/rounds.png')}
							/>
							<View>
								<Text style={styles.drivingtxt}>Approach,</Text>
								<Text style={styles.drivingtxt}>
									Avarage Distance to the hole
								</Text>
							</View>
						</View>
						<View style={styles.yardsview}>
							<Text style={[styles.itemTxt, { fontSize: 12 }]}>
								100 - 125 Yards
							</Text>
							<Text style={styles.txt}>100 - 125 YARDS RANK</Text>
						</View>
						<View style={styles.yardsview}>
							<Text style={[styles.itemTxt, { fontSize: 12 }]}>
								125 - 150 Yards
							</Text>
							<Text style={styles.txt}>125 - 150 YARDS RANK</Text>
						</View>
						<View style={styles.yardsview}>
							<Text style={[styles.itemTxt, { fontSize: 12 }]}>
								150 - 175 Yards
							</Text>
							<Text style={styles.txt}>150 - 175 YARDS RANK</Text>
						</View>
						<View style={styles.yardsview}>
							<Text style={[styles.itemTxt, { fontSize: 12 }]}>200+</Text>
							<Text style={styles.txt}>200+ YARDS RANK</Text>
						</View>
						<View style={{ flexDirection: 'column', marginTop: 10 }}>
							<Image
								resizeMode={'contain'}
								style={styles.img}
								source={require('../assets/ball.png')}
							/>
							<View>
								<Text style={styles.last}>Putting Percentage,</Text>
								<Text style={styles.last}>All Distances</Text>
							</View>
						</View>
					</View>

					<View style={{ width: '60%', height: '80%' }}>
						<View style={{ flexDirection: 'row', bottom: 20, zIndex: 9999 }}>
							<DropDownPicker
								arrowIconStyle={{
									width: 10,
									height: 13,
								}}
								placeholderStyle={{
									fontSize: 12,
									right: 10,
								}}
								showTickIcon={false}
								// dropDownStyle={{
								//  height:500
								// }}
								// dropDownMaxHeight={50}
								showArrowIcon={false}
								disabled={true}
								open={open}
								placeholder={''}
								value={value}
								items={items1}
								onChangeValue={(value_) => {
									onChangePlayer(value_, 0);
								}}
								//  fontSize={40}
								setOpen={setOpen}
								setValue={setValue}
								setItems={setItems1}
								containerStyle={{
									width: '50%',
									height: 30,
								}}
								style={{
									borderWidth: 0,
									height: 30,
								}}
								renderListItem={renderListItem}
								labelStyle={{
									fontSize: 12,
									textAlign: 'center',
								}}
								labelProps={{ numberOfLines: 1 }}
								dropDownContainerStyle={{
									borderRadius: 0,
									marginTop: 4,
								}}
								maxHeight={200}
							/>
							<DropDownPicker
								arrowIconStyle={{
									width: 10,
									height: 10,
								}}
								placeholderStyle={{
									fontSize: 11,
								}}
								showTickIcon={false}
								zIndex={1000}
								placeholder="Choose Player"
								showArrowIcon={true}
								open={open1}
								value={value1}
								items={items1}
								onChangeValue={(value) => {
									onChangePlayer(value, 1);
								}}
								setOpen={setOpen1}
								setValue={setValue1}
								setItems={setItems1}
								containerStyle={{
									width: '50%',
									height: 30,
								}}
								style={{
									height: 30,
									borderColor: '#fff',
								}}
								renderListItem={renderListItem}
								labelStyle={{ fontSize: 12 }}
								labelProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
								dropDownContainerStyle={{
									borderRadius: 0,
									marginTop: 4,
								}}
								maxHeight={200}
								searchable={true}
								searchPlaceholder={'Search Player'}
								searchTextInputStyle={{
									color: '#000',
									fontSize: 12,
									borderWidth: 0,
									borderRadius: 0,
									height: 20,
									padding: 2,
									margin: 0,
								}}
								searchContainerStyle={{
									paddingHorizontal: 2,
								}}
							/>
							{/* <DropDownPicker
								arrowIconStyle={{
									width: 10,
									height: 10,
								}}
								placeholderStyle={{
									fontSize: 12,
									height: 30,
									top: 0,
									alignContent: 'center',
									justifyContent: 'center',
								}}
								placeholder=""
								showArrowIcon={true}
								dropDownStyle={{
									height: 'auto',
								}}
								open={open2}
								value={value2}
								items={items1}
								setOpen={setOpen2}
								setValue={setValue2}
								setItems={setItems1}
								onChangeValue={(value) => {
									onChangePlayer(value, 2);
								}}
								containerStyle={{
									width: '33.33%',
									height: 30,
								}}
								style={{
									height: 30,
									borderColor: '#fff',
								}}
								renderListItem={renderListItem}
								labelStyle={{ fontSize: 12 }}
								labelProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
								dropDownContainerStyle={{
									borderRadius: 0,
									marginTop: 4,
								}}
								maxHeight={300}
							/> */}
						</View>

						<View style={styles.black} />

						{Object.keys(statsData).length === 0 && (
							<ActivityIndicator
								size="large"
								color={CommonColors.Green}
								style={styles.activity}
							/>
						)}
						<View
							style={{
								flexDirection: 'row',
								flex: 2,
							}}
						>
							{Object.keys(playerList).map((key) => (
								<StatsItem item={playerList[key]} key={key} />
							))}
							{/* <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              /> */}
							{/* <FlatList
								data={playerList}
								renderItem={render_Item1}
								keyExtractor={(item) => item.id}
							/> */}
							{/* <FlatList
                data={USER2}
                renderItem={render_item}
                keyExtractor={(item) => item.id}
              /> */}
						</View>
					</View>
				</View>
				<View style={styles.secondView}>
					<Text style={{ fontSize: 8, textAlign: 'left' }}>
						* Quickstats provided from most recent PGA data
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};
const ThirdRoute = () => {
	return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
};

const PlayerDirectory = ({ navigation, route }) => {
	const isFocused = useIsFocused();
	const golfers = useSelector((state) => state.golfers);
	//const  golfer = golfers['golfers'][1];
	const { golfer } = golfers;

	const dispatch = useDispatch();
	const [players, setPlayers] = useState([]);
	const [query, setQuery] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [index, setIndex] = useState(1);
	const [items1, setItems1] = useState([]);
	const [golferRank, setGolferRank] = useState(0);
	const [routes] = useState([
		{ key: 0, title: 'PLAYER BIO' },
		{ key: 1, title: 'PLAYER QUICK STATS' },
		{ key: 2, title: 'PREMIUM ACCESS' },
	]);
	
	const renderScene = ({ route, jumpTo }) => {
		switch (route.key) {
			case 0:
				if(golfer){
					return <PlayerDirectoryProfile golfer={golfer} />;
				}
			case 1:
				return <SecondRoute updatePlayerRank={UpdatePlayerRank} />;
			case 2:
				return <ThirdRoute />;
		}
	};

	const UpdatePlayerRank = useCallback(
		(rank) => {
			//console.log('updatePlayerRank');
			setGolferRank(rank);
		},
		[golferRank]
	);
	useEffect(() => {
		isFocused && fetch();
	}, []);

	const playerInfo = () => {
		let arrGolfersData = golfers.golfers;
		let resultArray = [];
		arrGolfersData &&
			arrGolfersData.length > 0 &&
			arrGolfersData.forEach((element) => {
				let tempObj = {
					label: element?.first_name + ' ' + element?.last_name,
					value: element?.first_name + element?.last_name,
				};
				resultArray.push(tempObj);
			});
		setItems1(resultArray);
	};
	useEffect(() => {
		playerInfo();
	}, []);

	const fetch = async () => {
		item.p_id && dispatch(getAllGolfers(), getGolfer(item.p_id));
	};
	useEffect(() => {
		const players = golfers.golfers
			.map(
				(item) =>
					(item.first_name + ' ' + item.last_name)
						.toLowerCase()
						.includes(query.toLowerCase()) && item
			)
			.filter((item) => item && item)
			.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
		setPlayers(players);
	}, [query]);
	// const { first_name,last_name,p_id,rank, ...restParams } = golfer;
	// console.log('players',players);
	//  if (!golfer) return <LoadingContainer />

	return (
		<View style={CommonStyles.overflowContainer}>
			<Menu />
			{golfers.loading && <LoadingContainer />}
			<SafeAreaView style={CommonStyles.container}>
				<View style={CommonStyles.container}>
					<View
						style={[
							CommonStyles.padding,
							CommonStyles.paddingT100,
							{ flex: 1 },
						]}
					>
						<Text style={CommonStyles.title}>Player Directory</Text>
						<View style={styles.padding20}>
							<UnderlineIcon />
						</View>
						<Searchbar
							placeholder="Search"
							onChangeText={setQuery}
							value={query}
							style={styles.searchBar}
							iconColor ={ CommonColors.Dark}
						/>
						<View style={[styles.strSection,]}>
							{strArr.map((str, index) => (
								<TouchableOpacity onPress={() => {}} key={index}>
									<Text
										style={[
											CommonStyles.sectionTitle,
											{ paddingHorizontal: 2 },
										]}
									>
										{str}
										{strArr.length - 1 !== index ? '  |' : ''}
									</Text>
								</TouchableOpacity>
							))}
						</View>
						<ScrollView
							style={{ flex: 1 }}
							contentContainerStyle={{ flexDirection: 'row' }}
						>
							<View style={styles.column}>
								{/* {console.log(players.length)} */}
								{players.map((item, index) => {
									if (index % 2 === 0) {
										return (
											<TouchableOpacity
												onPress={(e) => {
													//			console.log(item.p_id);
													dispatch(getGolfer(item.p_id));
													setModalVisible(true);
													// navigation.navigate("PlayerProfile", {
													//   profile: item,
													// })
												}}
												style={styles.player}
												key={`player-${index}`}
											>
												<Text
													style={[
														CommonStyles.sectionTitle,
														{
															paddingHorizontal: 2,
															textDecorationLine: 'underline',
														},
													]}
												>
													{item.first_name} {item.last_name}
												</Text>
												<Text
													style={[
														CommonStyles.smallText,
														{ paddingHorizontal: 2 },
													]}
												>
													{item.country || ''}
												</Text>
											</TouchableOpacity>
										);
									} else {
										return <View />;
									}
								})}
							</View>
							<View style={styles.column}>
								{players.map((item, index) => {
									if (index % 2 !== 0) {
										return (
											<TouchableOpacity
												onPress={
													() => {
														dispatch(getGolfer(item.p_id));
														setModalVisible(true);
													}
													// navigation.navigate("PlayerProfile", {
													//   profile: item,
													// })
												}
												style={styles.player}
												key={`player-${index}`}
											>
												<Text
													style={[
														CommonStyles.sectionTitle,
														{
															paddingHorizontal: 2,
															textDecorationLine: 'underline',
														},
													]}
												>
													{item.first_name} {item.last_name}
												</Text>
												<Text
													style={[
														CommonStyles.smallText,
														{ paddingHorizontal: 2 },
													]}
												>
													{item.country || ''}
												</Text>
											</TouchableOpacity>
										);
									} else {
										return <View />;
									}
								})}
							</View>
						</ScrollView>
					</View>
				</View>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					style={styles.modelStyle}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<View style={styles.centeredView}>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Image
								resizeMode={'contain'}
								style={{
									height: 30,
									width: 30,
									top: 40,
									alignSelf: 'flex-end',
									right: 20,
								}}
								source={require('../assets/img.png')}
							/>
						</TouchableOpacity>
						<View style={styles.modalView}>
							<View style={styles.modalText}>
								{golfer && (
									<Text style={styles.userTxt}>
										{golfer.first_name} {golfer.last_name}
									</Text>
								)}
								<View
									style={{
										height: 1,
										backgroundColor: '#78BA31',
										width: 50,
										marginVertical: 10,
									}}
								/>
							</View>
							<View style={[styles.modelView , {height:'15%'}]}>
								<Text style={styles.approchTxt}>OVERALL RANKING</Text>
								{golfer && <Text style={styles.rankTxt}>#{golferRank}</Text>}
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View
									style={{
										backgroundColor: index == '0' ? '#78BA31' : '#B5B7B9',
										height: 5,
										width: '33.3%',
									}}
								/>
								<View
									style={{
										backgroundColor: index == '1' ? '#78BA31' : '#B5B7B9',
										height: 5,
										width: '33.3%',
									}}
								/>
								<View
									style={{
										backgroundColor: index == '2' ? '#78BA31' : '#B5B7B9',
										height: 5,
										width: '33.3%',
									}}
								/>
							</View>
							<TabView
								navigationState={{ index, routes }}
								renderScene={renderScene}
								onIndexChange={setIndex}
								renderTabBar={(props) => (
									<TabBar
										{...props}
										onTabPress={({ route }) => {
											const routes = route;
											// console.log("indexs", route.key);
											// console.log("scene", routes.key);
										}}
										style={{
											backgroundColor: 'transparent',
											borderBottomWidth: 0,
										}}
										indicatorStyle={{ height: 0 }}
										activeColor={'#78BA31'}
										inactiveColor={'#B5B7B9'}
										labelStyle={{
											fontSize: 10,
											textAlign: 'center',
											padding: 0,
											margin: 0,
										}}
										tabStyle={{
											justifyContent: 'flex-start',
											height: 30,
											paddingTop: 5,
											backgroundColor: 'transparent',
											paddingHorizontal: 0,
										}}
									/>
								)}
							/>
							{/* {console.log('index',index)}
              {console.log('route',routes.key)} */}
							{/* <TouchableOpacity
              style={{  backgroundColor: '#2196F3', }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity> */}
						</View>
					</View>
				</Modal>
			</SafeAreaView>

			{/* <TouchableOpacity
          style={styles.openButton}
        //  onPress={() =>  setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity> */}
		</View>
	);
};

const mapStateToProps = (state) => ({
	loading: state.golfers.loading,
	error: state.golfers.error,
});

export default connect(mapStateToProps, { getAllGolfers, getGolfer })(
	PlayerDirectory
);

const styles = StyleSheet.create({
	namesView: {
		marginVertical: 0,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
	},
	activity: {
		alignSelf: 'center',
		marginVertical: h(60),
		position: 'absolute',
		top: '30%',
	},
	namesLabel_: {
		borderWidth: 1,
		borderColor: '#2E2A2B',
		backgroundColor: '#2E2A2B',
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 5,
		marginRight: 10,
		marginTop: 10,
	},
	namesLabel: {
		fontSize: 12,
		color: 'white',
	},

	padding20: {
		paddingVertical: w(20),
	},
	paddingH40: {
		paddingHorizontal: w(40),
		paddingVertical: w(10),
	},
	strSection: {
		paddingTop: w(40),
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: w(20),
	},
	directory: {
		paddingTop: w(40),
		paddingHorizontal: w(40),
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	column: {
		paddingVertical: w(20),
		flex: 1,
	},
	player: {
		flex: 1,
		paddingVertical: w(20),
		flexWrap: 'wrap',
	},
	searchBar: {
		backgroundColor: 'transparent',
		borderBottomColor: CommonColors.Dark,
		borderBottomWidth: 1,
	},
	centeredView: {
		height: '100%',
		width: '100%',
		marginTop: 'auto',
		backgroundColor: '#2E2A2B',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	modalView: {
		height: Platform.OS == 'android' ? '85%' : '90%',
		width: '100%',
		marginTop: 'auto',
		backgroundColor: CommonColors.White,
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35,
	},
	modalText: {
		paddingTop: 30,
		paddingLeft: 30,
	},
	modelView: {
		backgroundColor: '#E6E6E6',
		height: 100,
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		alignItems: 'center',
	},
	approchTxt: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	rankTxt: {
		fontSize: 25,
		fontSize: 25,
		fontWeight: 'bold',
	},
	userTxt: {
		fontSize: 40,
	},
	green: {
		height: 2.5,
		backgroundColor: '#78BA31',
		width: 50,
		// marginVertical: 10,
		marginTop: 10,
	},
	container: {
		paddingVertical: w(10),
		paddingLeft: w(38),
	},
	playerTxt: {
		fontSize: 27,
		fontWeight: '200',
	},
	black: {
		height: 2.5,
		backgroundColor: '#000',
		width: '100%',
		bottom: 20,
	},

	ddr: {
		position: 'relative',
		width: '100%',
	},
	mainview: {
		alignItems: 'center',
		flex: 1,
	},
	yardoneView: {
		marginTop: 47,
		alignItems: 'center',
	},
	yardTxt: {
		marginTop: -1,
		fontSize: 13,
	},
	yards: {
		marginTop: 22,
		alignItems: 'center',
	},
	modelStyle: {
		margin: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(60, 60, 67, 0.1)',
	},
	itemTxt: {
		fontSize: 10,
		color: '#212322',
	},
	firstView: {
		flexDirection: 'row',
		marginTop: 25,
	},
	secondView: {
		marginVertical: 10,
		width: '100%',
		paddingHorizontal: 20,
	},
	firstchild: {
		width: '40%',
	},
	imgview: {
		flexDirection: 'column',
		marginTop: 20,
	},
	img: {
		height: 30,
		width: 20,
	},
	drivingtxt: {
		fontSize: 14,
		width: '80%',
		left: 5,
		color: '#212322',
	},
	yardsview: {
		paddingLeft: 5,
		marginVertical: 10,
		paddingRight: 0,
	},
	txt: {
		fontSize: 11,
		fontWeight: 'bold',
	},
	last: {
		left: 5,
		color: '#212322',
		fontSize: 14,
	},
});
const DATA = [
	{
		id: '1',
		drivingp: '85',
		drivingr: '59',
	},
	{
		id: '2',
		blanka: 'null',
		blankh: 'null',
	},
	{
		id: '3',
		yardone: '80',
		yardonerank: '999',
	},
	{
		id: '4',
		yardstwo: '10',
		yardstworank: '999',
	},
	{
		id: '5',
		yardsthree: '20',
		yardsthreerank: '999',
	},
	{
		id: '6',
		yardsfour: '30',
		yardsfourrank: '999',
	},
	{
		id: '7',
		puttingp: '98%',
	},
];

const USER2 = [
	{
		id: '1',
		drivingp: '85',
		drivingr: '59',
	},
	{
		id: '2',
		blanka: 'null',
		blankh: 'null',
	},
	{
		id: '3',
		yardone: '80',
		yardonerank: '999',
	},
	{
		id: '4',
		yardstwo: '10',
		yardstworank: '999',
	},
	{
		id: '5',
		yardsthree: '20',
		yardsthreerank: '999',
	},
	{
		id: '6',
		yardsfour: '30',
		yardsfourrank: '999',
	},
	{
		id: '7',
		puttingp: '98%',
	},
];