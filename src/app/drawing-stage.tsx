import { useGameStage } from '@/features/game-stage'
import { type CanvasPathType } from '@/shared/lib/canvas'
import { myPlayer, usePlayerState } from 'playroomkit'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas, type ReactSketchCanvasRef } from 'react-sketch-canvas'

export function DrawingStage() {
	const canvasRef = useRef<ReactSketchCanvasRef>(null)
	const currentPlayer = myPlayer()
	const { assignedNames } = useGameStage()
	const { isTimerEnded } = useGameStage()
	const assignedNameToDraw = assignedNames[currentPlayer.id] || ''
	const [, setDrawState] = usePlayerState<CanvasPathType[] | undefined>(currentPlayer, 'draw', undefined)
	console.log('help')

	useEffect(() => {
		if (!isTimerEnded) return
		canvasRef.current?.exportPaths().then((paths) => {
			setDrawState(paths)
		})
	}, [isTimerEnded, setDrawState])

	const [eraseMode, setEraseMode] = useState(false)
	const [strokeWidth, setStrokeWidth] = useState(5)
	const [eraserWidth, setEraserWidth] = useState(10)

	const handleEraserClick = () => {
		setEraseMode(true)
		canvasRef.current?.eraseMode(true)
	}

	const handlePenClick = () => {
		setEraseMode(false)
		canvasRef.current?.eraseMode(false)
	}

	const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStrokeWidth(+event.target.value)
	}

	const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEraserWidth(+event.target.value)
	}

	const handleUndoClick = () => {
		canvasRef.current?.undo()
	}

	const handleRedoClick = () => {
		canvasRef.current?.redo()
	}

	const handleClearClick = () => {
		canvasRef.current?.clearCanvas()
	}

	const handleResetClick = () => {
		canvasRef.current?.resetCanvas()
	}

	return (
		<div className='d-flex flex-column gap-2 p-2'>
			<h1>
				Draw this: <span className='font-bold text-blue-600'>{assignedNameToDraw}</span>
			</h1>
			<h1>Tools</h1>
			<div className='d-flex align-items-center gap-2'>
				<button type='button' className='btn btn-sm btn-outline-primary' disabled={!eraseMode} onClick={handlePenClick}>
					Pen
				</button>
				<button
					type='button'
					className='btn btn-sm btn-outline-primary'
					disabled={eraseMode}
					onClick={handleEraserClick}
				>
					Eraser
				</button>
				<label htmlFor='strokeWidth' className='form-label'>
					Stroke width
				</label>
				<input
					disabled={eraseMode}
					type='range'
					className='form-range'
					min='1'
					max='20'
					step='1'
					id='strokeWidth'
					value={strokeWidth}
					onChange={handleStrokeWidthChange}
				/>
				<label htmlFor='eraserWidth' className='form-label'>
					Eraser width
				</label>
				<input
					disabled={!eraseMode}
					type='range'
					className='form-range'
					min='1'
					max='20'
					step='1'
					id='eraserWidth'
					value={eraserWidth}
					onChange={handleEraserWidthChange}
				/>
				<button type='button' className='btn btn-sm btn-outline-primary' onClick={handleUndoClick}>
					Undo
				</button>
				<button type='button' className='btn btn-sm btn-outline-primary' onClick={handleRedoClick}>
					Redo
				</button>
				<button type='button' className='btn btn-sm btn-outline-primary' onClick={handleClearClick}>
					Clear
				</button>
				<button type='button' className='btn btn-sm btn-outline-primary' onClick={handleResetClick}>
					Reset
				</button>
			</div>
			<h1>Canvas</h1>
			<ReactSketchCanvas
				ref={canvasRef}
				strokeWidth={strokeWidth}
				eraserWidth={eraserWidth}
				onStroke={async () => setDrawState(await canvasRef.current?.exportPaths())}
			/>
		</div>
	)
}
