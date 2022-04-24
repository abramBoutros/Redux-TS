import axios from "axios";
import { ActionType } from "../action-types";
// I will use dispatch type instead of any for dispatch function
import { Dispatch } from "redux";
// pass the Action interfaces to Dispatch
import { Action } from "../actions";

export const SearchRepositories = (term: string): any => {
	return async (dispatch: Dispatch<Action>) => {
		// 1st dispatch to set loading to true
		dispatch({
			type: ActionType.SEARCH_REPOSITORIES,
		});
		try {
			const { data } = await axios.get(
				"https://registry.npmjs.org/-/v1/search",
				{
					params: {
						text: term,
					},
				}
			);
			const names = data.objects.map((result: any) => {
				return result.package.name;
			});
			// 2nd dispatch if result is ok
			dispatch({
				type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
				payload: names,
			});
		} catch (e) {
			let message;
			if (e instanceof Error) message = e.message;
			else message = String(e);
			// 2nd dispatch if result is not ok
			dispatch({
				type: ActionType.SEARCH_REPOSITORIES_ERROR,
				payload: message,
			});
		}
	};
};
