import type { PlayerProfile } from 'playroomkit'
import { usePlayersReady } from '@/features/player'
import { cn } from '@/shared/lib/css'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Icon } from '@/shared/ui/icon'

export function Header() {
	return (
		<header className='mx-auto flex max-w-lsm items-center justify-center'>
			{/* <h1 className='text-2xl font-bold'>Sketch & Serve {gameStage}</h1> */}
			<PlayerList />
			<Timer />
		</header>
	)
}

function PlayerAvatar({ profile, isReady }: { profile: PlayerProfile; isReady: boolean }) {
	return (
		<li className='px-1 first:pl-2 last:pr-2'>
			<Avatar>
				<AvatarImage src={profile.photo} className={cn('transition-all', !isReady && 'grayscale-[95%]')} />
				<AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
				{isReady ? (
					<span
						className='absolute -end-1 -bottom-1 size-6 rounded-full border-2 border-background bg-emerald-500'
						aria-label='Ready'
					></span>
				) : (
					<span
						className='absolute -end-1 -bottom-1 grid size-6 place-items-center rounded-full border-2 bg-background p-0.5'
						aria-label='Not Ready'
					>
						<Icon icon='lucide--pen-line' className='size-4' />
					</span>
				)}
			</Avatar>
		</li>
	)
}

function PlayerList() {
	const players = usePlayersReady()

	return (
		<ul className='flex overflow-x-auto overflow-y-visible py-2'>
			{players.map(({ player, state }) => {
				const profile = player.getProfile()
				return <PlayerAvatar key={player.id} profile={profile} isReady={state} />
			})}
		</ul>
	)
}

function Timer() {
	return (
		<div className='bg-white'>
			<Icon icon='lucide--pause' className='size-6' />
			{/* <p className='text-lg'>
				Timer: {secondsLeft} seconds <button onClick={togglePause}>Pause</button>
			</p>
			<button onClick={restartGame}>Restart Game</button> */}
		</div>
	)
}
