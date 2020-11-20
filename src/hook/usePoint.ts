import { useCallback, useEffect, useState } from 'react'

const usePoint = (svgDom: SVGSVGElement, x: number, y: number) => {
  const pt = svgDom.createSVGPoint()
  pt.x = x
  pt.y = y
  const svgP = pt.matrixTransform(svgDom.getScreenCTM()?.inverse())
  return { x: svgP.x, y: svgP.y }
}

export default usePoint
