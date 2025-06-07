import type { DependencyList } from 'react'
import { useIsHost } from 'playroomkit'
import { useCallback, useEffect } from 'react'

export function useHostReaction(functionToRun: () => void, deps: DependencyList = []) {
	const isHost = useIsHost()

	// TODO: read about this
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const memoizedFunction = useCallback(functionToRun, deps)

	useEffect(() => {
		if (!isHost) return
		const cleanup = memoizedFunction()
		return cleanup
	}, [isHost, memoizedFunction])
}
