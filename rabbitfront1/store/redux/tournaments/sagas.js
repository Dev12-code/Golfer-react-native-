import { remove } from "lodash";
import { Alert } from "react-native";
import { call, put, takeLatest } from "redux-saga/effects";
import { getServerError } from "../../../utils/helpers";
import { request } from "../../../utils/http";
import * as constants from "../../constants";
import * as actions from "./actions";
import { StorageUtils } from "../../../utils/storage";

function allTournaments() {
  console.log("API : allTournaments ",`/tournaments`)
  return request.get("/tournaments");
}

function* handleAllTournaments() {
  try {
    const result = yield call(allTournaments);
    // console.log("API-result : allTournaments ",result)
    yield put(actions.getAllTournamentsSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getAllTournamentsError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function tournamentById({ id }) {
  console.log("API : tournamentById ",`/tournaments/${id}/`)
  return request.get(`/tournaments/${id}/`);
}

function* handleGetTournamentById({ payload }) {
  try {
    const result = yield call(tournamentById, { id: payload });

    console.log("API Result : tournamentById", result);
    yield put(actions.getTournamentByIdSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getTournamentByIdError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function tournamentByRange({ startDate, endDate, t_id }) {
  console.log("tournamentByRange : ",request.defaults.baseURL + `/tournaments/${startDate}/${endDate}/${t_id}`);

 // console.log("API : tournamentByRange ",`/tournaments/${startDate}/${endDate}`)
  return request.get(`/tournaments/${startDate}/${endDate}/${t_id}`);
}

function* handleGetTournamentByRange({ payload }) {
  const { navigation } = payload;
  try {
    const result = yield call(tournamentByRange, payload);
    console.log("API Result : tournamentByRange", result);
    yield put(actions.getTournamentByRangeSuccess(result.data));
    if (Array.isArray(result.data) && result.data.length !== 0) {
      yield put(actions.setTournament(result.data[0]));
      yield put(actions.setRound(1));
      navigation.navigate("TournamentChoices");
    } else {
      Alert.alert(
        "Info",
        "There is no matched tournament choice on this dates.",
        [
          {
            text: "Choose Dates",
            style: "ok",
            onPress: () => {},
          },
        ]
      );
    }
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getTournamentByRangeError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function createRabbitCard(payload) {
  console.log("API : createRabbitCard ",`/rabbitcards`)
  console.log("API params : createRabbitCard ",payload)
  return request.post(`/rabbitcards`, payload);
}

function* handleCreateRabbitCard({ payload }) {
  try {
    const result = yield call(createRabbitCard, payload);
    console.log("API Result : createRabbitCard ",result);
    yield put(actions.createRabbitCardSuccess(result.data));

    const result1 = yield call(getRabbitCards);
    console.log("API Result : getRabbitCards ",result);
    yield put(actions.getRabbitCardsSuccess(result1.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.createRabbitCardError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function getRabbitCards() {
  console.log("API : getRabbitCards ",`/rabbitcards`   + "basicURL==="  + request.baseURL)

  return request.get(`/rabbitcards`);
}

function* handleGetRabbitCards() {
  try {
    const result = yield call(getRabbitCards);
    // console.log("API Result : getRabbitCards ",result);
    yield put(actions.getRabbitCardsSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getRabbitCardsError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function deleteRabbitCard({ payload }) {
  console.log("API : deleteRabbitCard ",`/rabbitcards/${payload.id}`)
  return request.delete(`/rabbitcards/${payload.id}`);
}

function* handleDeleteRabbitCard(payload) {
  try {
    const result = yield call(deleteRabbitCard, payload);
    console.log("API Result : deleteRabbitCard ",result);
    const result1 = yield call(getRabbitCards);
    yield put(actions.deleteRabbitCardSuccess(result1.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.deleteRabbitCardError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}
// '/tournaments/${t_id}/rabbitcards/${round}'
function getRabbitCardChoice({ payload }) {
  const { t_id, round,cttp_flag } = payload;
  console.log(cttp_flag);
  console.log("API : getRabbitCardChoice ",`/tournaments/${t_id}/rabbitcards/${round}/${cttp_flag}`)
  return request.get(`/tournaments/${t_id}/rabbitcards/${round}/${cttp_flag}`);
  return request.get(`/tournaments/${t_id}/rabbitcards/4/`);
}

function* handleGetRabbitCardChoice(payload) {
  try {
    const result = yield call(getRabbitCardChoice, payload);
    console.log("API Result : getRabbitCardChoice", result);
    yield put(actions.getRabbitCardChoiceSuccess(result.data));
  } catch (err) {
    console.log("API Result : getRabbitCardChoice", err);
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getRabbitCardChoiceError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function getGroupingPar3s({ payload }) {
  const { t_id, round, group_id } = payload;
  console.log("API : getGroupingPar3s ",`/tournaments/${t_id}/groupings/${round}/${group_id}/par3s`)
  return request.get(
    `/tournaments/${t_id}/groupings/${round}/${group_id}/par3s`
  );
}

function* handleGetGroupingsPar3s(payload) {
  try {
    const result = yield call(getGroupingPar3s, payload);
    console.log("API Result : getGroupingPar3s", result);
    yield put(actions.getGroupingsPar3sSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getGroupingsPar3sError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function getHoleGolfers({ payload }) {
  const { t_id, round, group_id, hole_number,counter } = payload;
  console.log("API : getHoleGolfers ",`/tournaments/${t_id}/groupings/${round}/${group_id}/par3s/${hole_number}/${counter}`)
  console.log("API Param : ",payload)
  
  return request.get(
    `/tournaments/${t_id}/groupings/${round}/${group_id}/par3s/${hole_number}/${counter}`
  );
}

function* handleGetHoleGolfers(payload) {
  try {
    const result = yield call(getHoleGolfers, payload);
    console.log("API Result : getHoleGolfers", result);
    yield put(actions.getHoleGolfersSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getHoleGolfersError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function userCTTPPickSubmit({ payload }) {
  const { t_id, round, group_id, hole } = payload;
  console.log("API : userCTTPPickSubmit : ",`/tournaments/${t_id}/groupings/${round}/${group_id}/par3s/${hole}/pick`);
  console.log("API Param : ",payload);
  return request.post(
    `/tournaments/${t_id}/groupings/${round}/${group_id}/par3s/${hole}/pick`,
    payload
  );
}

function* handleUserCTTPPick(payload) {
  try {
    const result = yield call(userCTTPPickSubmit, payload);
    console.log("API Result : userCTTPPickSubmit : ",result);
    yield put(actions.userCTTPPickSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.userCTTPPickError(
        error || "An error occurred when trying to get tournaments"
      )
    );
  }
}

function userRankingByRabbitCard(payload) {
  const { t_id, round } = payload;
  console.log("userRankingByRabbitCard : ",request.defaults.baseURL + `/tournaments/t_id/${t_id}/ranking/${round}`);
  return request.get(`/tournaments/t_id/${t_id}/ranking/${round}`);
}

function* handleGetuserRankingByRabbitCard({ payload }) {
  try {

    const user_id =       yield call(StorageUtils.getStringValue, "@userId");
    const result = yield call(userRankingByRabbitCard, payload);
    // console.log("API Result : tournamentByRange", actions.getUserRankingSuccess(result.data));
    yield put(actions.getUserRankingSuccess(result.data));

    
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getUserRankingError(
        error || "An error occurred when trying to get my ranking"
      )
    );
  }
}

function getOverallRanking() {
  console.log("getOverall Ranking : ",request.defaults.baseURL + `/ranking`);
  return request.get(`/ranking`);
}

function* handleGetOverallRaking() {
  try {
    const result = yield call(getOverallRanking);
    console.log("API Result : getOverallRanking", actions.getUserRankingSuccess(result.data));
    yield put(actions.getOverallRankingSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.getOverallRanking(
        error || "An error occurred when trying to get my ranking"
      )
    );
  }
}

function createTierBraker(payload) {
  const { id, feet, inches } = payload;

  console.log("create Tie Breaker ",request.defaults.baseURL + `/rabbitcards/${id}/feet/${feet}/inche/${inches}`);
  return request.post(`/rabbitcards/${id}/feet/${feet}/inche/${inches}`);
}

function* handleCreateTireBreaker({payload}) {
  try {
    const result = yield call(createTierBraker,payload);
    console.log("API Result : getOverallRanking", actions.createTieBreakerSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.createTieBreaker(
        error || "An error occurred when trying to update feet"
      )
    );
  }
}


export function myrabbitPurse(payload) {
  return request.post("/rabbitcards/myrabbitPurse", payload);
}

function* handleMyrabbitcardPurse({payload}) {
  try {
    const result = yield call(myrabbitPurse,payload);
    console.log("API Result : getOverallRanking", actions.myrabbitPurseSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.myrabbitPurse(
        error || "An error occurred when trying to update feet"
      )
    );
  }
}

export function readWinnerRound(payload) {
  const { t_id, round } = payload;
  console.log("aaaa",`/rabbitcards/t_id/${t_id}/round/${round}`);

  return request.post(`/rabbitcards/t_id/${t_id}/round/${round}`);
}

function* handleReadWinnerRound({payload}) {
  try {
    const result = yield call(readWinnerRound,payload);
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.readWinnerRound(
        error || "An error occurred when trying to update feet"
      )
    );
  }
}

export default [
  takeLatest(constants.USER_CTTP_PICK, handleUserCTTPPick),
  takeLatest(constants.GET_HOLE_GOLFERS, handleGetHoleGolfers),
  takeLatest(constants.GET_GROUPINGS_PAR3S, handleGetGroupingsPar3s),
  takeLatest(constants.GET_RABBIT_CARD_CHOICE, handleGetRabbitCardChoice),
  takeLatest(constants.DELETE_RABBIT_CARD, handleDeleteRabbitCard),
  takeLatest(constants.GET_RABBIT_CARDS, handleGetRabbitCards),
  takeLatest(constants.CREATE_RABBIT_CARD, handleCreateRabbitCard),
  takeLatest(constants.GET_ALL_TOURNAMENTS, handleAllTournaments),
  takeLatest(constants.GET_TOURNAMENT_BY_ID, handleGetTournamentById),
  takeLatest(constants.GET_TOURNAMENT_BY_RANGE, handleGetTournamentByRange),
  takeLatest(constants.GET_USERRANKING, handleGetuserRankingByRabbitCard),
  takeLatest(constants.GET_OVERALLRANKING, handleGetOverallRaking),
  takeLatest(constants.CREATE_TIEBRESKER, handleCreateTireBreaker),
  takeLatest(constants.MYRABBITPURSE, handleMyrabbitcardPurse),
  takeLatest(constants.READ_WINNERROUND, handleReadWinnerRound),

];
