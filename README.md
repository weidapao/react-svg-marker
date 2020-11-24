# react-svg-marker

## About
React mark component based on SVG, support for drawing lines , polygon , arrow and other graphics.

## Installation
npm install -S react-svg-marker

## Demo
```
import LabelPanel from '../index'
const [list, setList] = useState([{
  type: 'polyline',
  point: [
    { x: 100, y: 200 },
  ],
  color: 'blue',
  selected: true,
  end: false,
}])
const cal = useRef(null)

const drawShap = (shapType, color) => {
  if (cal.current !== null) {
    cal.current.drawShap(shapType, color)
  }
}

<LabelPanel
  ref={cal}
  imgUrl={imgUrl}
  data={list}
  onChange={(e) => {
    setList(e)
  }}
/>
```

## Options and Defaults

shapType: 'polyline' | 'polygon' | 'arrow'

Point : { x: number; y: number }

data: {
  type: shapType
  point: Point[]
  color: string
  selected: boolean
  end: boolean
}

imgUrl: string

width?: number

height?: number