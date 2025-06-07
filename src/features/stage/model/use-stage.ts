import { resetPlayersStates, resetStates, setState, useMultiplayerState } from 'playroomkit'
import { type TimerDuration, updateSecondsLeft } from './use-timer'

export const GAME_STAGE = {
	START: 'START',
	NAMING: 'NAMING',
	DRAWING: 'DRAWING',
	WHERE: 'WHERE',
	RESULTS: 'RESULTS',
} as const

export type GameStage = (typeof GAME_STAGE)[keyof typeof GAME_STAGE]

export const GAME_STAGE_DURATIONS: Record<GameStage, TimerDuration> = {
	[GAME_STAGE.START]: null,
	[GAME_STAGE.NAMING]: 10,
	[GAME_STAGE.DRAWING]: 4,
	[GAME_STAGE.WHERE]: 3,
	[GAME_STAGE.RESULTS]: null, // No timer for results stage
} as const

export function useStage() {
	return useMultiplayerState<GameStage>('stage', GAME_STAGE.START)
}
export function updateStage(stage: GameStage) {
	setState('stage', stage)
}

function goToStageStart() {
	console.log('goToStageStart')
	updateStage(GAME_STAGE.START)
	resetPlayersStates()
	resetStates()
}

function goToStageNaming() {
	console.log('goToStageNaming')
	updateStage(GAME_STAGE.NAMING)
	resetPlayersStates()
}

function goToStageDrawing() {
	console.log('goToStageDrawing')
	updateStage(GAME_STAGE.DRAWING)
	resetPlayersStates(['name'])
}

function goToStageResults() {
	console.log('goToStageResults')
	updateStage(GAME_STAGE.RESULTS)
	// resetPlayersStates()
}

export function switchStage(stage: GameStage) {
	switch (stage) {
		case GAME_STAGE.NAMING:
			return goToStageNaming()
		case GAME_STAGE.DRAWING:
			return goToStageDrawing()
		case GAME_STAGE.RESULTS:
			return goToStageResults()
		default:
			return goToStageStart()
	}
}
