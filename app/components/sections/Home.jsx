import React, { useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Button from '../elements/Button';
import Rectangle from '../elements/Rectangle';
import styles from './Home.module.css'

const colors = [
  'red',
  'blue',
  'pink',
  'purple',
  'green',
  'yellow',
  'gray',
  'orange',
  'DarkSlateGray',
  'Gold',
  'LightSeaGreen'
]

export default function Home() {
  const [rectangleList, setRectangleList] = useState([])
  const [selectedRectangle, setSelectedRectangle] = useState('');
  const [boxSize, setBoxSize] = useState({
    height: 0,
    width: 0
  })
  const boxRef = useRef()

  const handleOnCreate = () => {
    const width = Math.floor((Math.random() * 200) + 100)
    const height = Math.floor((Math.random() * 100) + 50)
    const backgroundColor = colors[Math.floor((Math.random() * 5) + 0)]
    const newRectangle = {
      width,
      height,
      backgroundColor,
      position: 'absolute',
      cursor: 'pointer',
      transform: `translate(${boxSize.width / 2 - width / 2}px, ${boxSize.height / 2 - height / 2}px)`
    }
    setRectangleList(prev => [...prev, newRectangle])
  }

  const handleOnRectangleSelect = (type, index) => {
    if (type === 'box') {
      setSelectedRectangle('')
    } else if (typeof index === 'number') {
      setSelectedRectangle(index)
    }
  }

  useEffect(() => {
    if (boxRef) {
      setBoxSize({
        height: boxRef.current.clientHeight,
        width: boxRef.current.clientWidth
      })
    }
  }, [boxRef])

  return <div className={styles.root}>
    <div className={styles.buttons}>
      <Button name="Create" backgroundColor="#45a745" onClick={handleOnCreate}/>
      <Button name="Delete" backgroundColor={selectedRectangle ? "Red" : "#aaa"}/>
      <Button name="Undo" backgroundColor={selectedRectangle ? "Red" : "#aaa"}/>
      <Button name="Redo" backgroundColor={selectedRectangle ? "Red" : "#aaa"}/>
    </div>
    <div
      className={styles.boxContainer}
      id="box"
      onClick={(event) => handleOnRectangleSelect(event.target.id)}
      ref={boxRef}
    >
      {rectangleList?.map((item, index) => <Rectangle
        key={index}
        initialStyles={item}
        selectedRectangle={selectedRectangle}
        index={index}
        onClick={(type, index) => handleOnRectangleSelect(type, index)}
        defaultPosition={{
          x: boxSize.width / 2 - item.width / 2,
          y: boxSize.height / 2 - item.height / 2
        }}
        width={item.width}
        height={item.height}
      />)}
      {/* {rectangleList?.map((item, index) => <Draggable
        key={index}
        defaultPosition={{
          x: (boxSize.width / 2) - (item.width / 2),
          y: (boxSize.height / 2) - (item.height / 2),
        }}
        bounds="parent"
        onStart={() => handleOnRectangleSelect("rectangle", index)}
      >
        <div
          style={{
            ...item,
            border: selectedRectangle === index ? '2px #aaa solid' : '0px #aaa solid'
          }}
          onClick={() => handleOnRectangleSelect("rectangle", index)}
        >
          {selectedRectangle === index && <div
            // ref={topLeftBoxRef}
            onMouseDown={() => {
              handleOnResize(index)
            }}
            className={styles.topLeftBox}></div>}
          {selectedRectangle === index && <div className={styles.topRightBox}></div>}
          {selectedRectangle === index && <div className={styles.bottomLeftBox}></div>}
          {selectedRectangle === index && <div className={styles.bottomRightBox}></div>}
        </div>
      </Draggable>)} */}
    </div>
  </div>
}