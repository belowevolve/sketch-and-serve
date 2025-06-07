import { useMultiplayerState } from 'playroomkit'
import { GAME_STAGE, type GameStage } from './stage'

export function useMultiplayerStage() {
	return useMultiplayerState<GameStage>('gameStage', GAME_STAGE.START)
}
