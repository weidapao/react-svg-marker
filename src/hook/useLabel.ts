import { useEffect, useState } from 'react'
import {MarkData,ActionState} from '../type'

const useLabel = (list:MarkData[],onChange:(data: MarkData[]) => void) => {
  const [action, setAction] = useState<ActionState>('view')
  useEffect(() => {
    const currentLabel = list.filter((item) => item.selected === true)[0]
    setAction(currentLabel ? currentLabel.type : 'view')
    onChange(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])
  return [action,setAction]
}

export default useLabel
