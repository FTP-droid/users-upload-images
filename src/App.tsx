import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn';
import UserPage from './components/UserPage'

function App() {
  return (
    <Routes>
      <Route path="/*">
        <Route index element={<LogIn isSignUpPage={false} />} />
        <Route path='signup' element={<LogIn isSignUpPage />} />
        <Route path='user' element={<UserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
