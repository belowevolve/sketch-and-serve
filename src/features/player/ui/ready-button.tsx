import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { usePlayerReady } from '../use-ready'

export function ReadyButton() {
	const { isReady, toggleReady } = usePlayerReady()
	return (
		<Card className='fixed inset-x-0 bottom-0 rounded-b-none px-4'>
			<Button variant={isReady ? 'secondary' : 'default'} size='lg' onClick={toggleReady}>
				{isReady ? 'I lied, I`m not ready' : 'I`m ready'}
			</Button>
		</Card>
	)
}
