import './App.css';
import RootComponent from '../src/components/rootComponent/rootComponent';
import { Provider } from 'react-redux'; // added
import store from '../src/store'; // added

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">In case you can’t be there to catch them, make sure you leave a safety net.</div>
        <div className="App-body">
          <RootComponent></RootComponent>
        </div>
      </div>
    </Provider>
  );
}

export default App;