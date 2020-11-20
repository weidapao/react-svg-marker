import React, { useState, useRef } from 'react'
import imgUrl from '../../src/assets/images/testImg.png'
import { MarkData, RefObject, MarkType } from '../type'
import LabelPanel from '../index'
const Demo = () => {
  // {
  //   type: 'polyline',
  //   point: [
  //     { x: 100, y: 200 },
  //   ],
  //   color: 'blue',
  //   selected: true,
  //   end: false,
  // },
  const [list, setList] = useState<MarkData[]>([])
  const cal = useRef<RefObject>(null)
  const drawShap = (shapType: MarkType, color: string) => {
    if (cal.current !== null) {
      cal.current.drawShap(shapType, color)
    }
  }
  return (
    <div>
      <button
        onClick={() => {
          const newList = [...list]
          newList.map(item=>item.selected=false)
          newList[0].selected = true
          setList(newList)
        }}
      >
        list444
      </button>
      <button onClick={() => drawShap('arrow', 'red')}>arrow</button>
      <button onClick={() => drawShap('polygon', 'yellow')}>polygon</button>
      <button onClick={() => drawShap('polyline', 'blue')}>polyline</button>
      <LabelPanel
        ref={cal}
        imgUrl={imgUrl}
        data={list}
        onChange={(e) => {
          setList(e)
        }}
      />
    </div>
  )
}

export default Demo
