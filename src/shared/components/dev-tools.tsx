import { useEffect, useState } from 'react'

type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const POSITION_CLASSES: Record<CornerPosition, string> = {
	'top-left': 'top-4 left-4',
	'top-right': 'top-4 right-4',
	'bottom-left': 'bottom-4 left-4',
	'bottom-right': 'bottom-4 right-4',
}

function useDebugControls() {
	const [isVisible, setIsVisible] = useState(true)
	const [position, setPosition] = useState<CornerPosition>('top-right')

	// Toggle visibility with Ctrl/Cmd + D
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Toggle visibility
			if (event.key === 'd' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setIsVisible((prev) => !prev)
				return
			}

			// Change position with Ctrl/Cmd + Arrow keys
			if ((event.metaKey || event.ctrlKey) && event.altKey) {
				switch (event.key) {
					case 'ArrowUp':
						event.preventDefault()
						setPosition((prev) =>
							prev.startsWith('bottom') ? (prev.replace('bottom', 'top') as CornerPosition) : prev
						)
						break
					case 'ArrowDown':
						event.preventDefault()
						setPosition((prev) => (prev.startsWith('top') ? (prev.replace('top', 'bottom') as CornerPosition) : prev))
						break
					case 'ArrowLeft':
						event.preventDefault()
						setPosition((prev) => (prev.endsWith('right') ? (prev.replace('right', 'left') as CornerPosition) : prev))
						break
					case 'ArrowRight':
						event.preventDefault()
						setPosition((prev) => (prev.endsWith('left') ? (prev.replace('left', 'right') as CornerPosition) : prev))
						break
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	const positionClasses = POSITION_CLASSES[position]

	return {
		isVisible,
		setIsVisible,
		position,
		setPosition,
		positionClasses,
	}
}
export function DevTools({ children }: { children: React.ReactNode }) {
	const { isVisible, setIsVisible, position, setPosition, positionClasses } = useDebugControls()

	if (!isVisible) return null
	return (
		<div className={`fixed ${positionClasses} w-80 rounded-lg bg-black/90 p-4 font-mono text-sm text-white shadow-lg`}>
			<div className='mb-3 flex items-center justify-between'>
				<h3 className='font-bold'>Debug Panel</h3>
				<div className='flex items-center gap-2'>
					<select
						value={position}
						onChange={(e) => setPosition(e.target.value as CornerPosition)}
						className='rounded border border-white/20 bg-transparent px-1 py-0.5 text-xs'
					>
						<option value='top-left'>↖️</option>
						<option value='top-right'>↗️ </option>
						<option value='bottom-left'>↙️</option>
						<option value='bottom-right'>↘️</option>
					</select>
					<button
						type='button'
						onClick={() => setIsVisible(false)}
						className='text-xs opacity-50 hover:opacity-100'
						title='Press ⌘/Ctrl + D to show/hide'
					>
						Hide
					</button>
				</div>
			</div>

			{children}

			{/* Keyboard Controls Help */}
			<section className='mt-3 border-t border-white/20 pt-2'>
				<details>
					<summary className='text-xs uppercase opacity-50'>Keyboard Controls</summary>
					<div className='mt-1 space-y-1 text-xs opacity-70'>
						<div>⌘/Ctrl + D: Toggle Panel</div>
						<div>⌘/Ctrl + Alt + Arrows: Move Panel</div>
					</div>
				</details>
			</section>
		</div>
	)
}

export function DevToolsSection({
	children,
	open = true,
	title,
}: {
	children: React.ReactNode
	open?: boolean
	title: string
}) {
	return (
		<section>
			<details open={open}>
				<summary className='mb-1 text-xs uppercase opacity-50'>{title}</summary>
				{children}
			</details>
		</section>
	)
}
