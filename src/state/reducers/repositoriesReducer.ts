interface RepositoriesState {
	loading: boolean;
	error: string | null;
	data: string[];
}

// added RepositoriesState interface as a return type checker and state type for
// the reducer to make sure that typescript will run a compilation error if
// the return is not correct at any point of development time

//
// interface Action {
// 	type: string;
// 	payload?: any;
// }

// more advanced approach
interface SearchRepositoriesAction {
	type: "search_repositories";
}
interface SearchRepositoriesSuccessAction {
	type: "search_repositories_success";
	payload: string[];
}
interface SearchRepositoriesErrorAction {
	type: "search_repositories_error";
	payload: string;
}

const reducer = (
	state: RepositoriesState,
	action:
		| SearchRepositoriesAction
		| SearchRepositoriesSuccessAction
		| SearchRepositoriesErrorAction
): RepositoriesState => {
	// switch statements use type-gard just as if statements
	switch (action.type) {
		case "search_repositories":
			// action.payload is not a thing here as it matches
			// SearchRepositoriesAction interface (no payload for action)
			return { loading: true, error: null, data: [] };
		case "search_repositories_success":
			return { loading: false, error: null, data: action.payload };
		case "search_repositories_error":
			return { loading: false, error: action.payload, data: [] };

		default:
			return state;
	}
};

export default reducer;
