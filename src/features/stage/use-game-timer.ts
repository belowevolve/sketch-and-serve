import { useIsHost, useMultiplayerState } from 'playroomkit'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface TimeFromMillisecondsType {
	totalMilliseconds: number
	totalSeconds: number
	milliseconds: number
	seconds: number
	minutes: number
	hours: number
	days: number
}

export type AMPMType = '' | 'pm' | 'am'

export interface FormattedTimeFromMillisecondsType {
	milliseconds: number
	seconds: number
	minutes: number
	hours: number
	ampm?: AMPMType
}

export class Time {
	static getTimeFromMilliseconds(millisecs: number, isCountDown = true): TimeFromMillisecondsType {
		const totalSeconds = isCountDown ? Math.ceil(millisecs / 1000) : Math.floor(millisecs / 1000)
		const days = Math.floor(totalSeconds / (60 * 60 * 24))
		const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
		const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
		const seconds = Math.floor(totalSeconds % 60)
		const milliseconds = Math.floor(millisecs % 1000)

		return {
			totalMilliseconds: millisecs,
			totalSeconds,
			milliseconds,
			seconds,
			minutes,
			hours,
			days,
		}
	}

	static getMillisecondsFromExpiryTimestamp(expiryTimestamp: number): number {
		const now = new Date().getTime()
		const milliSecondsDistance = expiryTimestamp - now
		return milliSecondsDistance > 0 ? milliSecondsDistance : 0
	}

	static getMillisecondsFromExpiry(expiry: Date): number {
		const now = new Date().getTime()
		const milliSecondsDistance = expiry?.getTime() - now
		return milliSecondsDistance > 0 ? milliSecondsDistance : 0
	}

	static getMillisecondsFromPrevTime(prevTime: number): number {
		const now = new Date().getTime()
		const milliSecondsDistance = now - prevTime
		return milliSecondsDistance > 0 ? milliSecondsDistance : 0
	}

	static getMillisecondsFromTimeNow(): number {
		const now = new Date()
		const currentTimestamp = now.getTime()
		const offset = now.getTimezoneOffset() * 60 * 1000
		return currentTimestamp - offset
	}

	static getFormattedTimeFromMilliseconds(milliseconds: number, format?: '12-hour'): FormattedTimeFromMillisecondsType {
		const {
			milliseconds: millisecVal,
			seconds: secondsValue,
			minutes,
			hours,
		} = Time.getTimeFromMilliseconds(milliseconds)
		let ampm: AMPMType = ''
		let hoursValue = hours

		if (format === '12-hour') {
			ampm = hours >= 12 ? 'pm' : 'am'
			hoursValue = hours % 12
		}

		return {
			milliseconds: millisecVal,
			seconds: secondsValue,
			minutes,
			hours: hoursValue,
			ampm,
		}
	}
}

export class Validate {
	static expiryTimestamp(expiryTimestamp: Date) {
		const isValid = new Date(expiryTimestamp).getTime() > 0
		if (!isValid) {
			console.warn('react-timer-hook: { useTimer } Invalid expiryTimestamp settings', expiryTimestamp)
		}
		return isValid
	}

	static onExpire(onExpire: () => void) {
		const isValid = onExpire && typeof onExpire === 'function'
		if (onExpire && !isValid) {
			console.warn('react-timer-hook: { useTimer } Invalid onExpire settings function', onExpire)
		}
		return isValid
	}
}

export function useInterval(callback: () => void, delay: number | null) {
	const callbackRef = useRef(callback)

	// update callback function with current render callback that has access to latest props and state
	useEffect(() => {
		callbackRef.current = callback
	})

	useEffect(() => {
		if (!delay) {
			return () => {}
		}

		const interval = setInterval(() => {
			callbackRef?.current?.()
		}, delay)
		return () => clearInterval(interval)
	}, [delay])
}

const SECOND_INTERVAL = 1000

export interface useTimerSettingsType {
	expiryTimestamp: Date
	onExpire?: () => void
	autoStart?: boolean
	interval?: number
	willBeRepeated?: boolean
}

