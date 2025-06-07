import type { PlayerProfile } from 'playroomkit'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { cn } from '@/shared/lib/css'
import { Icon } from '@/shared/ui/icon'

export function PlayerAvatar({ profile, isReady }: { profile: PlayerProfile; isReady: boolean }) {
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
