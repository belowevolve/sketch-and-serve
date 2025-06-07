import { myPlayer, usePlayersState, usePlayerState } from 'playroomkit'
import { useCallback } from 'react'
import { useHostReaction } from '@/shared/lib/playroomkit'
import { type GameStage, switchStage } from '../stage'

export const DEFAULT_PLAYER_STATES = {
	ready: false,
}

export function usePlayerReady() {
	const [isReady, setIsReady] = usePlayerState(myPlayer(), 'ready', false)
	const toggleReady = useCallback(() => {
		setIsReady(!isReady)
	}, [isReady, setIsReady])
	return { isReady, toggleReady }
}

export function usePlayersReady() {
	return usePlayersState<boolean>('ready')
}

export function useAllPlayersReady() {
	const players = usePlayersReady()
	const allPlayersReady = players.every(({ state }) => state)
	const resetAllPlayersReady = (isReady?: boolean) => {
		players.forEach(({ player }) => {
			player.setState('ready', isReady)
		})
	}
	return { allPlayersReady, resetAllPlayersReady }
}

export function useOnAllPlayersReady(onReady: GameStage | (() => void), onNotReady?: () => void) {
	const { allPlayersReady } = useAllPlayersReady()

	useHostReaction(() => {
		if (allPlayersReady) {
			if (typeof onReady === 'function') {
				onReady()
			} else {
				switchStage(onReady)
			}
		} else if (onNotReady) {
			onNotReady()
		}
	}, [allPlayersReady])
}
