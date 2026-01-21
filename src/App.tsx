import React from "react";
import "./App.css";
import birds from "./aves_de_jacarei.json";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <audio controls src={`${birds[0].audio}`}></audio>
    </div>
  );
}

export default App;
