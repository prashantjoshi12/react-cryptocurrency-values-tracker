
import { Provider } from 'react-redux'
import './App.css'
import { store } from './Store/ store'
import Coins from './components/Coins'
function App() {

  return (
    <>
    <Provider store={store}>
      <Coins/>
    </Provider>
    </>
  )
}

export default App
