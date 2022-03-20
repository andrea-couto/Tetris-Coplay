import './App.css';
import Game from './components/Game/Game';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <Game rows={20} columns={10}/>
      </header>

    </div>
  );
}

export default App;
