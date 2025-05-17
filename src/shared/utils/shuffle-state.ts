interface PlayerWithState<T> {
	player: {
		id: string
	}
	state: T
}

export function shuffleState<T>(playersWithState: PlayerWithState<T>[]): Record<string, T> {
	const n = playersWithState.length

	if (n === 0) {
		return {}
	}
	if (n === 1) {
		return { [playersWithState[0].player.id]: playersWithState[0].state }
	}

	const shuffledIndexedArray = createDerangementArray(n)

	return shuffledIndexedArray.reduce(
		(acc, i) => {
			acc[playersWithState[i].player.id] = playersWithState[shuffledIndexedArray[i]].state
			return acc
		},
		{} as Record<string, T>
	)
}

/**
 * Creates a derangement of indices (where no element remains in its original position)
 */
function createDerangementArray(n: number): number[] {
	if (n <= 1) {
		return Array.from({ length: n }, (_, i) => i)
	}

	const arr = Array.from({ length: n }, (_, i) => i)

	// Iterate from the last element down to the second element.
	for (let i = n - 1; i > 0; i--) {
		// Pick a random index j before or at the current index i
		const j = Math.floor(Math.random() * (i + 1))
		// Swap elements at i and j
		;[arr[i], arr[j]] = [arr[j], arr[i]]

		// If swapping arr[i] and arr[j] resulted in element i being at index i,
		// and this is not the last element (i > 0), swap arr[i] with arr[i-1].
		// This step is crucial for increasing the probability of a derangement
		// and is part of algorithms designed for derangement generation.
		// Note: A simpler form of this algorithm might just swap with a random
		// element if a fixed point is created, but this specific structure
		// is related to algorithms with derangement guarantees.
		if (arr[i] === i && i > 0) {
			// Swap with the element before it to break the fixed point.
			// This specific swap helps ensure that we move towards a derangement.
			;[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]]
		}
	}

	// After the loop, there's a high probability of a derangement.
	// However, for a *guarantee*, especially for small n, a final check
	// and potential fix for the first element might be needed depending
	// on the exact variant of the algorithm used.

	// A common strategy in guaranteed derangement algorithms after a shuffle-like pass
	// is to check the first element. If it's a fixed point, swap it with any element
	// that is *not* a fixed point of the first element's original value.
	// A simpler way to handle the potential last fixed point after the loop
	// (which might occur at index 0) is to check if arr[0] === 0.
	// If arr[0] === 0, it means 0 ended up in its original position.
	// Since all other elements from index 1 to n-1 were processed to avoid
	// being at their original index *during* the loop, the only remaining
	// potential fixed point after the loop structure is at index 0.
	// If arr[0] is a fixed point, we must swap it with some other element
	// to break this fixed point. Swapping it with arr[1] is a simple way
	// to resolve this last potential fixed point.
	if (arr[0] === 0 && n > 1) {
		;[arr[0], arr[1]] = [arr[1], arr[0]]
	}

	return arr
}
