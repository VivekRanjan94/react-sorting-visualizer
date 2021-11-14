import { useRef, useEffect, useState } from 'react'

const useStartStop = (callback, delay) => {
  const callbackRef = useRef(null)
  const [intervalId, setIntervalId] = useState(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const start = () => {
    if (intervalId !== null) {
      return
    }
    const tick = () => {
      callbackRef.current()
    }

    let id = setInterval(tick, delay)
    setIntervalId(id)
    setIsActive(true)
  }

  const stop = () => {
    console.log('stop')
    clearInterval(intervalId)
    setIntervalId(null)
    setIsActive(false)
  }

  return [start, stop, isActive]
}

export default useStartStop
