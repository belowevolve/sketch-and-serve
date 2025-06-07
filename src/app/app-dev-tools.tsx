import { DevTools, DevToolsSection } from '@/shared/components/dev-tools'
import { usePlayersList } from 'playroomkit'

export function AppDevTools() {
	// const { gameStage, secondsLeft, isTimerEnded, assignedNames } = useGameStage()
	const players = usePlayersList(true)
	return (
		<DevTools>
			<div className='space-y-4'>
				{/* Game Stage */}
				<DevToolsSection title='Game Stage'>
					<div className='flex justify-between'>
						{/* <span>{gameStage}</span> */}
						{/* <span className={isTimerEnded ? 'text-red-400' : 'text-green-400'}>{secondsLeft}s</span> */}
					</div>
				</DevToolsSection>

				{/* Players */}
				<DevToolsSection title='Players'>
					<div className='space-y-1'>
						{players.map((player) => (
							<div key={player.id} className='flex justify-between text-xs'>
								<span>{player.id}</span>
								<div className='space-x-2'>
									<span>Ready: {player.getState('ready') ? '✓' : '×'}</span>
									<span>Name: {player.getState('name') || '–'}</span>
								</div>
							</div>
						))}
					</div>
				</DevToolsSection>

				{/* Assignments */}
				<DevToolsSection title='Name Assignments'>
					<div className='space-y-1'>
						{players.map((player) => {
							return (
								<div key={player.id} className='pl-2 text-xs'>
									{/* <div>
										{player.id} - {assignedNames[player.id]?.state || '...'} (from{' '}
										{assignedNames[player.id]?.from || '...'})
									</div> */}
								</div>
							)
						})}
					</div>
				</DevToolsSection>
			</div>
		</DevTools>
	)
}
