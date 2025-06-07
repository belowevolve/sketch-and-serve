import type { PlayerState } from 'playroomkit'

export type PlayerStateWithValue<T = unknown> = {
	player: PlayerState
	state: T
}
