export type Point = { x: number; y: number }

export type MarkType = 'polyline' | 'polygon' | 'arrow'

export type ActionState = 'view' | MarkType
export interface MarkData {
  type: MarkType
  point: Point[]
  color: string
  selected: boolean
  end: boolean
}

export type Drawfn = (shapType: MarkType, color: string) => void
export interface RefObject {
  drawShap: Drawfn
}