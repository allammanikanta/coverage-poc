import { GET_QUESTIONS,GET_COVERAGE } from '../actions/types';

const initialState = {
    questions: '',
    coverage: '',
  }

export function questions(state = initialState, action) {
    console.log(state,"this state");
    switch (action.type) {
        case GET_QUESTIONS:
            return Object.assign({}, state, {
                questions: [...action.payload],
              })
        case GET_COVERAGE:
            return Object.assign({}, state, {
                coverage: action.payload,
              })
        default:
            return state;
    }
}

export function coverage(state = initialState, action) {
    console.log(state,"state");
    switch (action.type) {
        case GET_COVERAGE:
            return Object.assign({}, state, {
                coverage: action.payload.coverage,
              })
        default:
            return state;
    }
}