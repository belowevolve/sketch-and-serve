import type { TimerDuration } from './use-timer'
import { getState, resetPlayersStates, resetStates, setState, useMultiplayerState } from 'playroomkit'

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
	[GAME_STAGE.RESULTS]: null,
} as const

export const DEFAULT_STATES = {
	stage: GAME_STAGE.START,
	'START-secondsLeft': GAME_STAGE_DURATIONS.START,
	'NAMING-secondsLeft': GAME_STAGE_DURATIONS.NAMING,
	'DRAWING-secondsLeft': GAME_STAGE_DURATIONS.DRAWING,
	'RESULTS-secondsLeft': GAME_STAGE_DURATIONS.RESULTS,
} as const

export function useStage() {
	return useMultiplayerState<GameStage>('stage', GAME_STAGE.START)
}

export function updateStage(stage: GameStage) {
	setState('stage', stage, true)
}

export function getStage() {
	return getState<GameStage>('stage')
}

export function goToStageStart() {
	updateStage(GAME_STAGE.START)
	resetPlayersStates()
	resetStates()
}

function goToStageNaming() {
	updateStage(GAME_STAGE.NAMING)
	resetPlayersStates()
}

function goToStageDrawing() {
	updateStage(GAME_STAGE.DRAWING)
	resetPlayersStates()
}

function goToStageResults() {
	updateStage(GAME_STAGE.RESULTS)
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

export function goToNextStage(currentStage: GameStage) {
	console.log('goToNextStage', currentStage)
	switch (currentStage) {
		case GAME_STAGE.START:
			return goToStageNaming()
		case GAME_STAGE.NAMING:
			return goToStageDrawing()
		case GAME_STAGE.DRAWING:
			return goToStageResults()
		default:
			return goToStageStart()
	}
}
