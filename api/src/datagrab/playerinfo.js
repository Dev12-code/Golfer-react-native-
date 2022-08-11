const axios = require('axios');
const axiosRetry = require('axios-retry');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { exists } = require('fs');

const pool = new Pool({
    user: "postgres",
    password: "root@123",
    database: "postgres",
    port: "5432",
    host: "api.rabbitcards.com",
    ssl: true
});

const driving = '102';
const app100125 = '02364';
const app125150 = '02366';
const app150175 = '02367';
const app175200 = '02368';
const app200 = '02369';
const putting = '02428';
const overall = '127';

const axiosInstance = axios.create();

const urlToFetch = (stat_id) =>
	`https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=${stat_id}&YEAR=2021&TYPE=YTD`;

const playerBioURL = (player_id) =>
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

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllUbGtaVEUyTW1OaFpUWTVZVGMzWW1FMVlXWXhNVEZrTW1ZelpUQTJPV1UzWldNeVlUVmtNQT09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJSYWJiaXRDYXJkQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiUmFiYml0Q2FyZCIsInRpZXIiOiIxMFBlck1pbiIsIm5hbWUiOiJzeW5kc2N0ZXN0IiwiaWQiOjQ4MSwidXVpZCI6bnVsbH0sInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9hcGktdGVzdC1zaXRlcy5wZ2F0b3VyaHEuY29tOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJCcm9uemUiOnsic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MSwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn0sIlNpbHZlciI6eyJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjoxMCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiU0FOREJPWCIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRTY29yZWNhcmQiLCJjb250ZXh0IjoiXC9TeW5kU2NvcmVjYXJkXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudEZpZWxkIiwiY29udGV4dCI6IlwvU3luZFRvdXJuYW1lbnRGaWVsZFwvMS4wLjAiLCJwdWJsaXNoZXIiOiJmY2xlYXJ5IiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJBdmFpbGFibGVUZXN0VG91cm5hbWVudHMiLCJjb250ZXh0IjoiXC9BdmFpbGFibGVUZXN0VG91cm5hbWVudHNcLzEuMC4wIiwicHVibGlzaGVyIjoidGVzdGFkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kUGxheWVyc01hc3RlciIsImNvbnRleHQiOiJcL1N5bmRQbGF5ZXJzTWFzdGVyXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kR3JvdXBpbmdzIiwiY29udGV4dCI6IlwvU3luZEdyb3VwaW5nc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJraGFsbCIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU3luZExlYWRlcmJvYXJkIiwiY29udGV4dCI6IlwvU3luZExlYWRlcmJvYXJkXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kU2NoZWR1bGUiLCJjb250ZXh0IjoiXC9TeW5kU2NoZWR1bGVcLzEuMC4wIiwicHVibGlzaGVyIjoia2hhbGwiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRQbGF5ZXJCaW8iLCJjb250ZXh0IjoiXC9TeW5kUGxheWVyQmlvXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudEhvbGVTdGF0cyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50SG9sZVN0YXRzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImZjbGVhcnkiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRUb3VybmFtZW50RGV0YWlscyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50RGV0YWlsc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJmY2xlYXJ5IiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudFN0YXR1cyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50U3RhdHVzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiUGxheUJ5UGxheSIsImNvbnRleHQiOiJcL1BsYXlCeVBsYXlcLzEuMC4wIiwicHVibGlzaGVyIjoibmJlY2tlciIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiWVREX0VWVF9TdGF0aXN0aWNzIiwiY29udGV4dCI6IlwvWVREX0VWVF9TdGF0aXN0aWNzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJTaWx2ZXIifV0sImNvbnN1bWVyS2V5IjoickJOdmtJeTB3cUp1N0xaUG9ITVFoYVpZSDJFYSIsImV4cCI6Mzc4MTUzNjkxMiwiaWF0IjoxNjM0MDUzMjY1LCJqdGkiOiIzZmM0ZWUxMi01NzY0LTQ1MDItODFhYy0wNDkxNzc2YzY1ZWEifQ.rdtqWiC__Ee6im--Gpyl3WbTZHMD8rk36Duprkdfr1V4xnjHbjwbhcUDpD7VeoLPjtscGBZwYPA5eMPmtA0izRORkZCYawUAsVSK9D-IUzXAIOBkMGSJUZ3UEheX9sB6aPDPekJJYINSYHAn0cLO6ecJqGzm2QVPtiUbirC2fAmtn95HqEa33qQjop8rapcnCCHHWWWU_Jbx-muoicFBYK_2r2UQxmb6ivsK6j96yRagSN3KLBSkDeF7mUeXdF1e8wdPrLDYOoLvKEaavHUM-viGxcN6AoFzHa-hMwzkBfP4cdSA2VEm_gv5y5mZV92UZW7xrk-itpPDt_GRAzZGAA';

