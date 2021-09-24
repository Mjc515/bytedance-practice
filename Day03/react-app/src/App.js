import logo from './logo.svg';
import './App.css';

function App(props) {
  console.log(arguments)
  let createLine = props.template;
  let header = <header className="App-header">
  {props.datasource.map(createLine)}
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
  return (
    <div className="App">
      {header}
    </div>
  );
}

export default App;
