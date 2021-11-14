import React from 'react'
import Bar from './Bar'

const Bars = ({ arr, setArr }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      {arr.map(({ value, id }, index) => {
        return <Bar value={value} key={id} index={index} />
      })}
    </div>
  )
}

export default Bars
