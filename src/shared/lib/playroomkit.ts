import type { PlayerState } from 'playroomkit'

export interface PlayerStateWithValue<T = unknown> {
	player: PlayerState
	state: T
}
