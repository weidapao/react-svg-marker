import { Point, MarkData } from '../type'

type Action =
  | { type: 'load'; payload: MarkData[] }
  | { type: 'draw'; payload: Point }
  | { type: 'add'; payload: MarkData }
  | { type: 'move'; payload: Point; index: number }
  | { type: 'end'; end: boolean }

export default function reducer(state: MarkData[], action: Action) {
  switch (action.type) {
    case 'draw':
      let flag = true
      const Newstate = state.map((item) => {
        if (item.selected && flag) {
          flag = false
          item.point.push(action.payload)
        }
        return item
      })
      return Newstate
    case 'add':
      return [
        ...state.map((item) => {
          item.selected = false
          return item
        }),
        action.payload,
      ]
    case 'move':
      let flag2 = true
      return state.map((item) => {
        if (item.selected && flag2) {
          flag2 = false
          item.point[action.index] = action.payload
        }
        return item
      })
    case 'end':
      let flag3 = true
      return state.map((item) => {
        if (item.selected && flag3) {
          item.end = action.end
          flag3 = false
        }
        return item
      })
    default:
      throw new Error()
  }
}