const config = () => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const fetchProfile = async (playerID) => {
	return await axios.get(playerBioURL(playerID), config());
};

const fetchStats = async () => {
	return axios.all([
		axios.get(urlToFetch(driving), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app100125), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app125150), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app150175), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app175200), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(app200), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(putting), config()).catch((err) => console.log(err)),
		axios.get(urlToFetch(overall), config()).catch((err) => console.log(err)),
	]);
};

async function grabGolfers() {
    ans = pool.query("SELECT p_id FROM golfers;");
    return ans;
}

async function golferExists(p_id) {
    ans = pool.query("SELECT exists (SELECT 1 FROM golfers WHERE p_id = $1 LIMIT 1);", [p_id]);
    return ans;
}

async function playerProfile(player_id) {

    pool.query(`DELETE FROM golfers WHERE p_id = $1;`, [player_id]);

    let a = await fetchProfile(player_id)
    a = a.data.plr[0]
    let player = {
        "p_id": player_id,
        "first_name": a.name.first,
        "middle_name": a.name.middle,
        "last_name": a.name.last,
        "nick_name": a.name.nick,
        "height": a.height.imperial,
        "weight": a.weight.imperial,
        "birthdate": a.birthDate,
        "birthplace": a.birthPlace,
        "country": a.nationality,
        "tour_winnings": a.tourMoney,
        "current_season_highlight": a.seasonHighlights[0].highlight,
        "special_interests": a.specialInterests,
        "fun_fact": a.personalItems[0].text
    }
    //insert into db
    pool.query(`INSERT INTO golfers (p_id, first_name, middle_name, last_name, nick_name, height, weight, birthdate,
                birthplace, country, tour_winnings, current_season_highlight, special_interests, fun_fact) VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, [player["p_id"], player["first_name"], player["middle_name"],
                player["last_name"], player["nick_name"], player["height"], player["weight"], player["birthdate"], player["birthplace"], player["country"],
                player["tour_winnings"], player["current_season_highlight"], player["special_interests"], player["funfact"]]);
}

async function playerStats() {
    let ranks = {};
    let a = await fetchStats();
    //let season = a[0].data.tours[0].years[0].year;
    console.log(a[7].data.tours[0])//.years[0].stats[0].details[0].statValues)
    for (let x = 0; x < a.length; ++x) {
        for (let y of a[x].data.tours[0].years[0].stats[0].details) {
            if (y.plrName in ranks) {
                ranks[y.plrName][x] = [[y.statValues[0].statValue1, y.curRank]];
            }
            else {
                ranks[y.plrName] = [["N/A", 0], ["N/A", 0], ["N/A", 0], ["N/A", 0],
                                    ["N/A", 0], ["N/A", 0], ["N/A", 0], ["N/A", 0]];
                ranks[y.plrName][x] = [[y.statValues[0].statValue1, y.curRank]];
            }
        }
    }
    for (const [key, value] in Object.entries(ranks)) {
        pool.query(`INSERT INTO golfer_stats (p_id, driving_accuracy, da_rank, approach_100125, a100_rank,
                    approach_125150, a125_rank, approach_150175, a150_rank, approach_175200, a175_rank,
                    approach_200, a200_rank, putting_perc, pp_rank, overall, createdAt) VALUES ($1, $2, $3,
                    $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`, [key, value[0][0], value[0][1],
                    value[1][0], value[1][1], value[2][0], value[2][1], value[3][0], value[3][1], value[4][0], value[4][1],
                    value[5][0], value[5][1], value[6][0], value[6][1], value[7][0], Date.now()]);
    }
}

async function golferProfiler() {
    let golfer_ids = await grabGolfers();
    for (let x of golfer_ids.rows) {
        playerProfile(x.p_id);
    }
}

golferProfiler()
playerStats()