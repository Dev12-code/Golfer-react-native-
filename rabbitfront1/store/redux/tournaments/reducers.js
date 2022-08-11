import * as constants from '../../constants';

const initialState = {
  loading: false,
  error: undefined,
  tournaments: [],
  rangeTournaments: [],
  selectedTournament: undefined,
  rabbitCards: [],
  choice: [],
  holes: [],
  holeGolfers: [],
  userRankings: []

};

export default tournamentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ALL_TOURNAMENTS:
      return { ...state, loading: true, error: undefined };
    case constants.GET_ALL_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        // loading: false,
        tournaments: action.payload,
        error: undefined,
      };
    case constants.GET_ALL_TOURNAMENTS_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.GET_TOURNAMENT_BY_ID:
      return { ...state, loading: true, error: undefined };
    case constants.GET_TOURNAMENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedTournament: action.payload,
        error: undefined,
      };
    case constants.GET_TOURNAMENT_BY_ID_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.GET_TOURNAMENT_BY_RANGE:
      return { ...state, loading: true, error: undefined };
    case constants.GET_TOURNAMENT_BY_RANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        rangeTournaments: action.payload,
        error: undefined,
      };
    case constants.GET_TOURNAMENT_BY_RANGE_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.SET_TOURNAMENT:
      return {
        ...state,
        selectedTournament: action.payload,
        loading: false, error: undefined
      };
    case constants.SET_ROUND:
      return {
        ...state,
        currentRound: action.payload,
        loading: false, error: undefined
      };

    case constants.CREATE_RABBIT_CARD:
      return { ...state, loading: true, error: undefined };
    case constants.CREATE_RABBIT_CARD_SUCCESS:
      return {
        ...state,
        loading: true,
        rabbitCard: action.payload,
        error: undefined,
      };
    case constants.CREATE_RABBIT_CARD_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.GET_RABBIT_CARDS:
      return { ...state, loading: true, error: undefined };
    case constants.GET_RABBIT_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        rabbitCards: action.payload,
        error: undefined,
      };
    case constants.GET_RABBIT_CARDS_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.DELETE_RABBIT_CARD:
      return { ...state, loading: true, error: undefined };
    case constants.DELETE_RABBIT_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        rabbitCards: action.payload,
        error: undefined,
      };
    case constants.DELETE_RABBIT_CARD_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.GET_RABBIT_CARD_CHOICE:
      return { ...state, loading: true, error: action.error ,rabbitcardLoading:true,};
    case constants.GET_RABBIT_CARD_CHOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        choice: action.payload,
        error: undefined,
        rabbitcardLoading:false,
      };
    case constants.GET_RABBIT_CARD_CHOICE_ERROR:
      return { ...state, loading: false,choice:[], error: action.error,rabbitcardLoading:false, };

    case constants.GET_GROUPINGS_PAR3S:
      return { ...state, loading: true, error: action.error };
    case constants.GET_GROUPINGS_PAR3S_SUCCESS:
      return {
        ...state,
        loading: true,
        holes: action.payload,
        error: undefined,
      };
    case constants.GET_GROUPINGS_PAR3S_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.GET_HOLE_GOLFERS:
      return { ...state, loading: false, error: action.error };
    case constants.GET_HOLE_GOLFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        holeGolfers: action.payload,
        error: undefined,
      };
    case constants.GET_HOLE_GOLFERS_ERROR:
      return { ...state, loading: false, error: action.error };

    case constants.USER_CTTP_PICK:
      return { ...state, loading: false, error: action.error };
    case constants.USER_CTTP_PICK_SUCCESS:
      return {
        ...state,
        loading: false,
        // holeGolfers: action.payload,
        error: undefined,
      };
    case constants.USER_CTTP_PICK_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;



   case constants.GET_USERRANKING:
      return { ...state,  error: action.error };
    case constants.GET_ALL_USERRANKING_SUCCESS:
      return {
        ...state,
        userRankings: action.payload,
        error: undefined,
      
      };
    case constants.GET_ALL_USERRANKING_ERROR:
      return { ...state,  error: action.error };

      
    case constants.GET_OVERALLRANKING:
        return { ...state, loading: false, error: action.error };
    case constants.GET_OVERALLRANKING_SUCCESS:
        return {
          ...state,
          loading: false,
          userRankings: action.payload,
          error: undefined,
        
        };
     case constants.GET_OVERALLRANKING_ERROR:
        return { ...state, loading: false, error: action.error };
    
  }
};

export const tournaments = (state) => state.tournaments;
