import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { generateId } from '../Utils/generateId.js'

const Input = ({ arr, speed, setSpeed, updateArray, type, setType }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(arr)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateArray(items)
  }

  const updateElement = (index, value) => {
    const newArr = [...arr]
    newArr[index].value = value

    updateArray(newArr)
  }

  const addElement = () => {
    const newArr = [...arr, { id: generateId(), value: 0 }]

    updateArray(newArr)
  }

  const removeElement = (idToRemove) => {
    const newArr = arr.filter(({ id, value }) => id !== idToRemove)

    updateArray(newArr)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='input_array'>
          {(provided) => (
            <ul
              className='input_array'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {arr.map(({ id, value }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type='number'
                          defaultValue={value}
                          onChange={(e) => {
                            updateElement(index, Number(e.target.value))
                          }}
                        />
                        <button
                          onClick={() => {
                            removeElement(id)
                          }}
                        >
                          -
                        </button>
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={() => {
          addElement()
        }}
      >
        +
      </button>
      <input
        min='100'
        max='2000'
        type='range'
        value={speed}
        onChange={(e) => {
          setSpeed(Number(e.target.value))
        }}
      />
      <select
        name='type'
        id='type'
        value={type}
        onChange={(e) => {
          setType(e.target.value)
        }}
      >
        <option value='bubble'>Bubble</option>
        <option value='selection'>Selection</option>
        <option value='insertion'>Insertion</option>
      </select>
      <p>interval = {speed}</p>
    </div>
  )
}

export default Input
