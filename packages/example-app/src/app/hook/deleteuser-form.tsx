"use client";

import { useAction } from "next-safe-action/hook";
import type { deleteUser } from "./deleteuser-action";

type Props = {
	userId: string;
	deleteUser: typeof deleteUser; // infer types with `typeof`
};

const DeleteUserForm = ({ userId, deleteUser }: Props) => {
	// Safe action (`deleteUser`) and optional `onSuccess` and `onError` callbacks
	// passed to `useAction` hook.
	const { execute, response, status, reset } = useAction(deleteUser, {
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
	});

	console.log("status:", status);

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const input = Object.fromEntries(formData) as {
						userId: string;
					};

					// Action call.
					execute(input);
				}}>
				<input type="text" name="userId" id="userId" placeholder="User ID" />
				<button type="submit">Delete user</button>
				<button type="button" onClick={reset}>
					Reset
				</button>
			</form>
			<div id="response-container">
				<pre>Deleted user ID: {userId}</pre>
				<pre>Is executing: {JSON.stringify(status === "executing")}</pre>
				<div>Action response:</div>
				<pre className="response">
					{
						response // if got back a response,
							? JSON.stringify(response, null, 1)
							: "fill in form and click on the delete user button" // if action never ran
					}
				</pre>
			</div>
		</>
	);
};

export default DeleteUserForm;
