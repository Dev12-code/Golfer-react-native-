export const initialState = {
  auth: {
    signUpLoading: false,
    user: {},
    signUpErrorMsg: undefined,
    loginError: undefined,
    appLoading: true,
    loggedIn: false,
    updateProfileLoading: false,
    updateProfileError: '',
    uploadImageLoading: false,
    uploadImageError: undefined,
    fbSignUpLoading: false,
    appleSignUpLoading: false,
    socialAuthError: undefined,
    logOutLoading: false,
    resetPasswordLoading: false,
    resetPasswordError: undefined
  },
  tournaments: {
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

  },
  golfers: {
    loading: false,
    error: undefined,
    golfers: [],
    golfer: undefined
  }
};
