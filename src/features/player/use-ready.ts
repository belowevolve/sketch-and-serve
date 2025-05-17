import { myPlayer, usePlayerState, usePlayersList } from 'playroomkit'
import { useCallback } from 'react'

export function usePlayerReady() {
	const [isReady, setIsReady] = usePlayerState(myPlayer(), 'ready', false)
	const toggleReady = useCallback(() => {
		setIsReady(!isReady)
	}, [isReady, setIsReady])
	return { isReady, toggleReady }
}

export function useAllPlayersReady() {
	const players = usePlayersList()
	const allPlayersReady = players.every((player) => player.getState('ready'))
	const resetAllPlayersReady = () => {
		players.forEach((player) => {
			player.setState('ready', false)
		})
	}
	return { allPlayersReady, resetAllPlayersReady }
}
