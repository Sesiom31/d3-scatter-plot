import Graphic from "./Graphic"
import './App.css'

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1 id="title"> Diagrama de dispersión</h1>
        <p>Dopaje en el ciclismo profesional de los 35 tiempos mas veloces</p>
      </div>
      <Graphic />
    </div>
  )
}

export default App