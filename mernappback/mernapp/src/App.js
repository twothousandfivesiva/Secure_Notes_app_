import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
