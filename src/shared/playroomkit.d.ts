// Type overrides for playroomkit
// This file fixes issues with the original playroomkit types
declare module 'playroomkit' {
	export * from 'playroomkit/types'

	export type PlayerStateWithValue<T> = {
		player: PlayerState
		state: T
	}

	// Add any missing types or fix existing ones
	// Example: If there are issues with hook return types
	export type SetStateFunction<T> = (value: T, reliable?: boolean) => void
	export type MultiplayerStateHookResult<T> = [T, SetStateFunction<T>]

	// Override hook declarations if needed
	export declare function useMultiplayerState<T = unknown>(key: string, defaultValue: T): MultiplayerStateHookResult<T>

	export declare function usePlayerState<T = unknown>(
		player: PlayerState,
		key: string,
		defaultValue: T
	): MultiplayerStateHookResult<T>

	export declare function usePlayersState<T = unknown>(key: string): PlayerStateWithValue<T>[]
	export declare function getState<T = unknown>(key: string): T
}
