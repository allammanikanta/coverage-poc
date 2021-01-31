import { combineReducers } from 'redux';
import { questions, coverage } from './questions';

export default combineReducers({
  questions,
  coverage
});