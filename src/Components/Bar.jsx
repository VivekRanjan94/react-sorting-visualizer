import React from 'react'

const Bar = ({ value, index }) => {
  const colors = ['blue', 'black', 'red', 'green', 'purple']
  return (
    <div
      style={{
        width: '20px',
        height: value * 10,
        backgroundColor: colors[index % colors.length],
      }}
    ></div>
  )
}

export default Bar
