import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PlayList from "./Container/Playlist/playlist";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Song List
      </header>
      <PlayList />
    </div>
  );
}

export default App;
