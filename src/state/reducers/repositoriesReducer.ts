import { ActionType } from "./../action-types";
import { Action } from "./../actions";

interface RepositoriesState {
	loading: boolean;
	error: string | null;
	data: string[];
}

// added RepositoriesState interface as a return type checker and state
// type for the reducer to make sure that typescript will run a compilation
//  error if the return is not correct at any point of development time

// old interface not good enough
// interface Action {
// 	type: string;
// 	payload?: any;
// }

const intialState = {
	loading: false,
	error: null,
	data: [],
};

const RepositoriesReducer = (
	state: RepositoriesState = intialState,
	action: Action
): RepositoriesState => {
	// switch statements use type-gard just as if statements
	switch (action.type) {
		case ActionType.SEARCH_REPOSITORIES:
			// action.payload is not a thing here as it matches
			// SearchRepositoriesAction interface (no payload for action)
			return { loading: true, error: null, data: [] };
		case ActionType.SEARCH_REPOSITORIES_SUCCESS:
			return { loading: false, error: null, data: action.payload };
		case ActionType.SEARCH_REPOSITORIES_ERROR:
			return { loading: false, error: action.payload, data: [] };

		default:
			return state;
	}
};

export default RepositoriesReducer;
