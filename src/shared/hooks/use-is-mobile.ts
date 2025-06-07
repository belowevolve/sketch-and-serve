import { useSyncExternalStore } from 'react'

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(callback: () => void) {
	const mediaQueryList = window.matchMedia(MOBILE_QUERY)
	mediaQueryList.addEventListener('change', callback)
	return () => mediaQueryList.removeEventListener('change', callback)
}

function getSnapshot() {
	return window.matchMedia(MOBILE_QUERY).matches
}

function getServerSnapshot() {
	return false
}

export function useIsMobile() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
