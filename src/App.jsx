import { Provider } from 'react-redux';
import './App.css'
import './index.css'
import Routers from './routes/Router';
import { store } from './store';
function App() {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  )
}

export default App
