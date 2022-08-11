import axios from 'axios';
import axiosRetry from 'axios-retry';

export const birdie = '02333';
export const driving = '102';
export const app100125 = '02364';
export const app125150 = '02366';
export const app150175 = '02367';
export const app175200 = '02368';
export const app200 = '02369';
export const scrambling = '130';
export const sandsave = '111';
export const putting = '02428';
export const overall = '127';

export const axiosInstance = axios.create();

export const urlToFetch = (stat_id) =>
	`https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=${stat_id}&YEAR=2022&TYPE=YTD`;	

export const playerBioURL = (player_id) =>
	`https://tourapi.pgatourhq.com:8243/SyndPlayerBio/1.0.0/?format=json&P_ID=${player_id}`;

axiosRetry(axios, {
	retries: 20, // number of retries
	retryDelay: (retryCount) => {
		return 2000; // time interval between retries
	},
	retryCondition: (error) => {
		// if retry condition is not specified, by default idempotent requests are retried
		return error.response.status === 429;
	},
});
const config = () => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export const fetchProfile = async (playerID) => {
	return await axios.get(playerBioURL(playerID), config());
};

export default fetchStats = async () => {
	return axios.all([
		axios.get(urlToFetch(driving), config()).catch((err) => console.log(err)),
		// addDelay(),
		axios.get(urlToFetch(app100125), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app125150), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app150175), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app175200), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app200), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(putting), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(overall), config()).catch((err) => console.log(err)),
	]);
};

