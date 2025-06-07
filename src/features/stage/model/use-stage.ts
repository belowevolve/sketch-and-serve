import { useMultiplayerState } from 'playroomkit'

export const GAME_STAGE = {
	START: 'START',
	NAMING: 'NAMING',
	DRAWING: 'DRAWING',
	WHERE: 'WHERE',
	RESULTS: 'RESULTS',
} as const

export type GameStage = (typeof GAME_STAGE)[keyof typeof GAME_STAGE]

export const GAME_STAGE_DURATIONS = {
	[GAME_STAGE.START]: 0,
	[GAME_STAGE.NAMING]: 10,
	[GAME_STAGE.DRAWING]: 4,
	[GAME_STAGE.WHERE]: 3,
	[GAME_STAGE.RESULTS]: 0, // No timer for results stage
} as const

export function useStage() {
	return useMultiplayerState<GameStage>('gameStage', GAME_STAGE.START)
}

export function useIsTimerPaused(key = 'game') {
	return useMultiplayerState<boolean>(`${key}-isPaused`, false)
}
