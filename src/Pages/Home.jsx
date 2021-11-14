import React, { useState, useEffect } from 'react'
import Bars from '../Components/Bars'
import Input from '../Components/Input'
import useStartStop from '../Hooks/useStartStop'
import '../scss/styles.scss'
import { generateId } from '../Utils/generateId'
import { Sort } from '../Utils/sort'

const DEFAULT_ARRAY = [
  { id: generateId(), value: 7 },
  { id: generateId(), value: 5 },
  { id: generateId(), value: 8 },
  { id: generateId(), value: 4 },
  { id: generateId(), value: 3 },
  { id: generateId(), value: 1 },
  { id: generateId(), value: 2 },
  { id: generateId(), value: 6 },
]

const Home = () => {
  const [speed, setSpeed] = useState(300)
  const [type, setType] = useState('bubble')
  const [arr, setArr] = useState(DEFAULT_ARRAY)
  // eslint-disable-next-line no-unused-vars
  const [sort, setSort] = useState(new Sort(arr, setArr, type))
  const [start, stop, isActive] = useStartStop(() => {
    sort.iterate()
  }, speed)

  useEffect(() => {
    if (sort.isSorted) {
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr])

  useEffect(() => {
    if (isActive) {
      stop()
    }
    sort.setType(type, arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const updateArray = (newArr) => {
    if (isActive) {
      stop()
    }
    setArr(newArr)
    sort.newArr(newArr)
  }

  return (
    <div className='App'>
      <div className='header'>Sorting Visualized</div>
      <Input
        arr={arr}
        setArr={setArr}
        updateArray={updateArray}
        speed={speed}
        setSpeed={setSpeed}
        type={type}
        setType={setType}
      />
      <Bars arr={arr} setArr={setArr} />
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <div>iterations = {sort.iteration + 1}</div>
      <div>{sort.isSorted ? 'Sorted' : ''}</div>
    </div>
  )
}

export default Home
