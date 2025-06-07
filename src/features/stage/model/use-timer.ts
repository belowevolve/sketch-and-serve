import { getState, setState, useMultiplayerState } from 'playroomkit'
import { useHostReaction } from '@/shared/lib/playroomkit'
import { type GameStage, switchStage, useStage } from './use-stage'

export type TimerDuration = number | null

export function useIsTimerPaused(key = 'stage') {
	return useMultiplayerState<boolean>(`${key}-isPaused`, false)
}

export function useSecondsLeft(key = 'stage') {
	return useMultiplayerState<TimerDuration>(`${key}-secondsLeft`, null)
}
export function useCurrentSecondsLeft() {
	const [gameStage] = useStage()
	return useMultiplayerState<TimerDuration>(`${gameStage}-secondsLeft`, null)
}

export function updateSecondsLeft(secondsLeft: TimerDuration = null, key: GameStage | string = 'stage') {
	setState(`${key}-secondsLeft`, secondsLeft)
}

export function getSecondsLeft(key = 'stage') {
	return getState<TimerDuration>(`${key}-secondsLeft`)
}

export function useCountDown(onEnd: GameStage | (() => void)) {
	const [secondsLeft, setSecondsLeft] = useCurrentSecondsLeft()
	console.log('secondsLeft', secondsLeft)
	const [isPaused] = useIsTimerPaused()
	useHostReaction(() => {
		if (secondsLeft === null) return
		if (secondsLeft > 0 && !isPaused) {
			const timer = setTimeout(() => {
				setSecondsLeft(secondsLeft - 1)
			}, 1000)

			return () => {
				clearTimeout(timer)
			}
		} else if (secondsLeft <= 0) {
			if (typeof onEnd === 'function') {
				onEnd()
			} else {
				switchStage(onEnd)
			}
		}
	}, [secondsLeft, isPaused])

	return secondsLeft
}
