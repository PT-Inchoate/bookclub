import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-Sidebar">Sidebar</div>
      <div className="App-Dashboard">Dashboard
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button className="button-primary">learn more</button>
        <button className="button-primary__big">learn more</button>
        
        <p style={{color: "rgb(244,89,89)"}}>
          Bookclub
        </p>
      </header>
      </div>
    </div>
  );
}

export default App;