export type useTimerResultType = TimeFromMillisecondsType & {
	start: () => void
	pause: () => void
	resume: () => void
	restart: (newExpiryTimestamp: Date, newAutoStart?: boolean) => void
	isRunning: boolean
	togglePause: () => void
}

export function useMultiplayerTimer({
	key,
	expiryTimestamp: expiry,
	onExpire = () => {},
	autoStart = true,
	willBeRepeated = false,
	interval: customInterval = SECOND_INTERVAL,
}: useTimerSettingsType & { key: string }): useTimerResultType {
	const isHost = useIsHost()
	const [expiryTimestamp, setExpiryTimestamp] = useMultiplayerState<number>(key, expiry.getTime())
	const [isRunning, setIsRunning] = useMultiplayerState<boolean>(`${key}-isRunning`, autoStart)
	const [didStart, setDidStart] = useState(autoStart)
	const [interval, setInterval] = useState<number | null>(customInterval)
	const [localMilliseconds, setLocalMilliseconds] = useState(() =>
		Time.getMillisecondsFromExpiryTimestamp(expiryTimestamp)
	)

	console.log({ interval, milliseconds: localMilliseconds, expiryTimestamp })

	const handleExpire = useCallback(() => {
		console.log('handleExpire')
		if (Validate.onExpire(onExpire)) {
			onExpire()
		}
		if (!willBeRepeated) {
			setIsRunning(false)
			setInterval(null)
		}
	}, [onExpire, setIsRunning, willBeRepeated])

	const pause = useCallback(() => {
		setIsRunning(false)
	}, [setIsRunning])

	const restart = useCallback(
		(newExpiryTimestamp: Date, newAutoStart = true) => {
			console.log('restart', newExpiryTimestamp, newAutoStart)
			if (isHost) {
				setExpiryTimestamp(newExpiryTimestamp.getTime())
			}
			const newMilliseconds = Time.getMillisecondsFromExpiry(newExpiryTimestamp)
			setLocalMilliseconds(newMilliseconds)
			setInterval(customInterval)
			setDidStart(newAutoStart)
			setIsRunning(newAutoStart)
		},
		[customInterval, setIsRunning, setExpiryTimestamp, isHost]
	)

	const resume = useCallback(() => {
		const time = new Date()
		time.setMilliseconds(time.getMilliseconds() + localMilliseconds)
		restart(time)
	}, [localMilliseconds, restart])

	const togglePause = useCallback(() => {
		if (isRunning) {
			setIsRunning(false)
			pause()
		} else {
			setIsRunning(true)
			resume()
		}
	}, [isRunning, pause, resume, setIsRunning])

	const start = useCallback(() => {
		if (didStart) {
			const newExpiryTimestamp = new Date(expiryTimestamp)
			if (isHost) {
				setExpiryTimestamp(newExpiryTimestamp.getTime())
			}
			const newMilliseconds = Time.getMillisecondsFromExpiry(newExpiryTimestamp)
			setLocalMilliseconds(newMilliseconds)
			setIsRunning(true)
		} else {
			resume()
		}
	}, [expiryTimestamp, didStart, resume, setIsRunning, setExpiryTimestamp, isHost])

	useInterval(
		() => {
			console.log('useInterval')
			const millisecondsValue = Time.getMillisecondsFromExpiryTimestamp(expiryTimestamp)
			setLocalMilliseconds(millisecondsValue)
			if (millisecondsValue <= 0) {
				handleExpire()
			} else if (interval && millisecondsValue < interval) {
				setInterval(millisecondsValue)
			}
		},
		isRunning ? interval : null
	)

	// Sync with multiplayer expiry timestamp changes
	useEffect(() => {
		Validate.expiryTimestamp(new Date(expiryTimestamp))
		const newMilliseconds = Time.getMillisecondsFromExpiryTimestamp(expiryTimestamp)
		setLocalMilliseconds(newMilliseconds)
	}, [expiryTimestamp])

	return {
		...Time.getTimeFromMilliseconds(localMilliseconds),
		start,
		pause,
		togglePause,
		resume,
		restart,
		isRunning,
	}
}
