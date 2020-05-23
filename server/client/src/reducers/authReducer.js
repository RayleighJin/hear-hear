import { FETCH_USER } from "../actions/types";

export default function (state = null, action) {
	// console.log(action);
	switch (action.type) {
		case FETCH_USER:
			// return false if payload is an empty string
			return action.payload || false;
		default:
			// if state is null, return the state
			return state;
	}
}
