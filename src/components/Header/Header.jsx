import React from 'react'
import './Header.css'
import marvelLogo from '../../assets/logo/Group@1,5x.svg'

const Header = () => {
  return (
    <header className="app-header">
      <img src={marvelLogo} alt="Marvel Logo" className="header-logo" />
    </header>
  )
}

export default Header