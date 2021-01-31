import axios from 'axios';
import * as actions from './types';

// Add User
export const addUser = (payload) => async dispatch => {
  await axios.post('http://localhost:8000/createUser/',payload)
                    .then((response) => {
                        console.log(response);
                    }, (error) => {
                        console.log(error);
                    });
}

// Get Questions
export const getQuestions = () => async dispatch => {
    const res = await axios.get('http://localhost:8000/coverageQuestions/');
    console.log(res.data);
    dispatch({
      type: actions.GET_QUESTIONS,
      payload: res.data
    });
  };

// Submit Response
export const submitResponse = (payload) => async dispatch => {
  await axios.post('http://localhost:8000/submitUserResponse/',payload)
                    .then((response) => {
                        console.log(response);
                    }, (error) => {
                        console.log(error);
                    });
}

// Get Coverage
export const getCoverage = (payload) => async dispatch => {
 await axios.post('http://localhost:8000/getUserCoverage/',payload)
                    .then((response) => {
                        console.log(response);
                        dispatch({
                          type: actions.GET_COVERAGE,
                          payload: response.data
                        });
                    }, (error) => {
                        console.log(error);
                    });
}