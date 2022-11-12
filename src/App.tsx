import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn isSignUpPage={false} />} />
      <Route path="/signup" element={<LogIn isSignUpPage/>} />
    </Routes>
  );
}

export default App;
