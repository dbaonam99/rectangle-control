import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Rectangle.module.css'

export default function Rectangle({
  initialStyles,
  selectedRectangle,
  index,
  onClick,
  defaultPosition,
  width,
  height,
}) {
  const ref = useRef();
  const [pressed, setPressed] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [position, setPosition] = useState({x: defaultPosition.x, y: defaultPosition.y})
  const [size, setSize] = useState({
    width, height
  })

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position])

  const onMouseMove = (event) => {
    if (!resizing && pressed && position.y + event.movementY >= 0 && (position.y + event.movementY) - height / 2 <= 255) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY
      })
    }
  }

  const onMouseResizeMove = (event, side) => {
    if (resizing) {
      if (side === 'topLeft') {
        setSize(currentSize => ({ 
          width: currentSize.width - event.movementX, 
          height: currentSize.height - event.movementY 
        }));
        setPosition({
          x: position.x + event.movementX,
          y: position.y + event.movementY
        })
      }
      if (side === 'topRight') {
        setSize(currentSize => ({ 
          width: currentSize.width + event.movementX, 
          height: currentSize.height - event.movementY 
        }));
        setPosition({
          x: position.x,
          y: position.y + event.movementY 
        })
      }
      if (side === 'bottomLeft') {
        setSize(currentSize => ({ 
          width: currentSize.width - event.movementX, 
          height: currentSize.height + event.movementY 
        }));
        setPosition({
          x: position.x + event.movementX,
          y: position.y
        })
      }
      if (side === 'bottomRight') {
        setSize(currentSize => ({ 
          width: currentSize.width + event.movementX, 
          height: currentSize.height + event.movementY 
        }));
      }
    }
  }

  return <div
    style={{
      ...initialStyles,
      border: selectedRectangle === index ? '2px #aaa solid' : '0px #aaa solid',
      width: size.width,
      height: size.height,
      zIndex: selectedRectangle === index ? 999 : 1,
    }}
    onClick={() => onClick("rectangle", index)}
    ref={ref}
    onMouseMove={ onMouseMove }
    onMouseDown={() => {
      onClick("rectangle", index);
      setPressed(true)
    }}
    onMouseUp={() => setPressed(false)}
    onMouseOut={() => setPressed(false)}
  >
    {selectedRectangle === index && <div
      onMouseMove={(event) => onMouseResizeMove(event, 'topLeft') }
      onMouseDown={ () => setResizing(true) }
      onMouseUp={ () => setResizing(false) }
      onMouseOut={() => setResizing(false)}
      className={styles.topLeftBox}
    />}
    {selectedRectangle === index && <div
      onMouseMove={(event) => onMouseResizeMove(event, 'topRight')}
      onMouseDown={() => setResizing(true)}
      onMouseUp={() => setResizing(false)}
      onMouseOut={() => setResizing(false)}
      className={styles.topRightBox}
    />}
    {selectedRectangle === index && <div
      onMouseMove={(event) => onMouseResizeMove(event, 'bottomLeft') }
      onMouseDown={ () => setResizing(true) }
      onMouseUp={() => setResizing(false)}
      onMouseOut={() => setResizing(false)}
      className={styles.bottomLeftBox}
    />}
    {selectedRectangle === index && <div
      onMouseMove={(event) => onMouseResizeMove(event, 'bottomRight')}
      onMouseDown={() => setResizing(true)}
      onMouseUp={() => setResizing(false)}
      className={styles.bottomRightBox}
    />}
  </div>
}