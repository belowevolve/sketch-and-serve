import type { CanvasPathType } from '@/shared/lib/canvas'
import { useIsHost, useMultiplayerState, usePlayersState } from 'playroomkit'
import { useCallback, useEffect } from 'react'
import { shuffleState } from '@/shared/utils/shuffle-state'
import { addSecondsToNow } from '@/shared/utils/time'
import { useAllPlayersReady } from '../player'
import { GAME_STAGE, GAME_STAGE_DURATIONS, type GameStage } from './model/use-stage'
import { useMultiplayerTimer } from './use-game-timer'

export type ShuffledState<T> = Record<string, { state: T; from: string }>
export function useGameStage() {
	const isHost = useIsHost()
	const { allPlayersReady, resetAllPlayersReady } = useAllPlayersReady()
	const [gameStage, setGameStage] = useMultiplayerState<GameStage>('gameStage', GAME_STAGE.NAMING)
	const names = usePlayersState<string>('name')
	const draws = usePlayersState<CanvasPathType[]>('draw')
	const [assignedNames, setAssignedNames] = useMultiplayerState<ShuffledState<string>>('assignedNames', {})
	const [assignedDraws, setAssignedDraws] = useMultiplayerState<ShuffledState<CanvasPathType[]>>('assignedDraws', {})

	const handleStageChange = useCallback(
		(stage: GameStage, timerControls: { restart: (date: Date) => void; pause: () => void }) => {
			if (!isHost) return
			resetAllPlayersReady()
			switch (stage) {
				case GAME_STAGE.START:
					setGameStage(GAME_STAGE.NAMING, true)
					timerControls.restart(addSecondsToNow(GAME_STAGE_DURATIONS.NAMING))
					break
				case GAME_STAGE.NAMING: {
					const shuffledNames = shuffleState(names)
					setAssignedNames(shuffledNames)
					setGameStage(GAME_STAGE.DRAWING, true)
					timerControls.restart(addSecondsToNow(GAME_STAGE_DURATIONS.DRAWING))
					break
				}
				case GAME_STAGE.DRAWING: {
					const shuffledDraws = shuffleState(draws)
					setAssignedDraws(shuffledDraws)
					setGameStage(GAME_STAGE.WHERE, true)
					timerControls.restart(addSecondsToNow(GAME_STAGE_DURATIONS.WHERE))
					break
				}
				case GAME_STAGE.WHERE:
					setGameStage(GAME_STAGE.RESULTS, true)
					timerControls.pause()
					break
			}
		},
		[isHost, resetAllPlayersReady, setGameStage, names, draws, setAssignedNames, setAssignedDraws]
	)

	const { restart, start, seconds, togglePause, pause } = useMultiplayerTimer({
		key: 'gameStageTimer',
		expiryTimestamp: addSecondsToNow(GAME_STAGE_DURATIONS.START),
		// autoStart: false,
		willBeRepeated: true,
		onExpire: () => handleStageChange(gameStage, { restart, pause }),
	})
	const isTimerEnded = seconds === 0

	const moveToNextStage = useCallback(() => {
		handleStageChange(gameStage, { restart, pause })
	}, [gameStage, handleStageChange, restart, pause])

	useEffect(() => {
		if (!allPlayersReady) return
		moveToNextStage()
	}, [allPlayersReady, moveToNextStage])

	const startGame = useCallback(() => {
		if (!isHost) return
		start()
	}, [start, isHost])

	const restartGame = useCallback(() => {
		if (!isHost) return
		setGameStage(GAME_STAGE.START, true)
		restart(addSecondsToNow(GAME_STAGE_DURATIONS.START))
	}, [restart, isHost, setGameStage])

	return {
		secondsLeft: seconds,
		isTimerEnded,
		togglePause,
		gameStage,
		setGameStage,
		assignedNames,
		assignedDraws,
		startGame,
		restartGame,
	}
}
