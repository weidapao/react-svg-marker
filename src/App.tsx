import React, { useState,useCallback } from 'react'
import useFetch from './hook/useFetch'
import imgUrl from '../src/assets/images/testImg.png'
import styles from './App.less'

const App: React.FC = () => {
  const [city, setCity] = useState('')
  const { data, run } = useFetch<{ reason: string }>('/simpleWeather/query?city=%E8%8B%8F%E5%B7%9E&key=')
  const { data:data2, run:run2 } = useFetch<{ gaga: string }>(useCallback(()=>Promise.resolve({gaga:'33434'}),[]))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }
  return (
    <div className="App">
      <div className={styles.container}>
        <div className={styles.markData}>
          <svg width={300} height={300}>
              <rect width="100%" height="100%" style={{ fill: 'purple', strokeWidth: 1, stroke: 'rgb(0,0,0)' }} />
          </svg>
        </div>
        <img src={imgUrl} alt=""/>
      </div>
    </div>
  )
}

export default App
