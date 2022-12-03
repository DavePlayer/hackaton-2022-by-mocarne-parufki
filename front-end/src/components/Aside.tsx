import React from 'react'

export const Aside: React.FC = () => {
    return (
        <aside className="col l-col">
            <select className="lista1" name="project" id="project">
              <option disabled selected value="null" style={{display: "none"}}>Wybierz projekt</option>
              <option value="Projekt1" >Projekt1</option>
              <option value="Projekt2">Projekt2</option>
              <option value="Projekt3">Projekt3</option>
              <option value="Projekt4">Projekt4</option>
            </select>
          </aside>
    )
}