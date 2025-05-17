import { GAME_STAGE, useGameStage } from '@/features/game-stage'
import { usePlayerReady } from '@/features/player'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { myPlayer, usePlayersState, usePlayerState } from 'playroomkit'
import { useEffect, useMemo, useRef } from 'react'
import type { ReactSketchCanvasRef } from 'react-sketch-canvas'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { DrawingStage } from './drawing-stage'
import { Navbar } from './navbar'

export function App() {
	const names = usePlayersState<string>('name')
	const { gameStage, assignedNames } = useGameStage()

	return (
		<>
			<Navbar />
			{names.map((name) => (
				<div key={name.player.id}>
					{name.player.id}: {name.state} {assignedNames[name.player.id]}
				</div>
			))}
			{
				{
					[GAME_STAGE.START]: <div>Start</div>,
					[GAME_STAGE.NAMING]: <NamingStage />,
					[GAME_STAGE.DRAWING]: <DrawingStage />,
					[GAME_STAGE.WHERE]: <WhereStage />,
					[GAME_STAGE.RESULTS]: <div>Results</div>,
				}[gameStage]
			}
		</>
	)
}
export function NamingStage() {
	const [name, setName] = usePlayerState(myPlayer(), 'name', '')
	const { isReady, toggleReady } = usePlayerReady()
	return (
		<>
			<Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
			<Button onClick={toggleReady}>{isReady ? 'Ready' : 'Submit'}</Button>
		</>
	)
}

export function WhereStage() {
	const canvasRef = useRef<ReactSketchCanvasRef>(null)
	const currentPlayer = myPlayer()
	const { assignedDraws } = useGameStage()
	const assignedDraw = useMemo(() => assignedDraws[currentPlayer.id] || [], [assignedDraws, currentPlayer.id])

	useEffect(() => {
		if (canvasRef.current) {
			canvasRef.current.loadPaths(assignedDraw)
		}
	}, [assignedDraw])

	return (
		<div>
			<h1>Receipt</h1>
			<ReactSketchCanvas allowOnlyPointerType='none' ref={canvasRef} />
		</div>
	)
}
