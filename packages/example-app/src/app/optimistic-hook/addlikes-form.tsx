"use client";

import { useOptimisticAction } from "next-safe-action/hook";
import type { addLikes } from "./addlikes-action";

type Props = {
	likesCount: number;
	addLikes: typeof addLikes; // infer types with `typeof`
};

const AddLikesForm = ({ likesCount, addLikes }: Props) => {
	// Here we pass safe action (`addLikes`) and current server state to `useAction` hook.
	const { execute, response, status, reset, optimisticData } =
		useOptimisticAction(
			addLikes,
			{ likesCount },
			{
				onSuccess(data, input, reset) {
					console.log("HELLO FROM ONSUCCESS", data, input);

					// You can reset response object by calling `reset`.
					// reset();
				},
				onError(error, input, reset) {
					console.log("OH NO FROM ONERROR", error, input);

					// You can reset response object by calling `reset`.
					// reset();
				},
			}
		);

	console.log("status:", status);

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const input = Object.fromEntries(formData) as {
						incrementBy: string;
					};

					const intIncrementBy = parseInt(input.incrementBy);

					// Action call. Here we pass action input and expected (optimistic)
					// data.
					execute(
						{ incrementBy: intIncrementBy },
						{ likesCount: likesCount + intIncrementBy }
					);
				}}>
				<input
					type="text"
					name="incrementBy"
					id="incrementBy"
					placeholder="Increment by"
				/>
				<button type="submit">Add likes</button>
				<button type="button" onClick={reset}>
					Reset
				</button>
			</form>
			<div id="response-container">
				{/* This object will update immediately when you execute the action.
						Real data will come back once action has finished executing. */}
				<pre>Optimistic data: {JSON.stringify(optimisticData)}</pre>{" "}
				<pre>Is executing: {JSON.stringify(status === "executing")}</pre>
				<div>Action response:</div>
				<pre className="response">
					{
						response // if got back a response,
							? JSON.stringify(response, null, 1)
							: "fill in form and click on the add likes button" // if action never ran
					}
				</pre>
			</div>
		</>
	);
};

export default AddLikesForm;
