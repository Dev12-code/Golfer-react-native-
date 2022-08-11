import { combineReducers } from 'redux';
import auth from '../store/redux/auth/reducers';
import tournaments from './redux/tournaments/reducers';
import golfers from './redux/golfers/reducers';

export default combineReducers({
  auth,
  tournaments,
  golfers
});
