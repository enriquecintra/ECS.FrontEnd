import { createStore, combineReducers } from "redux"


const INITIAL_STATE = { token: null }

const reducers = combineReducers({
	loginUser: function(state=INITIAL_STATE, action) {
		switch(action.type){
			case 'LOGIN':
				return {
						...state,
						token: action.payload.token
					};
			case 'LOGOUT':
				return {
					...state,
					token: null
				};
			default:
				return state;
}}})

const store = createStore(reducers)

export default store