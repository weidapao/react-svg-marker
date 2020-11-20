import React, { useState, useRef, useEffect, useReducer, useImperativeHandle } from 'react'
import labelReducer from './reducer'
import { Point, MarkData, RefObject, ActionState, Drawfn } from './type'
import { getPoint, transformPoint, getArrowPoint } from './utils'
import './index.scss'

interface IProps {
  data: MarkData[]
  onChange: (data: MarkData[]) => void
  imgUrl: string
  width?: number
  height?: number
}

const LabelPanel = React.forwardRef<RefObject, IProps>(({ data, onChange, width, height, imgUrl }, ref) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [list, dispatch] = useReducer(labelReducer, data)
  const [action, setAction] = useState<ActionState>('view')
  const [cPoint, setCpoint] = useState<Point>({ x: 0, y: 0 })
  const [index, setIndex] = useState<number | null>(null)
  const [widthReal] = useState(width || 800)
  const [heightReal] = useState(height || 600)

  useEffect(() => {
    const currentLabel = getCurrentSelected()
    setAction(currentLabel ? currentLabel.type : 'view')
    onChange(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  const getCurrentSelected = (): MarkData => {
    return list.filter((item) => item.selected === true)[0]
  }

  const drawShap: Drawfn = (shapType, color) => {
    setAction(shapType)
    dispatch({
      type: 'add',
      payload: {
        type: shapType,
        color,
        point: [],
        selected: true,
        end: false,
      },
    })
  }

  const onClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const currentLabel = getCurrentSelected()
    // 当前无选定标注或者已结束
    if (!currentLabel || currentLabel.end) return
    // 判断双击
    if (event.detail === 2) return
    if (svgRef.current) {
      const point = getPoint(svgRef.current, event.clientX, event.clientY)
      switch (currentLabel.type) {
        case 'arrow': {
          dispatch({ type: 'draw', payload: point })
          // svg click事件dispatch是同步的
          if (currentLabel.point.length > 1) {
            setAction('view')
            dispatch({ type: 'end', end: true })
          }
          break
        }
        default: {
          dispatch({ type: 'draw', payload: point })
        }
      }
    }
  }

  const ondblClick = () => {
    if (action === 'view') return
    setAction('view')
    dispatch({ type: 'end', end: true })
  }

  const onMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    if (svgRef.current) {
      const point = getPoint(svgRef.current, event.clientX, event.clientY)
      if (index !== null) {
        dispatch({ type: 'move', payload: point, index: index })
      }
      setCpoint(point)
    }
  }

  const onMouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>, point: Point, index: number) => {
    const currentLabel = getCurrentSelected()
    if (currentLabel.end) {
      setIndex(index)
    }
  }

  const onMouseUp = () => {
    setIndex(null)
  }

  useImperativeHandle(ref, () => ({
    drawShap,
  }))

  return (
    <div className="App">
      <div style={{ width: widthReal, height: heightReal }} className={'container'}>
        <div className={'markData'}>
          <svg onMouseUp={onMouseUp} style={{ userSelect: 'none' }} ref={svgRef} onMouseMove={onMouseMove} onClick={onClick} onDoubleClick={ondblClick} width={widthReal} height={heightReal}>
            <defs>
              <marker id="triangle" markerUnits="strokeWidth" markerWidth="5" markerHeight="4" refX="0" refY="2" orient="auto">
                <path d="M 0 0 L 5 2 L 0 4 z" fill="#f00" />
              </marker>
            </defs>
            {list.map((listItem, index) => {
              let shape = null
              switch (listItem.type) {
                case 'arrow': {
                  shape = listItem.point && (
                    <path
                      key={index}
                      d={getArrowPoint(cPoint, listItem.point, listItem.end, listItem.selected)}
                      stroke={listItem.color}
                      strokeWidth="2"
                      fill="none"
                      style={{ markerEnd: listItem.point.length > 1 ? 'url(#triangle)' : 'none' }}
                    />
                  )
                  break
                }
                case 'polyline': {
                  shape = <polyline key={index} points={transformPoint(cPoint, listItem.point, listItem.end, listItem.selected)} stroke={listItem.color} fill="none" strokeWidth="5" />
                  break
                }
                case 'polygon': {
                  shape = <polygon key={index} points={transformPoint(cPoint, listItem.point, listItem.end, listItem.selected)} stroke={listItem.color} fill="none" strokeWidth="5" />
                  break
                }
              }
              return shape
            })}
            {list
              .filter((item1) => item1.selected === true)[0]
              ?.point.map((item, index) => (
                <circle
                  onMouseDown={(e) => {
                    onMouseDown(e, item, index)
                  }}
                  key={index}
                  cx={item.x}
                  cy={item.y}
                  r="8"
                  style={{ fill: 'transparent', cursor: 'pointer' }}
                  stroke="red"
                  strokeWidth="2"
                  fillOpacity="1"
                  fillRule="nonzero"
                />
              ))}
          </svg>
        </div>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  )
})

export default LabelPanel