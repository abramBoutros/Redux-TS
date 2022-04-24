import { useState } from "react";
// import { useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { actionCreators } from "../state";
import { useActions } from "../hooks/useActions";

const RepositoriesList: React.FC = () => {
	const [term, setTerm] = useState("");
	// const dispatch = useDispatch();
	const { data, error, loading } = useTypedSelector(
		(state) => state.repositories
	);
	const { SearchRepositories } = useActions();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		SearchRepositories(term);
	};

	console.log(data, error, loading);
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input value={term} onChange={(e) => setTerm(e.target.value)} />
				<button>Search</button>
			</form>
			{error && <h3>{error}</h3>}
			{loading && <h3>Loading...</h3>}
			{!error &&
				!loading &&
				data &&
				data.map((name) => {
					return <h4 key={name}>{name}</h4>;
				})}
		</div>
	);
};

export default RepositoriesList;
