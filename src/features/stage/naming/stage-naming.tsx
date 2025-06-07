import { myPlayer, usePlayerState } from 'playroomkit'
import { ReadyButton, useOnAllPlayersReady } from '@/features/player'
import { useCountDown } from '../model/use-timer'

export function StageNaming() {
	const [name, setName] = usePlayerState(myPlayer(), 'name', '')
	useOnAllPlayersReady('DRAWING')
	useCountDown('DRAWING')

	return (
		<>
			<h1>Naming Stage</h1>
			{/* <Input type='text' value={name} onChange={(e) => setName(e.target.value)} /> */}
			<ReadyButton />
		</>
	)
}
