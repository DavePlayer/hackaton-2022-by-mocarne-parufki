import React from 'react'

export const Header: React.FC = () => {
    return (
        <div className="container-fluid menu-container">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light">
          <div className="d-flex">
            <img className="navbar-brand logo flex-row" src="static/temp_logo.png" />
            <div className="imie-nazw d-flex align-items-center">Imie Nazwisko</div>
          </div>
        </nav>
      </div>

    )
}