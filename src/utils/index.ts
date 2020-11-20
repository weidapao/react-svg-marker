import { Point } from '../type'

export const getPoint = (svgDom: SVGSVGElement, x: number, y: number) => {
  const pt = svgDom.createSVGPoint()
  pt.x = x
  pt.y = y
  const svgP = pt.matrixTransform(svgDom.getScreenCTM()?.inverse())
  return { x: svgP.x, y: svgP.y }
}

export const isNeed = (isEnd: boolean, isSelected: boolean): boolean => {
  if (isSelected && !isEnd) return true
  return false
}

export const transformPoint = (cPoint: Point, points: Point[], isEnd: boolean, isSelected: boolean): string => {
  const pointHas = points.reduce((a, b) => {
    return `${a} ${b.x} ${b.y}`
  }, '')
  const pointMouse = isNeed(isEnd, isSelected) ? ` ${cPoint?.x} ${cPoint?.y}` : ''
  return pointHas + pointMouse
}

export const getArrowPoint = (cPoint: Point, points: Point[], isEnd: boolean, isSelected: boolean) => {
  let result = 'M ' + points.reduce((a, b) => `${a} ${b.x} ${b.y} L`, '')
  result += isNeed(isEnd, isSelected) ? ` ${cPoint ? cPoint.x : ''} ${cPoint ? cPoint.y : ''} L` : ''
  return result.substr(0, result.length - 1)
}
