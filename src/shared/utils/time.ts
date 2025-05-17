export function addSecondsToNow(seconds: number): Date {
	const now = new Date()
	now.setSeconds(now.getSeconds() + seconds)
	return now
}

export function executeOnNextTick(callback: () => void) {
	setTimeout(callback, 0)
}
