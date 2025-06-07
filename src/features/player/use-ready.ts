import type { PlayerStateWithValue } from '@/shared/lib/playroomkit'
import { myPlayer, usePlayersState, usePlayerState } from 'playroomkit'
import { useCallback } from 'react'

export function usePlayerReady() {
	const [isReady, setIsReady] = usePlayerState(myPlayer(), 'ready', false)
	const toggleReady = useCallback(() => {
		setIsReady(!isReady)
	}, [isReady, setIsReady])
	return { isReady, toggleReady }
}

export function usePlayersReady() {
	return usePlayersState('ready') as PlayerStateWithValue<boolean>[]
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
