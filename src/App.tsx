import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn';
import UserPage from './components/UserPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LogIn isSignUpPage={false} />} />
      <Route path='/signup' element={<LogIn isSignUpPage />} />
      <Route path='/user' element={<UserPage />} />
    </Routes>
  );
}

export default App;
