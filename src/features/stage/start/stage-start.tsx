import { usePlayerReady } from '@/features/player/use-ready'
import { Button } from '@/shared/ui/button'

export function StageStart() {
	const { isReady, toggleReady } = usePlayerReady()
	return (
		<div>
			StageStart, rules here wait to every one ready
			<Button onClick={toggleReady}>{isReady ? 'Ready' : 'Not Ready'}</Button>
		</div>
	)
}
