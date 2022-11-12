import { Route, Routes } from 'react-router-dom';
import './App.css';
import  SignUp  from './components/SignUp';
import  SignIn  from './components/SignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>
  );
}

export default App;
