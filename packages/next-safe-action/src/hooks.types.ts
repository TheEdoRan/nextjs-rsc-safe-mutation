import type { InferIn, Schema } from "@typeschema/main";
import type { SafeActionResult } from "./index.types";
import type { MaybePromise } from "./utils";

/**
 * Type of `result` object returned by `useAction` and `useOptimisticAction` hooks.
 */
export type HookResult<
	ServerError,
	S extends Schema,
	BAS extends Schema[],
	Data,
> = SafeActionResult<ServerError, S, BAS, Data> & {
	fetchError?: string;
};

/**
 * Type of hooks callbacks. These are executed when action is in a specific state.
 */
export type HookCallbacks<ServerError, S extends Schema, BAS extends Schema[], Data> = {
	onExecute?: (input: InferIn<S>) => MaybePromise<void>;
	onSuccess?: (data: Data, input: InferIn<S>, reset: () => void) => MaybePromise<void>;
	onError?: (
		error: Omit<HookResult<ServerError, S, BAS, Data>, "data">,
		input: InferIn<S>,
		reset: () => void
	) => MaybePromise<void>;
	onSettled?: (
		result: HookResult<ServerError, S, BAS, Data>,
		input: InferIn<S>,
		reset: () => void
	) => MaybePromise<void>;
};

/**
 * Type of the safe action function passed to hooks. Same as `SafeActionFn` except it accepts
 * just a single input, without bind arguments.
 */
export type HookSafeActionFn<ServerError, S extends Schema, BAS extends Schema[], Data> = (
	clientInput: InferIn<S>
) => Promise<SafeActionResult<ServerError, S, BAS, Data>>;

/**
 * Type of the action status returned by `useAction` and `useOptimisticAction` hooks.
 */
export type HookActionStatus = "idle" | "executing" | "hasSucceeded" | "hasErrored";
