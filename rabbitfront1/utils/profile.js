import React from 'react';
import { token } from './pgapi';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { View, Text, StyleSheet } from 'react-native';

export class Profile {
	id = undefined;
	info = {
		name: 'name',
		nickName: 'name.nick',
		height: 'height',
		weight: 'weight',
		birthday: 'birthDate',
		birthplace: 'birthPlace',
		nationality: 'nationality',
		tourWinnings: 'combTourMoney',
		currentSeasonHighlights: 'seasonHighlights',
		specialInterests: 'specialInterests',
		funFacts: 'personalItems',
	};
	config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	constructor(playerID) {
		this.id = playerID;
		this.applyRetry();
	}

	applyRetry() {
		axiosRetry(axios, {
			retries: 20, // number of retries
			retryDelay: (retryCount) => {
				//	console.log(`retry ${retryCount}`);
				return 2000; // time interval between retries
			},
			retryCondition: (error) => {
				// if retry condition is not specified, by default idempotent requests are retried
				return error.response.status === 429;
			},
		});
	}

	fetchBioURL() {
		return `https://tourapi.pgatourhq.com:8243/SyndPlayerBio/1.0.0/?format=json&P_ID=${this.id}`;
	}

	async fetchProfile() {
		
		let { data } = await axios.get(this.fetchBioURL(), this.config);
		if (data.plr === undefined || data.plr.length < 1)
			throw new Error('Player Error');
		return this.applyMap(data);
	}

	applyMap(data) {

		let newInfo = {};
		for (const info in this.info) {
			const key = this.info[info];
			if (key.search('.') === -1) newInfo[info] = data.plr[0][key];
			else
				newInfo[info] = key
					.split('.')
					.reduce((previous, current) => previous[current], data.plr[0]);
		}
		console.log("bbbbbbbbb===",newInfo)

		return newInfo;
	}

	formatHighlights(info) {
		//console.log(info, 'player info');
		if (info.length === 0) return '';
		let highlights = info.reduce(
			(pre, val) =>
				`${pre}${
					val.seasonId === new Date().getFullYear() ? '\n' + val.highlight : ''
				}`,
			''
		);
		if (highlights === '') {
			highlights = info[0].highlight;
		}
		//console.log(highlights);
		return highlights;
	}

	getRandomFact(facts) {
		if (facts.length === 0) return '';
		const index = this.randomIntFromInterval(0, facts.length - 1);
		//		facts.reduce((pre, val) => `${pre}\n${val.text}`, '');
		return facts[index].text;
	}

	randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