const addDelay = () => {
	// Add a request interceptor
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	let prevDelay = 0;
	const getDelay = () => {
		const delay = prevDelay
			? prevDelay + 60000
			: 1000 * (61 - new Date().getSeconds());
		return prevDelay + 5000;
	};
	axiosInstance.interceptors.request.use(
		async (config) => {
			// Do something before request is sent
			if (config.url !== urlToFetch(driving)) {
				prevDelay = getDelay();
				await delay(prevDelay);
				//console.log('request sent', config.url, prevDelay);
			}
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);
	// axiosInstance.interceptors.response.use(
	// 	(res) => {
	// 		// Add configurations here
	// 		console.log(Object.keys(res.data).length);
	// 	},
	// 	(err) => {
	// 		//console.log(err);
	// 		return Promise.reject(err);
	// 	}
	// );
};

export const token =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik0yRm1NV1EwTm1aak1URTNaR1ZrWm1VME1HVTRZVFF3WXpZM1lqa3lZbUV6Wmpnek4ySTRNemd6TWpNeFpERXpOamN5TkdVeE1tWmxaRFk0Wm1KalpRIn0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJSYWJiaXRDYXJkQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiUmFiYml0Q2FyZCIsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoicmFiYml0Y2FyZHByb2QiLCJpZCI6Mzg5LCJ1dWlkIjpudWxsfSwic2NvcGUiOiJhbV9hcHBsaWNhdGlvbl9zY29wZSBkZWZhdWx0IiwiaXNzIjoiaHR0cHM6XC9cL3RvdXJhcGkucGdhdG91cmhxLmNvbTo5NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiQnJvbnplIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjEsInNwaWtlQXJyZXN0VW5pdCI6InNlYyJ9LCJTaWx2ZXIiOnsic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MTAsInNwaWtlQXJyZXN0VW5pdCI6InNlYyJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kUGxheWVyQmlvIiwiY29udGV4dCI6IlwvU3luZFBsYXllckJpb1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IkJyb2FkY2FzdFN5bmRpY2F0ZSIsImNvbnRleHQiOiJcL0Jyb2FkY2FzdFN5bmRpY2F0ZVwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU3luZFBsYXllcnNNYXN0ZXIiLCJjb250ZXh0IjoiXC9TeW5kUGxheWVyc01hc3RlclwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IkxpdmVTdGF0UmFua2luZ3MiLCJjb250ZXh0IjoiXC9MaXZlU3RhdFJhbmtpbmdzXC8xLjAuMCIsInB1Ymxpc2hlciI6InNoYXVnaHRvbiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiTm9jRXZlbnRTdGF0ZSIsImNvbnRleHQiOiJcL05vY0V2ZW50U3RhdGVcLzEuMC4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRUb3VybmFtZW50RGV0YWlscyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50RGV0YWlsc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRUb3VybmFtZW50SG9sZVN0YXRzIiwiY29udGV4dCI6IlwvU3luZFRvdXJuYW1lbnRIb2xlU3RhdHNcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kU2NvcmVjYXJkU3RhdHMiLCJjb250ZXh0IjoiXC9TeW5kU2NvcmVjYXJkU3RhdHNcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudEZpZWxkIiwiY29udGV4dCI6IlwvU3luZFRvdXJuYW1lbnRGaWVsZFwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlRlc3RGb3JNaXNzaW5nQ29udmVydGVycyIsImNvbnRleHQiOiJcL1Rlc3RGb3JNaXNzaW5nQ29udmVydGVyc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoidGVzdEFQSSIsImNvbnRleHQiOiJcL3Rlc3RcLzEuMC4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRTdGF0aXN0aWNMaXN0IiwiY29udGV4dCI6IlwvU3luZFN0YXRpc3RpY0xpc3RcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJUT1VSQVBJRG9jdW1lbnRhdGlvbiIsImNvbnRleHQiOiJcL2RvY3VtZW50YXRpb25cLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJUaW1lWm9uZVRlc3QiLCJjb250ZXh0IjoiXC9UaW1lWm9uZVRlc3RcLzEuMC4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRUb3VybmFtZW50U3RhdHVzIiwiY29udGV4dCI6IlwvU3luZFRvdXJuYW1lbnRTdGF0dXNcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kR3JvdXBpbmdzIiwiY29udGV4dCI6IlwvU3luZEdyb3VwaW5nc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiU2lsdmVyIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRTY2hlZHVsZSIsImNvbnRleHQiOiJcL1N5bmRTY2hlZHVsZVwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiU2lsdmVyIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRMZWFkZXJib2FyZCIsImNvbnRleHQiOiJcL1N5bmRMZWFkZXJib2FyZFwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiU2lsdmVyIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRTY29yZWNhcmQiLCJjb250ZXh0IjoiXC9TeW5kU2NvcmVjYXJkXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJTaWx2ZXIifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiUGxheUJ5UGxheSIsImNvbnRleHQiOiJcL1BsYXlCeVBsYXlcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlNpbHZlciJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJZVERfRVZUX1N0YXRpc3RpY3MiLCJjb250ZXh0IjoiXC9ZVERfRVZUX1N0YXRpc3RpY3NcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlNpbHZlciJ9XSwiY29uc3VtZXJLZXkiOiJHTmx2cDZGV0lQY2ZrbU1aZmttTDY3SXhpclVhIiwiZXhwIjozODAzOTAzNDMwLCJpYXQiOjE2NTY0MTk3ODMsImp0aSI6IjliNmIzYzgzLWZhMzktNDExYS05NjEwLThmZjViZDUxODIxYyJ9.kh152JFVOZGSfgQlZtKAemd7uQb_E_u03NtpOWocRFkjAbd0CsoBFHC4Hhs5CzfC4iipS4p-ptWG9xSIvAT2g-DQNu3O_SVTNzW0i_6Rv7-dnbWLWPHXblcBhlk_RZ9NI1I8lkQpWYqYSbpKPMmYmdKkzzz8MmTwmx9GADNigemvf8Ugb6aTj4fJhLTCZwpybeu--i1TvzfLII2iX9BTUGNcJpNscHur0hwYD4kF0ZUgQYqJoqOdENrxPZImKJZ76UmrZU2cypXvpyxCSd2jwndLa2PzTAuqqyAYFD7WAVB5XxFOXb-IgzzKh7ade-Phw868m1_Qmv7w6-QKhoQXwQ'
