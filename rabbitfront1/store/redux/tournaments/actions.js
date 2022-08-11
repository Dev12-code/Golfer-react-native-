import * as constant from '../../constants';

export const getAllTournaments = (payload) => ({
  type: constant.GET_ALL_TOURNAMENTS,
  payload,
});

export const getAllTournamentsSuccess = (payload) => ({
  type: constant.GET_ALL_TOURNAMENTS_SUCCESS,
  payload,
});

export const getAllTournamentsError = (payload) => ({
  type: constant.GET_ALL_TOURNAMENTS_ERROR,
  payload,
});

export const getTournamentById = (payload) => ({
  type: constant.GET_TOURNAMENT_BY_ID,
  payload,
});

export const getTournamentByIdSuccess = (payload) => ({
  type: constant.GET_TOURNAMENT_BY_ID_SUCCESS,
  payload,
});

export const getTournamentByIdError = (payload) => ({
  type: constant.GET_TOURNAMENT_BY_ID_ERROR,
  payload,
});

export const getTournamentByRange = (payload) => ({
  type: constant.GET_TOURNAMENT_BY_RANGE,
  payload,
});

export const getTournamentByRangeSuccess = (payload) => ({
  type: constant.GET_TOURNAMENT_BY_RANGE_SUCCESS,
  payload,
});

export const getTournamentByRangeError = (payload) => ({
  type: constant.GET_TOURNAMENT_BY_RANGE_ERROR,
  payload,
});

export const setTournament = (payload) => ({
  type: constant.SET_TOURNAMENT,
  payload,
})

export const setRound = (payload) => ({
  type: constant.SET_ROUND,
  payload,
})

export const createRabbitCard = (payload) => ({
  type: constant.CREATE_RABBIT_CARD,
  payload,
});

export const createRabbitCardSuccess = (payload) => ({
  type: constant.CREATE_RABBIT_CARD_SUCCESS,
  payload,
});

export const createRabbitCardError = (payload) => ({
  type: constant.CREATE_RABBIT_CARD_ERROR,
  payload,
});

export const getRabbitCards = (payload) => ({
  type: constant.GET_RABBIT_CARDS,
  payload,
});

export const getRabbitCardsSuccess = (payload) => ({
  type: constant.GET_RABBIT_CARDS_SUCCESS,
  payload,
});

export const getRabbitCardsError = (payload) => ({
  type: constant.GET_RABBIT_CARDS_ERROR,
  payload,
});

export const deleteRabbitCard = (payload) => ({
  type: constant.DELETE_RABBIT_CARD,
  payload,
});

export const deleteRabbitCardSuccess = (payload) => ({
  type: constant.DELETE_RABBIT_CARD_SUCCESS,
  payload,
});

export const deleteRabbitCardError = (payload) => ({
  type: constant.DELETE_RABBIT_CARD_ERROR,
  payload,
});

export const getRabbitCardChoice = (payload,flag) => ({
  type: constant.GET_RABBIT_CARD_CHOICE,
  payload,
});

export const getRabbitCardChoiceSuccess = (payload) => ({
  type: constant.GET_RABBIT_CARD_CHOICE_SUCCESS,
  payload,
});

export const getRabbitCardChoiceError = (payload) => ({
  type: constant.GET_RABBIT_CARD_CHOICE_ERROR,
  payload,
});

export const getGroupingsPar3s = (payload) => ({
  type: constant.GET_GROUPINGS_PAR3S,
  payload,
});

export const getGroupingsPar3sSuccess = (payload) => ({
  type: constant.GET_GROUPINGS_PAR3S_SUCCESS,
  payload,
});

export const getGroupingsPar3sError = (payload) => ({
  type: constant.GET_GROUPINGS_PAR3S_ERROR,
  payload,
});

export const getHoleGolfers = (payload) => ({
  type: constant.GET_HOLE_GOLFERS,
  payload,
});

export const getHoleGolfersSuccess = (payload) => ({
  type: constant.GET_HOLE_GOLFERS_SUCCESS,
  payload,
});

export const getHoleGolfersError = (payload) => ({
  type: constant.GET_HOLE_GOLFERS_ERROR,
  payload,
});

export const userCTTPPick = (payload) => ({
  type: constant.USER_CTTP_PICK,
  payload,
});

export const userCTTPPickSuccess = (payload) => ({
  type: constant.USER_CTTP_PICK_SUCCESS,
  payload,
});

export const userCTTPPickError = (payload) => ({
  type: constant.USER_CTTP_PICK_ERROR,
  payload,
});


export const getUserRanking = (payload) => ({
  type: constant.GET_USERRANKING,
  payload,
});

export const getUserRankingSuccess = (payload) => ({
  type: constant.GET_ALL_USERRANKING_SUCCESS,
  payload,
});

export const getUserRankingError = (payload) => ({
  type: constant.GET_ALL_USERRANKING_ERROR,
  payload,
});

export const getOverallRanking = (payload) => ({
  type: constant.GET_OVERALLRANKING,
  payload,
});

export const getOverallRankingSuccess = (payload) => ({
  type: constant.GET_OVERALLRANKING_SUCCESS,
  payload,
});

export const getOverallRankingError = (payload) => ({
  type: constant.GET_OVERALLRANKING_ERROR,
  payload,
});

export const createTieBreaker = (payload) => ({
  type: constant.CREATE_TIEBRESKER,
  payload,
});

export const createTieBreakerSuccess = (payload) => ({
  type: constant.CREATE_TIEBRESKER_SUCCESS,
  payload,
});

export const createTieBreakerError = (payload) => ({
  type: constant.CREATE_TIEBRESKER_ERROR,
  payload,
});


export const myrabbitPurse = (payload) => ({
  type: constant.MYRABBITPURSE,
  payload,
});

export const myrabbitPurseSuccess = (payload) => ({
  type: constant.MYRABBITPURSE_SUCCESS,
  payload,
});

export const myrabbitPurseEError = (payload) => ({
  type: constant.MYRABBITPURSE_ERROR,
  payload,
});

export const readWinnerRound = (payload) => ({
  type: constant.READ_WINNERROUND,
  payload,
});

export const readWinnerRoundSuccess = (payload) => ({
  type: constant.READ_WINNERROUND_SUCCESS,
  payload,
});

export const readWinnerError = (payload) => ({
  type: constant.READ_WINNERROUND_ERROR,
  payload,
});
