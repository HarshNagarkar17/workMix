import './App.css'
import Router from './pages/Router'
import {SnackbarProvider} from "notistack"
function App() {

  return (
    <SnackbarProvider>
      <Router />
    </SnackbarProvider>
)
}

export default App
