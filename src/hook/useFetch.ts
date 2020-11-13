import { useCallback, useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | undefined
  error: Error | undefined
  loading: boolean
  run: () => void
}

// type FetchState2<T> = [T | undefined,Error | undefined,boolean]

type RequestService<T> = string | ((...args: any[]) => Promise<T>)

const useFetch = <T>(param: RequestService<T>): FetchState<T> => {
  const ms = 2000
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>()
  const fetchFn = useCallback(() => {
    if (typeof param === 'string') {
      setLoading(true)
      fetch(param).then((response) => {
        response
          .json()
          .then((data) => {
            setData(data)
            setLoading(false)
          })
          .catch((err) => {
            setError(err)
            setLoading(false)
          })
      })
    } else {
      setLoading(true)
      param().then(
        (data) => {
          setData(data)
          setLoading(false)
        },
        (err) => {
          setError(err)
          setLoading(false)
        }
      )
    }
  }, [param])

  const run = () => {
    let timeId: any = null
    return function () {
      if (timeId) {
        clearTimeout(timeId)
      }
      timeId = setTimeout(() => {
        fetchFn()
        timeId = null
      }, ms)
    }
  }

  useEffect(() => {
    fetchFn()
  }, [fetchFn])
  return { data, error, loading, run:run() }
}

export default useFetch
