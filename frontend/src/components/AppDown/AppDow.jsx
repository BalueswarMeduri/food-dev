import React from 'react'
import './AppDown.css'
import { assets } from '../../assets/assets'

const AppDow = () => {
  return (
    <div className='app-downlaoad' id='app-down'>
        <p>Fot Better Experience Dowload <br /> Tomato App</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDow